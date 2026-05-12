import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { 
  Zap, 
  Activity, 
  Settings, 
  Plus, 
  ArrowRight, 
  Workflow, 
  Hash, 
  Clock,
  TrendingUp,
  FileText,
  LucideIcon
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ModulePreset {
  icon: LucideIcon;
  color: string;
  actionLabel: string;
  activityType: string;
  stats: { label: string; value: string; trend: string }[];
}

const MODULE_PRESETS: Record<string, ModulePreset> = {
  "Default": {
    icon: Workflow,
    color: "text-indigo-500",
    actionLabel: "Add Entry",
    activityType: "interaction",
    stats: [
      { label: "Active Threads", value: "12", trend: "+2" },
      { label: "Sync Status", value: "99.8%", trend: "Stable" },
    ]
  },
  "Labs": {
    icon: Zap,
    color: "text-yellow-500",
    actionLabel: "Launch Experiment",
    activityType: "trial",
    stats: [
      { label: "Experiments", value: "4", trend: "Active" },
      { label: "Neural Load", value: "12%", trend: "-5%" },
    ]
  },
  "Archive": {
    icon: FileText,
    color: "text-gray-400",
    actionLabel: "New Record",
    activityType: "entry",
    stats: [
      { label: "Total Assets", value: "1.2k", trend: "+45" },
      { label: "Compression", value: "85%", trend: "Optimal" },
    ]
  },
  "Network": {
    icon: Activity,
    color: "text-emerald-500",
    actionLabel: "Test Node",
    activityType: "ping",
    stats: [
      { label: "Health Score", value: "A+", trend: "Excellent" },
      { label: "Throughput", value: "4.2 GB/s", trend: "+0.4" },
    ]
  }
};

export function GenericModule({ title, description }: { title: string, description: string }) {
  const preset = MODULE_PRESETS[title] || MODULE_PRESETS["Default"];
  const Icon = preset.icon;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
             <div className={cn("p-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center", preset.color)}>
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Relational Module</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white italic uppercase">{title}</h1>
          <p className="text-gray-500 mt-1 font-medium italic">{description}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 bg-[#121225] border border-white/5 rounded-xl flex items-center space-x-3">
             <Clock className="h-4 w-4 text-indigo-400" />
             <div className="text-xs font-black text-gray-400 uppercase tracking-widest tabular-nums italic">
                Last Sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {preset.stats.map((stat, i) => (
          <Card key={i} className="bg-[#121225] border-white/5 shadow-xl relative overflow-hidden group hover:border-indigo-500/30 transition-all">
             <CardContent className="p-5">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-2xl font-black text-white italic tracking-tighter">{stat.value}</p>
                   </div>
                   <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">{stat.trend}</div>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                   <TrendingUp className="h-20 w-20 text-white" />
                </div>
             </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0d0d1a] border-white/5 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 rotate-12">
               <Workflow className="h-48 w-48 text-indigo-500" />
            </div>
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-white text-lg font-black uppercase tracking-tighter flex items-center">
                <Hash className="mr-3 h-5 w-5 text-indigo-400" />
                Live {title} Stream
              </CardTitle>
              <CardDescription className="text-gray-500 font-bold text-[10px] uppercase tracking-widest italic">Monitoring all relational {preset.activityType} updates.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-6 flex items-center justify-between hover:bg-white/5 transition-all group">
                    <div className="flex items-center space-x-6">
                       <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-indigo-500/30 transition-all">
                          <Activity className={cn("h-6 w-6", preset.color)} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-white uppercase italic tracking-tight group-hover:text-indigo-400 transition-colors">Event_Delta_0{item}</p>
                          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">Status: Processed & Indexed</p>
                       </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-800 group-hover:text-indigo-500 transition-all group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white/5 flex items-center justify-center">
                 <button className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-[0.3em] transition-all flex items-center">
                    Decrypt All Activity <ArrowRight className="ml-3 h-3 w-3" />
                 </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#121225] border-white/5 shadow-2xl">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-white text-xs font-black uppercase tracking-[0.3em]">Quick Directives</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between px-5 py-4 bg-white text-black rounded-xl hover:bg-indigo-400 transition-all group shadow-xl">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center">
                    <Plus className="mr-3 h-4 w-4" />
                    {preset.actionLabel}
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-30 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="w-full flex items-center justify-between px-5 py-4 bg-white/5 text-gray-300 border border-white/5 rounded-xl hover:bg-white/10 transition-all group">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center">
                    <FileText className="mr-3 h-4 w-4 text-indigo-400" />
                    Archive Logs
                  </span>
                </button>

                <button className="w-full flex items-center justify-between px-5 py-4 bg-white/5 text-gray-300 border border-white/5 rounded-xl hover:bg-white/10 transition-all group">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center">
                    <Settings className="mr-3 h-4 w-4 text-indigo-400" />
                    Core config
                  </span>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 border-none shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:rotate-12 transition-transform duration-500">
                <Zap className="h-24 w-24 text-white" />
             </div>
             <CardContent className="p-8 relative z-10">
                <h4 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4">Neural Link Established</h4>
                <p className="text-indigo-100 text-xs font-bold leading-relaxed mb-6 opacity-80 uppercase tracking-widest">
                   The {title} module is currently feeding 12-bit relational data into the Zenith core.
                </p>
                <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                   <div className="h-full w-4/5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
