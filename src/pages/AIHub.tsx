import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { 
  Brain, Sparkles, MessageSquare, History, Terminal, Zap, Info, Loader2, Plus, 
  Search, Tag, Shield, ToggleLeft as Toggle, Microscope, Mail, MessageCircle, 
  Linkedin, Slack, Cloud, CloudCheck, CloudOff, AlertTriangle, ExternalLink,
  ChevronRight, Mic, Camera
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useZenithStore, Conversation, ChatMessage } from '@/src/store/zenithStore';
import { chatWithZenith } from '@/src/services/geminiService';
import { chatDatabaseService } from '@/src/services/chatDatabaseService';
import { signInWithGoogle } from '@/src/lib/firebase';

const ChannelIcon = ({ channel }: { channel: Conversation['channel'] }) => {
  switch (channel) {
    case 'Email': return <Mail className="h-3 w-3 md:h-4 md:w-4" />;
    case 'WhatsApp': return <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />;
    case 'LinkedIn': return <Linkedin className="h-3 w-3 md:h-4 md:w-4" />;
    case 'Slack': return <Slack className="h-3 w-3 md:h-4 md:w-4" />;
    default: return <Brain className="h-3 w-3 md:h-4 md:w-4" />;
  }
};

const BackupIcon = ({ status }: { status: Conversation['backupStatus'] }) => {
  switch (status) {
    case 'synced': return <CloudCheck className="h-3 w-3 md:h-4 md:w-4 text-green-500" />;
    case 'pending': return <Cloud className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 animate-pulse" />;
    default: return <CloudOff className="h-3 w-3 md:h-4 md:w-4 text-gray-300" />;
  }
};

export function AIHub() {
  const store = useZenithStore();
  const { 
    getIntelligenceSummary, 
    tasks = [], 
    healthLogs = [], 
    conversations = [], 
    addConversation, 
    addMessageToConversation,
    projects = [],
    jobApplications = [],
    principles = [],
    biometrics = { rhr: 60, hrv: 50, stress: 'Low', recovery: 100, respiration: 14 },
    auth
  } = store;
  
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || '');
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [researchMode, setResearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  
  const activeConv = conversations.find(c => c.id === activeConvId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConv?.messages]);

  const handleSend = async () => {
    if (!input.trim() || !activeConvId) return;
    
    const userMsg: ChatMessage = { 
      id: '', 
      role: 'user', 
      content: input, 
      timestamp: new Date().toISOString() 
    };
    addMessageToConversation(activeConvId, userMsg);
    
    const currentInput = input;
    setInput('');
    setIsThinking(true);

    try {
      // Construct context for the AI
      const context = `
        Summary: ${getIntelligenceSummary()}
        Principles: ${principles.join(', ')}
        Recent Health: ${healthLogs.map(l => `${l.type}: ${l.value}`).join('; ')}
        Pending Tasks: ${tasks.filter(t => t.status === 'open').map(t => t.title).join(', ')}
        Active Projects: ${projects.filter(p => p.status === 'active').map(p => p.name).join(', ')}
        Biometrics: ${JSON.stringify(biometrics)}
      `;

      const history = activeConv?.messages.map(m => ({ 
        role: m.role, 
        content: m.content 
      })) || [];

      const result = await chatWithZenith(
        currentInput,
        history,
        context,
        researchMode ? 'research' : 'basic'
      );

      addMessageToConversation(activeConvId, { 
        id: '', 
        role: 'assistant', 
        content: result.text, 
        timestamp: new Date().toISOString() 
      });
    } catch (err) {
      console.error(err);
      addMessageToConversation(activeConvId, { 
        id: '',
        role: 'assistant', 
        content: "Error: Neural link instability. Please verify system status.",
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsThinking(false);
      if (cloudSyncEnabled && auth.isAuthenticated && activeConvId) {
        syncToCloud();
      }
    }
  };

  const syncToCloud = async () => {
    if (!auth.isAuthenticated || !activeConvId) return;
    const conv = conversations.find(c => c.id === activeConvId);
    if (!conv) return;

    setIsSyncing(true);
    try {
      await chatDatabaseService.backupConversation(auth.user.uid, conv);
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      setCloudSyncEnabled(true);
    } catch (err) {
      console.error(err);
    }
  };

  const startNewChat = () => {
    const id = addConversation({
      subject: 'New Strategic Inquiry',
      messages: [{ 
        id: '',
        role: 'assistant', 
        content: 'Zenith ready. How can we optimize your current trajectory?',
        timestamp: new Date().toISOString()
      }],
      linkedModules: ['General'],
      channel: 'Zenith',
      priority: 'medium',
      tags: [],
      backupStatus: 'none'
    });
    setActiveConvId(id);
  };

  const filteredConversations = conversations.filter(c => 
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative animate-in fade-in zoom-in duration-700">
      {/* Background Glows */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex justify-between items-end relative z-10">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Intelligence Hub</h1>
          <p className="text-gray-400 mt-1 font-medium tracking-wide">Orchestrate your life operating system via neural-link handshake.</p>
        </div>
        <button 
          onClick={() => {
            setInput('Synthesize current life state into a strategic summary.');
            setTimeout(handleSend, 100);
          }}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20"
        >
          <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          Meta-Summary
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <Card className="md:col-span-1 bg-[#121225]/50 border-white/5 backdrop-blur-xl">
          <CardHeader className="pb-3 border-b border-white/5 bg-white/5">
            <div className="flex justify-between items-center">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Memory History</CardTitle>
              <button 
                onClick={startNewChat}
                className="p-1.5 hover:bg-white/10 rounded-lg text-indigo-400 transition-colors border border-indigo-500/20"
                title="New Conversation"
              >
                <Plus className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-3 h-3.5 w-3.5 md:h-4 md:w-4 text-indigo-400/50" />
              <input 
                type="text" 
                placeholder="Search memory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs font-medium focus:ring-1 focus:ring-indigo-500 outline-none text-white placeholder-gray-600"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[500px] overflow-y-auto scrollbar-hide">
             <div className="divide-y divide-white/5">
                {filteredConversations.map((conv) => (
                  <button 
                    key={conv.id} 
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full text-left p-4 hover:bg-white/5 transition-all group relative ${activeConvId === conv.id ? 'bg-indigo-600/10' : ''}`}
                  >
                    {activeConvId === conv.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    )}
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center space-x-2 min-w-0">
                         <div className={`p-1.5 rounded-lg bg-white/5 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all`}>
                            <ChannelIcon channel={conv.channel} />
                         </div>
                         <h4 className={`text-xs font-black truncate uppercase tracking-tight ${activeConvId === conv.id ? 'text-indigo-400' : 'text-gray-300'}`}>
                           {conv.subject}
                         </h4>
                      </div>
                      <BackupIcon status={conv.backupStatus} />
                    </div>
                    <div className="flex justify-between items-end mt-3">
                       <div className="flex flex-wrap gap-1">
                          {conv.linkedModules.slice(0, 2).map(m => (
                            <span key={m} className="px-2 py-0.5 bg-white/5 text-gray-500 rounded-md text-[8px] font-black uppercase tracking-widest">{m}</span>
                          ))}
                       </div>
                       <span className="text-[9px] font-black text-gray-600 whitespace-nowrap uppercase tracking-tighter">{conv.date}</span>
                    </div>
                  </button>
                ))}
             </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 flex flex-col h-[650px] shadow-2xl shadow-indigo-900/40 border-white/5 bg-[#121225]/30 backdrop-blur-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
          
          <CardHeader className="border-b border-white/5 py-4 bg-white/5 relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-black text-white uppercase tracking-tighter italic">
                  {activeConv?.subject || 'Assistant'}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                   <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] leading-none">Cortex Link Active</span>
                </div>
              </div>
              <div className="flex space-x-2">
                 <button 
                  onClick={auth.isAuthenticated ? syncToCloud : handleLogin}
                  disabled={isSyncing}
                  className={`p-2.5 bg-white/5 ${auth.isAuthenticated ? 'text-indigo-400' : 'text-gray-400'} hover:text-indigo-400 hover:bg-white/10 rounded-xl border border-white/5 transition-all flex items-center space-x-2`}
                  title={auth.isAuthenticated ? "Sync to Cloud" : "Link Neural Account"}
                 >
                    {isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Cloud className="h-4 w-4" />}
                    {auth.isAuthenticated && <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Backup</span>}
                 </button>
                 <button className="p-2.5 bg-white/5 text-gray-400 hover:text-indigo-400 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
                    <History className="h-4 w-4 md:h-5 md:w-5" />
                 </button>
                 <button className="p-2.5 bg-white/5 text-gray-400 hover:text-indigo-400 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
                    <Tag className="h-4 w-4 md:h-5 md:w-5" />
                 </button>
              </div>
            </div>
          </CardHeader>
          <CardContent 
            ref={scrollRef}
            className="flex-1 p-6 space-y-8 overflow-y-auto scroll-smooth bg-transparent relative z-10"
          >
            {activeConv?.messages.map((msg) => (
              <div key={msg.id} className={`flex items-start ${msg.role === 'user' ? 'justify-end' : ''} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                {msg.role === 'assistant' && (
                  <div className="h-10 w-10 rounded-[14px] bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center mr-4 shrink-0 shadow-xl shadow-indigo-500/20 border border-white/20">
                    <Shield className="h-5 w-5 fill-white/10" />
                  </div>
                )}
                <div className={`relative group p-5 rounded-2xl text-sm leading-relaxed shadow-xl border ${
                  msg.role === 'assistant' 
                    ? 'bg-[#1a1a2e] rounded-tl-none text-gray-100 border-white/10 max-w-[85%]' 
                    : 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-tr-none max-w-[75%] border-indigo-400/30'
                }`}>
                  <div className="font-medium whitespace-pre-wrap">{msg.content}</div>
                  <div className={`absolute bottom-[-22px] ${msg.role === 'user' ? 'right-0' : 'left-0'} opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-black uppercase tracking-widest text-gray-600 whitespace-nowrap`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex items-center space-x-4 text-indigo-300 text-xs font-black uppercase tracking-widest bg-indigo-600/5 w-fit px-6 py-3 rounded-2xl border border-indigo-500/20 animate-pulse">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                <span>Zenith Synthesizing Context...</span>
              </div>
            )}
          </CardContent>
          <div className="p-6 bg-white/5 border-t border-white/5 space-y-4 relative z-10 backdrop-blur-xl">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setResearchMode(!researchMode)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${researchMode ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 border-indigo-400' : 'bg-white/5 text-gray-500 border-white/5 hover:bg-white/10'}`}
                >
                  <Microscope className={`h-4 w-4 md:h-5 md:w-5 ${researchMode ? 'animate-pulse' : ''}`} />
                  <span>Research Modality {researchMode ? 'ENGAGED' : 'OFFLINE'}</span>
                </button>
                <div className="flex items-center space-x-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                   <Zap className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
                   <span>Neural Speed: {researchMode ? 'High-Compute' : 'Burst'}</span>
                </div>
              </div>
              <div className="text-[10px] font-black text-gray-700 italic tracking-[.3em] uppercase">
                Zenith v4.2.1-Core
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={researchMode ? "Initiate deep strategic query..." : "Communicate with Zenith OS..." }
                className="w-full relative pl-6 pr-36 py-5 bg-[#0d0d1a] border border-white/10 rounded-2xl focus:bg-[#121225] focus:border-indigo-500/50 transition-all font-bold text-base outline-none text-white placeholder-gray-700"
              />
              <div className="absolute right-3 top-3 flex items-center space-x-2">
                <button className="p-2.5 text-gray-600 hover:text-indigo-400 transition-colors bg-white/5 rounded-xl border border-white/5">
                  <Mic className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button className="p-2.5 text-gray-600 hover:text-indigo-400 transition-colors bg-white/5 rounded-xl border border-white/5">
                  <Camera className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isThinking}
                  className={`p-2.5 rounded-xl transition-all shadow-xl disabled:opacity-50 ${researchMode ? 'bg-white text-indigo-900 hover:bg-indigo-100 shadow-white/10' : 'bg-indigo-600 text-white hover:bg-black shadow-indigo-500/20'}`}
                >
                  {isThinking ? <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin" /> : <Zap className="h-5 w-5 md:h-6 md:w-6" />}
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
              <Terminal className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Agent Intelligence Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-gray-50">
                {[
                  { action: 'Health Synthesis', log: 'Correlation detected between high caffeine intake and REM latency', time: '12m ago', type: 'health' },
                  { action: 'Task Optimization', log: 'Re-routing "Deep Work" to 10:00 AM based on attention peak', time: '1h ago', type: 'planner' },
                  { action: 'Context Parsing', log: 'Extracted budget surplus from Vanguard statement #448', time: '3h ago', type: 'finance' },
                ].map((log, i) => (
                  <div key={i} className="px-6 py-4 flex justify-between items-center group hover:bg-gray-50 transition-colors">
                     <div className="flex items-center space-x-4">
                        <div className="w-1 h-1 rounded-full bg-indigo-500" />
                        <div>
                          <span className="font-bold text-gray-900 mr-2 text-xs">{log.action}</span>
                          <span className="text-gray-500 text-xs">{log.log}</span>
                        </div>
                     </div>
                     <span className="text-[10px] text-gray-300 font-mono italic">{log.time}</span>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>

        <Card className="bg-black text-white relative overflow-hidden">
           <CardHeader>
             <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center">
               <Shield className="h-4 w-4 mr-2" />
               External Connectors
             </CardTitle>
           </CardHeader>
           <CardContent className="space-y-4 relative z-10">
              <div className="grid grid-cols-4 gap-2">
                 {[
                   { icon: <Mail />, label: 'Email', status: 'online' },
                   { icon: <Slack />, label: 'Slack', status: 'online' },
                   { icon: <Linkedin />, label: 'LinkedIn', status: 'offline' },
                   { icon: <MessageCircle />, label: 'WhatsApp', status: 'online' },
                 ].map(conn => (
                   <div key={conn.label} className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center mb-1 ${conn.status === 'online' ? 'text-indigo-400' : 'text-gray-600'}`}>
                         {conn.icon}
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{conn.label}</span>
                   </div>
                 ))}
              </div>
              
              <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-300">Backup Engine</span>
                    <span className="text-[10px] font-black text-green-400 uppercase">Synced</span>
                 </div>
                 <div className="flex items-center mt-2 space-x-2">
                    <Cloud className="h-3 w-3 text-indigo-400" />
                    <span className="text-[9px] text-gray-400 shrink-0">OneDrive Business Hub</span>
                    <div className="h-px flex-1 bg-gray-800" />
                 </div>
              </div>

              <button className="w-full py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-400 transition-all">
                Manage Integrations
              </button>
           </CardContent>
        </Card>

        <Card className="bg-black text-white relative overflow-hidden">
           <CardHeader>
             <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center">
               <Brain className="h-4 w-4 mr-2" />
               Current Reasoning Mode
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4 relative z-10">
               <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">{researchMode ? 'Deep Contextual Analysis' : 'Heuristic Engagement'}</span>
                     <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest font-mono">ACTIVE</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed italic">
                    {researchMode 
                      ? "Zenith is utilizing maximal compute for long-range life trajectory modeling and cross-module optimization."
                      : "Zenith is prioritizing immediate biological recovery over task velocity due to HRV suppression detected."
                    }
                  </p>
               </div>
               <button 
                 onClick={() => setResearchMode(!researchMode)}
                 className={`w-full py-2 ${researchMode ? 'bg-white text-black' : 'bg-indigo-600 text-white'} hover:opacity-90 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all`}
               >
                  {researchMode ? 'Deactivate Research' : 'Engage Strategic Research'}
               </button>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

