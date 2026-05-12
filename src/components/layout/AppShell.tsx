import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { auth } from '@/src/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useZenithStore } from '@/src/store/zenithStore';

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const setAuth = useZenithStore(state => state.setAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuth(user);
    });
    return () => unsubscribe();
  }, [setAuth]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0d1a] text-gray-100 font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-1 w-0 overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
        
        <Topbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none bg-gray-50/5 backdrop-blur-3xl">
          <div className="py-8 px-4 max-w-7xl mx-auto sm:px-6 md:px-8 pb-32">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
