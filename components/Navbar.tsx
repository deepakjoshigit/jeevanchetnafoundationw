
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
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <Link to="/" className="flex items-center py-2 group">
            <Logo className="h-12 md:h-20" />
            <div className="flex flex-col leading-none font-serif ml-2 md:ml-3">
              <span className="text-orange-600 font-bold text-lg md:text-2xl tracking-tight group-hover:text-orange-700 transition-colors">JEEVAN CHETNA</span>
              <span className="text-green-700 font-bold text-[7px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase mt-0.5 md:mt-1">Foundation</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-orange-600 ${
                  location.pathname === link.path ? 'text-orange-600 border-b-2 border-orange-600 pb-1' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/donate"
              className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Heart size={18} className="fill-white" /> Donate Now
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
