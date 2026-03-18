
import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Quote, ChevronLeft } from 'lucide-react';
import Markdown from 'react-markdown';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IMPACT_STORIES } from '../constants';

const ImpactStories: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const story = IMPACT_STORIES.find((s) => s.id === id);

  // Detail View
  if (id && story) {
    return (
      <div className="bg-white">
        {/* Story Hero */}
        <section className="relative h-[40vh] md:h-[60vh] overflow-hidden">
          <img 
            src={story.images[0]} 
            className="w-full h-full object-cover"
            alt={story.title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => navigate('/impact-stories')}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Stories
              </button>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                {story.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/80 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-orange-500" />
                  {story.date}
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-orange-500" />
                  {story.author}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg prose-orange max-w-none">
              <div className="markdown-body text-gray-700 leading-relaxed space-y-6">
                <Markdown>{story.content}</Markdown>
              </div>
            </div>

            {/* Additional Images */}
            {story.images.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                {story.images.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                    <img 
                      src={img} 
                      className="w-full h-full object-cover"
                      alt={`${story.title} detail ${i + 1}`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Quote/Highlight */}
            <div className="mt-16 p-8 bg-orange-50 rounded-3xl border-l-8 border-orange-500 relative">
              <Quote className="absolute top-4 right-4 text-orange-200 w-12 h-12" />
              <p className="text-xl font-serif italic text-gray-800 relative z-10">
                "जब बच्चे पहली बार कंप्यूटर चलाते हैं, उनकी आँखों में जो चमक होती है, वही हमारी सबसे बड़ी सफलता है।"
              </p>
              <p className="mt-4 font-bold text-orange-600">— Pravin Pandey, Founder</p>
            </div>

            {/* Footer Action */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-stone-400 text-sm italic">
                Part of our Digital Literacy Initiative
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm font-medium">Share this story:</span>
                <div className="flex gap-2">
                  {['FB', 'TW', 'WA'].map((social) => (
                    <button key={social} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-600 hover:text-white transition-all text-xs font-bold">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Stories */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">More Impact Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {IMPACT_STORIES.filter(s => s.id !== id).slice(0, 3).map(s => (
                <Link key={s.id} to={`/impact-stories/${s.id}`} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img src={s.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={s.title} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{s.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{s.excerpt}</p>
                  </div>
                </Link>
              ))}
              {IMPACT_STORIES.length <= 1 && (
                <div className="col-span-full text-center text-gray-500 italic">
                  More stories coming soon...
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // List View
  return (
    <div className="bg-white">
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-[60vh] flex items-center bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Impact Background" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-orange-600"></div>
              <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">Real Stories of Transformation</span>
            </motion.div>
            
            <div className="overflow-hidden mb-8">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-[8rem] font-serif font-bold text-white leading-[0.85] tracking-tighter"
              >
                Impact <span className="text-orange-600 italic font-medium">Stories</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-stone-300 max-w-2xl leading-relaxed font-light text-balance"
            >
              Real stories of transformation, resilience, and hope from the communities we serve in Uttarakhand.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stories Grid - Refined Layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {IMPACT_STORIES.map((story, index) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group flex flex-col h-full bg-white rounded-[3.5rem] overflow-hidden shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-700"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={story.images[0]} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={story.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] shadow-sm">
                    Impact Story
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-orange-500" /> {story.date}
                    </span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-stone-950 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-stone-500 mb-10 line-clamp-3 text-lg leading-relaxed font-light">
                    {story.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link 
                      to={`/impact-stories/${story.id}`}
                      className="inline-flex items-center gap-3 text-orange-600 font-bold text-sm uppercase tracking-widest hover:gap-5 transition-all group/btn"
                    >
                      Read Full Story <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Editorial Style */}
      <section className="py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-600 rounded-full blur-[150px] opacity-20 translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-serif font-bold mb-10 leading-tight tracking-tighter">
            Want to create more <br />
            <span className="text-orange-600 italic font-medium text-4xl md:text-7xl">stories like this?</span>
          </h2>
          <p className="text-stone-400 mb-16 max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed">
            Your support directly impacts lives in rural Uttarakhand. Join us in our mission to empower and educate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Link 
              to="/donate" 
              className="bg-orange-600 text-white px-12 py-6 rounded-full font-bold hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/20 text-lg"
            >
              Donate Now
            </Link>
            <Link 
              to="/contact" 
              className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-12 py-6 rounded-full font-bold hover:bg-white/10 transition-all text-lg"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImpactStories;
