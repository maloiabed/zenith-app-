import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Briefcase, CreditCard, Users, LineChart, Plus, ArrowUpRight, DollarSign, Target, CheckCircle2, X } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Business() {
  const { projects, addProject } = useZenithStore();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', revenue: '' });

  const handleAdd = () => {
    if (!formData.name || !formData.revenue) return;
    addProject({
      name: formData.name,
      revenue: parseFloat(formData.revenue),
      status: 'active'
    });
    setFormData({ name: '', revenue: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Business Engine</h1>
          <p className="text-gray-500 mt-1 font-medium tracking-wide">Project oversight, revenue tracking, and client intelligence.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
            <Users className="mr-2 h-4 w-4 text-indigo-600" />
            CRM Hub
          </button>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
          >
            {isAdding ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {isAdding ? 'Cancel' : 'New Venture'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, y: -20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }}>
            <Card className="bg-gray-900 text-white border-none shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
               <CardContent className="pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Venture Title</label>
                      <input 
                        type="text" 
                        placeholder="Project Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold placeholder:text-gray-600" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Projected Revenue</label>
                      <input 
                        type="number" 
                        placeholder="USD" 
                        value={formData.revenue}
                        onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold placeholder:text-gray-600" 
                      />
                    </div>
                    <div className="flex items-end">
                      <button onClick={handleAdd} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">Initialize Project</button>
                    </div>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Active Pipeline" value="$45,200" trend="+12.4%" icon={LineChart} color="text-indigo-400" />
        <MetricCard title="Total Revenue" value="$212,400" trend="42.4% of goal" icon={CreditCard} color="text-emerald-400" />
        <MetricCard title="Client Retention" value="100%" trend="8 Active" icon={Users} color="text-blue-400" />
        <MetricCard title="Efficiency Score" value="92/100" trend="Top 5%" icon={Target} color="text-orange-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-100 shadow-sm overflow-hidden border-none bg-white">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-6 px-6">
              <div>
                <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Venture Roadmap</CardTitle>
                <CardDescription className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mt-1">Live execution tracking and milestones.</CardDescription>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button className="px-4 py-1.5 bg-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">All</button>
                <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Active</button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-50">
                {projects.map(project => (
                  <div key={project.id} className="p-6 transition-all flex items-center justify-between group hover:bg-gray-50/50">
                    <div className="flex items-center space-x-5">
                      <div className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all transform group-hover:rotate-3 shadow-inner",
                        project.status === 'active' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                      )}>
                        <Target className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-gray-900 uppercase italic tracking-tight">{project.name}</h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                            ${project.revenue.toLocaleString()}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pipeline ID: {project.id.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="hidden sm:block text-right">
                        <div className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-0.5">Next Milestone</div>
                        <div className="text-[10px] text-gray-400 font-bold italic">Contextual Sync (May 14)</div>
                      </div>
                      <button className="h-10 w-10 rounded-xl border border-gray-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all text-gray-300 group-hover:text-white shadow-sm">
                        <ArrowUpRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#121225] border-white/5 border shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <DollarSign className="h-32 w-32 text-white" />
            </div>
            <CardHeader className="border-b border-white/5 pb-4 relative z-10">
              <CardTitle className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                <DollarSign className="mr-2 h-3.5 w-3.5 text-indigo-500" />
                Capital Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 relative z-10">
              {[
                { label: 'Cloud Solutions', amount: 8400, percent: 65, color: 'from-indigo-500 to-indigo-700' },
                { label: 'Strategic Consulting', amount: 3200, percent: 25, color: 'from-purple-500 to-purple-700' },
                { label: 'Maintenance Apps', amount: 1200, percent: 10, color: 'from-pink-500 to-pink-700' },
              ].map(item => (
                <div key={item.label} className="space-y-2 group/item">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-white italic uppercase tracking-tight">{item.label}</span>
                    <span className="text-[11px] font-black text-indigo-400 tracking-tighter">${item.amount}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      className={`h-full bg-gradient-to-r ${item.color} shadow-[0_0_10px_rgba(99,102,241,0.3)]`} 
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-indigo-600 text-white border-none shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50" />
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
               <CheckCircle2 className="h-20 w-20" />
             </div>
             <CardContent className="pt-8 relative z-10">
                <h3 className="text-[10px] font-black flex items-center mb-4 uppercase tracking-[0.2em] text-indigo-200">
                  <span className="h-1.5 w-1.5 bg-indigo-200 rounded-full mr-2 animate-pulse" />
                  Zenith Auto-Pilot
                </h3>
                <p className="text-xs text-white leading-relaxed font-bold tracking-tight mb-6">
                  "Zenith is monitoring the client vector. No high-urgency bottlenecks detected. May cycle invoices synthesized and queued for review."
                </p>
                <button className="w-full py-4 bg-white text-indigo-900 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all shadow-xl shadow-black/10">
                  Execute Review
                </button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon: Icon, color }: any) {
  return (
    <Card className="bg-white border-gray-100 shadow-sm group hover:shadow-md transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:rotate-12 transition-transform duration-500">
        <Icon className="h-16 w-16 text-black" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-4xl font-black text-gray-900 tracking-tighter italic">{value}</div>
            <p className={cn("text-[9px] font-black uppercase tracking-widest mt-1", color)}>{trend}</p>
          </div>
          <div className={cn("p-2.5 rounded-xl border transition-all shadow-sm", color, "bg-current bg-opacity-5 border-current border-opacity-10")}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
