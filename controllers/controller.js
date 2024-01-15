const {topicsMod} = require("../models/model")
const apiFile = require("../endpoints.json")
exports.topicsCont = (req,res,next)=>{    
topicsMod().then((result)=>{
    res.status(200).send({topics:result})
    
})
}
exports.apiCont = (req,res)=>{

    res.status(200).send({endpoints:apiFile})
}
