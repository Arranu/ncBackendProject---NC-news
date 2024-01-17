const express = require("express")
const app = express()
const {getTopics,getApi,getSpecArt,getAllArt,getAllComs,postComment,patchArticle,deleteComment} = require("./controllers/controller")
const {notFoundEndpoint,customError,invalidError,internalError, unprocessError} = require("./error-handling/error-handlers")
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

//patch votes on existing article
app.patch("/api/articles/:article_id",patchArticle)

//delete comment associated with article_id
app.delete("/api/comments/:comment_id",deleteComment )

app.all("/*", notFoundEndpoint)
app.use(unprocessError)
app.use(invalidError)
app.use(customError)
app.use(internalError)
module.exports = app