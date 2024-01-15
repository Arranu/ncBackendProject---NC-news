const db = require("../db/connection")

exports.topicsMod = () => {
    let query = `SELECT * FROM topics;`
    return db.query(query).then(({rows})=>{
        return rows
    })
}

exports.specArtMod = (iD)=>{
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [iD]).then(({rows})=>{
        if(rows.length < 1) return Promise.reject({status:404 ,msg:'article does not exist'})
        return rows.shift()
    })
}

