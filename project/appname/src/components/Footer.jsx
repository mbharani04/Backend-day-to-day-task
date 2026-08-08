import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Heart, Mail, Phone, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                Chennai<span className="text-cyan-400">Events</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover and register for public events in Chennai — from cultural celebrations and tech expos to sports marathons, job fairs, and workshops.
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-400">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Greater Chennai Metropolitan Region, TN</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home Landing</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-cyan-400 transition-colors">Explore All Events</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-400 transition-colors">Register / Login Portal</Link>
              </li>
              <li>
                <Link to="/organization/events/create" className="hover:text-cyan-400 transition-colors">Host / Submit Event</Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Popular Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/events?category=Cultural" className="hover:text-cyan-400 transition-colors">Cultural & Heritage</Link>
              </li>
              <li>
                <Link to="/events?category=Technology" className="hover:text-cyan-400 transition-colors">Technology & AI Expos</Link>
              </li>
              <li>
                <Link to="/events?category=Sports" className="hover:text-cyan-400 transition-colors">Sports & Marathons</Link>
              </li>
              <li>
                <Link to="/events?category=Exhibition" className="hover:text-cyan-400 transition-colors">Trade Fairs & Exhibitions</Link>
              </li>
              <li>
                <Link to="/events?category=Workshop" className="hover:text-cyan-400 transition-colors">Workshops & Masterclasses</Link>
              </li>
            </ul>
          </div>

          {/* Local Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Chennai Help Desk</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>support@chennaievents.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+91 (044) 2800-3456</span>
              </li>
              <li className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px]">
                <span className="font-semibold text-white block mb-1">Demo Mode Activated</span>
                Frontend-only mock database powered by LocalStorage.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Discover and Register for Local Public Events (Chennai). All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Chennai City</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
