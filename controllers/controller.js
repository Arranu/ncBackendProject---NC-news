const {fetchAllArt,fetchUsers,fetchSpecArt,fetchTopics,fetchAllComs,insertComment,updateArticle,updateComment,removeComment, fetchSpecUser} = require("../models/model")
const apiFile = require("../endpoints.json")
exports.getTopics = (req,res,next)=>{    
    fetchTopics().then((result)=>{
        res.status(200).send({topics:result})
    }).catch(next)
}

exports.getUsers = (req,res,next)=>{
    fetchUsers().then((result)=>{
        res.status(200).send({users:result})
    }).catch(next)
}
exports.getSpecUser = (req,res,next)=>{
    const user= req.params.username
    fetchSpecUser(user).then((result)=>{
        res.status(200).send({user:result})
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
const {topic,sort_by,order} = req.query
    fetchAllArt(topic,sort_by,order).then((result)=>{
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

exports.patchVote= (req,res,next)=>{
    const aId = req.params.article_id 
    const cId = req.params.comment_id 
    const newVotes = req.body
        if(aId){
        updateArticle(aId,newVotes).then((updatedArt)=>{
            res.status(200).send({updatedArt})
        }).catch(next)
        }else{
        updateComment(cId,newVotes).then((updatedCom)=>{
            res.status(200).send({updatedCom})
        }).catch(next)
    }
}


exports.deleteComment = (req,res,next)=>{
const iD = req.params.comment_id
    removeComment(iD).then(()=>{
        res.status(204).send()
    }).catch(next)
}
