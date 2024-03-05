const comRouter = require('express').Router();
const {patchVote,deleteEntity} =require('../controllers/controller')

comRouter
.route('/:comment_id')
//patch votes on existing comment
.patch(patchVote)
//delete comment associated with article_id
.delete(deleteEntity)

module.exports = comRouter