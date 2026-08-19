import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { orderApi, paymentApi } from '../services/api';

export default function Checkout({ cart, clearCart }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);

    // Get username from localStorage (fallback to 'yasas' if null)
    const username = localStorage.getItem('currentUser') || localStorage.getItem('username') || 'yasas';

    try {
      const orderPayload = {
        userId: username,
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity || 1 })),
        totalAmount: totalAmount
      };

      const orderRes = await orderApi.post('/orders', orderPayload);
      const orderId = orderRes.data?.id || "ORD-" + Math.floor(Math.random() * 10000);

      const paymentPayload = {
        orderId: orderId,
        amount: totalAmount
      };

      const paymentRes = await paymentApi.post('/payments/process', paymentPayload);

      alert(`Payment Successful!\nTransaction ID: ${paymentRes.data?.transactionId || 'TXN-' + Date.now()}`);
      clearCart();
      navigate('/shop');
    } catch (err) {
      console.error("Checkout process error:", err);
      alert("Checkout or payment failed. Please check your backend microservices.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col m-0 p-0">
      {/* Header */}
      <header className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
            Nexus Cart / Checkout
          </span>
          <h1 className="font-bold tracking-tight text-lg text-white">Payment Gateway</h1>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/shop" className="text-slate-400 hover:text-slate-200 transition-colors">Shop</Link>
          <Link to="/cart" className="text-slate-400 hover:text-slate-200 transition-colors">Cart</Link>
          <button 
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }} 
            className="text-rose-400 hover:text-rose-300 transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="w-full flex-1 px-6 md:px-12 py-10 max-w-xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-extrabold text-white border-b border-slate-800 pb-4">Order Payment</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Items Total</span>
              <span className="font-mono text-white">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Processing Fee</span>
              <span className="font-mono text-emerald-400">FREE</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between font-bold text-base text-white">
              <span>Total Due</span>
              <span className="font-mono text-emerald-400">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isProcessing || cart.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? 'Processing Transaction...' : 'Confirm & Pay Now'}
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="w-full bg-slate-950 hover:bg-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider py-3 rounded-xl border border-slate-800 transition-all cursor-pointer"
          >
            Back to Cart
          </button>
        </div>
      </main>
    </div>
  );
}