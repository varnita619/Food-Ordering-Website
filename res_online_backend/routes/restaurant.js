var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

/* GET home page. */
router.post("/addnewrestaurant", upload.any(), function (req, res, next) {
  console.log(req.files);
  pool.query(
    "insert into restaurant(restaurant_name, owner_name, address, state, city, zipcode, location, emailaddress, type, mobilenumber, idproof, idproofimage, shopact, shopactimage, fssai, fssaiimage, gst, status, logo, password) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.restaurant_name,
      req.body.owner_name,
      req.body.address,
      req.body.state,
      req.body.city,
      req.body.zipcode,
      req.body.location,
      req.body.emailaddress,
      req.body.type,
      req.body.mobilenumber,
      req.body.id,
      req.files[0].originalname,
      req.body.shopact,
      req.files[1].originalname,
      req.body.fssai,
      req.files[2].originalname,
      req.body.gst,
      req.body.status,
      req.files[3].originalname,
      req.body.password,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post(
  "/updateShopActImage",
  upload.single("shopactimage"),
  function (req, res) {
    pool.query(
      "update restaurant set shopactimage=? where restaurant_id=?",
      [req.file.originalname, req.body.restaurantid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ result: false });
        } else {
          res.status(200).json({ result: true });
        }
      }
    );
  }
);

router.post("/deleterestaurant", function (req, res) {
  pool.query(
    "delete from restaurant  where restaurant_id=?",
    [req.body.restaurantid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post("/editrestaurant", function (req, res, next) {
  console.log(req.files);
  pool.query(
    "update restaurant set restaurant_name=?, owner_name=?, address=?, state=?, city=?, zipcode=?, location=?, emailaddress=?, type=?, mobilenumber=?, idproof=?,  shopact=?, fssai=?,  gst=?, status=? where restaurant_id=?",
    [
      req.body.restaurant_name,
      req.body.owner_name,
      req.body.address,
      req.body.state,
      req.body.city,
      req.body.zipcode,
      req.body.location,
      req.body.emailaddress,
      req.body.type,
      req.body.mobilenumber,
      req.body.id,
      req.body.shopact,
      req.body.fssai,
      req.body.gst,
      req.body.status,
      req.body.restaurant_id,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.get("/listrestaurant", function (req, res) {
  pool.query(
    "select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R",
    function (error, result) {
      if (error) {
        res.status(500).json([]);
      } else {
        res.status(200).json(result);
      }
    }
  );
});
router.post("/chklogin", function (req, res, next) {
  pool.query(
    "select * from restaurant where (emailaddress=? or mobilenumber=?) and password=?",
    [req.body.emailid, req.body.emailid, req.body.password],
    function (error, result) {
      if (error) {
        res.status(500).json({ result: false, data: [] });
      } else {
        if (result.length == 1)
          res.status(200).json({ result: true, data: result[0] });
        else res.status(200).json({ result: false, data: [] });
      }
    }
  );
});

router.post("/restaurantbyid", function (req, res, next) {
  pool.query(
    "select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R where R.restaurant_id=?",
    [req.body.restaurant_id],
    function (error,result) {
      if (error) {
        console.log(error);
        res.status(500).json([]);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

module.exports = router;
