
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/StockPortfolio', {
   
}).then( () => console.log("connection successful..."))
.catch( (error) => console.log(error.message));