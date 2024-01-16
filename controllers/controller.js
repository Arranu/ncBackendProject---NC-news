const {fetchAllArt,fetchSpecArt,fetchTopics} = require("../models/model")
const apiFile = require("../endpoints.json")
exports.getTopics = (req,res)=>{    
    fetchTopics().then((result)=>{
        res.status(200).send({topics:result})
    
    })
}
exports.getApi = (req,res)=>{
    res.status(200).send({endpoints:apiFile})
}

exports.getSpecArt = (req,res,next) =>{
const iD = req.params.article_id
    fetchSpecArt(iD).then((result)=>{
        res.status(200).send({article:result})
    }).catch(next)
}

exports.getAllArt = (req,res,next)=>{
    fetchAllArt().then((result)=>{
        res.status(200).send({articles:result})
    }).catch(next)
}
