import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrder = { user_id: userId, status };
    await axios.post('/api/orders', newOrder); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} required />
      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;
