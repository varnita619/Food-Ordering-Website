var express = require('express');
var router = express.Router();
var pool=require('./pool')
/* GET home page. */
router.get('/fetchstates', function(req, res, next) {
pool.query("select * from states",function(err,result){
 if(err)
 {
  res.status(500).json([])

 }
 else
 {
    res.status(200).json(result)

 }
})
});

router.post('/fetchcities', function(req, res, next) {
   pool.query("select * from cities where stateid=?",[req.body.stateid],function(err,result){
    if(err)
    {
     res.status(500).json([])
   
    }
    else
    {
       res.status(200).json(result)
   
    }
   })
   });
   



module.exports = router;
