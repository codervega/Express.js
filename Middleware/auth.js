app.use('/admin/:userId/:password',(req,res,next)=>{
  console.log("the request is made from ",req.url);
  let password = req.params.password;
  let userId = req.params.userId;
  if((password = "Abhi@8970") && (userId = "Abhishek"))
  {
    next();
  }
  else{
    req.status(401).send("credentials not matched")
  }
})