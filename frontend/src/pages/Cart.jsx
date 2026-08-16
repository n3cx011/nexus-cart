import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart({ cart, clearCart }) {
  const navigate = useNavigate();
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col m-0 p-0">
      {/* Header */}
      <header className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
            Nexus Cart / Shopping Cart
          </span>
          <h1 className="font-bold tracking-tight text-lg text-white">Your Cart</h1>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/shop" className="text-slate-400 hover:text-slate-200 transition-colors">Shop</Link>
          <Link to="/cart" className="text-emerald-400 font-semibold">Cart</Link>
          <button 
            onClick={() => navigate('/')} 
            className="text-rose-400 hover:text-rose-300 transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1 px-6 md:px-12 py-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Selected Items</h2>
            <p className="text-sm text-slate-400 mt-1">Review items in your cart before moving to payment.</p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-mono uppercase text-rose-400 hover:text-rose-300 border border-rose-500/20 bg-rose-500/10 px-3 py-2 rounded-xl transition-all"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="w-full text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-sm font-mono mb-6">Your cart is currently empty.</p>
            <Link 
              to="/shop" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20 inline-block"
            >
              Browse Shop Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800/50 flex-shrink-0">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] font-mono text-slate-600">NO IMAGE</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4">Subtotal Summary</h3>
              <div className="flex justify-between text-base font-bold text-white">
                <span>Total</span>
                <span className="font-mono text-emerald-400">${totalAmount.toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                disabled={cart.length === 0}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                Proceed to Checkout &rarr;
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}