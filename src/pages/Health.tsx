import { CheckCircle as CircleCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Health() {
  const { healthLogs, addHealthLog } = useZenithStore();
  const [isLogging, setIsLogging] = useState(false);
  const [logData, setLogData] = useState({ type: 'recovery', value: '' });

  const handleLog = () => {
    if (!logData.value) return;
    addHealthLog({
      type: logData.type as any,
      value: isNaN(Number(logData.value)) ? logData.value : Number(logData.value)
    });
    setLogData({ type: 'recovery', value: '' });
    setIsLogging(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Bio-Performance Lab</h1>
          <p className="text-gray-500 mt-1 font-medium tracking-wide">Biological telemetrics, metabolic tracking, and recovery optimization.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsLogging(!isLogging)}
            className="flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            {isLogging ? 'Cancel' : 'Manual Entry'}
          </button>
          <button className="flex items-center px-6 py-3 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20">
            <Activity className="mr-2 h-4 w-4" />
            Sync Wearable
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isLogging && (
          <motion.div initial={{ opacity: 0, y: -20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }}>
            <Card className="bg-gray-900 text-white border-none shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />
               <CardContent className="pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Metric Type</label>
                      <select 
                        value={logData.type}
                        onChange={(e) => setLogData({...logData, type: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-bold appearance-none"
                      >
                        <option value="recovery" className="bg-gray-900">Recovery %</option>
                        <option value="sleep" className="bg-gray-900">Sleep Window</option>
                        <option value="exercise" className="bg-gray-900">Exercise Log</option>
                        <option value="mood" className="bg-gray-900">Mood Scale</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Metric Value</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 85 or '7h 12m'" 
                        value={logData.value}
                        onChange={(e) => setLogData({...logData, value: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-bold placeholder:text-gray-600" 
                      />
                    </div>
                    <div className="flex items-end">
                      <button onClick={handleLog} className="w-full py-3 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">Log Entry</button>
                    </div>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <HealthMetricCard title="Recovery" value="42%" trend="-18%" color="text-red-500" icon={Zap} bg="bg-red-50" />
        <HealthMetricCard title="Sleep Quality" value="88%" trend="+4%" color="text-blue-500" icon={Moon} bg="bg-blue-50" />
        <HealthMetricCard title="HRV Average" value="65ms" trend="+3ms" color="text-emerald-500" icon={Activity} bg="bg-emerald-50" />
        <HealthMetricCard title="Metabolic State" value="OPTIMAL" trend="Ketogenic" color="text-orange-500" icon={TrendingUp} bg="bg-orange-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-6 px-6">
              <div>
                <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Telemetric Trends</CardTitle>
                <CardDescription className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Correlation analysis: Sleep vs High-Intensity Focus.</CardDescription>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button className="px-4 py-1.5 bg-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">1W</button>
                <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">1M</button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full bg-gray-50/50 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 group">
                <Activity className="h-12 w-12 text-gray-200 group-hover:scale-110 group-hover:text-red-200 transition-all duration-1000 mb-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">Biometric Overlay Rendering...</span>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
                 <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:border-indigo-100 transition-colors">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Sleep Variance</h5>
                    <div className="flex items-center justify-between">
                      <p className="text-lxl font-black text-gray-900 uppercase italic tracking-tighter">+12m</p>
                      <CircleCheck className="h-5 w-5 text-emerald-500" />
                    </div>
                 </div>
                 <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:border-red-100 transition-colors">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Resting Heart Rate</h5>
                    <div className="flex items-center justify-between">
                      <p className="text-lxl font-black text-gray-900 uppercase italic tracking-tighter">52 BPM</p>
                      <Heart className="h-5 w-5 text-red-500 animate-pulse" />
                    </div>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#121225] border-white/5 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
               <Apple className="h-32 w-32" />
            </div>
            <CardHeader className="border-b border-white/5 pb-4 relative z-10">
              <CardTitle className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center">
                <Apple className="mr-2 h-4 w-4" />
                Nutrition Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 relative z-10">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <h6 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Target Window</h6>
                <p className="text-lg font-black text-white italic uppercase tracking-tight">12:00 PM – 08:00 PM</p>
                <div className="mt-3 flex items-center text-[10px] font-bold text-indigo-400 bg-indigo-500/10 w-fit px-3 py-1 rounded-full border border-indigo-500/20">
                  <Moon className="h-3 w-3 mr-1.5" /> Fasted State Active
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Protein Intake</span>
                   <span className="text-xs font-black text-white italic uppercase tracking-tighter">45 / 180g</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
                </div>
              </div>

               <div className="space-y-3">
                <div className="flex justify-between items-end">
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Hydration Balance</span>
                   <span className="text-xs font-black text-white italic uppercase tracking-tighter">2.4 / 4.0L</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} className="h-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-600 text-white border-none shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-700 opacity-60" />
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
               <Zap className="h-24 w-24" />
             </div>
             <CardContent className="pt-8 relative z-10">
                <h3 className="text-[10px] font-black flex items-center mb-4 uppercase tracking-[0.2em] text-red-200">
                  <span className="h-2 w-2 bg-red-200 rounded-full mr-2 animate-ping" />
                  Performance Adjust
                </h3>
                <p className="text-xs text-white leading-relaxed font-bold tracking-tight mb-6">
                  "System detected high sympathetic drive. Recommending shift from High-Threshold training to Zone 2 recovery. Magnesium reminder enabled for 21:00."
                </p>
                <button className="w-full py-4 bg-white text-red-900 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all shadow-xl shadow-black/10">
                  Deploy Adjustment
                </button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function HealthMetricCard({ title, value, trend, icon: Icon, color, bg }: any) {
  return (
    <Card className="border-none shadow-sm bg-white group hover:shadow-md transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:rotate-6 transition-transform duration-500">
        <Icon className="h-16 w-16 text-black" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-4xl font-black text-gray-900 tracking-tighter italic">{value}</div>
            <p className={cn("text-[10px] font-black uppercase tracking-widest mt-1", trend.includes('-') ? 'text-red-500' : 'text-emerald-500')}>
              {trend} vs Baseline
            </p>
          </div>
          <div className={cn("p-3 rounded-2xl shadow-inner border", bg, color, "border-current border-opacity-10")}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
