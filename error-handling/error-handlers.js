exports.notFoundEndpoint = (req,res)=>{
    res.status(404).send({msg:"Invalid input/endpoint not found"})
}

exports.customError = (err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send({ msg: err.msg });
    } else next(err);
  };

exports.invalidError = (err,req,res,next) =>{
  if(err.code ==="22P02"|| err.code === "42703"){
    console.log(err)
    res.status(400).send({msg: 'Bad request'})
  } else next(err)
}
exports.internalError = (err,req,res,next)=>{
  console.log(err)
  res.status(500).send({msg:'Internal error'})
}
exports.forbiddenError = (err,req,res,next)=>{
  if(err.code === "23503"){
    console.log(err)
    res.status(403).send({msg: 'Forbidden - possible table constraint violation, check constraints of target table'})
  }else next(err)
}