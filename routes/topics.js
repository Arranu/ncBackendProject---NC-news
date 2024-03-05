const topRouter = require('express').Router();
const {getTopics, postTopic} = require('../controllers/controller')
topRouter
.route('/')
//get all topics
.get(getTopics)
//post new topics
.post(postTopic)
module.exports = topRouter