const artRouter = require('express').Router();
const {getAllArt,getSpecArt,getAllComs,patchVote,postComment} = require('../controllers/controller')

//get all articles
artRouter.get('/',getAllArt)

//get specific article
artRouter.get('/:article_id',getSpecArt)

//get all comments for specific article
artRouter.get('/:article_id/comments', getAllComs)

//post new comment
artRouter.post('/:article_id/comments',postComment)

//patch votes on existing article
artRouter.patch('/:article_id',patchVote)

module.exports = artRouter