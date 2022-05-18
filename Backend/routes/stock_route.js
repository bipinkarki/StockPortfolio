const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");

router.post("/insert/stock", function (req, res) {
  const StockName = req.body.StockName;
  const TransactionType = req.body.TransactionType;
  const Quantity = req.body.Quantity;
  const Amount = req.body.Amount;
  const TransactionDate = req.body.TransactionDate;

  console.log(req);

  if (req == undefined) {
    res.status(401).json({ success: false, message: "Invalid Request" });
  } else {
    const stock = new Stock({
      StockName: StockName,
      TransactionType: TransactionType,
      Quantity: Quantity,
      Amount: Amount,
      TransactionDate: TransactionDate,
    });

    stock
      .save()
      .then(function (result) {
        res.status(200).json({
          success: true,
          data: result,
        });
      })
      .catch(function (err) {
        res.status(500).json({
          error: err.message,
        });
      });
  }
});

//Update code
router.put("/update/stock/:id", function (req, res) {
  const id = req.params.id;
  const StockName = req.body.StockName;
  const TransactionType = req.body.TransactionType;
  const Quantity = req.body.Quantity;
  const Amount = req.body.Amount;
  const TransactionDate = req.body.TransactionDate;

  if (req == undefined) {
    res.status(401).json({ success: false, message: "Invalid Request" });
  } else {
    Stock.updateMany(
      { _id: id },
      {
        StockName: StockName,
        TransactionType: TransactionType,
        Quantity: Quantity,
        Amount: Amount,
        TransactionDate: TransactionDate,
      }
    )
      .then(function (result) {
        console.log(result);
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

//Delete stock

router.delete("/delete/stock/:id", function (req, res) {
  const id = req.params.id;
  Stock.deleteOne({ _id: id }).then(function () {
    res.status(200).json({
      success: true,
    });
  });
});

// Display all stock
router.get("/stock/showall", function (req, res) {
  Stock.find()
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

module.exports = router;
