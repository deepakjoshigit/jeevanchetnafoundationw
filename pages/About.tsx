
import React from 'react';
import { Target, Heart, Eye, Award, Users } from 'lucide-react';
import { DIRECTORS, IMAGES } from '../constants';

const About: React.FC = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">Empowering Lives with Care & Innovation</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Jeevan Chetna Foundation is a Section 8 Company registered with the Ministry of Corporate Affairs, dedicated to social welfare and humanitarian causes. Based in the beautiful city of Haldwani, Nainital, we serve as a beacon of hope for those marginalized by poverty and lack of opportunity.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our name, "Jeevan Chetna", translates to "Life Awareness" or "Awakening of Life". We believe that by awakening the potential within every individual through education and providing for their basic needs like food, we can transform society from the grassroots up.
            </p>
          </div>
          <div className="relative">
            <img
              src={IMAGES.about}
              className="rounded-[3rem] shadow-2xl w-full h-auto"
              alt="Team Work"
              onError={(e) => { e.currentTarget.src = IMAGES.placeholder }}
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl hidden md:block max-w-[250px] border border-gray-50">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl">10+</div>
                <div className="text-gray-900 font-bold leading-tight">Ongoing Projects</div>
              </div>
              <p className="text-gray-500 text-sm">Working tirelessly across Uttarakhand.</p>
            </div>
          </div>
        </div>

        {/* Mission/Vision/Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: 'Our Mission', text: 'To provide quality education, eliminate hunger, and promote environmental sustainability through community engagement.', icon: <Target className="text-orange-600" /> },
            { title: 'Our Vision', text: 'A world where every child has access to digital tools and knowledge, and no person goes to sleep hungry.', icon: <Eye className="text-blue-600" /> },
            { title: 'Our Values', text: 'Transparency, empathy, commitment, and integrity in every action we take for the community.', icon: <Heart className="text-red-600" /> },
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Leadership */}
        <div className="bg-gray-50 rounded-[4rem] p-12 md:p-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Foundation Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Driven by dedicated professionals committed to social change.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {DIRECTORS.map((director, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-md text-center group hover:scale-105 transition-transform">
                <div className="w-32 h-32 bg-orange-50 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                  {director.image ? (
                    <img 
                      src={director.image} 
                      alt={director.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Users className="w-12 h-12 text-orange-400" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{director.name}</h3>
                <p className="text-orange-600 font-semibold mb-4">Director</p>
                <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-gray-500 text-sm font-medium">
                  DIN: {director.din}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
