const artRouter = require('express').Router();
const {getAllArt,getSpecArt,
        getAllComs,patchVote,
        postComment, postArticle,
        deleteEntity} = require('../controllers/controller')

//get all articles
artRouter.get('/',getAllArt)

//post a new article
artRouter.post('/',postArticle)

//get specific article
artRouter.get('/:article_id',getSpecArt)

//patch votes on existing article
artRouter.patch('/:article_id',patchVote)

//delete an article
artRouter.delete('/:article_id',deleteEntity)

//get all comments for specific article
artRouter.get('/:article_id/comments', getAllComs)

//post new comment on specific article
artRouter.post('/:article_id/comments',postComment)



module.exports = artRouter