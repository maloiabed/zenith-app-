import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Activity, Heart, Wind, Zap, Shield, Info, ArrowUpRight, TrendingDown, RefreshCw } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { useState } from 'react';

export function Biometrics() {
  const { biometrics, updateBiometrics } = useZenithStore();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      // Simulate randomization for "live" feel
      updateBiometrics({
        rhr: biometrics.rhr + (Math.random() > 0.5 ? 1 : -1),
        hrv: biometrics.hrv + Math.floor(Math.random() * 5) - 2,
        recovery: Math.min(100, Math.max(0, biometrics.recovery + Math.floor(Math.random() * 3) - 1))
      });
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">Biometric Sync</h1>
           <p className="text-gray-500 mt-1">Live biological signal processing and energy modeling.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
           <button 
             onClick={handleSync}
             disabled={isSyncing}
             className="px-4 py-2 bg-white rounded-md text-sm font-bold shadow-sm flex items-center disabled:opacity-50"
           >
             <RefreshCw className={`mr-2 h-3.5 w-3.5 md:h-4 md:w-4 ${isSyncing ? 'animate-spin' : ''}`} />
             {isSyncing ? 'Syncing...' : 'Sync Now'}
           </button>
           <button className="px-4 py-2 text-sm text-gray-500 font-medium">History</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 flex flex-col justify-between min-h-[160px]">
          <div>
            <Heart className="h-6 w-6 md:h-7 md:w-7 text-red-500 animate-pulse mb-4" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resting Heart Rate</span>
            <div className="text-3xl font-black text-gray-900">{biometrics.rhr} BPM</div>
          </div>
          <div className="flex items-center text-xs text-green-600 font-bold">
            <TrendingDown className="h-3 w-3 md:h-4 md:w-4 mr-1" /> 4% below baseline
          </div>
        </Card>

        <Card className="p-4 flex flex-col justify-between min-h-[160px]">
          <div>
            <Wind className="h-6 w-6 md:h-7 md:w-7 text-blue-400 mb-4" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Respiration Rate</span>
            <div className="text-3xl font-black text-gray-900">{biometrics.respiration} rpm</div>
          </div>
          <div className="flex items-center text-xs text-gray-500 font-medium">
            Steady state detected
          </div>
        </Card>

        <Card className="p-4 flex flex-col justify-between min-h-[160px]">
          <div>
            <Zap className="h-6 w-6 md:h-7 md:w-7 text-orange-400 mb-4" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stress Index</span>
            <div className="text-3xl font-black text-gray-900 uppercase">{biometrics.stress}</div>
          </div>
          <div className="flex items-center text-xs text-orange-600 font-bold">
            <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Increasing (Study load)
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-0 overflow-hidden">
           <CardHeader className="p-6">
              <CardTitle className="text-md">Circadian Rhythm Alignment</CardTitle>
              <CardDescription>Correlation between light exposure and melatonin release indicators.</CardDescription>
           </CardHeader>
           <CardContent className="px-0">
              <div className="h-[300px] w-full bg-black relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-indigo-400/20 font-mono text-[80px] font-black -rotate-12 select-none">ZENITH_CORE_SYNC</div>
                 </div>
                 <div className="absolute bottom-10 left-10 right-10 flex flex-col space-y-4">
                    <div className="flex items-end space-x-2">
                       {[40, 60, 30, 80, 55, 90, 45, 70, 85, 30, 50, 65].map((h, i) => (
                         <div key={i} className="flex-1 bg-indigo-500/40 rounded-t-sm" style={{ height: `${h}px` }} />
                       ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                       <span>06:00</span>
                       <span>12:00</span>
                       <span>18:00</span>
                       <span>00:00</span>
                    </div>
                 </div>
              </div>
           </CardContent>
        </Card>

        <div className="space-y-6">
           <Card className="bg-red-50 border-red-100">
              <CardHeader className="pb-2">
                 <div className="flex items-center text-red-600 font-bold text-xs uppercase tracking-wider mb-2">
                    <Shield className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    Biometric Alert
                 </div>
                 <CardTitle className="text-lg">Systemic Inflammation detected.</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-red-700 leading-relaxed">
                   Your HRV variance combined with elevated body temperature (+0.4°C) suggests an immune response is starting.
                   Current Recovery: {biometrics.recovery}%
                 </p>
                 <ul className="mt-4 space-y-2">
                    {[
                      'Mandatory 2h earlier bedtime recommended.',
                      'Adjusting tomorrow\'s 8AM Deep Work block to 10AM.',
                      'Notifying "Business Module" of possible limited capacity.',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-xs text-red-800">
                        <div className="h-1 w-1 rounded-full bg-red-600 mr-2 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                 </ul>
                 <button className="w-full mt-6 py-2.5 bg-red-600 text-white font-bold text-xs rounded-lg hover:bg-red-700 transition-colors">
                    Acknowledge & Automate
                 </button>
              </CardContent>
           </Card>

           <Card>
              <CardHeader>
                 <CardTitle className="text-sm flex items-center">
                    <Info className="h-4 w-4 md:h-5 md:w-5 mr-2 text-gray-400" />
                    Device Ecosystem
                 </CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="space-y-3">
                    {[
                      { name: 'Oura Ring Gen 3', status: 'Connected', battery: '84%' },
                      { name: 'Apple Watch Ultra', status: 'Standby', battery: '12%' },
                      { name: 'Eight Sleep Pod', status: 'Active', temp: '26°C' },
                    ].map(device => (
                      <div key={device.name} className="flex justify-between items-center text-xs">
                        <span className="font-medium text-gray-700">{device.name}</span>
                        <div className="flex items-center space-x-2">
                           <span className="font-bold text-gray-900">{device.status}</span>
                           <span className="text-gray-400 text-[10px]">{device.battery || device.temp}</span>
                        </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
