import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/src/components/ui/card';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Plus, 
  Filter, 
  User, 
  Reply, 
  History, 
  Zap, 
  Info, 
  Loader2, 
  X, 
  Github, 
  Globe, 
  CreditCard, 
  Link as LinkIcon, 
  Unlink,
  Shield,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function Communication() {
  const store = useZenithStore();
  const threads = store.threads || [];
  const linkedAccounts = store.systemStatus.linkedAccounts || [];
  const { addMessageThread, toggleLinkedAccount } = store;
  const [isAdding, setIsAdding] = useState(false);
  const [newSender, setNewSender] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [linkData, setLinkData] = useState({ platform: '', icon: 'Link' });

  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [editPlatformName, setEditPlatformName] = useState('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github': return Github;
      case 'Globe': return Globe;
      case 'MessageSquare': return MessageSquare;
      case 'CreditCard': return CreditCard;
      default: return LinkIcon;
    }
  };

  const handleEditAccount = (id: string, currentPlatform: string) => {
    setEditingAccountId(id);
    setEditPlatformName(currentPlatform);
  };

  const saveEditedAccount = () => {
    if (!editingAccountId) return;
    const updatedAccounts = linkedAccounts.map(a => 
      a.id === editingAccountId ? { ...a, platform: editPlatformName } : a
    );
    store.updateSystemStatus({ linkedAccounts: updatedAccounts });
    setEditingAccountId(null);
  };

  const handleAdd = () => {
    if (!newSender.trim() || !newContent.trim()) return;
    addMessageThread({ sender: newSender, content: newContent });
    setNewSender('');
    setNewContent('');
    setIsAdding(false);
  };

  const handleLinkAccount = () => {
    if (!linkData.platform) return;
    const icons = ['Github', 'Globe', 'MessageSquare', 'CreditCard'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    store.updateSystemStatus({
      linkedAccounts: [
        ...(store.systemStatus.linkedAccounts || []),
        { id: Math.random().toString(36).substr(2, 9), platform: linkData.platform, status: 'connected', icon: randomIcon }
      ]
    });
    setLinkData({ platform: '', icon: 'Link' });
    setIsLinking(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Communication Node</h1>
           <p className="text-gray-500 mt-1 font-medium tracking-wide">Unified interaction feed, neural proxy management, and AI-assisted drafting.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => { setIsAdding(!isAdding); setIsLinking(false); }}
            className="flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
          >
            {isAdding ? <X className="mr-2 h-4 w-4 md:h-5 md:w-5 text-indigo-600" /> : <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5 text-indigo-600" />}
            {isAdding ? 'Cancel' : 'New Thread'}
          </button>
          <button className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
            <Zap className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            AI Draft Queue
          </button>
        </div>
      </div>

      <AnimatePresence>
        {(isAdding || isLinking) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="z-20 relative"
          >
            <Card className="bg-[#0f172a] border-none shadow-2xl overflow-hidden relative p-1">
              <div className="bg-[#1e293b] rounded-[inherit] p-8 space-y-6">
                {isAdding ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Recipient Channel</label>
                        <input
                          type="text"
                          value={newSender}
                          onChange={(e) => setNewSender(e.target.value)}
                          placeholder="Recipient / Sender Identity"
                          className="w-full px-6 py-4 bg-black/20 border border-white/5 rounded-2xl text-white text-base font-black italic focus:border-indigo-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2 flex flex-col justify-end">
                        <button
                          onClick={handleAdd}
                          className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all italic"
                        >
                          Initialize Thread Vector
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Message Payload</label>
                      <textarea
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Neural message content..."
                        className="w-full h-32 px-6 py-4 bg-black/20 border border-white/5 rounded-2xl text-white text-base font-medium focus:border-indigo-500 outline-none resize-none transition-all placeholder:italic"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex space-x-6 items-end">
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Proxy Platform</label>
                      <input
                        type="text"
                        value={linkData.platform}
                        onChange={(e) => setLinkData({ ...linkData, platform: e.target.value })}
                        placeholder="Platform (e.g. Discord, Telegram, Notion)"
                        className="w-full px-6 py-4 bg-black/20 border border-white/5 rounded-2xl text-white text-base font-black italic focus:border-indigo-500 outline-none transition-all"
                      />
                    </div>
                    <button
                      onClick={handleLinkAccount}
                      className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all italic shrink-0"
                    >
                      Authorize Proxy
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Unread Threads" value={threads.filter(t => t.status === 'unread').length} trend="Active Pulse" icon={MessageSquare} color="text-indigo-500" />
        <MetricCard title="Avg Latency" value="42m" trend="Stable Drift" icon={History} color="text-emerald-500" />
        <MetricCard title="AI Drafting" value="84%" trend="Optimized" icon={Zap} color="text-orange-500" />
        <MetricCard title="Signal Status" value="STABLE" trend="Encryption: Active" icon={Shield} color="text-indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Scan interaction logs..." 
                  className="w-full pl-12 pr-6 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold placeholder:italic"
                />
              </div>
              <button className="h-12 w-12 flex items-center justify-center text-gray-400 hover:text-indigo-600 border border-gray-100 rounded-xl hover:bg-indigo-50 transition-all">
                <Filter className="h-5 w-5 md:h-6 md:w-6" />
              </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 italic">Intelligence Integration Feed</h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {threads.map((thread) => (
                <motion.div 
                  layout
                  key={thread.id} 
                  className="p-8 bg-white border border-gray-100 rounded-3xl hover:translate-x-1 hover:border-indigo-400 transition-all group flex items-start justify-between shadow-sm relative overflow-hidden"
                >
                  <div className={cn("absolute left-0 top-0 bottom-0 w-1.5 transition-all", thread.status === 'unread' ? 'bg-indigo-600' : 'bg-transparent')} />
                  <div className="flex items-start space-x-6">
                    <div className={cn(
                      "h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-black shadow-inner transform group-hover:rotate-6 transition-transform shrink-0",
                      thread.status === 'unread' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400 border border-gray-200'
                    )}>
                      {thread.sender.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                         <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">{thread.sender}</h4>
                         {thread.status === 'unread' && <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse border-2 border-indigo-200" />}
                      </div>
                      <p className="text-gray-500 mt-2 leading-relaxed max-w-lg font-medium">{thread.content}</p>
                      <div className="flex items-center space-x-4 mt-4">
                         <div className="flex items-center space-x-2">
                           <Clock className="h-3 w-3 md:h-4 md:w-4 text-gray-300" />
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{thread.timestamp}</span>
                         </div>
                         <span className="text-gray-200">/</span>
                         <button className="text-[10px] font-black text-indigo-600 hover:text-gray-900 uppercase tracking-widest transition-colors flex items-center">
                            Neural Archive
                            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                         </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 shrink-0">
                     <button className="p-3 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100">
                        <Reply className="h-6 w-6 md:h-7 md:w-7" />
                     </button>
                     <button className="p-3 text-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all border border-transparent hover:border-gray-200 text-gray-400">
                        <History className="h-6 w-6 md:h-7 md:w-7" />
                     </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="bg-[#0f172a] text-white relative overflow-hidden border-none shadow-2xl p-1">
             <div className="bg-[#1e293b] rounded-[inherit] p-8">
               <CardHeader className="p-0 pb-6 border-b border-white/5">
                  <CardTitle className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center">
                     <Zap className="h-4 w-4 md:h-5 md:w-5 mr-3 animate-pulse" />
                     AI Draft Proxy
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-0 pt-8 relative z-10">
                  <div className="space-y-6">
                     <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-5 backdrop-blur-3xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors" />
                        <div className="flex justify-between items-center bg-indigo-500/5 px-3 py-2 rounded-lg border border-indigo-500/20">
                          <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Optimizing: Maloia B.</span>
                          <Loader2 className="h-3 w-3 animate-spin text-indigo-500" />
                        </div>
                        <p className="text-xs text-indigo-100/90 italic font-medium leading-relaxed">
                          "Confirmed receipt of the infrastructure specs. I've initiated a strategic sync with the Grid Infrastructure Node to verify energy deltas..."
                        </p>
                     </div>
                     <div className="flex space-x-4">
                        <button className="flex-1 py-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all shadow-xl shadow-indigo-600/20 italic">Transmit Vector</button>
                        <button className="h-12 w-12 flex items-center justify-center border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">
                           <Plus className="h-5 w-5" />
                        </button>
                     </div>
                  </div>
               </CardContent>
             </div>
          </Card>

          <Card className="bg-[#121121] border-white/5 border shadow-2xl relative overflow-hidden group p-1">
             <div className="bg-[#1b1a2e] rounded-[inherit] p-8">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                  <LinkIcon className="h-40 w-40" />
               </div>
               <CardHeader className="p-0 pb-6 border-b border-white/5 relative z-10">
                 <CardTitle className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                   <LinkIcon className="h-4 w-4 mr-3 text-indigo-500" />
                   Proxy Orchestration
                 </CardTitle>
               </CardHeader>
               <CardContent className="p-0 pt-8 space-y-4 relative z-10">
                 {linkedAccounts.map(account => {
                   const Icon = getIcon(account.icon);
                   const isEditing = editingAccountId === account.id;
                   return (
                     <div key={account.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group/item hover:bg-white/10">
                       <div className="flex items-center space-x-4 flex-1">
                         <div className="h-12 w-12 bg-black/60 rounded-xl flex items-center justify-center border border-white/5 shadow-inner grow-0 shrink-0">
                           <Icon className="h-5 w-5 md:h-6 md:w-6 text-indigo-400 group-hover/item:text-white transition-colors" />
                         </div>
                         <div className="flex-1">
                           {isEditing ? (
                             <input 
                               autoFocus
                               className="bg-black/40 border border-indigo-500/50 rounded-lg px-2 py-1 text-xs text-white w-full uppercase italic outline-none"
                               value={editPlatformName}
                               onChange={(e) => setEditPlatformName(e.target.value)}
                               onBlur={saveEditedAccount}
                               onKeyDown={(e) => e.key === 'Enter' && saveEditedAccount()}
                             />
                           ) : (
                             <p 
                               className="text-xs font-black text-white tracking-tight uppercase italic cursor-pointer hover:text-indigo-400 transition-colors"
                               onClick={() => handleEditAccount(account.id, account.platform)}
                             >
                               {account.platform}
                             </p>
                           )}
                           <p className={cn(
                             "text-[9px] font-black uppercase tracking-widest mt-1",
                             account.status === 'connected' ? 'text-emerald-400' : 'text-gray-500'
                           )}>
                             {account.status === 'connected' ? 'Node Active' : 'Terminated'}
                           </p>
                         </div>
                       </div>
                       <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => toggleLinkedAccount(account.id)}
                            className={cn(
                              "h-10 w-10 flex items-center justify-center rounded-xl transition-all border",
                              account.status === 'connected' ? 'text-red-400 border-red-500/20 hover:bg-red-500/10' : 'text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10'
                            )}
                          >
                            {account.status === 'connected' ? <Unlink className="h-4 w-4 md:h-5 md:w-5" /> : <LinkIcon className="h-4 w-4 md:h-5 md:w-5" />}
                          </button>
                       </div>
                     </div>
                   );
                 })}

                 <button 
                  onClick={() => { setIsLinking(!isLinking); setIsAdding(false); }}
                  className="w-full py-4 mt-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-900 transition-all shadow-xl shadow-indigo-600/20 italic"
                >
                  Authorize New Neural Proxy
                </button>
               </CardContent>
             </div>
          </Card>
        </div>
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
