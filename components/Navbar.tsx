
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { name: 'Donors', path: '/donors' },
    { name: 'Our Work', path: '/work' },
    { name: 'Impact Stories', path: '/impact-stories' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Documents', path: '/documents' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="glass sticky top-0 z-50 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 md:h-28">
          <Link to="/" className="flex items-center py-2 group">
            <Logo className="h-14 md:h-20 transition-transform duration-500 group-hover:scale-110" />
            <div className="flex flex-col leading-none font-serif ml-4">
              <span className="text-orange-600 font-bold text-2xl md:text-3xl tracking-tight group-hover:text-orange-700 transition-colors">JEEVAN CHETNA</span>
              <span className="text-green-800 font-medium text-[10px] md:text-[12px] tracking-[0.4em] uppercase mt-1 opacity-80">Foundation</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-[11px] lg:text-xs font-bold uppercase tracking-widest transition-all hover:text-orange-600 rounded-full hover:bg-orange-50/50 whitespace-nowrap ${
                  location.pathname === link.path ? 'text-orange-600 bg-orange-50' : 'text-stone-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-px h-6 bg-stone-200 mx-2"></div>
            <Link
              to="/donate"
              className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95 whitespace-nowrap"
            >
              <Heart size={14} className="fill-white" /> Donate
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/donate"
              className="bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
            >
              <Heart size={14} className="fill-white" /> Donate
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-6 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-base font-bold rounded-xl transition-colors ${
                   location.pathname === link.path ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/donate"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-orange-600 text-white px-4 py-4 mt-4 rounded-xl font-bold shadow-md"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
