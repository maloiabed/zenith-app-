import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { GitMerge, Zap, Settings, Plus, Play, Info, CheckCircle2, Sliders, X } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Automations() {
  const { automations, addAutomationRule } = useZenithStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTrigger, setNewTrigger] = useState('');
  const [newAction, setNewAction] = useState('');

  const handleAdd = () => {
    if (!newName.trim() || !newTrigger.trim() || !newAction.trim()) return;
    addAutomationRule({ name: newName, trigger: newTrigger, action: newAction });
    setNewName('');
    setNewTrigger('');
    setNewAction('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">Automation Engine</h1>
           <p className="text-gray-500 mt-1">Cross-module rule execution and intelligent life-routing.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          {isAdding ? <X className="mr-2 h-4 w-4 md:h-5 md:w-5" /> : <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5" />}
          {isAdding ? 'Cancel' : 'Create New Rule'}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="bg-indigo-50/30 border-indigo-100">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Rule Name (e.g. Morning Sweep)"
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    value={newTrigger}
                    onChange={(e) => setNewTrigger(e.target.value)}
                    placeholder="Trigger (IF...)"
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    placeholder="Action (THEN...)"
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <button
                  onClick={handleAdd}
                  className="w-full py-2 bg-black text-white rounded-lg text-sm font-bold transition-all hover:bg-indigo-900"
                >
                  Deploy Rule
                </button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 flex flex-col justify-between min-h-[140px] bg-indigo-50 border-indigo-100">
           <div>
              <GitMerge className="h-6 w-6 md:h-7 md:w-7 text-indigo-600 mb-3" />
              <div className="text-2xl font-black text-gray-900">421</div>
              <p className="text-xs text-gray-500 font-medium">Executions this month</p>
           </div>
        </Card>
        <Card className="p-4 flex flex-col justify-between min-h-[140px]">
           <div>
              <Zap className="h-6 w-6 md:h-7 md:w-7 text-yellow-500 mb-3" />
              <div className="text-2xl font-black text-gray-900">12s</div>
              <p className="text-xs text-gray-500 font-medium">Avg. response latency</p>
           </div>
        </Card>
        <Card className="p-4 flex flex-col justify-between min-h-[140px]">
           <div>
              <CheckCircle2 className="h-6 w-6 md:h-7 md:w-7 text-green-500 mb-3" />
              <div className="text-2xl font-black text-gray-900">100%</div>
              <p className="text-xs text-gray-500 font-medium">Rule success rate</p>
           </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Active Protocols</h2>
        {automations.map((rule, i) => (
          <motion.div
            layout
            key={rule.id}
          >
            <Card className="hover:border-indigo-200 transition-all group">
              <CardContent className="p-5">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                       <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          <GitMerge className="h-5 w-5 md:h-6 md:w-6" />
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-gray-900">{rule.name}</h4>
                          <div className="flex items-center mt-1 space-x-2">
                             <span className="text-[10px] text-gray-400 font-mono">IF</span>
                             <span className="text-[10px] font-bold text-gray-600">{rule.trigger}</span>
                             <span className="text-[10px] text-gray-400 font-mono">THEN</span>
                             <span className="text-[10px] font-bold text-indigo-600">{rule.action}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center space-x-3 self-end sm:self-center">
                       <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">{rule.status}</span>
                       <button className="p-2 text-gray-300 hover:text-gray-600 transition-colors">
                          <Settings className="h-4 w-4 md:h-5 md:w-5" />
                       </button>
                       <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                          <Play className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                       </button>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-black text-white relative overflow-hidden">
         <CardHeader className="relative z-10">
            <CardTitle className="text-sm flex items-center">
              <Info className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-400" />
              Machine Learning Suggestions
            </CardTitle>
         </CardHeader>
         <CardContent className="relative z-10 pb-8">
            <p className="text-xs text-gray-300 max-w-md leading-relaxed">
              "Based on your manual Study session logging, would you like me to automate the creation of a Study task every time your resting heart rate stays below 60 BPM for more than 4 hours?"
            </p>
            <div className="mt-6 flex space-x-4">
               <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                  Enable Suggested Rule
               </button>
               <button className="px-4 py-2 border border-white/20 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-colors">
                  Dismiss
               </button>
            </div>
         </CardContent>
         <div className="absolute right-0 bottom-0 h-48 w-48 bg-indigo-500/10 blur-3xl rounded-full translate-x-24 translate-y-24" />
      </Card>
    </div>
  );
}
