
const db = require("../db/connection")


exports.fetchTopics = () => {
    return db.query(`SELECT * FROM topics;`).then(({rows})=>{
        return rows
    })
}
exports.fetchUsers = ()=>{
    return db.query(`SELECT * FROM users;`).then(({rows})=>{
        return rows
    })
}
exports.fetchSpecUser = (user)=>{
    return db.query(
    `SELECT * FROM users
    WHERE username = $1;`
    ,[user]).then(({rows})=>{
        if(rows.length < 1) return Promise.reject({status:404 ,msg:'User does not exist'})
        return rows.shift()
    })
}
exports.fetchSpecArt = (iD)=>{
    return db.query(`
    SELECT 
    articles.*,
    COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    ORDER BY created_at DESC;` , [iD]).then(({rows})=>{
        if(rows.length < 1) return Promise.reject({status:404 ,msg:'Article does not exist'})
        return rows.shift()
    })
}

exports.fetchAllArt = (topic,sort_by = 'created_at',order = 'DESC', page=1, limit=10)=>{
    const startIndex = parseInt((page-1) * limit)
    const endIndex = parseInt(page * limit)
    if(topic)
    {return db.query(`SELECT slug FROM topics`).then(({rows})=>{
        if(rows.some((row)=>{
            return topic === row.slug
        })){
            return db.query(
            `SELECT 
            articles.article_id,
            articles.author,
            articles.title,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
            COUNT(comments.article_id) AS comment_count
            FROM articles
            LEFT JOIN comments 
            ON articles.article_id = comments.article_id 
            WHERE articles.topic = $1
            GROUP BY articles.article_id
            ORDER BY ${sort_by} ${order};`,[topic]
            ).then(({rows})=>{
                return rows.slice(startIndex,endIndex)
            })
        }else{
            return Promise.reject({status:404 ,msg:'Topic not found'})
        }
    })}
    else{
        return db.query(
            `SELECT 
            articles.article_id,
            articles.author,
            articles.title,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
            COUNT(comments.article_id) AS comment_count
            FROM articles
            LEFT JOIN comments 
            ON articles.article_id = comments.article_id 
            GROUP BY articles.article_id
            ORDER BY ${sort_by} ${order};`
            ).then(({rows})=>{
                return rows.slice(startIndex,endIndex)
            })
    }
}

exports.fetchAllComs = (article_id,page=1,limit=10)=>{
    const startIndex = parseInt((page-1) * limit)
    const endIndex = parseInt(page * limit)
        return db.query(`
        SELECT * FROM comments 
        WHERE article_id = $1
        ORDER BY created_at`,[article_id]).then(({rows})=>{
            if(rows.length < 1) {
                return db.query(`
                SELECT * FROM articles
                WHERE article_id = $1`,[article_id]).then(({rows})=>{
                    if(!rows.length < 1) return Promise.reject({status:200, msg:`No comments for article ${article_id}`})
                    else return Promise.reject({status:404 ,msg:'Article does not exist'})
                })
                
            }
            return rows.slice(startIndex,endIndex)
        })
}

exports.insertComment = (article_id,{userName,body})=>{
    const created_at=new Date()
    const votes = 0
    if(typeof userName !=="string"||typeof body!=="string") return Promise.reject({status:400 ,msg:'Bad request'})
        return db.query(`
        INSERT INTO comments
        (article_id, author,body,created_at,votes) 
        VALUES 
        ($1,$2,$3,$4,$5) 
        RETURNING *`,
        [article_id,userName,body,created_at,votes])
        .then(({rows})=>{
            return rows.shift()
        })
}

exports.updateArticle = (article_id,newVotes)=>{
    if(typeof newVotes.inc_votes !== "number") return Promise.reject({status:400 ,msg:'Bad request'})
        return db.query(`
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *`,
        [newVotes.inc_votes,article_id])
        .then(({rows})=>{
            if(rows.length < 1) return Promise.reject({status:404 ,msg:'Article does not exist'})
            return rows.shift()
        })
    
}
exports.updateComment = (comment_id,newVotes)=>{
    if(typeof newVotes.inc_votes !== "number") return Promise.reject({status:400 ,msg:'Bad request'})
        return db.query(`
        UPDATE comments
        SET votes = votes + $1
        WHERE comment_id = $2
        RETURNING *`,
        [newVotes.inc_votes,comment_id])
        .then(({rows})=>{
            if(rows.length < 1) return Promise.reject({status:404 ,msg:'Article does not exist'})
            return rows.shift()
        })
    
}

exports.removeComment = (iD)=>{
    return db.query(`
        SELECT * 
        FROM comments
        WHERE comment_id = $1`,[iD])
        .then(({rows})=>{ 
        if(rows.length < 1) return Promise.reject({status:404 ,msg:'Comment does not exist'})
        else{                        
        return db.query(`
        DELETE FROM comments
        WHERE comment_id = $1`,
        [iD])}
        })
}

exports.insertArticle = ({author,title,topic,body,article_img_url})=>{
const created_at=new Date()
const votes = 0
    if(typeof author !=='string'|| typeof title !=='string'||typeof body !=='string'|| typeof article_img_url !=='string') return Promise.reject({status:400 ,msg:'Bad request'})
    return db.query(`
    INSERT INTO articles
    (author, title, topic, body, article_img_url, created_at, votes)
    VALUES
    ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
    [author,title,topic,body,article_img_url,created_at,votes])
    .then(({rows})=>{
        return rows.shift()
    })
}
