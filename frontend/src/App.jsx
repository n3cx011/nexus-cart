import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { orderApi } from './services/api';

export default function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('currentUser') || '');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (username) {
      orderApi.get(`/cart/${username}`)
        .then(res => setCart(res.data))
        .catch(err => console.error("Failed to load user cart", err));
    } else {
      setCart([]);
    }
  }, [username]);

  const addToCart = async (product) => {
    const activeUser = username || localStorage.getItem('currentUser');
    
    if (!activeUser) {
      alert("Please log in first!");
      return;
    }

    const payload = {
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    };

    try {
      await orderApi.post(`/cart/${activeUser}/add`, payload);
      const updated = await orderApi.get(`/cart/${activeUser}`);
      setCart(updated.data);
      alert(`Added ${product.name} to cart!`);
    } catch (err) {
      console.error("Failed to add item to database cart", err);
    }
  };

  const clearCart = async () => {
    const activeUser = username || localStorage.getItem('currentUser');
    if (!activeUser) return;
    try {
      await orderApi.delete(`/cart/${activeUser}/clear`);
      setCart([]);
    } catch (err) {
      console.error("Failed to clear database cart", err);
    }
  };

  const handleLoginSuccess = (user) => {
    localStorage.setItem('currentUser', user);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUsername('');
    setCart([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop cart={cart} addToCart={addToCart} onLogout={handleLogout} />} />
        <Route path="/cart" element={<Cart cart={cart} clearCart={clearCart} onLogout={handleLogout} />} />
        <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} username={username} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}