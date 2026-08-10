import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import { orderApi, paymentApi } from './services/api';

function CheckoutView({ cart, clearCart }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");
    setIsProcessing(true);

    try {
      // 1. Create order in order-service (Port 8083)
      const orderRes = await orderApi.post('/orders', {
        items: cart,
        totalPrice: totalAmount,
        status: 'PENDING'
      });
      const orderId = orderRes.data.id;

      // 2. Process payment in payment-service (Port 8084)
      const paymentRes = await paymentApi.post('/payments/process', {
        orderId: orderId,
        amount: totalAmount
      });

      if (paymentRes.data.status === 'SUCCESS') {
        alert(`Payment successful! Transaction ID: ${paymentRes.data.transactionId}`);
        clearCart();
        navigate('/shop');
      }
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Checkout or payment failed. Please check your services.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8 md:p-12 text-zinc-900">
      <div className="max-w-2xl mx-auto bg-white border border-zinc-200 p-8">
        <h1 className="text-2xl font-light mb-6">Order Summary</h1>
        {cart.length === 0 ? (
          <p className="text-zinc-500 text-sm">No items in cart.</p>
        ) : (
          <div className="space-y-4 mb-8">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between text-sm border-b border-zinc-100 pb-3">
                <span>{item.name} (x{item.quantity || 1})</span>
                <span className="font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-lg font-medium pt-4">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}
        <div className="flex gap-4">
          <Link to="/shop" className="w-1/2 text-center border border-zinc-300 py-3 text-sm hover:bg-zinc-50 transition-colors">
            Continue Shopping
          </Link>
          <button
            onClick={handleCheckout}
            disabled={isProcessing || cart.length === 0}
            className="w-1/2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm py-3 transition-colors cursor-pointer disabled:opacity-50 text-center"
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`Added ${product.name} to cart!`);
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="/checkout" element={<CheckoutView cart={cart} clearCart={clearCart} />} />
      </Routes>
    </Router>
  );
}