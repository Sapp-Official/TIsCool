import React from 'react';
import { MapPin, User as UserIcon, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const SubjectColors = {
    'Mathematics': 'from-blue-500 to-cyan-500',
    'English': 'from-amber-500 to-orange-500',
    'Science': 'from-emerald-500 to-teal-500',
    'History': 'from-yellow-600 to-yellow-800',
    'Geography': 'from-green-600 to-emerald-800',
    'PDHPE': 'from-red-500 to-rose-600',
    'Music': 'from-purple-500 to-fuchsia-500',
    'Art': 'from-pink-500 to-rose-400',
    'Languages': 'from-indigo-500 to-violet-600',
    'Technology': 'from-slate-600 to-zinc-800'
};

const getSubjectGradient = (title) => {
    if (!title) return 'from-zinc-400 to-zinc-500';
    const normalized = title.toLowerCase();
    if (normalized.includes('math')) return SubjectColors['Mathematics'];
    if (normalized.includes('eng')) return SubjectColors['English'];
    if (normalized.includes('sci') || normalized.includes('phy') || normalized.includes('che') || normalized.includes('bio')) return SubjectColors['Science'];
    if (normalized.includes('his')) return SubjectColors['History'];
    if (normalized.includes('geo')) return SubjectColors['Geography'];
    if (normalized.includes('pdhpe') || normalized.includes('sport')) return SubjectColors['PDHPE'];
    if (normalized.includes('mus')) return SubjectColors['Music'];
    if (normalized.includes('art') || normalized.includes('vis')) return SubjectColors['Art'];
    if (normalized.includes('fre') || normalized.includes('ger') || normalized.includes('lat') || normalized.includes('chi') || normalized.includes('jap')) return SubjectColors['Languages'];
    if (normalized.includes('tech') || normalized.includes('soft') || normalized.includes('ind') || normalized.includes('dat')) return SubjectColors['Technology'];
    return 'from-indigo-500 to-purple-600';
};

const PeriodCard = ({ period, bell, isCurrent, isNext, routineIndex, currentMinutes, startMinutes, endMinutes }) => {
  const { title, room, fullTeacher } = period;
  const { time, endTime } = bell;

  const progress = isCurrent && startMinutes && endMinutes 
      ? Math.min(100, Math.max(0, ((currentMinutes - startMinutes) / (endMinutes - startMinutes)) * 100))
      : 0;
  
  const isBreak = bell.bell === "R" || bell.bell === "L" || bell.bell === "RC";
  const isPast = currentMinutes !== -1 && currentMinutes >= endMinutes;

  // Dot styling based on state
  let dotClass = "bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900";
  if (isCurrent) dotClass = "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] border-2 border-white dark:border-zinc-900 ring-4 ring-blue-500/20";
  else if (isPast) dotClass = "bg-zinc-300 dark:bg-zinc-700 border-2 border-white dark:border-zinc-900";
  
  // Icon/Dot size
  const dotSize = isCurrent ? "w-4 h-4" : "w-3 h-3";

  // Break Variant
  if (isBreak) {
     return (
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: routineIndex * 0.05 }}
           className={`relative flex items-center gap-6 py-2 ${isPast ? 'opacity-40' : 'opacity-100'}`}
        >
            <div className="w-[60px] md:w-[90px] text-right shrink-0">
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">{time}</span>
            </div>
            
            {/* Timeline Dot */}
            <div className="relative z-10 flex items-center justify-center shrink-0 w-6">
                <div className={`rounded-full transition-all duration-300 ${dotSize} ${dotClass}`} />
            </div>

            <div className="flex-1 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl px-4 py-2 border border-zinc-100 dark:border-zinc-800/50">
                <span className={`text-xs font-bold uppercase tracking-widest ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500'}`}>
                    {bell.bellDisplay}
                </span>
            </div>
        </motion.div>
     );
  }

  // Class Variant
  const subjectGradient = getSubjectGradient(title);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: routineIndex * 0.05 }}
      className={`relative flex items-stretch gap-6 py-1 group ${isPast ? 'opacity-60 hover:opacity-100 transition-opacity' : ''}`}
    >
        {/* Time Column */}
        <div className="w-[60px] md:w-[90px] text-right shrink-0 flex flex-col justify-center pt-3">
            <span className={`text-sm font-bold ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'}`}>{time}</span>
            <span className="text-[10px] font-medium text-zinc-400 mt-0.5">{endTime}</span>
        </div>
        
        {/* Timeline Dot */}
        <div className="relative z-10 flex flex-col items-center shrink-0 w-6 pt-4">
            <div className={`rounded-full transition-all duration-300 ${dotSize} ${dotClass}`} />
        </div>

        {/* Card Content */}
        <div className={`
          flex-1 flex flex-col justify-center relative p-4 rounded-2xl border transition-all duration-300 overflow-hidden
          ${isCurrent 
            ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 scale-[1.02] z-20" 
            : "bg-white dark:bg-zinc-900/80 border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm" 
          }
        `}>
           
           {/* Progress Bar Background for Current */}
           {isCurrent && (
              <div className="absolute top-0 left-0 bottom-0 bg-blue-50/50 dark:bg-blue-900/10 pointer-events-none transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }} />
           )}

           <div className="flex items-center justify-between relative z-10">
               <div className="flex items-center gap-4">
                   {/* Subject Icon / Period Bubble */}
                   <div className={`
                      flex items-center justify-center w-10 h-10 rounded-xl text-white font-bold shadow-md shrink-0
                      bg-gradient-to-br ${subjectGradient}
                      ${!isCurrent && isPast ? 'grayscale opacity-50' : ''}
                   `}>
                      {bell.bell}
                   </div>

                   <div className="flex flex-col min-w-0">
                      <h3 className={`text-base font-bold truncate ${isCurrent ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
                         {title || "Free Period"}
                      </h3>
                      
                      {/* Details Row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                         {(room || fullTeacher) && (
                             <>
                                 {room && (
                                      <span className={`flex items-center gap-1 text-xs font-medium ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500'}`}>
                                          <MapPin size={12} /> {room}
                                      </span>
                                 )}
                                 {fullTeacher && (
                                      <span className="flex items-center gap-1 text-xs font-medium text-zinc-500">
                                          <UserIcon size={12} /> {fullTeacher}
                                      </span>
                                 )}
                             </>
                         )}
                      </div>
                   </div>
               </div>

               {/* Right Indicators */}
               <div className="flex flex-col items-end gap-2 shrink-0">
                   {isNext && (
                       <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse">
                           Up Next
                       </span>
                   )}
                   {isCurrent && (
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 bg-white/50 dark:bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                            <Clock size={12} className="animate-pulse" /> {Math.max(0, endMinutes - currentMinutes)}m left
                        </span>
                   )}
               </div>
           </div>

        </div>
    </motion.div>
  );
};

export default PeriodCard;