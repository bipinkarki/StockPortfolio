const express = require("express");
const router = express.Router();
const StockName = require("../models/stockname_model");
const Stock = require("../models/stock");

router.get("/getName", (req, res) => {
  const id = req.body.id;

  StockName.findOne({ _id: id })
    .then(function (data) {
      if (!data.name) res.json({ message: "No data found" });
      console.log(data.name);
      res.status(200).json(data.Name);
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

router.post("/add/stockname", function (req, res) {
  const Name = req.body.Name;

  if (req == undefined) {
    res.status(401).json({ success: false, message: "Invalid Request" });
  } else {
    const stockname = new StockName({ Name: Name });
    stockname
      .save()

      .then(function (result) {
        res.status(200).json({
          success: true,
          data: result,
        });
      })
      .catch(function (err) {
        res.status(500).json({
          error: err,
        });
      });
  }
});

//Display all
router.get("/stockname/showall", function (req, res) {
  StockName.find()
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

router.get("/stockname/user/sellChange", (req, res) => {
  Stock.find({}, "StockName", function (err, data) {
    res.json(data);
  });
});

module.exports = router;
