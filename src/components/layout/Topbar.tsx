import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';
import { useZenithStore } from '@/src/store/zenithStore';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { userProfile } = useZenithStore();

  const initials = userProfile.name.split(' ').map(n => n[0]).join('');

  return (
    <header className="h-16 bg-[#0d0d1a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-30 w-full sticky top-0">
      <div className="flex items-center flex-1">
        <button 
          className="md:hidden p-2 -ml-2 mr-2 text-gray-400 hover:text-white rounded-md transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="max-w-md w-full relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
          </div>
          <input
            type="text"
            placeholder="Search Zenith Core (cmd+k)..."
            className="block w-full pl-10 pr-3 py-2 border border-white/5 rounded-xl leading-5 bg-white/5 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all text-white"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-indigo-400 hover:text-white relative transition-colors bg-white/5 rounded-xl border border-white/5">
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#0d0d1a]"></span>
          <Bell className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <div className="flex items-center">
          <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out p-0.5 bg-gradient-to-tr from-indigo-500 to-purple-500">
            <div className="h-8 w-8 rounded-full bg-[#0d0d1a] text-white flex items-center justify-center font-black text-xs">
              {initials}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
