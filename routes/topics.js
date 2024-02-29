const topRouter = require('express').Router();
const {getTopics} = require('../controllers/controller')
//get all topics
topRouter.get('/', getTopics)

module.exports = topRouter