
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, MessageCircle, Linkedin } from 'lucide-react';
import { CONTACT_INFO, FOUNDATION_NAME } from '../constants';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 pt-32 pb-16 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="flex items-center group">
              <Logo className="h-12 md:h-14" />
              <div className="flex flex-col leading-none font-serif ml-4">
                <span className="text-white font-bold text-2xl tracking-tight group-hover:text-orange-500 transition-colors">JEEVAN CHETNA</span>
                <span className="text-orange-600 font-bold text-[9px] tracking-[0.4em] uppercase mt-1">Foundation</span>
              </div>
            </Link>
            
            <p className="text-lg leading-relaxed font-light text-stone-500 max-w-md">
              A Section 8 NGO dedicated to transforming lives through education, hunger relief, and environmental sustainability in the heart of Uttarakhand.
            </p>
            
            <div className="flex gap-4">
              {[
                { icon: Facebook, link: CONTACT_INFO.socials.facebook, label: 'Facebook' },
                { icon: Twitter, link: CONTACT_INFO.socials.twitter, label: 'Twitter' },
                { icon: Instagram, link: CONTACT_INFO.socials.instagram, label: 'Instagram' },
                { icon: Linkedin, link: CONTACT_INFO.socials.linkedin, label: 'LinkedIn' },
                { icon: MessageCircle, link: CONTACT_INFO.socials.whatsapp, label: 'WhatsApp' }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full border border-stone-800 flex items-center justify-center hover:bg-white hover:text-stone-950 hover:border-white transition-all duration-500 group"
                  title={social.label}
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-white font-serif font-bold text-xl">Explore</h3>
            <ul className="space-y-4 text-sm font-light">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Our Team', path: '/team' },
                { label: 'Our Work', path: '/work' },
                { label: 'Impact Stories', path: '/impact-stories' },
                { label: 'Donate Now', path: '/donate' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-orange-500 group-hover:w-4 transition-all duration-500"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Utility Links */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-white font-serif font-bold text-xl">Resources</h3>
            <ul className="space-y-4 text-sm font-light">
              {[
                { label: 'Documents', path: '/documents' },
                { label: 'ID Generator', path: '/id-generator' },
                { label: 'Appointments', path: '/appointment' },
                { label: 'Joining Letters', path: '/joining-letter' },
                { label: 'Contact Us', path: '/contact' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-orange-500 group-hover:w-4 transition-all duration-500"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-10">
            <h3 className="text-white font-serif font-bold text-xl">Get in Touch</h3>
            <ul className="space-y-8 text-sm font-light">
              <li className="flex gap-5">
                <MapPin size={24} className="text-orange-600 shrink-0" />
                <div className="space-y-2">
                  <span className="text-white font-bold text-[10px] uppercase tracking-widest block">Working Address</span>
                  <span className="text-stone-500 leading-relaxed">{CONTACT_INFO.workingAddress}</span>
                </div>
              </li>
              <li className="flex gap-5">
                <Mail size={24} className="text-orange-600 shrink-0" />
                <div className="space-y-2">
                  <span className="text-white font-bold text-[10px] uppercase tracking-widest block">Email Us</span>
                  <a href={`mailto:${CONTACT_INFO.emails[0]}`} className="text-stone-500 hover:text-white transition-colors break-all">{CONTACT_INFO.emails[0]}</a>
                </div>
              </li>
              <li className="flex gap-5">
                <Phone size={24} className="text-orange-600 shrink-0" />
                <div className="space-y-2">
                  <span className="text-white font-bold text-[10px] uppercase tracking-widest block">Call Us</span>
                  <a href={`tel:${CONTACT_INFO.phones[0]}`} className="text-stone-500 hover:text-white transition-colors">{CONTACT_INFO.phones[0]}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs font-light tracking-wide text-stone-600">
            &copy; {new Date().getFullYear()} {FOUNDATION_NAME}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">
            <span>Section 8 NGO</span>
            <span className="w-1 h-1 bg-stone-800 rounded-full"></span>
            <span>Registered in Uttarakhand</span>
            <span className="w-1 h-1 bg-stone-800 rounded-full"></span>
            <Link to="/documents" className="hover:text-white transition-colors">Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
