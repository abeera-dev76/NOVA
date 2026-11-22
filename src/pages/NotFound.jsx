import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400 select-none">
          404
        </h1>
        <div className="absolute inset-0 bg-purple-600/20 blur-3xl pointer-events-none rounded-full" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
        Quantum Void Detected
      </h2>
      <p className="text-sm text-nova-muted max-w-md mb-8 leading-relaxed">
        The coordinates you entered do not exist in the NOVA spatial network. Let us redirect you back to civilization.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-glow-purple flex items-center gap-2 transition hover:scale-105"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-2 transition"
        >
          <Compass className="w-4 h-4" />
          <span>Browse All Gear</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
