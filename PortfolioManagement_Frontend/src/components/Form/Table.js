import axios from 'axios';
import React, { useState, useEffect } from 'react';

import classes from './Table.module.css';

const Table = props => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:90/stock/showall')
      .then(res => {
        console.log(res.data);
        setStockData(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return stockData.length === 0 ? (
    <p className={classes['user-message']}>No Data Found 😞</p>
  ) : (
    <div className="table-container">
      <table className={classes['table']}>
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Transaction Type</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Total Amount</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {stockData.length !== 0 &&
            stockData.map((stock, i) => {
              return (
                <tr key={i}>
                  <td>{stock.StockName}</td>
                  <td>{stock.TransactionType}</td>
                  <td>{stock.Quantity}</td>
                  <td>{stock.Amount}</td>
                  <td>{+stock.Quantity * +stock.Amount}</td>
                  <td>
                    {new Intl.DateTimeFormat('en-US', {
                      dateStyle: 'full',
                    }).format(new Date(stock.TransactionDate))}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
