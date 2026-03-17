
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
      {/* Hero Section */}
      <section className="relative py-24 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Impact background"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            Impact <span className="text-orange-500">Stories</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-stone-300 max-w-2xl mx-auto"
          >
            Real stories of transformation, resilience, and hope from the communities we serve.
          </motion.p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {IMPACT_STORIES.map((story, index) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={story.images[0]} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={story.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-orange-600 uppercase tracking-widest shadow-sm">
                    Impact
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-orange-500" /> {story.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-8 line-clamp-3 text-lg leading-relaxed">
                    {story.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link 
                      to={`/impact-stories/${story.id}`}
                      className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all group/btn"
                    >
                      Read Full Story <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Want to create more stories like this?</h2>
          <p className="text-stone-400 mb-12 max-w-2xl mx-auto text-xl">
            Your support directly impacts lives in rural Uttarakhand. Join us in our mission to empower and educate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/donate" 
              className="bg-orange-600 text-white px-10 py-4 rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl text-lg"
            >
              Donate Now
            </Link>
            <Link 
              to="/contact" 
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-lg"
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
