var express = require('express'); 
const pool = require('./pool');
var router = express.Router();

/* GET home page. */
router.post('/generateorder', function(req, res, next) {
  pool.query("insert into ordergeneration (orderdate,ordertime,mobileno,emailid,totalamount)values(?,?,?,?,?)",[req.body.orderdate,req.body.ordertime,req.body.mobileno,req.body.emailid,req.body.totalamt],function(error,result){
   if(error)
   {  console.log(error)
       res.status(500).json({result:false})}
  else
  {  
    
    res.status(200).json({result:true,orderid:result.insertId})
  }

  })



});

router.post('/submitorder', function(req, res, next) {
    console.log(req.body)
    q =
    "insert into orders(orderid, orderdate, ordertime, mobileno, emailid,fooditem, qtydemand, price, offer,amount, deliverystatus, paymentstatus,paymentmode,restaurant_id, deliverat,fooditem_id,totalamount) values ?";
  
    pool.query(
    q,
    [
      req.body.cart.map((item) => [
        req.body.orderid,
        req.body.orderdate,
        req.body.ordertime,
        req.body.mobileno,
        req.body.emailid,
        item.fooditem_id,
        item.qtydemand,
        item.price,
        item.offer,
        item.amount,
        req.body.deliverystatus,
        req.body.paymentstatus,
        req.body.paymentmode,
        
        req.body.restaurantid,
        req.body.deliverat,
        item.fooditem_id,
        req.body.totalamt
      ]),
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: true });
      }
    }
  );



  });

  router.get("/listorders", function (req, res) {
    console.log(req.body)
    pool.query("select * from ordergeneration",function (err, result) {
      if (err) {
        console.log(err)
        res.status(500).json([]);
      } else {
        console.log(err);
        res.status(200).json(result);
      }
    });
  });

  router.post("/listordersdata", function (req, res) {
    console.log(req.body)

    pool.query("select * from orders where orderid=?",
    [req.body.orderid],
    function (err, result) {
      if (err) {
        console.log(err)
        res.status(500).json([]);
      } else {
        console.log(err)
        res.status(200).json(result);
      }
    });
  });
  




module.exports = router;
