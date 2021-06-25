var express = require('express');
const pool = require('./pool');
var router = express.Router();
var jwt = require("jsonwebtoken");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

/* GET home page. */
router.post('/chkadminlogin', function(req, res, next) {
  pool.query("select * from superadmin where emailid=? and password=?",[req.body.emailid,req.body.password],function(error,result){
   if(error)
   { res.status(500).json({result:false})}
  else
  {  if(result.length==1)
    res.status(200).json({result:true})
    else
    res.status(200).json({result:false})
  }

  })

});

router.get('/assignToken',function(req,res,next){
  try{
   var token=jwt.sign({id:100},'thenumericinfosystempvtltdgwali',{expiresIn:'120s'}) 
  console.log(token)
   localStorage.setItem("token",token)
   res.json({access_token:token})
  }
  catch(e)
  {console.log("GET TOKEN:",e)}
  res.json({error:error})
 })

 
 router.get('/readToken',function(req,res,next){
   try { 
     
     var v = jwt.verify(
       localStorage.getItem("token"),
       'thenumericinfosystempvtltdgwali'
     );
     //console.log(req)
     console.log("token", v);
   } catch (e) {
     console.log("Errro", e.message);
   }
 }) 

module.exports = router;
