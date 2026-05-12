import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Shield, Award, LayoutDashboard } from 'lucide-react';
import { performLogin } from '../services/api';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-600/30">
      
      {/* Ultra-minimal Header */}
      <nav className="flex items-center justify-between px-6 py-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
             </div>
             <span className="font-semibold text-sm tracking-wide text-white">Synchron</span>
          </div>
          <button 
             onClick={performLogin}
             className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
             Log in
          </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        
        {/* Typography-First Hero Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-600/30 bg-blue-600/10 text-blue-500 text-xs font-medium tracking-wide mb-10">
                 Synchron for SBHS
              </div>
              
              <h1 className="text-5xl md:text-7xl font-semibold text-white mb-8 tracking-tight leading-tight">
                The student portal, <br />
                <span className="text-zinc-500">simplified.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed max-w-2xl font-light">
                Manage your timetable, read daily notices, and track your progress. A fast, focused interface designed exclusively for Sydney Boys High School.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                  <button
                    onClick={performLogin}
                    className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-zinc-200 transition-all w-full sm:w-auto"
                  >
                    Continue with SBHS
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <p className="text-xs text-zinc-600">
                      Requires an active student account.
                  </p>
              </div>
            </motion.div>
        </div>

        {/* Minimalist Feature Grid */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-40 pt-20 border-t border-zinc-900"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                
                {/* Feature 1 */}
                <div className="flex flex-col">
                    <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center mb-6 text-zinc-400">
                        <Clock size={18} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">Live Timetable</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        A real-time timeline of your day. Instantly see your current class, room changes, and teacher substitutions without clicking through menus.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col">
                    <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center mb-6 text-zinc-400">
                        <Shield size={18} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">Targeted Notices</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Read the daily briefings that actually matter to you. Notices are automatically filtered for your specific year group and cohort.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col">
                    <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center mb-6 text-zinc-400">
                        <Calendar size={18} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">Calendar Sync</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Seamlessly integrates with the school calendar to keep you informed about upcoming events, assessments, and public holidays.
                    </p>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-col">
                    <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center mb-6 text-zinc-400">
                        <Award size={18} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">Award Scheme</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Track your award scheme points and participation automatically, giving you a clear view of your progress throughout the year.
                    </p>
                </div>

                {/* Feature 5 */}
                <div className="flex flex-col">
                    <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center mb-6 text-zinc-400">
                        <LayoutDashboard size={18} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">Fast Dashboard</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Built for speed. The dashboard loads instantly, presenting all your critical daily information on a single, clean screen.
                    </p>
                </div>

            </div>
        </motion.div>

        {/* Minimal Footer */}
        <div className="mt-40 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600">
            <p>© {new Date().getFullYear()} Synchron. Unofficial client for SBHS.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            </div>
        </div>

      </main>
    </div>
  );
};

export default LandingPage;
