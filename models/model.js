const db = require("../db/connection")
exports.topicsMod = ()=>{
    let query = `SELECT * FROM topics;`
    return db.query(query).then(({rows})=>{
        return rows
    })
}