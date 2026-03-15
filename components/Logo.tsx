
import React from 'react';
import { IMAGES } from '../constants';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ className = "h-16" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={IMAGES.logo} 
        alt="Jeevan Chetna Foundation Logo" 
        className="h-full w-auto object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback if image is missing
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = `
            <div class="flex flex-col leading-none font-serif">
              <span class="text-orange-700 font-bold text-lg tracking-tight">JEEVAN CHETNA</span>
              <span class="text-green-700 font-medium text-xs tracking-widest">FOUNDATION</span>
            </div>
          `;
        }}
      />
    </div>
  );
};

export default Logo;
