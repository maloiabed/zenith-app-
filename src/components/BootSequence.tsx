import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Zap, Cpu, Activity } from 'lucide-react';

export function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "Synthesizing personal context",
    "Aligning strategic objectives",
    "Calibrating biometric sync",
    "Establishing intelligence link",
    "System Ready"
  ];

  useEffect(() => {
    const totalDuration = 2500;
    const interval = 50;
    const increment = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    const stepInterval = totalDuration / steps.length;
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, stepInterval);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#020205] z-[100] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-indigo-600/30 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-purple-600/30 blur-[140px] rounded-full animate-pulse [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/15 blur-[160px] rounded-full" />
        <div className="absolute top-[20%] left-[20%] w-[10%] h-[10%] bg-pink-500/20 blur-[60px] rounded-full animate-bounce [animation-duration:10s]" />
      </div>

      <div className="w-full max-w-lg space-y-12 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="h-28 w-28 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-[2.5rem] flex items-center justify-center relative z-10 shadow-[0_0_80px_rgba(99,102,241,0.5)] transform group-hover:rotate-12 transition-transform duration-500 border border-white/20">
                 <Shield className="h-14 w-14 md:h-16 md:w-16 text-white fill-white/20" />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute inset-0 bg-indigo-500 blur-3xl rounded-full" 
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border-2 border-white/5 rounded-[3rem] pointer-events-none border-t-indigo-500/40"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-300 to-pink-200 tracking-tighter uppercase sm:text-8xl drop-shadow-[0_0_30px_rgba(129,140,248,0.5)] italic">
              Zenith
            </h1>
            <p className="text-indigo-400 font-black tracking-[0.6em] uppercase text-[10px] sm:text-xs">
              Systemic Life Governance • Core v5.1
            </p>
          </div>
        </motion.div>

        <div className="space-y-6 max-w-xs mx-auto">
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[10px] sm:text-xs font-black text-indigo-300 uppercase tracking-[0.3em] h-4 drop-shadow-[0_0_8px_rgba(165,180,252,0.4)]"
            >
              {steps[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-12">
           {[
             { icon: Zap, label: 'Power', color: 'text-yellow-400' },
             { icon: Cpu, label: 'Cortex', color: 'text-blue-400' },
             { icon: Activity, label: 'Sync', color: 'text-emerald-400' }
           ].map((item, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 + (i * 0.1) }}
               className="flex flex-col items-center space-y-3"
             >
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${item.color}`}>
                  <item.icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">{item.label}</span>
             </motion.div>
           ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 opacity-20">
        <div className="h-1 w-1 rounded-full bg-white animate-bounce" />
        <span className="text-[8px] font-mono text-white uppercase tracking-[0.5em]">Establishing Handshake</span>
      </div>
    </div>
  );
}
