const express = require("express")
const app = express()
const {topicsCont, apiCont,specArtCont} = require("./controllers/controller")
const {notFoundEndpoint,customError,invalidError} = require("./error-handling/error-handlers")
app.use(express.json())
//get all topics
app.get("/api/topics", topicsCont)

//get all endpoints
app.get("/api", apiCont)

//get specific article
app.get("/api/articles/:article_id",specArtCont)

app.all("/*", notFoundEndpoint)
app.use(customError)
app.use(invalidError)

module.exports = app