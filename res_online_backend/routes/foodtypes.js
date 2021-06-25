var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/addnewfoodtype", upload.any(), function (req, res, next) {
  pool.query(
    "insert into foodtypes(restaurant_id,foodtype,foodimage,foodtypead,status)values(?,?,?,?,?)",
    [
      req.body.restaurantid,
      req.body.foodtype,
      req.files[0].originalname,
      req.files[1].originalname,
      req.body.status,
    ],
    function (error, result) {
      if (error) {
        console.log(error)
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post("/listfoodtypesbyrestaurant", function (req, res) {

  pool.query("select *from foodtypes where restaurant_id=?",[req.body.restaurant_id],function (err, result) {
    if (err) {
      res.status(500).json([]);
    } else {
      res.status(200).json(result);
    }
  });
});




router.get("/listfoodtypes", function (req, res) {

  pool.query("select *from foodtypes",function (err, result) {
    if (err) {
      res.status(500).json([]);
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/editfoodtype", function (req, res) {
  pool.query(
    "update foodtypes set foodtype=?,status=? where foodtype_id=?",
    [req.body.foodtype, req.body.status, req.body.foodtype_id],
    function (error, result) {
      if (error) {
        console.log(req.body);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post(
  "/editfoodtypeimage",
  upload.single("foodimage"),
  function (req, res, next) {
    pool.query(
      "update foodtypes set foodimage=? where foodtype_id=?",
      [req.file.originalname,req.body.foodtype_id],
      function (err, result) {
        if (err) {
          res.status(500).json({ result: false });
        } else {
          res.status(200).json({ result: true });
        }
      }
    );
  }
);

router.post("/deletefoodtype", function (req, res) {
  pool.query(
    "delete from foodtypes where foodtype_id=?",
    [req.body.foodtype_id],
    function (error, result) {
      if (error) {
        console.log(req.body);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post(
  "/editfoodadimage",
  upload.single("foodtypead"),
  function (req, res, next) {
    pool.query(
      "update foodtypes set foodtypead=? where foodtype_id=?",
      [req.file.originalname, req.body,req.body.foodtype_id],
      function (err, result) {
        if (err) {
          console.log(req.body);
          res.status(500).json({ result: false });
        } else {
          res.status(200).json({ result: true });
        }
      }
    );
  }
);

module.exports = router;
