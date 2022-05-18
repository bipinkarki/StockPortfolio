import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import classes from './Navigation.module.css';

const Navigation = props => {
  const location = useLocation();
  const [splitPathName, setSplitPathName] = useState('');

  const { pathname } = location;

  useEffect(() => {
    setSplitPathName(pathname.split('/')[1]);
  }, [splitPathName, pathname]);

  return (
    <nav className={classes.navigation}>
      <h1>StockManagement</h1>
      <ul>
        <li>
          <Link
            className={`${
              splitPathName === '' ? classes['navigation-link--active'] : ''
            } ${classes['navigation-link']}`}
            to="/"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className={`${
              splitPathName === 'stock'
                ? classes['navigation-link--active']
                : ''
            } ${classes['navigation-link']}`}
            to="/stock"
          >
            Stocks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
