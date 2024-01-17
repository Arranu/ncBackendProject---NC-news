const {fetchAllArt,fetchSpecArt,fetchTopics,fetchAllComs,insertComment,updateArticle} = require("../models/model")
const apiFile = require("../endpoints.json")
exports.getTopics = (req,res,next)=>{    
    fetchTopics().then((result)=>{
        res.status(200).send({topics:result})
    }).catch(next)
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

exports.getAllComs = (req,res,next)=>{
const iD = req.params.article_id
    fetchAllComs(iD).then((result)=>{
        res.status(200).send({comments:result})
    }).catch(next)
}

exports.postComment = (req,res,next)=>{
const iD = req.params.article_id
const newComment = req.body
    insertComment(iD,newComment).then((newPost)=>{
        res.status(201).send({newPost})
    }).catch(next)
}

exports.patchArticle = (req,res,next)=>{
const iD = req.params.article_id
const newVotes = req.body
console.log(newVotes,"<-newVotes")
    updateArticle(iD,newVotes).then((updatedArt)=>[
        res.status(200).send({updatedArt})
    ])
}
