const db = require("../db/connection")


exports.fetchTopics = () => {
    return db.query(`SELECT * FROM topics;`).then(({rows})=>{
        return rows
    })
}

exports.fetchSpecArt = (iD)=>{
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [iD]).then(({rows})=>{
        if(rows.length < 1) return Promise.reject({status:404 ,msg:'article does not exist'})
        return rows.shift()
    })
}

exports.fetchAllArt = ()=>{
    let artQuery = 
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
    ORDER BY articles.created_at DESC`


    return artPromise = db.query(artQuery).then(({rows})=>{
        return rows
    })
  
}
