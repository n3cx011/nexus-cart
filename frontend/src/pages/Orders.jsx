import React, { useState, useEffect } from 'react';
import { orderApi } from '../services/api';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const username = localStorage.getItem('username') || 'yasas';

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
        productIds: [101, 102],
        status: "PENDING"
      });
      setTotalPrice('');
      fetchOrders();
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/dashboard" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-block mb-6">
          &larr; Back to Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit">
            <h3 className="text-lg font-semibold mb-4">Create New Order</h3>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Total Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="0.00"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-emerald-600/20"
              >
                Submit Order
              </button>
            </form>
          </div>

          {/* Orders Table */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Existing Orders</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-sm">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Products</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-slate-500">No orders found.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/30">
                      <td className="py-3.5 text-slate-300 font-mono">#{order.id}</td>
                      <td className="py-3.5 text-slate-300">{order.username}</td>
                      <td className="py-3.5 font-semibold text-emerald-400">${order.totalPrice}</td>
                      <td className="py-3.5">
                        <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-2.5 py-1 rounded-full font-medium">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-400 font-mono text-xs">{order.productIds?.join(', ')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}