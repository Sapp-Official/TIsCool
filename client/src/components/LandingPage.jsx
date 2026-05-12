import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Shield, Award, CalendarDays, LayoutDashboard, Sparkles, ChevronRight } from 'lucide-react';
import { performLogin } from '../services/api';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      
      {/* Premium Technical Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
          {/* Ambient Glows */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-violet-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
             </div>
             <span className="font-bold text-xl tracking-tight">Synchron</span>
          </div>
          <button 
             onClick={performLogin}
             className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
             Sign In
          </button>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-20">
        
        {/* Asymmetrical Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[60vh]">
            
            {/* Left Column: Typography */}
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-8">
                 <Sparkles size={14} />
                 Re-engineered for Speed
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                Master your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
                   school day.
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-zinc-400 mb-10 leading-relaxed font-light">
                Synchron eliminates the friction of the standard student portal. A lightning-fast, meticulously designed dashboard that brings your timetable, notices, and schedule into perfect harmony.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={performLogin}
                    className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-zinc-950 text-base font-bold rounded-xl hover:bg-zinc-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] overflow-hidden w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                        Sign in via SBHS Portal
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                  </motion.button>
                  <p className="text-xs text-zinc-500 font-medium px-2">Requires an active student or staff account.</p>
              </div>
            </motion.div>

            {/* Right Column: Abstract App Mockup Graphic */}
            <motion.div
               initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
               animate={{ opacity: 1, scale: 1, rotateY: 0 }}
               transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
               className="relative lg:ml-auto w-full max-w-lg aspect-[4/3] perspective-1000 hidden md:block"
            >
               {/* Decorative Abstract "Cards" Floating */}
               <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                   className="absolute top-10 left-10 w-full h-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl shadow-black/50 p-6 flex flex-col gap-4 transform rotate-2 origin-bottom-left"
               >
                   <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500" />
                       <div className="space-y-2">
                           <div className="h-4 w-32 bg-zinc-800 rounded" />
                           <div className="h-3 w-20 bg-zinc-800/50 rounded" />
                       </div>
                   </div>
                   <div className="space-y-3 pt-2">
                       <div className="h-12 w-full bg-zinc-800/30 rounded-xl" />
                       <div className="h-12 w-full bg-zinc-800/30 rounded-xl" />
                       <div className="h-12 w-3/4 bg-blue-500/10 border border-blue-500/20 rounded-xl" />
                   </div>
               </motion.div>

               <motion.div 
                   animate={{ y: [0, 15, 0] }}
                   transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                   className="absolute -bottom-10 -right-10 w-64 p-5 bg-zinc-900/90 backdrop-blur-2xl border border-zinc-800 rounded-2xl shadow-2xl shadow-blue-900/20 transform -rotate-3"
               >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                            <Clock size={14} />
                        </div>
                        <div className="text-sm font-bold text-white">Class starts in 5m</div>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[85%]" />
                    </div>
               </motion.div>
            </motion.div>
        </div>

        {/* Bento Box Feature Grid */}
        <div className="mt-32">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-3">Everything you need.</h2>
                <p className="text-zinc-400">Powerful features, beautifully arranged.</p>
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[240px]"
            >
                {/* Large Featured Card (Spans 2 columns, 2 rows) */}
                <div className="md:col-span-2 lg:col-span-2 md:row-span-2 group relative p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                            <Clock size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Smart Timeline Timetable</h3>
                        <p className="text-zinc-400 leading-relaxed max-w-sm">
                            Never guess where you need to be. Our vertical timeline tracks your day minute-by-minute, highlighting your current class and giving you instant room and teacher details.
                        </p>
                        <div className="mt-auto pt-8">
                            <div className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-t-xl border-b-0 relative overflow-hidden flex items-center justify-center">
                                {/* Abstract Timeline Graphic */}
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-800">
                                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-blue-500/20" />
                                </div>
                                <div className="ml-12 h-12 w-48 bg-zinc-900 border border-zinc-800 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wide Card */}
                <div className="md:col-span-1 lg:col-span-2 group relative p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors overflow-hidden">
                    <div className="flex flex-col h-full">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Daily Briefings</h3>
                        <p className="text-sm text-zinc-400">Access the daily notices instantly. We filter out the noise so you only see announcements relevant to your cohort.</p>
                        
                        <div className="mt-auto flex items-center gap-2 pt-4">
                            <div className="h-2 w-1/3 bg-zinc-800 rounded-full" />
                            <div className="h-2 w-1/4 bg-zinc-800 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Square Card 1 */}
                <div className="group relative p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                        <CalendarDays size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Calendar Sync</h3>
                    <p className="text-sm text-zinc-400">Seamless integration with major school calendar events, tests, and public holidays.</p>
                </div>

                {/* Square Card 2 */}
                <div className="group relative p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                        <Award size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Award Scheme</h3>
                    <p className="text-sm text-zinc-400">Keep track of your participation points and award scheme progress automatically.</p>
                </div>
            </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 text-center pb-12 border-t border-zinc-900 pt-16"
        >
            <h2 className="text-3xl font-bold text-white mb-6">Ready to upgrade your school day?</h2>
            <button 
                onClick={performLogin}
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors"
            >
                Login with SBHS Portal <ChevronRight size={16} />
            </button>
        </motion.div>

      </main>
    </div>
  );
};

export default LandingPage;
