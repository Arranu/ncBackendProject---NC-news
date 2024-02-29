const userRouter = require('express').Router();
const {getSpecUser,getUsers} = require('../controllers/controller')
//get all users
userRouter.get('/',getUsers)

//get specific user
userRouter.get('/:username',getSpecUser)

module.exports = userRouter