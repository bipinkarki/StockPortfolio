const mongoose = require("mongoose");

const Stock = mongoose.model("Stock", {
  StockName: {
    type: String,
    // ref: 'StockName'
  },
  TransactionType: {
    type: String,
  },
  Quantity: {
    type: Number,
  },
  Amount: {
    type: Number,
  },
  TransactionDate: {
    type: Date,
  },
});

module.exports = Stock;
