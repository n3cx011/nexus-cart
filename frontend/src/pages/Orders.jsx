import React, { useState, useEffect } from 'react';
import { orderApi } from '../services/api';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const username = localStorage.getItem('username') || 'yasas';

  // Fetch orders on load
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderApi.get('/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await orderApi.post('/orders', {
        username,
        totalPrice: parseFloat(totalPrice),
        productIds: [101, 102] // Placeholder product IDs until product-service is ready
      });
      setTotalPrice('');
      fetchOrders(); // Refresh list
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <Link to="/dashboard">&larr; Back to Dashboard</Link>
      <h2>Order Management</h2>

      {/* Create Order Form */}
      <form onSubmit={handleCreateOrder} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', width: '300px' }}>
        <h3>Create New Order</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Total Price ($):</label>
          <input type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} required style={{ width: '100%', padding: '6px' }} />
        </div>
        <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>Submit Order</button>
      </form>

      {/* Orders List Table */}
      <h3>Existing Orders</h3>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Order ID</th>
            <th>Username</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Product IDs</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.username}</td>
              <td>${order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{order.productIds?.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}