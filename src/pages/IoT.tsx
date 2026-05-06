import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Cpu, Power, Settings, Plus, Info, RefreshCw, X } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IoT() {
  const store = useZenithStore();
  const iotDevices = store.iotDevices || [];
  const { toggleIoTDevice, addIoTDevice } = store;
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Lighting');

  const handleAdd = () => {
    if (!newName.trim()) return;
    addIoTDevice({ name: newName, type: newType });
    setNewName('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">IoT & Sensor Mesh</h1>
           <p className="text-gray-500 mt-1">Real-time status and control of connected environmental nodes.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          {isAdding ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {isAdding ? 'Cancel' : 'Add Device'}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-gray-50 border-dashed border-2 border-gray-200">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Device Name (e.g. Smart AC)"
                    className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
                  />
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
                  >
                    <option>Lighting</option>
                    <option>Climate</option>
                    <option>Security</option>
                    <option>Health</option>
                    <option>Infrastructure</option>
                  </select>
                  <button
                    onClick={handleAdd}
                    className="px-6 py-2 bg-black text-white rounded-lg text-sm font-bold"
                  >
                    Confirm
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 flex flex-col justify-between min-h-[140px]">
           <div>
              <RefreshCw className="h-6 w-6 text-indigo-500 mb-3" />
              <div className="text-2xl font-black text-gray-900">{iotDevices.length}</div>
              <p className="text-xs text-gray-500 font-medium">Nodes currently online</p>
           </div>
        </Card>
        <Card className="p-4 flex flex-col justify-between min-h-[140px]">
           <div>
              <Cpu className="h-6 w-6 text-green-500 mb-3" />
              <div className="text-2xl font-black text-gray-900">12ms</div>
              <p className="text-xs text-gray-500 font-medium">Mesh latency</p>
           </div>
        </Card>
        <Card className="p-4 flex flex-col justify-between min-h-[140px]">
           <div>
              <Power className="h-6 w-6 text-blue-500 mb-3" />
              <div className="text-2xl font-black text-gray-900">0.4 kWh</div>
              <p className="text-xs text-gray-500 font-medium">Real-time consumption</p>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {iotDevices.map((device) => (
          <motion.div
            layout
            key={device.id}
          >
            <Card className={`transition-all duration-300 ${!device.power ? 'opacity-70' : ''}`}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${device.power ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                      <Cpu className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{device.name}</h3>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{device.type}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleIoTDevice(device.id)}
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-all shadow-sm ${device.power ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                  >
                    <Power className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${device.status === 'online' && device.power ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {device.power ? device.status : 'OFF'}
                    </span>
                  </div>
                  {device.value && (
                    <span className="text-xs font-black text-gray-900 font-mono tracking-tighter">{device.value}</span>
                  )}
                  <button className="text-gray-300 hover:text-gray-600 transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-gray-50 border-gray-100">
         <CardHeader>
            <CardTitle className="text-sm flex items-center">
               <Info className="h-4 w-4 mr-2 text-gray-400" />
               Mesh Intelligence
            </CardTitle>
         </CardHeader>
         <CardContent>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              "Biometric sync detects entering 'Deep Work' mode. I've automatically dimmed 'Smart Lighting' across the mesh and activated the Noise Cancellation barrier."
            </p>
         </CardContent>
      </Card>
    </div>
  );
}
