import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '../services/api';

export default function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productApi.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load products", err));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Customer Navigation Header */}
      <nav className="bg-white border-b border-zinc-200 px-8 py-4 flex justify-between items-center">
        <h1 className="font-semibold tracking-tight text-lg">Nexus Store</h1>
        <div className="flex gap-6 text-sm">
          <Link to="/shop" className="text-zinc-900 font-medium">Shop</Link>
          <Link to="/checkout" className="text-zinc-600 hover:text-zinc-900 transition-colors">Cart & Checkout</Link>
          <Link to="/" className="text-red-600 hover:text-red-700 transition-colors">Logout</Link>
        </div>
      </nav>

      <div className="p-8 md:p-12 max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-light tracking-tight">Available Products</h2>
          <p className="text-sm text-zinc-500 mt-1">Select items to place your order and complete secure payments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white border border-zinc-200 p-6 flex flex-col justify-between">
              <div>
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 bg-zinc-100" />
                )}
                <h3 className="font-medium text-lg">{product.name}</h3>
                <p className="text-sm text-zinc-500 mt-1">{product.description}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-semibold">${product.price?.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs uppercase tracking-wider px-4 py-2.5 transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}