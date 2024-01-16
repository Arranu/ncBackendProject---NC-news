const {topicsMod, specArtMod} = require("../models/model")
const apiFile = require("../endpoints.json")
exports.topicsCont = (req,res)=>{    
    topicsMod().then((result)=>{
        res.status(200).send({topics:result})
    
    })
}
exports.apiCont = (req,res)=>{
    res.status(200).send({endpoints:apiFile})
}

exports.specArtCont = (req,res,next) =>{
const iD = req.params.article_id
    specArtMod(iD).then((result)=>{
        res.status(200).send({article:result})
    }).catch(next)
}
