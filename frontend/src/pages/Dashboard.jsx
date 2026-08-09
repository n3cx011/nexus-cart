import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const stats = [
    { title: 'Total Revenue', value: '$24,580.00', change: '+12.5%', positive: true, icon: '💰' },
    { title: 'Active Orders', value: '384', change: '+8.2%', positive: true, icon: '📦' },
    { title: 'Total Customers', value: '1,429', change: '+5.4%', positive: true, icon: '👥' },
    { title: 'Conversion Rate', value: '3.24%', change: '+2.1%', positive: true, icon: '📊' },
  ];

  return (
    <div className="min-h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-x-hidden m-0 p-0">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-8 lg:px-16 backdrop-blur-xl w-full">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white shadow-lg shadow-emerald-600/30">
            N
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">Nexus Cart</h1>
            <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">Admin Ecosystem</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400 font-semibold text-xs">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-slate-300">
              Welcome, <strong className="text-white">{username}</strong>
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-rose-950/20 cursor-pointer flex items-center gap-2"
          >
            Logout &rarr;
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 px-8 lg:px-16 py-10 w-full space-y-8">

        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 w-full">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Dashboard Overview</h2>
            <p className="text-sm text-slate-400 mt-1">Here is what is happening across your e-commerce store today.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Microservices Live
            </span>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-2xl shadow-xl transition-all hover:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.title}</span>
                <div className="p-2.5 bg-slate-800/60 rounded-xl text-lg">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Core Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          
          {/* Order Management Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 flex flex-col justify-between shadow-xl transition-all hover:border-emerald-500/40 group">
            <div>
              <div className="w-14 h-14 bg-emerald-600/10 border border-emerald-600/30 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 text-2xl shadow-inner group-hover:scale-105 transition-transform">
                📦
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                Order Management System
              </h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Create orders, monitor status, and inspect backend entries in real time across your microservices backend database.
              </p>
            </div>
            
            <Link
              to="/orders"
              className="mt-8 inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all text-sm"
            >
              Manage Orders &rarr;
            </Link>
          </div>

          {/* More Services / Coming Soon Card */}
          <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-800/40 rounded-2xl p-8 flex flex-col justify-between opacity-70">
            <div>
              <div className="w-14 h-14 bg-slate-800/80 border border-slate-700/50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 text-2xl">
                ⚙️
              </div>
              <h3 className="text-xl font-bold text-white">More Microservices</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Additional modules for product catalogs, user roles, and payment gateways coming up next in the architecture.
              </p>
            </div>
            
            <span className="mt-8 inline-flex items-center justify-center w-full bg-slate-800/50 border border-slate-700/40 text-slate-400 font-medium py-3.5 rounded-xl cursor-not-allowed text-sm">
              Coming Soon
            </span>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-900 text-center text-xs text-slate-500 font-mono w-full mt-auto">
        NEXUS CART E-COMMERCE ECOSYSTEM &bull; ALL RIGHTS RESERVED
      </footer>

    </div>
  );
}