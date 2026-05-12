import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/src/components/ui/card';
import { Target, Plus, CheckCircle2, Flame, Clock, Award, X, Bell, Volume2, Smartphone, ShieldAlert, Zap } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Discipline() {
  const store = useZenithStore();
  const habits = store.habits || [];
  const tasks = store.tasks || [];
  const { toggleHabit, toggleTask, addTask, addHabit } = store;
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newHabitName, setNewHabitName] = useState('');

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [ringtonesEnabled, setRingtonesEnabled] = useState(true);
  const [overrideActive, setOverrideActive] = useState(true);
  const [showPopupDemo, setShowPopupDemo] = useState(false);

  const openTasks = tasks.filter(t => t.status === 'open');
  const completedToday = habits.filter(h => h.completedToday).length;

  const upcomingAlerts = [
    { id: '1', title: 'Task Nearing: Review Q4 Projections', due: 'In 12m', priority: 'high' },
    { id: '2', title: 'Habit Reminder: Zero Inbox', due: 'In 45m', priority: 'medium' },
    { id: '3', title: 'Context Switch: Focus -> Reflection', due: 'In 2h', priority: 'low' },
  ];

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    addTask({
      title: newTaskTitle,
      module: 'Discipline',
      status: 'open',
      priority: 'medium'
    });
    setNewTaskTitle('');
    setShowTaskForm(false);
  };

  const handleAddHabit = () => {
    if (!newHabitName.trim()) return;
    addHabit({ name: newHabitName });
    setNewHabitName('');
    setShowHabitForm(false);
  };

  return (
    <div className="space-y-6 relative">
      <AnimatePresence>
        {showPopupDemo && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-10 right-10 z-[100] w-80"
          >
            <Card className="bg-black text-white border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.3)]">
              <CardHeader className="pb-2 border-b border-white/10">
                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center">
                  <Zap className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-400" />
                  Zenith High-Priority
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-xs font-bold leading-relaxed">
                  Attention: <span className="text-indigo-400">Review Q4 Projections</span> is entering its final hour. Protocol: EXECUTE NOW.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <button onClick={() => setShowPopupDemo(false)} className="flex-1 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-lg">Acknowledge</button>
                <button onClick={() => setShowPopupDemo(false)} className="flex-1 py-2 bg-white/5 text-gray-400 text-[10px] font-black uppercase rounded-lg">Snooze (15m)</button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase italic">Discipline & Protocol</h1>
          <p className="text-gray-500 mt-1 font-medium tracking-wide">Governance of high-leverage execution and sensory control.</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowHabitForm(true)}
            className="flex items-center px-4 py-2 border border-white/10 bg-[#121225] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all shadow-xl"
          >
            <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
            Add Habit
          </button>
          <button 
            onClick={() => setShowTaskForm(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
          >
            <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            New Task
          </button>
        </div>
      </div>

      {(showTaskForm || showHabitForm) && (
        <Card className="bg-gray-50 border-gray-200">
           <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <input 
                  autoFocus
                  type="text" 
                  value={showTaskForm ? newTaskTitle : newHabitName}
                  onChange={(e) => showTaskForm ? setNewTaskTitle(e.target.value) : setNewHabitName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (showTaskForm ? handleAddTask() : handleAddHabit())}
                  placeholder={showTaskForm ? "What is your next high-leverage action?" : "New habit name (e.g. Meditation 20m)"} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button onClick={showTaskForm ? handleAddTask : handleAddHabit} className="px-4 py-2 bg-black text-white rounded-lg text-sm font-bold">Add</button>
                <button onClick={() => { setShowTaskForm(false); setShowHabitForm(false); }} className="p-2 text-gray-400 hover:text-red-500"><X className="h-5 w-5 md:h-6 md:w-6" /></button>
              </div>
           </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Controls & Upcoming */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-[#121225] border-white/5 text-white">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300">Sensory Controls</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn("p-2 rounded-lg", notificationsEnabled ? "bg-indigo-600/20 text-indigo-400" : "bg-white/5 text-gray-600")}>
                      <Bell className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">Protocol Popups</span>
                  </div>
                  <button 
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={cn("w-10 h-5 rounded-full relative transition-all", notificationsEnabled ? "bg-indigo-600" : "bg-gray-800")}
                  >
                    <div className={cn("absolute top-1 h-3 w-3 bg-white rounded-full transition-all", notificationsEnabled ? "right-1" : "left-1")} />
                  </button>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn("p-2 rounded-lg", ringtonesEnabled ? "bg-indigo-600/20 text-indigo-400" : "bg-white/5 text-gray-600")}>
                      <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">High-Tone Alerts</span>
                  </div>
                  <button 
                    onClick={() => setRingtonesEnabled(!ringtonesEnabled)}
                    className={cn("w-10 h-5 rounded-full relative transition-all", ringtonesEnabled ? "bg-indigo-600" : "bg-gray-800")}
                  >
                    <div className={cn("absolute top-1 h-3 w-3 bg-white rounded-full transition-all", ringtonesEnabled ? "right-1" : "left-1")} />
                  </button>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn("p-2 rounded-lg", overrideActive ? "bg-red-600/20 text-red-400" : "bg-white/5 text-gray-600")}>
                      <ShieldAlert className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">App Override</span>
                  </div>
                  <button 
                    onClick={() => setOverrideActive(!overrideActive)}
                    className={cn("w-10 h-5 rounded-full relative transition-all", overrideActive ? "bg-red-600" : "bg-gray-800")}
                  >
                    <div className={cn("absolute top-1 h-3 w-3 bg-white rounded-full transition-all", overrideActive ? "right-1" : "left-1")} />
                  </button>
               </div>
               
               <button 
                onClick={() => setShowPopupDemo(true)}
                className="w-full mt-4 py-2 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase rounded-lg hover:bg-indigo-500 hover:text-white transition-all tracking-widest"
               >
                 Test Critical Popup
               </button>
            </CardContent>
          </Card>

          <Card className="bg-[#121225] border-white/5 text-white">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-red-400 flex items-center">
                <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                Nearing Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {upcomingAlerts.map(alert => (
                <div key={alert.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center group hover:border-indigo-500/50 transition-all">
                  <div>
                    <p className="text-[11px] font-black tracking-tight">{alert.title}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{alert.due}</span>
                      <span className="mx-2 text-gray-800">•</span>
                      <span className={cn("text-[9px] font-black uppercase tracking-tighter", alert.priority === 'high' ? 'text-red-400' : 'text-indigo-400')}>
                        {alert.priority}
                      </span>
                    </div>
                  </div>
                  <Bell className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-600 group-hover:text-indigo-400 transition-colors" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Habit Tracking */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Daily Habits</CardTitle>
              <CardDescription>Consistency is the only metric that matters.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {habits.map((habit) => (
                  <div key={habit.id} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <button 
                          onClick={() => toggleHabit(habit.id)}
                          className={cn(
                            "h-6 w-6 rounded-md flex items-center justify-center border transition-all",
                            habit.completedToday 
                              ? "bg-black border-black text-white" 
                              : "border-gray-200 group-hover:border-gray-400 bg-white"
                          )}
                        >
                          {habit.completedToday && <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" />}
                        </button>
                        <span className={cn(
                          "ml-3 text-sm font-medium transition-colors",
                          habit.completedToday ? "text-gray-400 line-through" : "text-gray-900"
                        )}>
                          {habit.name}
                        </span>
                      </div>
                      <div className="flex items-center bg-orange-50 px-2 py-0.5 rounded-full text-orange-600 text-xs font-bold">
                        <Flame className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                        {habit.streak}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center rounded-b-xl">
              <span className="text-xs text-gray-500">Progress: {completedToday}/{habits.length}</span>
              <div className="flex-1 max-w-[120px] h-1.5 bg-gray-200 rounded-full ml-4 overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: `${(completedToday / (habits.length || 1)) * 100}%` }} />
              </div>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                Momentum Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">84%</div>
              <p className="text-indigo-100 text-xs mt-2">You are currently in a "Flow State" cycle. Maintain discipline for 2 more days to reach 90%.</p>
            </CardContent>
          </Card>
        </div>

        {/* Task Management */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Tasks</CardTitle>
                <CardDescription>Prioritized for execution speed.</CardDescription>
              </div>
              <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {openTasks.length} PENDING
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {openTasks.map((task) => (
                  <div key={task.id} className="flex items-center p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm transition-all group">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className="h-5 w-5 rounded border border-gray-300 flex-shrink-0 group-hover:border-black transition-colors"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
                      <div className="flex items-center mt-1 space-x-3">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" /> {task.dueDate || 'Today'}
                        </span>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                          task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {task.module}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {openTasks.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-sm text-gray-400 italic">No pending tasks. Great work.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
