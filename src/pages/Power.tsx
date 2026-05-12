import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { 
  Shield, Zap, AlertCircle, Plus, X, 
  Power as PowerIcon, Activity, MapPin, TrendingUp, BarChart3, Settings, AlertTriangle,
  Home, Monitor, Wind, Lamp, Radio, Smartphone, ChevronRight, Lock, CheckCircle2,
  Battery, Sun, Cloud, Clock as ClockIcon, Bell, BellOff
} from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { motion, AnimatePresence } from 'motion/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ComposedChart } from 'recharts';
import { cn } from '@/src/lib/utils';

const FloorPlanPin = ({ top, left, label, status, icon: Icon }: any) => (
  <div 
    className="absolute cursor-pointer group"
    style={{ top: `${top}%`, left: `${left}%` }}
  >
    <div className="relative flex flex-col items-center">
      <div className={`p-1.5 rounded-full shadow-lg border-2 border-white transition-all transform group-hover:scale-110 ${
        status === 'high' ? 'bg-red-500' : status === 'active' ? 'bg-green-500' : 'bg-gray-400'
      }`}>
        <Icon className="h-3 w-3 md:h-4 md:w-4 text-white" />
      </div>
      <div className="absolute top-full mt-2 bg-black/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
        {label} {status === 'high' ? '!!' : ''}
      </div>
    </div>
  </div>
);

export function Power() {
  const store = useZenithStore();
  const iotDevices = store.iotDevices || [];
  const { toggleIoTDevice } = store;

  const [activeTab, setActiveTab] = useState<'dashboard' | 'strategy'>('dashboard');
  const [editingLimit, setEditingLimit] = useState(false);
  const [newLimit, setNewLimit] = useState('20');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUpdateLimit = () => {
    store.setPowerLimit({ target: 'Global', threshold_kWh: parseFloat(newLimit), action: 'auto-off' });
    setEditingLimit(false);
  };

  const totalConsumption = useMemo(() => 
    iotDevices.reduce((acc, dev) => acc + (dev.consumption_kWh || 0), 0).toFixed(1),
  [iotDevices]);

  const activeCount = iotDevices.filter(d => d.power).length;
  const currentLimit = store.powerLimits[0]?.threshold_kWh || 20;

  const chartData = [
    { day: 'Mon', actual: 12, predicted: 10 },
    { day: 'Tue', actual: 18, predicted: 15 },
    { day: 'Wed', actual: 14, predicted: 16 },
    { day: 'Thu', actual: 22, predicted: 18 },
    { day: 'Fri', actual: 28, predicted: 25 },
    { day: 'Sat', actual: 35, predicted: 30 },
    { day: 'Sun', actual: 18.5, predicted: 38 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Grid Infrastructure</h1>
          <p className="text-gray-500 mt-1 font-medium tracking-wide">Infrastructure oversight, IoT orchestration, and energy logistics.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 bg-white/50 border border-gray-100 p-2 rounded-2xl backdrop-blur-xl shadow-lg">
          <div className="px-4 py-2 bg-gray-900 text-white rounded-xl flex items-center space-x-3">
             <ClockIcon className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
             <div className="text-sm font-black italic tracking-widest tabular-nums uppercase">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
             </div>
          </div>
          
          <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 flex items-center space-x-3 group cursor-help">
             <Battery className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 animate-pulse" />
             <div className="text-xs font-black text-gray-900 uppercase tracking-tighter">94% Core</div>
          </div>

          <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 flex items-center space-x-3">
             <Sun className="h-4 w-4 md:h-5 md:w-5 text-orange-400" />
             <div className="text-xs font-black text-gray-900 uppercase tracking-tighter">24°C High Alpha</div>
          </div>

          <div className="flex space-x-1">
            <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100">
               <BellOff className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 shadow-inner">
               <Bell className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Grid Load" value={`${totalConsumption} kWh`} trend="Stable" icon={Zap} color="text-indigo-500" />
        <MetricCard title="Active Nodes" value={activeCount} trend="5 Managed" icon={Home} color="text-emerald-500" />
        <MetricCard title="Limit Status" value={`${currentLimit} kWh`} trend="92% Threshold" icon={AlertCircle} color="text-orange-500" />
        <MetricCard title="Predictive Drift" value="+11%" trend="Peak: Friday" icon={TrendingUp} color="text-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-[#0f172a] border-none shadow-2xl relative overflow-hidden flex flex-col p-1">
          <div className="bg-[#1e293b] rounded-[inherit] h-full flex flex-col pt-8 overflow-hidden">
            <CardHeader className="px-8 pb-0">
               <CardTitle className="text-[10px] font-black text-indigo-400 uppercase tracking-[.2em] mb-2">Neural Floorplan Overlay</CardTitle>
               <CardDescription className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Live biological vs technical heat mapping.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 relative min-h-[400px] flex items-center justify-center p-0">
              <div className="relative w-[450px] h-[320px] bg-indigo-500/5 rounded-[60px] rotate-[-15deg] skew-x-[15deg] border-4 border-indigo-500/20 shadow-[0_60px_120px_rgba(0,0,0,0.6)] group transition-transform duration-1000">
                 <div className="absolute inset-0 border-r-2 border-b-2 border-indigo-500/10" />
                 <div className="absolute left-[30%] top-0 bottom-0 w-px bg-indigo-500/20" />
                 <div className="absolute right-0 left-0 top-[40%] h-px bg-indigo-500/20" />
                 
                 <div className="absolute inset-x-0 bottom-0 top-[60%] left-[30%] bg-indigo-500/5" />

                 <FloorPlanPin top={20} left={15} label="Strategic Study" status="active" icon={Lamp} />
                 <FloorPlanPin top={15} left={70} label="Command Center" status="active" icon={Monitor} />
                 <FloorPlanPin top={65} left={75} label="Infrastructure" status="idle" icon={Settings} />
                 <FloorPlanPin top={45} left={40} label="Nutrition Lab" status="active" icon={Zap} />
                 <FloorPlanPin top={75} left={25} label="Recovery Quarter" status="high" icon={Wind} />
              </div>

               <div className="absolute bottom-8 left-8 right-8 flex justify-between bg-black/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/5 shadow-2xl group-hover:translate-y-[-10px] transition-transform duration-700">
                 <div className="text-center">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter mb-1">Active Density</div>
                    <div className="text-2xl font-black text-white italic tracking-tighter">{activeCount}</div>
                 </div>
                 <div className="h-12 w-px bg-white/10" />
                 <div className="text-center cursor-pointer group/limit" onClick={() => { setEditingLimit(true); setNewLimit(currentLimit.toString()); }}>
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter mb-1 flex items-center justify-center group-hover/limit:text-white transition-colors">
                      Threshold {editingLimit ? '' : <Settings className="h-2.5 w-2.5 ml-1.5 opacity-50" />}
                    </div>
                    {editingLimit ? (
                      <input 
                        autoFocus
                        className="w-16 bg-white/10 border border-indigo-500 rounded-lg px-2 py-1 text-sm font-black outline-none text-white text-center"
                        value={newLimit}
                        onChange={e => setNewLimit(e.target.value)}
                        onBlur={handleUpdateLimit}
                        onKeyDown={e => e.key === 'Enter' && handleUpdateLimit()}
                      />
                    ) : (
                      <div className="text-2xl font-black text-white italic tracking-tighter">{currentLimit} <span className="text-[10px] text-gray-500 uppercase">kWh</span></div>
                    )}
                 </div>
                 <div className="h-12 w-px bg-white/10" />
                 <div className="text-center">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter mb-1">Grid Output</div>
                    <div className="text-2xl font-black text-white italic tracking-tighter">{totalConsumption} <span className="text-[10px] text-gray-500 uppercase">kWh</span></div>
                 </div>
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="bg-[#0f172a] border-none shadow-2xl overflow-hidden flex flex-col p-1">
          <div className="bg-[#1e293b] rounded-[inherit] h-full flex flex-col pt-8">
            <CardHeader className="px-8 pb-6">
              <CardTitle className="text-[10px] font-black text-indigo-400 uppercase tracking-[.2em]">Flux Cycles (7D)</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-4">
               <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                      <defs>
                        <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                      <XAxis 
                         dataKey="day" 
                         axisLine={false} 
                         tickLine={false} 
                         tick={{ fontSize: 9, fill: '#64748b', fontWeight: '900' }} 
                      />
                      <YAxis 
                         axisLine={false} 
                         tickLine={false} 
                         tick={{ fontSize: 9, fill: '#64748b', fontWeight: '900' }} 
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                        itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }}
                      />
                      <Bar dataKey="actual" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={24} />
                      <Area 
                         type="monotone" 
                         dataKey="predicted" 
                         stroke="#fbbf24" 
                         strokeWidth={3} 
                         fill="url(#usageGrad)" 
                         dot={{ r: 4, fill: '#fbbf24', strokeWidth: 2, stroke: '#1e293b' }} 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mt-8 px-4 pb-8">
                  <div className="bg-black/20 p-5 rounded-2xl border border-white/5 group hover:border-indigo-500/20 transition-all">
                     <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Aggregate Cycles</div>
                     <div className="flex items-center justify-between">
                        <div className="text-2xl font-black text-white italic tracking-tighter">112.4 <span className="text-[10px] text-gray-600 uppercase">kWh</span></div>
                        <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                     </div>
                  </div>
                  <div className="bg-black/20 p-5 rounded-2xl border border-white/5 group hover:border-orange-500/20 transition-all">
                     <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Predictive Delta</div>
                     <div className="flex items-center justify-between">
                        <div className="text-2xl font-black text-white italic tracking-tighter">125.1 <span className="text-[10px] text-gray-600 uppercase">kWh</span></div>
                        <span className="text-[10px] font-black text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-md border border-orange-400/20">+11.2%</span>
                     </div>
                  </div>
               </div>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden p-0">
          <CardHeader className="px-8 pt-8 pb-6 border-b border-gray-50">
            <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Atmospheric & IoT Controls</CardTitle>
            <CardDescription className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mt-1">Live management of environment parameters and grid nodes.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
                {iotDevices.map((dev) => (
                   <div key={dev.id} className="p-6 flex items-center justify-between group hover:bg-gray-50/50 transition-all">
                      <div className="flex items-center space-x-5">
                         <div className={cn(
                           "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all shadow-sm",
                           dev.power ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                         )}>
                            {dev.type === 'Lighting' ? <Lamp className="h-7 w-7" /> : dev.type === 'Health' ? <Activity className="h-7 w-7" /> : <Zap className="h-7 w-7" />}
                         </div>
                         <div>
                            <div className="flex items-center space-x-3">
                              <h4 className="text-base font-black text-gray-900 uppercase italic tracking-tight">{dev.name}</h4>
                              {dev.consumption_kWh && dev.consumption_kWh > 0.5 && (
                                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-black uppercase rounded-md border border-orange-200">Heavy Load</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 mt-1">
                               {dev.value ? (
                                 <input 
                                   className="bg-transparent border-none text-[10px] text-indigo-600 font-black uppercase tracking-widest outline-none w-24 focus:ring-1 focus:ring-indigo-100 rounded"
                                   value={dev.value}
                                   onChange={e => store.updateIoTDeviceValue(dev.id, e.target.value)}
                                 />
                               ) : (
                                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Usage: {dev.consumption_kWh || 0} kWh</span>
                               )}
                               <span className="h-1 w-1 bg-gray-300 rounded-full" />
                               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{dev.type}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center space-x-4">
                         <div className="text-right hidden sm:block mr-4">
                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Status</div>
                            <div className={cn("text-[10px] font-black uppercase italic tracking-tight", dev.power ? 'text-emerald-500' : 'text-gray-400')}>
                              {dev.power ? 'Grid Engaged' : 'Terminated'}
                            </div>
                         </div>
                         <button 
                           onClick={() => store.toggleIoTDevice(dev.id)}
                           className={cn(
                             "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm",
                             dev.power ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' : 'bg-gray-900 text-white hover:bg-indigo-600'
                           )}
                         >
                           {dev.power ? 'Offline' : 'Online'}
                         </button>
                      </div>
                   </div>
                ))}
             </div>
             <div className="p-8 bg-gray-50/50">
               <button className="w-full py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20">
                  Execute Emergency Grid Termination
               </button>
             </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121121] border-white/5 border text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
               <Shield className="h-32 w-32" />
           </div>
           <CardHeader className="border-b border-white/5 pb-6">
             <CardTitle className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center">
               <AlertTriangle className="h-4 w-4 mr-3" />
               Logistical Notifications
             </CardTitle>
           </CardHeader>
           <CardContent className="pt-8 space-y-8 relative z-10">
              <div className="space-y-4">
                 <div className="flex items-center space-x-3 text-orange-500 mb-2">
                    <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Active Breaches</span>
                 </div>
                 <div className="bg-orange-500/5 p-4 rounded-2xl border border-orange-500/20 group/alert">
                    <div className="flex items-center space-x-4">
                       <div className="p-2 bg-orange-500/20 rounded-xl">
                          <Wind className="h-5 w-5 text-orange-500" />
                       </div>
                       <div>
                          <h5 className="text-[11px] font-black text-white italic uppercase tracking-tight">Environmental Threshold</h5>
                          <p className="text-[9px] font-bold text-orange-400 uppercase tracking-widest mt-0.5">Bedroom AC • Auto-Termination</p>
                       </div>
                    </div>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/10 group/alert">
                    <div className="flex items-center space-x-4">
                       <div className="p-2 bg-indigo-500/20 rounded-xl">
                          <Activity className="h-5 w-5 text-indigo-400" />
                       </div>
                       <div>
                          <h5 className="text-[11px] font-black text-white italic uppercase tracking-tight">Usage Warning</h5>
                          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Limit nearing 92% of threshold</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                 <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Strategic Forecast</div>
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                    <div className="flex items-center space-x-4">
                       <TrendingUp className="h-5 w-5 text-indigo-400" />
                       <div className="text-[11px] font-black text-white italic uppercase tracking-tight">
                         Demand Spike Forecasted <span className="text-indigo-400 ml-2">FRI</span>
                       </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                 </div>
                 <div className="bg-indigo-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-xl shadow-indigo-600/20 group cursor-pointer hover:scale-[1.02] transition-all">
                    <div className="flex items-center space-x-4">
                       <Lamp className="h-5 w-5 text-yellow-300" />
                       <div className="text-[11px] font-black italic uppercase tracking-tight">
                         Optimization: Off-Peak Laundry
                       </div>
                    </div>
                    <CheckCircle2 className="h-4 w-4" />
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon: Icon, color }: any) {
  return (
    <Card className="bg-white border-none shadow-sm group hover:shadow-md transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:rotate-12 transition-transform duration-500">
        <Icon className="h-16 w-16 text-black" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-black text-gray-900 tracking-tighter italic">{value}</div>
            <p className={cn("text-[9px] font-black uppercase tracking-widest mt-1", color)}>{trend}</p>
          </div>
          <div className={cn("p-3 rounded-2xl border transition-all shadow-sm bg-current bg-opacity-5 border-current border-opacity-10", color)}>
            <Icon className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

