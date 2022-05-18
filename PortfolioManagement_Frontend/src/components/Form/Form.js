import React, { useState, useEffect } from 'react';

import classes from './Form.module.css';

const axios = require('axios');
const postURL = 'http://localhost:90/insert/stock';

const Form = props => {
  const [selectedTransactionType, setSelectedTransactionType] = useState('buy');
  const [enteredStock, setEnteredStock] = useState('Siddhartha Bank Limited');
  const [enteredQuantity, setEnteredQuantity] = useState('');
  const [enteredPrice, setEnteredPrice] = useState('');
  const [stockNames, setStockNames] = useState([]);

  useEffect(() => {
    if (selectedTransactionType === 'sell') {
      axios
        .get('http://localhost:90/stockname/user/sellChange')
        .then(res => {
          console.log(res);
          console.log(res.data);
          const filteredStockNames = [];

          res.data.map(stock => {
            return filteredStockNames.push(stock.StockName);
          });

          console.log(filteredStockNames);
          const uniqueNames = new Set(filteredStockNames);
          const uniqueNamesArr = Array.from(uniqueNames);

          const objNamesArr = uniqueNamesArr.map(name => {
            return { Name: name };
          });

          setStockNames(objNamesArr);
        })
        .catch(err => console.log(err));
    } else {
      axios
        .get('http://localhost:90/stockname/showall')
        .then(res => {
          console.log(res);
          setStockNames(res.data);
        })
        .catch(err => console.log(err));
    }

    return () => {
      setStockNames([]);
    };
  }, [selectedTransactionType]);

  const transactionTypeChangeHandler = e => {
    setSelectedTransactionType(e.target.value);
  };

  const stockChangeHandler = e => {
    setEnteredStock(e.target.value);
  };
  const quantityChangeHandler = e => {
    setEnteredQuantity(e.target.value);
  };
  const priceChangeHandler = e => {
    setEnteredPrice(e.target.value);
  };

  //post stock
  const stockFormSubmitHandler = e => {
    e.preventDefault();
    axios
      .post(postURL, {
        StockName: enteredStock,
        TransactionType: selectedTransactionType,
        Quantity: +enteredQuantity,
        Amount: +enteredPrice,
        TransactionDate: new Date(),
      })
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    setEnteredPrice('');
    setEnteredQuantity('');
    setSelectedTransactionType('buy');
    setEnteredStock();
  };

  console.log(stockNames);
  console.log(stockNames.length);

  return (
    <div className="container">
      <form onSubmit={stockFormSubmitHandler}>
        <div className={classes['form-control']}>
          <label htmlFor="transaction">Select Transaction Type: </label>
          <select onChange={transactionTypeChangeHandler} id="transaction">
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div className={classes['form-control']}>
          <label htmlFor="stock">Select Stock Name: </label>
          <select onChange={stockChangeHandler} id="stock">
            {stockNames.map((stock, i) => {
              if (i === 0)
                return (
                  <option key={i} value={stock.Name}>
                    {stock.Name}
                  </option>
                );
              return (
                <option key={i} value={stock.Name}>
                  {stock.Name}
                </option>
              );
            })}
          </select>
        </div>

        <div className={classes['form-control']}>
          <label htmlFor="quantity">Enter Stock Quantity (Units): </label>
          <input
            onChange={quantityChangeHandler}
            id="quantity"
            type="number"
            min="1"
            value={enteredQuantity}
          />
        </div>

        <div className={classes['form-control']}>
          <label id="price">Enter Proposed Stock Price: </label>
          <input
            onChange={priceChangeHandler}
            id="price"
            type="number"
            min="1"
            value={enteredPrice}
          />
        </div>

        <button className={classes['form-action']} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
