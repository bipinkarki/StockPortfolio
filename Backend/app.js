const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db");
const cors = require("cors");
const Stockname_route = require("./routes/stockname_route");
const Stock = require("./routes/stock_route");

// const { static } = require('express');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(Stockname_route);
app.use(Stock);

app.listen(90);
