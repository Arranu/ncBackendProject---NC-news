const express = require("express")
const app = express()
const {getTopics,getApi,getSpecArt,getAllArt,getAllComs,postComment} = require("./controllers/controller")
const {notFoundEndpoint,customError,invalidError,internalError, forbiddenError} = require("./error-handling/error-handlers")
app.use(express.json())
//get all topics
app.get("/api/topics", getTopics)

//get all endpoints
app.get("/api", getApi)

//get specific article
app.get("/api/articles/:article_id",getSpecArt)

//get all articles
app.get("/api/articles",getAllArt)

//get all comments for specific article
app.get("/api/articles/:article_id/comments", getAllComs)

//post new comment
app.post("/api/articles/:article_id/comments",postComment)

app.all("/*", notFoundEndpoint)
app.use(forbiddenError)
app.use(customError)
app.use(invalidError)
app.use(internalError)
module.exports = app