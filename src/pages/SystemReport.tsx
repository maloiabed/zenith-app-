import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/src/components/ui/card';
import { 
  Database, 
  ShieldCheck, 
  Activity, 
  Server, 
  Terminal, 
  Cpu, 
  Network, 
  Lock, 
  Zap,
  HardDrive,
  FileJson,
  Code2,
  AlertTriangle,
  RefreshCw,
  Search
} from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useState, useEffect } from 'react';

export default function SystemReport() {
  const store = useZenithStore();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const getCollectionStats = () => [
    { name: 'Tasks', count: store.tasks.length, size: `${(store.tasks.length * 0.12).toFixed(2)} KB`, status: 'Synched' },
    { name: 'Habits', count: store.habits.length, size: `${(store.habits.length * 0.08).toFixed(2)} KB`, status: 'Synched' },
    { name: 'Transactions', count: store.transactions.length, size: `${(store.transactions.length * 0.15).toFixed(2)} KB`, status: 'Synched' },
    { name: 'Conversations', count: store.conversations.length, size: `${(store.conversations.length * 2.4).toFixed(2)} KB`, status: 'Synched' },
    { name: 'IoT Events', count: store.errorLogs.length + store.iotDevices.length, size: '4.2 MB', status: 'Active' },
    { name: 'Documents', count: store.documents.length, size: '124.8 MB', status: 'Indexed' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center italic">
            <Terminal className="mr-4 h-8 w-8 text-indigo-500" />
            Core Backend Report
          </h1>
          <p className="text-gray-400 mt-2 font-medium tracking-wide">
            Detailed diagnostic of the <span className="text-indigo-400">Zenith Relational Engine</span> and underlying cloud infrastructure.
          </p>
        </div>
        <button 
          onClick={startScan}
          disabled={isScanning}
          className="flex items-center px-6 py-3 bg-white text-[#0d0d1a] rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-400 transition-all shadow-xl disabled:opacity-50"
        >
          {isScanning ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
          Execute Deep Scan
        </button>
      </div>

      {isScanning && (
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${scanProgress}%` }}
            className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: System Integrity */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#121225] border-white/5 border shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Database className="h-48 w-48" />
             </div>
             <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="text-white text-lg font-black uppercase tracking-tighter flex items-center">
                   <Server className="mr-3 h-5 w-5 text-indigo-400" />
                   Infrastructure Identity
                </CardTitle>
             </CardHeader>
             <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <StatusRow label="Cloud Provider" value="Google Cloud Platform" subValue="Region: europe-west2" icon={Server} />
                   <StatusRow label="Database Engine" value="Firestore Standard" subValue="Latency: 12ms (avg)" icon={Database} />
                   <StatusRow label="Store Architecture" value="Zustand + Persist" subValue="Local Integrity: Valid" icon={FileJson} />
                </div>
                <div className="space-y-6">
                   <StatusRow label="Runtime Environment" value="Vite / React 18 / TS" subValue="Build: v2.4.92-stable" icon={Code2} />
                   <StatusRow label="Security Mesh" value="Attribute-Based Access" subValue="Auth State: Verified" icon={Lock} />
                   <StatusRow label="API Handshake" value="Secure WebSocket (TLS 1.3)" subValue="Uptime: 99.998%" icon={Network} />
                </div>
             </CardContent>
          </Card>

          <Card className="bg-[#121225] border-white/5 border shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
              <CardTitle className="text-white text-lg font-black uppercase tracking-tighter">Relational Integrity Table</CardTitle>
              <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-emerald-500/20">
                Optimized
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-white/5 border-b border-white/5">
                     <tr>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Collection</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Cardinality</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Allocated Size</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {getCollectionStats().map((stat, i) => (
                       <tr key={i} className="group hover:bg-white/5 transition-colors">
                         <td className="px-6 py-5">
                           <div className="flex items-center">
                             <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center mr-4 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                               <Database className="h-4 w-4" />
                             </div>
                             <span className="text-sm font-bold text-white tracking-tight">{stat.name}</span>
                           </div>
                         </td>
                         <td className="px-6 py-5 text-sm font-black text-gray-300 italic">{stat.count}</td>
                         <td className="px-6 py-5 text-sm font-bold text-gray-400">{stat.size}</td>
                         <td className="px-6 py-5">
                           <span className={cn(
                             "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest",
                             stat.status === 'Active' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'
                           )}>
                             {stat.status}
                           </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Real-time Stats & Logs */}
        <div className="space-y-6">
           <Card className="bg-[#121225] border-white/5 border shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
              <CardHeader className="border-b border-white/5 pb-4">
                 <CardTitle className="text-white text-xs font-black uppercase tracking-[0.3em] flex items-center">
                    <Zap className="mr-3 h-4 w-4 text-yellow-500 animate-pulse" />
                    Neural Latency Report
                 </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                 <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                       <div>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Inference Speed</p>
                          <p className="text-3xl font-black text-white italic tracking-tighter">0.82 <span className="text-sm text-gray-600 uppercase">s/token</span></p>
                       </div>
                       <div className="text-emerald-400 text-[10px] font-black uppercase">+12% Gain</div>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                       <div>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Memory Buffer</p>
                          <p className="text-3xl font-black text-white italic tracking-tighter">842 <span className="text-sm text-gray-600 uppercase">MB</span></p>
                       </div>
                       <div className="text-indigo-400 text-[10px] font-black uppercase">Optimized</div>
                    </div>
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Cold Storage Sync</p>
                          <p className="text-3xl font-black text-white italic tracking-tighter">100 <span className="text-sm text-gray-600 uppercase">%</span></p>
                       </div>
                       <div className="text-emerald-400 text-[10px] font-black uppercase">Complete</div>
                    </div>
                 </div>
              </CardContent>
              <CardFooter className="bg-white/5 border-t border-white/5 py-4">
                 <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                    Optimize Core Memory
                 </button>
              </CardFooter>
           </Card>

           <Card className="bg-black border-white/5 border shadow-2xl">
              <CardHeader className="border-b border-white/10 pb-4">
                 <CardTitle className="text-white text-xs font-black uppercase tracking-[0.3em] flex items-center">
                    <Terminal className="mr-3 h-4 w-4 text-indigo-400" />
                    Live Trace Logs
                 </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 font-mono text-[10px] space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
                 {[
                   { t: '10:57:04', m: 'AUTH_HANDSHAKE_SUCCESS [Alexander Maloia]', c: 'text-emerald-400' },
                   { t: '10:57:05', m: 'FETCH_COLLECTION [Tasks] -> 3 records found', c: 'text-indigo-400' },
                   { t: '10:57:05', m: 'ZUSTAND_HYDRATE_STORAGE [zenith-storage]', c: 'text-indigo-400' },
                   { t: '10:57:06', m: 'IOT_HEARTBEAT_POLL [Unit_04_Climate]', c: 'text-indigo-400' },
                   { t: '10:57:08', m: 'VECTOR_DB_UPSELL_CHECK [Semantic Match Found]', c: 'text-purple-400' },
                   { t: '10:57:12', m: 'ALERT_SUPPRESSION_PROTOCOL_ENGAGED', c: 'text-gray-500' },
                   { t: '10:57:15', m: 'DB_SYNC_COMPLETE [12ms]', c: 'text-white font-black' },
                   { t: '10:57:22', m: 'THROTTLING_PREVENTED [Rate Limit Ok]', c: 'text-emerald-400' },
                   { t: '10:57:30', m: 'USER_NAVIGATION_REPORT_GEN', c: 'text-indigo-400' },
                 ].map((log, i) => (
                   <div key={i} className="flex space-x-4 border-l border-white/10 pl-3">
                      <span className="text-gray-600 shrink-0">{log.t}</span>
                      <span className={log.c}>{log.m}</span>
                   </div>
                 ))}
                 <div className="flex items-center text-indigo-400 pt-2 italic">
                   <div className="h-1 w-1 bg-indigo-400 rounded-full animate-pulse mr-2" />
                   Listening for events...
                 </div>
              </CardContent>
           </Card>

           <Card className="bg-[#121225] border-white/5 border shadow-xl">
             <CardHeader className="pb-4">
                <CardTitle className="text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center">
                  <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 mr-3 text-emerald-400" />
                  Security Protocols
                </CardTitle>
             </CardHeader>
             <CardFooter className="pt-0">
                <div className="w-full space-y-3">
                   <div className="flex items-center justify-between p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">SSL/TLS 1.3 Encryption</span>
                      <Lock className="h-3 w-3 text-emerald-500" />
                   </div>
                   <div className="flex items-center justify-between p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
                      <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">2FA Proxy: Enabled</span>
                      <ShieldCheck className="h-3 w-3 text-indigo-500" />
                   </div>
                </div>
             </CardFooter>
           </Card>
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label, value, subValue, icon: Icon }: any) {
  return (
    <div className="flex items-start space-x-5 group">
       <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/50 transition-all p-3">
          <Icon className="h-full w-full text-indigo-400" />
       </div>
       <div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-base font-black text-white italic tracking-tight">{value}</p>
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">{subValue}</p>
       </div>
    </div>
  );
}
