const artRouter = require('express').Router();
const {getAllArt,getSpecArt,getAllComs,patchVote,postComment, postArticle} = require('../controllers/controller')

//get all articles
artRouter.get('/',getAllArt)

//post a new article
artRouter.post('/',postArticle)

//get specific article
artRouter.get('/:article_id',getSpecArt)

//get all comments for specific article
artRouter.get('/:article_id/comments', getAllComs)

//post new comment on specific article
artRouter.post('/:article_id/comments',postComment)

//patch votes on existing article
artRouter.patch('/:article_id',patchVote)


module.exports = artRouter