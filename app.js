const express = require("express")
const app = express()
const {topicsCont, apiCont} = require("./controllers/controller")
const {notFoundInput} = require("./error-handling/error-handlers")
//get all topics
app.get("/api/topics", topicsCont)

//get all endpoints
app.get("/api", apiCont)

app.all("/*", notFoundInput)
module.exports = app