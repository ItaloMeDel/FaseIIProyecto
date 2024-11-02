import React from 'react';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';

const Orders = () => {
  return (
    <div>
      <h1>Orders</h1>
      <OrderForm />
      <OrderList />
    </div>
  );
};

export default Orders;
