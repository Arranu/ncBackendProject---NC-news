const artRouter = require('express').Router();
const {getAllArt,getSpecArt,
        getAllComs,patchVote,
        postComment, postArticle,
        deleteEntity} = require('../controllers/controller')

artRouter
.route('/')
//get all articles
.get(getAllArt)
//post a new article
.post(postArticle)

artRouter
.route('/:article_id')
//get specific article
.get(getSpecArt)
//patch votes on existing article
.patch(patchVote)
//delete an article
.delete(deleteEntity)

artRouter
.route('/:article_id/comments')
//get all comments for specific article
.get(getAllComs)
//post new comment on specific article
.post(postComment)



module.exports = artRouter