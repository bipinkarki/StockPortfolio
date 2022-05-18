import React from 'react';

import Form from '../components/Form/Form';

const StockPage = prop => {
  return (
    <React.Fragment>
      <h2 className="secondary-heading">Please fill all stock details below</h2>
      <Form />
    </React.Fragment>
  );
};

export default StockPage;
