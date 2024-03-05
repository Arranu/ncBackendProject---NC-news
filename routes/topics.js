const topRouter = require('express').Router();
const {getTopics, postTopic} = require('../controllers/controller')
//get all topics
topRouter.get('/', getTopics)
//post new topics
topRouter.post('/', postTopic)
module.exports = topRouter