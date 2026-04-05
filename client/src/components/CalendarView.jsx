import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Clock } from 'lucide-react';
import { fetchCalendarEvents } from '../services/api';
import { motion } from 'framer-motion';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load events for the month/week
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const start = startOfWeek(currentDate);
        const end = addDays(start, 30);
        const data = await fetchCalendarEvents(start, end);
        setEvents(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [currentDate]);

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'assessment': return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      case 'school': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      default: return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
  };

  const getEventTypeAccent = (type) => {
    switch(type) {
      case 'assessment': return 'bg-red-500';
      case 'school': return 'bg-blue-500';
      default: return 'bg-emerald-500';
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h2 className="text-3xl font-bold dark:text-white text-zinc-900">Synchron Calendar</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Events and important dates</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentDate(d => addDays(d, -7))}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-300 text-zinc-700 transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="px-3 py-2 font-semibold bg-zinc-100 dark:bg-zinc-900 rounded-lg dark:text-zinc-100 text-zinc-900 text-sm min-w-fit">
            {format(currentDate, 'MMM yyyy')}
          </span>
          <button 
            onClick={() => setCurrentDate(d => addDays(d, 7))}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-300 text-zinc-700 transition-colors"
            aria-label="Next week"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>

      {loading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4 mx-auto">
            <div className="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 border-t-blue-500 animate-spin"></div>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400">Loading events...</p>
        </motion.div>
      ) : events.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
            <CalIcon size={32} className="text-zinc-400 dark:text-zinc-600" />
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">No events found</p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">Try navigating to a different week</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {events.map((dayGroup, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={dayGroup.info.date}
              className="bg-white dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all overflow-hidden"
            >
              {/* Day Header */}
              <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {format(new Date(dayGroup.info.date), 'EEEE')}
                      </span>
                      <span className="text-2xl font-bold dark:text-white text-zinc-900 mt-0.5">
                        {format(new Date(dayGroup.info.date), 'd')}
                      </span>
                    </div>
                    <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800">
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                        Term {dayGroup.info.term}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        Week {dayGroup.info.week}{dayGroup.info.weekType}
                      </div>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-zinc-500 dark:text-zinc-500">
                      {dayGroup.items.length} event{dayGroup.items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Events List */}
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {dayGroup.items.map((event, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (idx * 0.05) + (i * 0.03) }}
                    className="px-5 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Left Accent Bar */}
                      <div className={`w-1 h-10 rounded-full shrink-0 mt-1 ${getEventTypeAccent(event.type)}`}></div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-tight">
                            {event.title}
                          </h3>
                          <span className={`shrink-0 px-2 py-1 text-xs font-semibold uppercase tracking-wider rounded border ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                          {event.subject && (
                            <span className="font-medium">{event.subject}</span>
                          )}
                          {event.subject && event.time && (
                            <span className="hidden sm:inline opacity-50">•</span>
                          )}
                          {event.time && (
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {event.time}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
