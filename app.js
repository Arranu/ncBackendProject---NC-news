const express = require("express")
const app = express()
const {topicsCont} = require("./controllers/controller")
const {notFoundInput} = require("./error-handling/error-handlers")
//get all topics
app.get("/api/topics", topicsCont)

app.all("/*", notFoundInput)
module.exports = app