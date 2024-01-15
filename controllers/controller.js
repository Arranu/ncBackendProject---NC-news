const {topicsMod} = require("../models/model")
exports.topicsCont = (req,res,next)=>{    
topicsMod().then((result)=>{
    res.status(200).send({topics:result})
    
})
}
