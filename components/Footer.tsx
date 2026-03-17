
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, MessageCircle, Linkedin } from 'lucide-react';
import { CONTACT_INFO, FOUNDATION_NAME } from '../constants';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About Section */}
        <div>
          <div className="mb-8">
            <Link to="/" className="flex items-center group">
              <Logo className="h-10 md:h-12" />
              <div className="flex flex-col leading-none font-serif ml-2 md:ml-3">
                <span className="text-orange-500 font-bold text-lg md:text-xl tracking-tight">JEEVAN CHETNA</span>
                <span className="text-green-500 font-bold text-[7px] md:text-[8px] tracking-[0.2em] md:tracking-[0.3em] uppercase mt-0.5 md:mt-1">Foundation</span>
              </div>
            </Link>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Jeevan Chetna Foundation is a Section 8 NGO dedicated to transforming lives through education, hunger relief, digital literacy, and environmental sustainability in Haldwani.
          </p>
          <div className="flex gap-4">
            <a href={CONTACT_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors" title="Facebook">
              <Facebook size={18} />
            </a>
            <a href={CONTACT_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors" title="X (Twitter)">
              <Twitter size={18} />
            </a>
            <a href={CONTACT_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors" title="Instagram">
              <Instagram size={18} />
            </a>
            <a href={CONTACT_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={CONTACT_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition-colors" title="WhatsApp">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Quick Links</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Our Foundation</Link></li>
            <li><Link to="/team" className="hover:text-orange-500 transition-colors">Meet the Team</Link></li>
            <li><Link to="/work" className="hover:text-orange-500 transition-colors">Our Key Projects</Link></li>
            <li><Link to="/documents" className="hover:text-orange-500 transition-colors">Compliance Documents</Link></li>
            <li><Link to="/id-generator" className="hover:text-orange-500 transition-colors">ID Card Generator</Link></li>
            <li><Link to="/appointment" className="hover:text-orange-500 transition-colors">Book an Appointment</Link></li>
            <li><Link to="/joining-letter" className="hover:text-orange-500 transition-colors">Joining Letter Generator</Link></li>
            <li><Link to="/donate" className="hover:text-orange-500 transition-colors">Make a Donation</Link></li>
            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Get in Touch</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Contact Us</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex gap-3">
              <MapPin size={24} className="text-orange-500 shrink-0" />
              <div>
                <span className="text-white font-bold block text-[10px] uppercase tracking-wider mb-1">Head Office</span>
                <span>{CONTACT_INFO.headOffice}</span>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin size={24} className="text-green-500 shrink-0" />
              <div>
                <span className="text-white font-bold block text-[10px] uppercase tracking-wider mb-1">Working Address</span>
                <span>{CONTACT_INFO.workingAddress}</span>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-orange-500 shrink-0" />
              <span>{CONTACT_INFO.phones[0]}</span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-orange-500 shrink-0" />
              <span className="break-all">{CONTACT_INFO.emails[0]}</span>
            </li>
          </ul>
        </div>

        {/* Bank Details */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Bank Support</h3>
          <div className="bg-gray-800 p-4 rounded-lg text-xs space-y-2">
            <p><span className="text-gray-500 uppercase block mb-1">A/C Name:</span> <span className="text-white font-medium">{FOUNDATION_NAME}</span></p>
            <p><span className="text-gray-500 uppercase block mb-1">A/C Number:</span> <span className="text-white font-medium">00000044208565753</span></p>
            <p><span className="text-gray-500 uppercase block mb-1">Bank & IFSC:</span> <span className="text-white font-medium">SBI - SBIN0000646</span></p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {FOUNDATION_NAME}. All Rights Reserved.</p>
        <p className="mt-2">Section 8 NGO | Registered in Uttarakhand, India</p>
      </div>
    </footer>
  );
};

export default Footer;
