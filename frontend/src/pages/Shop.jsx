import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productApi } from '../services/api';

export default function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const navigate = useNavigate();

  const loadProducts = () => {
    productApi.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load products", err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await productApi.post('/products', {
        ...newProduct,
        price: parseFloat(newProduct.price)
      });
      setNewProduct({ name: '', description: '', price: '', imageUrl: '' });
      setIsModalOpen(false);
      loadProducts();
    } catch (err) {
      console.error("Failed to add product", err);
      alert("Failed to create product. Make sure product-service (Port 8082) is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    await productApi.delete(`/products/${productId}`);
    // Refresh product list from product-service
    loadProducts();
  } catch (err) {
    console.error("Failed to delete product", err);
    alert("Could not delete product. Check product-service connection.");
  }
};

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Header matching Login Page */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
            Nexus Cart / Ecosystem
          </span>
          <h1 className="font-bold tracking-tight text-lg text-white">Storefront</h1>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/shop" className="text-emerald-400 font-semibold">Shop</Link>
          <Link to="/cart" className="text-slate-400 hover:text-slate-200 transition-colors">Cart</Link>
          <button 
            onClick={() => navigate('/')} 
            className="text-rose-400 hover:text-rose-300 transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Catalog Management</h2>
            <p className="text-sm text-slate-400 mt-1">Browse products or add new items directly to product-service.</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-600 w-full sm:w-64"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <span>+ Add Product</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-sm font-mono">No products found in product-service database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
  <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all group relative">
    
    {/* Delete Button (Top Right of Card) */}
    <button
      onClick={() => handleDeleteProduct(product.id)}
      className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 bg-slate-950/80 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/20 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer z-10"
      title="Delete Product"
    >
      ✕
    </button>

    <div>
      <div className="w-full h-48 bg-slate-950 rounded-xl mb-4 overflow-hidden flex items-center justify-center border border-slate-800/50">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <span className="text-xs font-mono text-slate-600">NO IMAGE</span>
        )}
      </div>
      <h3 className="font-semibold text-white text-base group-hover:text-emerald-400 transition-colors">{product.name}</h3>
      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{product.description || "No description provided."}</p>
    </div>

    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
      <span className="text-base font-mono font-bold text-emerald-400">${Number(product.price || 0).toFixed(2)}</span>
      <button
        onClick={() => addToCart(product)}
        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  </div>
))}
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Create Product</h3>
                <p className="text-xs text-slate-400 mt-1">Publish item directly to product-service (Port 8082)</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-white text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Wireless Gaming Mouse"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Description</label>
                <textarea
                  rows="3"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Brief details about the item..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="49.99"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Image URL</label>
                <input
                  type="url"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider py-3 rounded-xl border border-slate-800 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}