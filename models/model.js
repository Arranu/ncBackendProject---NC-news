const { promises } = require("supertest/lib/test")
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
        console.log(rows)
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

exports.fetchAllArt = (topic)=>{
    return db.query(`SELECT slug FROM topics`).then(({rows})=>{
        if(rows.some((row)=>{
            return topic === row.slug
        })||topic ===undefined)
        {if(topic === undefined){
            return db.query(`
            SELECT 
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
            ORDER BY created_at DESC;`).then(({rows})=>{
                    return rows
                })  
        }else{
            return db.query(`
            SELECT 
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
            ORDER BY created_at DESC;`, [topic]).then(({rows})=>{
                    return rows
                })

        }}
        else{
            return Promise.reject({status:404,msg:'Topic not found'})
        }
    })
    }
        



exports.fetchAllComs = (iD)=>{
        return db.query(`SELECT * FROM comments 
        WHERE article_id = $1 ORDER BY created_at`,[iD]).then(({rows})=>{
            if(rows.length < 1) {
                return db.query(`SELECT * FROM articles WHERE article_id = $1`,[iD]).then(({rows})=>{
                    if(!rows.length < 1) return Promise.reject({status:200, msg:`No comments for article ${iD}`})
                    else return Promise.reject({status:404 ,msg:'Article does not exist'})
                })
                
            }
            return rows
        })
}

exports.insertComment = (article_id,{userName,body},created_at=new Date(),votes = 0)=>{
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
    return db.query(`SELECT * FROM comments
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
