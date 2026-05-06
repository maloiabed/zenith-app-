import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0d1a] text-gray-100 font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
        
        <Topbar />
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none bg-gray-50/5 backdrop-blur-3xl">
          <div className="py-8 px-4 max-w-7xl mx-auto sm:px-6 md:px-8 pb-32">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
