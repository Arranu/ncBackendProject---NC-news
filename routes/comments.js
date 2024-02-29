const comRouter = require('express').Router();
const {patchVote,deleteComment} =require('../controllers/controller')
//patch votes on existing comment
comRouter.patch('/:comment_id',patchVote)

//delete comment associated with article_id
comRouter.delete('/:comment_id',deleteComment)

module.exports = comRouter