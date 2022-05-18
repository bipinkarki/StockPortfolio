import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './Navigation';
import StockPage from '../../pages/stockPage';
import Dashboard from '../../pages/dashboardPage';

import classes from './Header.module.css';

const Header = props => {
  return (
    <Router>
      <header className={classes.header}>
        <Navigation />
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/stock" element={<StockPage />}></Route>
      </Routes>
    </Router>
  );
};

export default Header;
