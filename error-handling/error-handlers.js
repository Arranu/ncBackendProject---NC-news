exports.notFoundInput = (req,res)=>{
    res.status(404).send({msg:"Invalid input/endpoint not found"})
}

