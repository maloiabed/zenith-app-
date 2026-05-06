import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { 
  Sun, 
  Moon, 
  CheckCircle2, 
  Target, 
  Zap, 
  Brain, 
  ArrowRight, 
  Calendar,
  MessageSquare,
  Shield,
  Clock,
  Sparkles
} from 'lucide-react';
import { useZenithStore } from '../store/zenithStore';
import { motion, AnimatePresence } from 'motion/react';

export function Planner() {
  const store = useZenithStore();
  const tasks = store.tasks || [];
  const habits = store.habits || [];
  const dailyRituals = store.dailyRituals || [];
  const { completeRitual } = store;
  const today = new Date().toISOString().split('T')[0];
  const ritual = dailyRituals.find(r => r.date === today) || { startRendered: false, endRendered: false, reflection: '' };
  
  const [reflectionText, setReflectionText] = useState('');
  const [activeView, setActiveView] = useState<'overview' | 'start' | 'end'>('overview');

  const openTasks = tasks.filter(t => t.status === 'open');
  const completedHabits = habits.filter(h => h.completedToday);
  
  const handleStartDay = () => {
    completeRitual('start');
    setActiveView('overview');
  };

  const handleEndDay = () => {
    completeRitual('end', reflectionText);
    setActiveView('overview');
    setReflectionText('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
           <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Strategic Planner</h1>
           <p className="text-gray-500 mt-1 font-medium italic">"Execution is the only differentiator."</p>
        </div>
        <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200">
           <button 
             onClick={() => setActiveView('overview')}
             className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeView === 'overview' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
           >
             Overview
           </button>
           <button 
             onClick={() => setActiveView('start')}
             className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center ${activeView === 'start' ? 'bg-white shadow-sm text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
           >
             <Sun className="h-3 w-3 mr-2" />
             Render Start
           </button>
           <button 
             onClick={() => setActiveView('end')}
             className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center ${activeView === 'end' ? 'bg-white shadow-sm text-indigo-900' : 'text-gray-500 hover:text-gray-700'}`}
           >
             <Moon className="h-3 w-3 mr-2" />
             Render End
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'overview' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className={`md:col-span-2 border-2 ${ritual.startRendered ? 'border-green-100 bg-green-50/10' : 'border-yellow-100 bg-yellow-50/10'}`}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Morning Orientation</CardTitle>
                  <CardDescription>Launch sequence for strategic focus.</CardDescription>
                </div>
                {ritual.startRendered ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <button 
                    onClick={() => setActiveView('start')}
                    className="px-4 py-1.5 bg-yellow-500 text-white text-xs font-black rounded-lg hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-200"
                  >
                    INITIATE
                  </button>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Target Intensity</span>
                    <div className="text-xl font-black text-gray-900 uppercase">High Performance</div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Primary Objective</span>
                    <div className="text-sm font-bold text-gray-900 truncate">Q4 Financial Sweep</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`border-2 ${ritual.endRendered ? 'border-green-100 bg-green-50/10' : 'border-indigo-100 bg-indigo-50/10'}`}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Reflection</CardTitle>
                  <CardDescription>Closing the loop.</CardDescription>
                </div>
                {ritual.endRendered ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <button 
                    onClick={() => setActiveView('end')}
                    className="px-4 py-1.5 bg-indigo-900 text-white text-xs font-black rounded-lg hover:bg-black transition-colors shadow-lg shadow-indigo-200"
                  >
                    REFLECT
                  </button>
                )}
              </CardHeader>
              <CardContent>
                {ritual.reflection ? (
                  <p className="text-xs text-gray-600 italic leading-relaxed">"{ritual.reflection}"</p>
                ) : (
                  <div className="text-gray-400 text-xs italic">System awaiting end-of-day data ingest...</div>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-3 bg-black text-white overflow-hidden relative">
               <CardContent className="p-8 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                     <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-indigo-400">
                           <Brain className="h-5 w-5" />
                           <span className="text-xs font-black uppercase tracking-[0.2em]">Cortex Status</span>
                        </div>
                        <h2 className="text-4xl font-black leading-none">
                           SYSTEM OPERATING AT <br/> 
                           <span className="text-indigo-500">OPTIMAL VELOCITY</span>
                        </h2>
                        <div className="flex items-center space-x-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                           <div className="flex items-center"><Target className="h-3 w-3 mr-2 text-indigo-500" /> 4 Open Objectives</div>
                           <div className="flex items-center"><Zap className="h-3 w-3 mr-2 text-yellow-500" /> {habits.length - completedHabits.length} Habits Pending</div>
                           <div className="flex items-center"><Clock className="h-3 w-3 mr-2 text-blue-500" /> 14h Total Runway</div>
                        </div>
                     </div>
                     <div className="h-32 w-32 shrink-0 border-4 border-indigo-500/20 rounded-full flex items-center justify-center p-4 relative">
                        <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin-slow" />
                        <div className="text-center">
                           <div className="text-3xl font-black">82%</div>
                           <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Efficiency</div>
                        </div>
                     </div>
                  </div>
               </CardContent>
               <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
            </Card>
          </motion.div>
        )}

        {activeView === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-6"
          >
             <div className="text-center space-y-4 py-12">
                <div className="h-24 w-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-100 animate-pulse">
                   <Sun className="h-12 w-12" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">Morning Orientation</h2>
                <p className="text-gray-500 max-w-lg mx-auto">Calibrating your focus for the next 16 hours. Review your high-intensity blocks and acknowledge your commitment.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-2 flex items-center">
                      <Target className="h-4 w-4 mr-2" /> Top Priorities
                   </h3>
                   {openTasks.slice(0, 3).map((task, i) => (
                      <div key={i} className="p-5 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:shadow-md transition-shadow">
                         <div className="flex items-center space-x-4">
                            <div className="h-2 w-2 rounded-full bg-indigo-500" />
                            <span className="text-sm font-bold text-gray-900">{task.title}</span>
                         </div>
                         <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase">{task.module}</span>
                      </div>
                   ))}
                </div>

                <div className="space-y-4">
                   <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-2 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2" /> Habits Integration
                   </h3>
                   <div className="p-6 bg-indigo-900 text-white rounded-3xl space-y-6 shadow-xl shadow-indigo-100">
                      <div className="space-y-4">
                         {habits.map((habit, i) => (
                            <div key={i} className="flex items-center justify-between">
                               <span className="text-sm font-medium opacity-80">{habit.name}</span>
                               <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                            </div>
                         ))}
                      </div>
                      <div className="pt-6 border-t border-white/10">
                         <p className="text-[10px] text-indigo-300 italic">"The chains of habit are too light to be felt until they are too heavy to be broken."</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex justify-center pt-12">
                <button 
                  onClick={handleStartDay}
                  className="group relative px-12 py-5 bg-black text-white text-lg font-black rounded-full overflow-hidden hover:scale-105 transition-all shadow-2xl shadow-indigo-200"
                >
                   <span className="relative z-10 flex items-center">
                      ACTIVATE DAY <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                   </span>
                   <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
             </div>
          </motion.div>
        )}

        {activeView === 'end' && (
          <motion.div 
            key="end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-8"
          >
             <div className="text-center space-y-4 py-12">
                <div className="h-24 w-24 bg-indigo-900 text-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-100">
                   <Moon className="h-12 w-12" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">Evening Reflection</h2>
                <p className="text-gray-500 max-w-lg mx-auto">Reviewing output, harvesting lessons, and preparing the psyche for recovery.</p>
             </div>

             <div className="max-w-2xl mx-auto space-y-8">
                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 space-y-6">
                   <h3 className="text-sm font-bold text-gray-900 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-3 text-indigo-500" />
                      What did you learn today?
                   </h3>
                   <textarea 
                     value={reflectionText}
                     onChange={(e) => setReflectionText(e.target.value)}
                     placeholder="Synthesize your day into a core insight..."
                     className="w-full h-40 bg-white border border-gray-200 rounded-2xl p-6 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none font-medium text-gray-700"
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 bg-white border border-gray-100 rounded-3xl flex flex-col items-center text-center">
                      <div className="text-3xl font-black text-indigo-600 mb-1">{completedHabits.length}</div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Habits Completed</span>
                   </div>
                   <div className="p-6 bg-white border border-gray-100 rounded-3xl flex flex-col items-center text-center">
                      <div className="text-3xl font-black text-green-600 mb-1">100%</div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Commitment Logic</span>
                   </div>
                </div>

                <div className="flex justify-center pt-8">
                   <button 
                     onClick={handleEndDay}
                     className="px-12 py-5 bg-indigo-900 text-white text-lg font-black rounded-full hover:bg-black transition-all shadow-2xl shadow-indigo-200 flex items-center"
                   >
                      RENDER END & ARCHIVE <Shield className="ml-3 h-5 w-5 opacity-50" />
                   </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
