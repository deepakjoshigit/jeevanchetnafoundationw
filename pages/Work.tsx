
import React from 'react';
import { INITIATIVES, IMAGES } from '../constants';
import { CheckCircle } from 'lucide-react';

const Work: React.FC = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">Changing the Narrative</h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Explore our diverse range of projects designed to uplift society through education, health, and environment.
          </p>
        </div>

        <div className="space-y-32">
          {INITIATIVES.map((item, i) => (
            <div key={i} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="relative">
                   <img 
                    src={item.image} 
                    className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl" 
                    alt={item.title} 
                    onError={(e) => { e.currentTarget.src = IMAGES.placeholder }}
                   />
                   <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg">
                      {item.icon}
                   </div>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">{item.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {item.description} Our approach involves direct community interaction, understanding specific needs, and deploying resources efficiently. We don't just provide services; we build capacity for long-term self-reliance.
                </p>
                <ul className="space-y-4">
                  {['Sustainable Impact', 'Community Driven', 'Transparent Process', 'Professional Monitoring'].map((point, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle className="text-green-500" size={20} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
