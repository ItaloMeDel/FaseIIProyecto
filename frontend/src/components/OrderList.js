import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders'); 
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <ul>
      {orders.map(order => (
        <li key={order.order_id}>{`Order ID: ${order.order_id}, User ID: ${order.user_id}, Status: ${order.status}`}</li>
      ))}
    </ul>
  );
};

export default OrderList;
