import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/src/components/ui/card';
import { Activity, Target, Wallet, Briefcase, Zap, Calendar as CalendarIcon, CheckCircle2, BrainCircuit, GitMerge, FileText, Clock, Sparkles, Battery, Sun, CloudRain, Bell } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { useState, useEffect } from 'react';

export function Dashboard() {
  const store = useZenithStore();
  const tasks = store.tasks || [];
  const habits = store.habits || [];
  const transactions = store.transactions || [];
  const opportunities = store.opportunities || [];
  const userProfile = store.userProfile;
  const systemStatus = store.systemStatus;
  const getIntelligenceSummary = store.getIntelligenceSummary;

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const totalBalance = transactions.reduce((acc, tx) => acc + (tx.type === 'income' ? tx.amount : -tx.amount), 0);
  const openTasks = tasks.filter(t => t.status === 'open');
  const finishedHabits = habits.filter(h => h.completedToday).length;

  const totalOppValue = opportunities.reduce((acc, opp) => acc + opp.value, 0);
  const hotOpps = opportunities.filter(o => o.status === 'hot' || o.status === 'warm').length;

  const dynamicSummary = getIntelligenceSummary();

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center">
            Good Morning, {userProfile.name.split(' ')[0]}
            <span className="ml-3 px-2 py-0.5 bg-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-indigo-500/20">Active Session</span>
          </h1>
          <p className="text-gray-400 mt-2 font-medium tracking-wide">Zenith Core Platform is online. <span className="text-indigo-400">All modules syncing at 12ms latency.</span></p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-[12px] font-black text-white bg-indigo-600/20 px-4 py-2 rounded-xl border border-indigo-500/20 flex items-center font-mono">
            <Clock className="mr-2 h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
            {formattedTime}
          </div>
          <div className="hidden sm:flex text-[10px] font-black text-gray-400 items-center uppercase tracking-[0.2em] bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <Battery className="mr-2 h-4 w-4 md:h-5 md:w-5 text-emerald-400" />
            {systemStatus.battery}%
          </div>
          <div className="hidden sm:flex text-[10px] font-black text-gray-400 items-center uppercase tracking-[0.2em] bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            {systemStatus.weather.condition.includes('Cloud') ? <CloudRain className="mr-2 h-4 w-4 md:h-5 md:w-5 text-blue-400" /> : <Sun className="mr-2 h-4 w-4 md:h-5 md:w-5 text-yellow-400" />}
            {systemStatus.weather.temp}°C
          </div>
        </div>
      </div>

      {/* Zenith Intelligence Summary */}
      <Card className="bg-gradient-to-br from-indigo-600 via-indigo-900 to-[#0d0d1a] text-white border-none shadow-2xl shadow-indigo-500/10 overflow-hidden relative group">
        <div className="absolute right-0 top-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
          <BrainCircuit className="w-96 h-96 -mt-20 -mr-20" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent)] pointer-events-none" />
        
        <CardHeader className="pb-4 border-b border-white/10 relative z-10">
          <CardTitle className="text-white flex items-center text-xl font-black tracking-tighter uppercase">
            <div className="p-2 bg-white/10 rounded-lg mr-3">
              <BrainCircuit className="h-5 w-5 md:h-6 md:w-6 text-indigo-300" /> 
            </div>
            Zenith Intelligence Feed
          </CardTitle>
          <CardDescription className="text-indigo-200/60 font-bold tracking-wider text-xs uppercase">Contextual insights across your Life Modules</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 relative z-10">
          <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-inner">
            <p className="text-white leading-relaxed text-base font-bold italic tracking-tight">
              <Sparkles className="inline-block mr-3 h-5 w-5 md:h-6 md:w-6 text-indigo-300 animate-pulse" />
              "{dynamicSummary}"
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 group/stat hover:bg-red-500/20 transition-all duration-300">
              <div className="flex items-center text-red-400 mb-2">
                <Activity className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Health Alert</span>
              </div>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">Recovery low (42%). Workout moved to tomorrow. Focus blocks protected.</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 group/stat hover:bg-emerald-500/20 transition-all duration-300">
              <div className="flex items-center text-emerald-400 mb-2">
                <Wallet className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Finance Status</span>
              </div>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">Budget in-sync. Vanguard sweep completed. Goal tracking: 84% met.</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 group/stat hover:bg-blue-500/20 transition-all duration-300">
              <div className="flex items-center text-blue-400 mb-2">
                <Target className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Education Delta</span>
              </div>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">45 ML flashcards due. Identified study window: 2PM-4PM Today.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-black/40 backdrop-blur-md border-t border-white/5 flex justify-between items-center py-4 relative z-10">
          <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest flex items-center">
             <GitMerge className="h-3 w-3 md:h-4 md:w-4 mr-2 animate-spin-slow" /> 14 Automations active
          </span>
          <button className="px-4 py-1.5 rounded-full bg-white text-indigo-900 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-300 transition-all">
            Review AI Settings
          </button>
        </CardFooter>
      </Card>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Net Worth" value={`$${totalBalance.toLocaleString()}`} trend="+2.4%" icon={Wallet} color="text-emerald-400" bgColor="bg-emerald-500/10" border="border-emerald-500/20" />
        <MetricCard title="Energy Status" value="Optimized" trend="Peak: 2PM" icon={Zap} color="text-yellow-400" bgColor="bg-yellow-500/10" border="border-yellow-500/20" />
        <MetricCard title="Tasks Done" value={tasks.filter(t => t.status === 'completed').length.toString()} trend={`${openTasks.length} left`} icon={CheckCircle2} color="text-indigo-400" bgColor="bg-indigo-500/10" border="border-indigo-500/20" />
        <MetricCard title="Network Opps" value={`$${(totalOppValue / 1000).toFixed(1)}k`} trend={`${hotOpps} active`} icon={Briefcase} color="text-purple-400" bgColor="bg-purple-500/10" border="border-purple-500/20" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content Area (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          <Card className="bg-[#121225] border-white/5 border shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
              <div>
                <CardTitle className="text-white text-lg font-black uppercase tracking-tighter">Unified Timeline</CardTitle>
                <CardDescription className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mt-1">Real-time synchronized events</CardDescription>
              </div>
              <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                <Clock className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative border-l-2 border-white/5 ml-3 space-y-8 pb-4">
                {[
                  { text: "Biometric correlation found: Elevated cortisol vs. task density", time: "Just now", module: "AI Analysis", icon: BrainCircuit, color: "text-indigo-400", bg: "bg-indigo-400/20" },
                  { text: "Transaction parsed: AWS Services ($124.00)", time: "2h ago", module: "Finance", icon: Wallet, color: "text-emerald-400", bg: "bg-emerald-400/20" },
                  { text: "PDF Vectorized: `lease_agreement_2025.pdf`", time: "4h ago", module: "Documents", icon: FileText, color: "text-blue-400", bg: "bg-blue-400/20" },
                  { text: "Handshake established with Hue Lighting System", time: "Morning", module: "IoT Hub", icon: GitMerge, color: "text-purple-400", bg: "bg-purple-400/20" }
                ].map((activity, i) => (
                  <div key={i} className="pl-10 relative">
                    <span className={`absolute -left-[18px] top-0 h-8 w-8 rounded-xl bg-[#121225] border border-white/5 flex items-center justify-center shadow-lg`}>
                      <activity.icon className={`h-4 w-4 md:h-5 md:w-5 ${activity.color}`} />
                    </span>
                    <p className="text-sm font-black text-white tracking-tight">{activity.text}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">{activity.time} • {activity.module}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Space */}
        <div className="space-y-6">
           <Card className="bg-[#121225] border-white/5 border shadow-xl">
             <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="text-white text-lg font-black uppercase tracking-tighter">Habit Momentum</CardTitle>
             </CardHeader>
             <CardContent className="pt-6">
               <div className="space-y-6">
                 {habits.map((habit, i) => (
                   <div key={i} className="flex items-center justify-between group">
                     <div className="flex items-center">
                       <div className={`h-8 w-8 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${habit.completedToday ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white/5 border border-white/10 text-gray-500 group-hover:border-indigo-500/50'}`}>
                         {habit.completedToday ? <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" /> : <div className="h-1.5 w-1.5 bg-gray-500 rounded-full" />}
                       </div>
                       <span className={`text-sm font-bold ${habit.completedToday ? 'text-gray-300 line-through' : 'text-white'}`}>{habit.name}</span>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest flex items-center px-3 py-1 bg-orange-400/10 rounded-full border border-orange-400/20">
                          🔥 {habit.streak}
                        </span>
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
             <CardFooter className="pt-0">
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/5 transition-all">
                  Configure Habits
                </button>
             </CardFooter>
           </Card>

           <Card className="bg-[#121225] border-white/5 border shadow-xl">
             <CardHeader className="border-b border-white/5 pb-4">
               <CardTitle className="text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center">
                 <Bell className="h-4 w-4 md:h-5 md:w-5 mr-2 text-red-500 animate-pulse" />
                 Nearing Alerts
               </CardTitle>
             </CardHeader>
             <CardContent className="pt-4 space-y-3">
               {[
                 { title: "Review Q4 Projections", due: "In 12m", priority: "high" },
                 { title: "Zero Inbox", due: "In 45m", priority: "medium" },
                 { title: "Client follow-up", due: "In 1h", priority: "low" }
               ].map((alert, i) => (
                 <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl group hover:border-red-500/30 transition-all">
                   <p className="text-[11px] font-black text-white">{alert.title}</p>
                   <div className="flex items-center justify-between mt-2">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{alert.due}</span>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${alert.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                        {alert.priority}
                      </span>
                   </div>
                 </div>
               ))}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon: Icon, color, bgColor, border }: any) {
  return (
    <div className={`rounded-2xl border ${border} ${bgColor} p-6 shadow-2xl shadow-indigo-900/5 group hover:scale-[1.02] transition-all duration-500 cursor-pointer`}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{title}</p>
        <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </div>
      </div>
      <div className="mt-6">
        <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
        <div className="mt-2 flex items-center">
           <div className={`h-1.5 w-1.5 rounded-full ${trend.startsWith('+') ? 'bg-emerald-500' : 'bg-indigo-500'} mr-2`} />
           <p className={`text-[10px] font-black uppercase tracking-widest text-gray-400`}>
             {trend}
           </p>
        </div>
      </div>
    </div>
  );
}
