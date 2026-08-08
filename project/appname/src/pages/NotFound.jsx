import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Compass, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-12">
        <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-cyan-400 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-cyan-400 block mb-2">
          Page Not Found • 404
        </span>
        <h1 className="text-4xl font-black mb-4">Lost in Chennai?</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
          The public page or route you are attempting to visit does not exist.
        </p>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>
          <Link
            to="/events"
            className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl"
          >
            Explore Events
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
