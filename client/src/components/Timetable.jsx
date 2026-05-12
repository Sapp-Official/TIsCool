import React, { useState, useEffect } from 'react';
import PeriodCard from './PeriodCard';
import { motion } from 'framer-motion';

const Timetable = ({ timetableData, showNow = true }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!timetableData || !timetableData.bells) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <div className="w-10 h-10 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-400 dark:border-t-zinc-500 rounded-full animate-spin mb-4"></div>
            Loading timetable data...
        </div>
    );
  }

  const { bells, timetable } = timetableData;
  const innerTimetable = timetable?.timetable || timetable;

  if (!innerTimetable || !innerTimetable.periods) {
       return (
           <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-200/50 dark:border-zinc-800/50 mt-6 shadow-sm">
               <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
               <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No Classes Today!</h3>
               <p className="text-zinc-500">Enjoy your day off or catch up on some study.</p>
           </div>
       );
  }

  const { periods } = innerTimetable;
  const routine = innerTimetable.routine ? innerTimetable.routine.split(',') : [];
  
  const getMinutes = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const currentMinutes = showNow 
      ? currentTime.getHours() * 60 + currentTime.getMinutes()
      : -1;

  // Calculate timeline boundaries
  let firstMin = 24 * 60;
  let lastMin = 0;

  const routineData = routine.map((bellId, index) => {
      const bell = bells.find(b => b.bell === bellId);
      if (!bell) return null;

      const periodInfo = periods[bellId] || { title: bell.bellDisplay }; 
      if (bellId === "R" || bellId === "L" || bellId === "RC") {
         periodInfo.title = bell.bellDisplay; 
      }

      const startMin = getMinutes(bell.time);
      const endMin = bell.endTime ? getMinutes(bell.endTime) : startMin + 60; 

      if (startMin < firstMin) firstMin = startMin;
      if (endMin > lastMin) lastMin = endMin;

      const isCurrent = currentMinutes >= startMin && currentMinutes < endMin;
      const isNext = !isCurrent && currentMinutes !== -1 && currentMinutes < startMin && (index === 0 || currentMinutes >= getMinutes(routine[index-1] ? bells.find(b=>b.bell===routine[index-1])?.time || "00:00" : "00:00"));

      return {
          bellId, index, bell, periodInfo, startMin, endMin, isCurrent, isNext
      };
  }).filter(Boolean);

  // Timeline Progress Line Position
  let timelineProgressPos = 0;
  if (currentMinutes >= firstMin && currentMinutes <= lastMin) {
      timelineProgressPos = ((currentMinutes - firstMin) / (lastMin - firstMin)) * 100;
  } else if (currentMinutes > lastMin) {
      timelineProgressPos = 100;
  } else {
      timelineProgressPos = 0;
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full mt-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Daily Schedule
        </h2>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 relative">
          
          {/* Vertical Timeline Axis Container */}
          <div className="relative">
              {/* Background Axis Line */}
              <div className="absolute left-[39px] md:left-[55px] top-4 bottom-4 w-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
              
              {/* Active Axis Line */}
              {showNow && currentMinutes >= firstMin && (
                  <motion.div 
                      className="absolute left-[39px] md:left-[55px] top-4 w-0.5 bg-blue-500 rounded-full z-10 origin-top"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: timelineProgressPos / 100 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      style={{ bottom: '1rem' }}
                  />
              )}

              <div className="space-y-4">
                {routineData.map((data) => (
                    <PeriodCard 
                      key={`${data.bellId}-${data.index}`}
                      period={data.periodInfo}
                      bell={data.bell}
                      isCurrent={data.isCurrent}
                      isNext={data.isNext}
                      routineIndex={data.index}
                      currentMinutes={currentMinutes}
                      startMinutes={data.startMin}
                      endMinutes={data.endMin}
                    />
                ))}
              </div>
          </div>
          
      </div>
    </div>
  );
};

export default Timetable;
