var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.get("/fetchfooditems", function (req, res) {
  //pool.query("select * from fooditems",function(error,result)
  pool.query(
    "select R.*,(select S.foodtype from foodtypes S where S.foodtype_id=R.foodtype_id) as foodtype from fooditems R",
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json([]);
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    }
  );
});

router.post(
  "/addnewfooditem",
  upload.single("foodimage"),
  function (req, res, next) {
    console.log(req.body);
    pool.query(
      "insert into fooditems(restaurant_id, foodtype_id, fooditem, price, offer, offertype, fooditemtype, ingredients, ratings, fooditemimage)values(?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.restaurantid,
        req.body.foodtypeid,
        req.body.fooditem,
        req.body.price,
        req.body.offer,
        req.body.offertype,
        req.body.foodtype,
        req.body.foodingredients,
        req.body.ratings,
        req.file.originalname,
      ],
      function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).json({ result: false });
        } else {
          res.status(200).json({ result: true });
        }
      }
    );
  }
);

router.post("/editfooditems", function (req, res, next) {
  pool.query(
    "update fooditems set foodtype_id=?, fooditem=?, price=?, offer=?, offertype=?, fooditemtype=?, ingredients=?, ratings=? where restaurant_id=? and fooditem_id=? ",
    [
      req.body.foodtypeid,
      req.body.fooditem,
      req.body.price,
      req.body.offer,
      req.body.offertype,
      req.body.foodtype,
      req.body.foodingredients,
      req.body.ratings,
      req.body.restaurantid,
      req.body.fooditemid,
    ],
    function (err, result) {
      if (err) {
        console.log(req.body);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});





router.get("/listfooditems", function (req, res) {
  pool.query(
    "select F.*,(select ft.food_type from foodtypes ft where ft.food_typeid=F.foodtype_id)as food_type,(select fi.food_itemname from fitems fi where fi.food_itemid=F.fooditem)as food_itemname from fooditems F",
    function (err, result) {
      // pool.query("select * from fooditems",function(err,result){
      if (err) {
        res.status(500).json([]);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

router.post(
  "/editfooditemimage",
  upload.single("foodimage"),
  function (req, res) {
    pool.query(
      "update fooditems set fooditemimage=? where restaurant_id=? and fooditem_id=?",
      [req.file.originalname, req.body.restaurantid, req.body.fooditem],
      function (err, result) {
        if (err) {
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);

router.post("/deletefooditem", function (req, res) {
  pool.query(
    "delete from fooditems where restaurant_id=? and fooditem_id=?",
    [req.body.restaurantid, req.body.fooditemid],
    function (err, result) {
      if (err) {
        console.log(req.body);
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

router.post("/listfooditemsbyfoodtype", function (req, res) {
  pool.query(
    "select * from fooditems where foodtype_id=?",[req.body.foodtype_id],
    function (err, result) {
    
      if (err) {
        res.status(500).json([]);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

router.post("/listfooditemsoffer", function (req, res) {
  pool.query(
    "select * from fooditems where restaurant_id=? and offer>0",[req.body.restaurant_id],
    function (err, result) {
    
      if (err) {
        res.status(500).json([]);
      } else {
        res.status(200).json(result);
      }
    }
  );
});






module.exports = router;
