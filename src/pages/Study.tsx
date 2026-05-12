import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/src/components/ui/card';
import { BookOpen, Brain, Plus, Search, Filter, Book, Clock, GraduationCap, ChevronRight, FileText, CheckCircle2, Target, Calendar, Upload, Settings, X, BrainCircuit, Activity } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function Study() {
  const store = useZenithStore();
  const { decks, semesters, courseUnits, documents, addCourseUnit, addDeck, updateCourseUnit } = store;
  
  const [activeTab, setActiveTab] = useState<'decks' | 'semester' | 'units'>('semester');
  const [isAddingUnit, setIsAddingUnit] = useState(false);
  const [newUnit, setNewUnit] = useState({ code: '', name: '', credits: 3 });
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const currentSemester = (semesters || [])[0];
  const unitsForSemester = (courseUnits || []).filter(u => currentSemester?.units.includes(u.id));

  const handleAddUnit = () => {
    if (!newUnit.code || !newUnit.name) return;
    addCourseUnit(newUnit);
    setIsAddingUnit(false);
    setNewUnit({ code: '', name: '', credits: 3 });
  };

  const handleFileUpload = (unitId: string) => {
    // Simulate file upload integration
    const fileName = `Research_${Math.random().toString(36).substr(2, 5)}.pdf`;
    const docId = Math.random().toString(36).substr(2, 9);
    
    // Update store with new document and link to unit
    // This is a placeholder for real firebase/storage logic
    console.log(`Uploading ${fileName} to unit ${unitId}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Cortex Orchestration</h1>
          <p className="text-gray-500 mt-1 font-medium tracking-wide">Managing high-bandwidth learning trajectories and academic assets.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsAddingUnit(true)}
            className="flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
            Provision Unit
          </button>
          <button className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
            <BrainCircuit className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            Neural Sync
          </button>
        </div>
      </div>

      <div className="flex space-x-2 bg-gray-100/50 p-1.5 rounded-2xl w-fit border border-gray-200 backdrop-blur-sm">
        {[
          { id: 'semester', label: 'Timeline', icon: Calendar },
          { id: 'units', label: 'Knowledge Units', icon: Book },
          { id: 'decks', label: 'Flash Vectors', icon: Brain },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all",
              activeTab === tab.id ? "bg-white text-indigo-600 shadow-xl border border-gray-100 scale-105" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            )}
          >
            <tab.icon className="mr-2.5 h-4 w-4 md:h-5 md:w-5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'semester' && (
              <motion.div
                key="semester"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <Card className="border-none shadow-sm bg-white overflow-hidden p-0">
                  <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Academic Cycle Alpha</div>
                      <CardTitle className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">{currentSemester?.name || 'Initialization Required'}</CardTitle>
                      <CardDescription className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2 italic">
                        Temporal Window: {currentSemester ? `${new Date(currentSemester.startDate).toLocaleDateString()} -> ${new Date(currentSemester.endDate).toLocaleDateString()}` : 'N/A'}
                      </CardDescription>
                    </div>
                    <div className="h-16 w-16 bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100 text-indigo-600 shadow-inner">
                      <Target className="h-8 w-8 md:h-10 md:w-10" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50/50 border-b border-gray-50">
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Temporal Node</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Frequency</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Task / Subject</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {(currentSemester?.timetable || []).map((slot, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-all group">
                              <td className="px-8 py-6 font-black text-indigo-600 text-base tracking-tighter italic">{slot.day}</td>
                              <td className="px-8 py-6 text-xs font-mono text-gray-400">{slot.time}</td>
                              <td className="px-8 py-6">
                                <div className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase italic">{slot.activity}</div>
                                {slot.unitId && (
                                  <div className="flex items-center mt-2 group-hover:translate-x-1 transition-transform">
                                    <div className="h-1.5 w-1.5 bg-indigo-600 rounded-full mr-2" />
                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                      Unit: {courseUnits.find(u => u.id === slot.unitId)?.code}
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex items-center text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 w-fit px-3 py-1 rounded-lg border border-emerald-100">
                                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                  Active
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'units' && (
              <motion.div
                key="units"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {(courseUnits || []).map(unit => (
                  <Card key={unit.id} className="border-none shadow-sm group hover:ring-2 hover:ring-indigo-500/20 transition-all bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                       <Book className="h-40 w-40" />
                    </div>
                    <CardHeader className="p-8 border-b border-gray-50 relative z-10">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">{unit.code}</div>
                          <CardTitle className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic leading-tight">{unit.name}</CardTitle>
                        </div>
                        <button className="h-12 w-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-indigo-600 border border-gray-100 transition-all shadow-inner">
                          <Settings className="h-5 w-5 md:h-6 md:w-6" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8 relative z-10">
                      <div className="flex items-center justify-between">
                         <div className="space-y-1">
                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Weighting</p>
                            <p className="text-sm font-black text-gray-900 italic tracking-tight">{unit.credits} Units</p>
                         </div>
                         <div className="space-y-1 text-right">
                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Tier</p>
                            <p className="text-sm font-black text-gray-900 italic tracking-tight">Level 500</p>
                         </div>
                      </div>
                      
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                           <FileText className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 text-indigo-500" />
                           Intel Assets
                        </label>
                        <div className="space-y-2">
                          {(unit.documents || []).length > 0 ? (
                            unit.documents.map(docId => {
                              const doc = documents.find(d => d.id === docId);
                              return (
                                <div key={docId} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group/doc hover:bg-white hover:shadow-md transition-all">
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 md:h-5 md:w-5 mr-3 text-indigo-400" />
                                    <span className="text-[11px] font-black text-gray-600 uppercase tracking-tight">{doc?.name || 'Knowledge Asset'}</span>
                                  </div>
                                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-300 group-hover/doc:translate-x-1 transition-transform" />
                                </div>
                              );
                            })
                          ) : (
                            <div className="p-10 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-center group-hover:border-indigo-100 transition-colors">
                              <Upload className="h-8 w-8 mb-3 text-gray-200" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Zero Assets Linked</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-8 pt-0 flex gap-3 relative z-10">
                       <button 
                        onClick={() => handleFileUpload(unit.id)}
                        className="flex-1 py-4 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-indigo-600 rounded-2xl border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                       >
                         Upload Intel
                       </button>
                       <button className="h-14 w-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-gray-900 transition-all shadow-xl shadow-indigo-600/20">
                         <Search className="h-5 w-5 md:h-6 md:w-6" />
                       </button>
                    </CardFooter>
                  </Card>
                ))}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div
                key="decks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {(decks || []).map((deck) => (
                  <Card key={deck.id} className="border-none shadow-sm hover:translate-y-[-4px] transition-all cursor-pointer bg-white overflow-hidden group">
                    <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    <CardHeader className="p-8 pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-black text-gray-900 italic tracking-tighter uppercase leading-tight">{deck.name}</CardTitle>
                        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-inner group-hover:rotate-12 transition-transform">
                           <Brain className="h-6 w-6 md:h-8 md:w-8" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 pt-4">
                       <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest bg-gray-50 w-fit px-3 py-1 rounded-lg">
                          <BookOpen className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4 text-indigo-400" />
                          {deck.cardsCount} Concepts
                       </div>
                    </CardContent>
                    <CardFooter className="p-8 pt-0 flex justify-between items-center group">
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">Ready for Refresher</span>
                       <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all scale-0 group-hover:scale-100">
                         <ChevronRight className="h-5 w-5" />
                       </div>
                    </CardFooter>
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-8">
          <Card className="bg-[#0f172a] text-white border-none shadow-2xl relative overflow-hidden group p-1">
            <div className="bg-[#1e293b] rounded-[inherit] p-8 space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12 group-hover:scale-110 transition-transform duration-1000">
                  <GraduationCap className="h-48 w-48" />
               </div>
               <CardHeader className="p-0 border-b border-white/5 pb-6">
                  <CardTitle className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center">
                    <Activity className="h-4 w-4 md:h-5 md:w-5 mr-3" />
                    Neural Cortex Feed
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-0 space-y-8 relative z-10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60 italic">
                      <span>Synaptic Retention</span>
                      <span>92% Dynamic</span>
                    </div>
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
                      <div className="bg-indigo-500 h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000" style={{ width: '92%' }} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-black/20 rounded-3xl border border-white/5 text-center group/card hover:bg-indigo-600/10 transition-all">
                       <div className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2 italic">Nodes</div>
                       <div className="text-3xl font-black text-white italic tracking-tighter">{courseUnits.length}</div>
                    </div>
                    <div className="p-5 bg-black/20 rounded-3xl border border-white/5 text-center group/card hover:bg-indigo-600/10 transition-all">
                       <div className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2 italic">Credits</div>
                       <div className="text-3xl font-black text-white italic tracking-tighter">{courseUnits.reduce((acc, u) => acc + u.credits, 0)}</div>
                    </div>
                  </div>

                  <Card className="bg-black/40 border border-indigo-500/20 rounded-3xl backdrop-blur-xl group/coach overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <BrainCircuit className="h-10 w-10 md:h-12 md:w-12" />
                    </div>
                    <CardHeader className="pb-2">
                       <CardTitle className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">AI Strategic Coach</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-xs text-indigo-100/80 leading-relaxed font-bold italic">
                         "Cortex Analysis Complete: retention in Neural Systems is tapering. I suggest a 20m high-intensity mnemonic blitz in 4 orbital cycles."
                       </p>
                    </CardContent>
                  </Card>
               </CardContent>
            </div>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden p-0">
             <CardHeader className="p-8 border-b border-gray-50 pb-6">
                <CardTitle className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center italic">
                   Upcoming Milestones
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8 space-y-4">
                {[
                  { title: 'Project Proposal', due: 'In 2 days', urgency: 'high', code: 'CS502' },
                  { title: 'Midterm Review', due: 'In 5 days', urgency: 'medium', code: 'NW201' },
                  { title: 'Neural Lab Alpha', due: 'In 8 days', urgency: 'low', code: 'BIO300' },
                ].map((deadline, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:translate-x-1 rounded-2xl border border-gray-50 transition-all group">
                    <div>
                      <div className="text-[8px] font-black text-indigo-500 uppercase tracking-widest mb-1 italic">{deadline.code}</div>
                      <div className="text-xs font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase italic">{deadline.title}</div>
                    </div>
                    <div className={cn(
                      "text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border italic shadow-sm", 
                      deadline.urgency === 'high' ? 'bg-red-50 text-red-600 border-red-100' : 
                      deadline.urgency === 'medium' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                      'bg-gray-100 text-gray-400 border-gray-200'
                    )}>
                      {deadline.due}
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-indigo-600 transition-colors uppercase italic">
                   View Detailed Roadmap &rarr;
                </button>
             </CardContent>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {isAddingUnit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/95 backdrop-blur-2xl p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-xl"
            >
              <Card className="border-none shadow-2xl overflow-hidden bg-white text-gray-900 p-1">
                <div className="bg-white rounded-[inherit] overflow-hidden">
                  <CardHeader className="bg-[#121121] text-white p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                       <BookOpen className="h-48 w-48" />
                    </div>
                    <div className="relative z-10">
                      <CardTitle className="text-4xl font-black uppercase italic tracking-tighter">Initialize Knowledge Unit</CardTitle>
                      <CardDescription className="text-indigo-400 font-black text-[11px] uppercase tracking-widest mt-4 opacity-80 italic">Allocating dedicated neural capacity for new academic domain.</CardDescription>
                    </div>
                    <button onClick={() => setIsAddingUnit(false)} className="absolute top-10 right-10 h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all shadow-xl">
                      <X className="h-6 w-6" />
                    </button>
                  </CardHeader>
                  <CardContent className="p-12 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Academic Hash (Code)</label>
                         <input 
                           autoFocus
                           className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-gray-900 text-lg font-black italic focus:border-indigo-600 outline-none transition-all placeholder:text-gray-300"
                           placeholder="e.g. CS502"
                           value={newUnit.code}
                           onChange={e => setNewUnit({ ...newUnit, code: e.target.value })}
                         />
                       </div>
                       <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Resource Weight (Credits)</label>
                         <input 
                           type="number"
                           className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-gray-900 text-lg font-black italic focus:border-indigo-600 outline-none transition-all"
                           value={newUnit.credits}
                           onChange={e => setNewUnit({ ...newUnit, credits: parseInt(e.target.value) || 0 })}
                         />
                       </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Cortex Label (Unit Name)</label>
                      <input 
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-gray-900 text-xl font-black italic focus:border-indigo-600 outline-none transition-all placeholder:text-gray-300"
                        placeholder="e.g. ADVANCED NEURAL NETWORKS"
                        value={newUnit.name}
                        onChange={e => setNewUnit({ ...newUnit, name: e.target.value })}
                      />
                    </div>

                    <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center space-x-6">
                       <div className="h-14 w-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20">
                          <CheckCircle2 className="h-7 w-7 md:h-8 md:w-8" />
                       </div>
                       <div>
                          <h5 className="text-xs font-black text-indigo-900 uppercase italic tracking-tight">Synaptic Allocation Protocol</h5>
                          <p className="text-[10px] font-bold text-indigo-600/70 uppercase tracking-widest mt-1">Ready to integrate node into global learning graph.</p>
                       </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-12 pt-0">
                    <button 
                      onClick={handleAddUnit}
                      className="w-full py-6 bg-indigo-600 text-white rounded-2xl text-sm font-black uppercase tracking-[0.25em] hover:bg-gray-900 transition-all shadow-2xl shadow-indigo-600/30 italic grow overflow-hidden relative group"
                    >
                      <span className="relative z-10 italic">Commit to Long-Term Memory</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
