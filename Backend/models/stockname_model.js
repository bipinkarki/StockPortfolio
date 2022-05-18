const mongoose = require('mongoose');

const StockName = mongoose.model('StockName', {
    Name:{
        type:String
    }
});

module.exports = StockName;