import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/src/components/ui/card';
import { Search, Plus, Filter, FileText, Calendar, Building2, MapPin, ExternalLink, Sparkles, Wand2, X, GitMerge, TrendingUp, Target, Briefcase } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function Jobs() {
  const { jobApplications, addJobApplication, opportunities, addOpportunity } = useZenithStore();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ company: '', role: '', status: 'applied' });
  const [showDiscovery, setShowDiscovery] = useState(false);

  const handleAdd = () => {
    if (!formData.company || !formData.role) return;
    addJobApplication({
      company: formData.company,
      role: formData.role,
      status: formData.status as any
    });

    // Simulate AI Discovery basing on action
    setTimeout(() => {
      setShowDiscovery(true);
      addOpportunity({
        title: `Strategic Match: ${formData.role}`,
        company: `${formData.company} Competitor`,
        type: 'referral',
        value: 120000,
        status: 'warm'
      });
    }, 1500);

    setFormData({ company: '', role: '', status: 'applied' });
    setIsAdding(false);
  };

  const aiFoundOpps = (opportunities || []).slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Career & Opportunities</h1>
          <p className="text-gray-500 mt-1 font-medium tracking-wide">Application pipelines, resume intelligence, and interview preparation.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
            <FileText className="mr-2 h-4 w-4 text-indigo-600" />
            Resume Hub
          </button>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
          >
            <Plus className="mr-2 h-4 w-4" />
            {isAdding ? 'Cancel' : 'Add Opportunity'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="border-indigo-200 bg-white shadow-2xl shadow-indigo-100 overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
               <CardContent className="pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Entity</label>
                      <input 
                        type="text" 
                        placeholder="Company" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Role Architecture</label>
                      <input 
                        type="text" 
                        placeholder="Role (e.g. Lead Engineer)" 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pipeline Stage</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                      >
                        <option value="applied">Applied</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offer">Offer</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button onClick={handleAdd} className="w-full py-2 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">Track Application</button>
                    </div>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between bg-white/50 p-2 rounded-2xl border border-gray-200 shadow-sm">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search pipelines..." 
                className="pl-10 pr-4 py-2.5 w-full bg-white border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="flex items-center space-x-2 mr-2">
              <button className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {jobApplications.map(app => (
              <Card key={app.id} className="hover:border-indigo-400 transition-all cursor-pointer group shadow-sm border-gray-100 overflow-hidden relative">
                <div className={cn("absolute left-0 top-0 bottom-0 w-1 transition-all", 
                  app.status === 'interviewing' ? 'bg-orange-500' : 'bg-indigo-500'
                )} />
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all transform group-hover:rotate-3 shadow-inner">
                        <Building2 className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors uppercase italic">{app.role}</h4>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                          <span className="text-gray-900">{app.company}</span>
                          <span className="h-1 w-1 bg-gray-300 rounded-full" />
                          <span className="flex items-center"><MapPin className="h-3 w-3 mr-1 text-indigo-400" /> Remote</span>
                          <span className="h-1 w-1 bg-gray-300 rounded-full" />
                          <span className="flex items-center"><Calendar className="h-3 w-3 mr-1 text-indigo-400" /> Applied {app.lastAction}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 self-end sm:self-center">
                       <span className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                         app.status === 'interviewing' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                       )}>
                         {app.status}
                       </span>
                       <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100">
                         <ExternalLink className="h-4 w-4" />
                       </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {showDiscovery && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <Card className="bg-emerald-600 text-white border-none shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform duration-700">
                    <Sparkles className="h-20 w-20" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100">AI Pattern Detection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-black italic tracking-tight leading-relaxed">
                      "I've registered a new market vector based on your recent activity. A high-value alternative has been identified."
                    </p>
                    <button onClick={() => setShowDiscovery(false)} className="mt-4 w-full py-2 bg-white text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-50 transition-all">Close Awareness</button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <Card className="bg-[#121225] border-white/5 border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Target className="h-32 w-32" />
            </div>
            <CardHeader className="border-b border-white/5 relative z-10">
              <CardTitle className="text-xs font-black text-white uppercase tracking-tighter flex items-center italic">
                <Sparkles className="mr-3 h-4 w-4 text-indigo-400" />
                Strategic Discoveries
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 relative z-10">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 px-1">Latent High-Value Targets</div>
              {aiFoundOpps.length > 0 ? (
                <div className="space-y-4">
                  {aiFoundOpps.map(opp => (
                    <div key={opp.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/50 transition-all group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-black text-white tracking-tight uppercase italic">{opp.company}</p>
                          <p className="text-[10px] font-bold text-indigo-400 mt-1 uppercase tracking-widest">{opp.title}</p>
                        </div>
                        <div className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-lg border border-emerald-400/20">
                          ${(opp.value / 1000).toFixed(0)}k
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center">
                           <GitMerge className="h-2.5 w-2.5 mr-1.5 text-indigo-500" />
                           {opp.type}
                         </span>
                         <button className="text-[9px] font-black text-white uppercase tracking-widest bg-indigo-600 px-4 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                           Optimize Link
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 font-bold italic px-2">No discoveries identified yet. Continue applying to populate model.</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-indigo-600 text-white border-none shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50" />
            <CardContent className="pt-8 relative z-10">
               <div className="flex items-center space-x-4 mb-6">
                  <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 transform -rotate-6">
                    <Wand2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-black text-sm uppercase tracking-tighter italic">Resume Tailorer</h5>
                    <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-widest opacity-80">AI-driven context adaptation</p>
                  </div>
               </div>
               <p className="text-xs text-white leading-relaxed font-bold tracking-tight mb-6">
                 "Zenith has analyzed your model against the **Staff Engineer** target. Custom resume vectors ready for deployment."
               </p>
               <button className="w-full py-4 bg-white text-indigo-900 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all shadow-xl shadow-black/10">
                 Synthesize PDF Vector
               </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
