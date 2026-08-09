import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authApi.post('/auth/register', { username, password });
      navigate('/');
    } catch (err) {
      setError('Registration failed. Try a different username.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex bg-slate-950 overflow-hidden">
      
      {/* Left Side: Brand/Hero Panel (Full Height, Emerald Theme) */}
      <div className="hidden lg:w-1/2 lg:flex flex-col justify-between p-16 bg-gradient-to-br from-emerald-600 via-emerald-800 to-teal-950 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest bg-black/20 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
            Nexus Cart / Onboarding
          </span>
        </div>

        <div className="relative z-10 my-auto max-w-lg">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Start building your digital storefront.
          </h1>
          <p className="mt-4 text-emerald-100 text-base leading-relaxed">
            Join the Nexus Cart ecosystem to deploy products, review analytics, and process orders instantly with microservices architecture.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-emerald-200/80">
          <span>SECURE REGISTRATION</span>
          <span>V1.0</span>
        </div>
      </div>

      {/* Right Side: Form Panel (Full Height, Edge-to-Edge) */}
      <div className="w-full lg:w-1/2 h-full p-8 sm:p-16 flex flex-col justify-center bg-slate-950 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white">Create Account</h2>
            <p className="text-sm text-slate-400 mt-2">Join the Nexus Cart ecosystem today.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-medium tracking-wide">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-semibold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-3.5 px-4 transition-all rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span className="inline-block animate-pulse">Creating Account...</span>
              ) : (
                <span>Register &rarr;</span>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Already have an account?{' '}
            <Link to="/" className="text-emerald-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}