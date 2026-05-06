import {
  LayoutDashboard,
  Wallet,
  BookOpen,
  Heart,
  Target,
  MessageSquare,
  Briefcase,
  Zap,
  Calendar,
  Building,
  StickyNote,
  Settings,
  Brain,
  Cpu,
  GitMerge,
  Clock,
  ScanFace,
  FileText
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const navGroups = [
  {
    name: 'Core Platform',
    items: [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      { name: 'Timeline', path: '/timeline', icon: Clock },
      { name: 'AI Engine', path: '/ai-hub', icon: Brain },
      { name: 'Automations', path: '/automations', icon: GitMerge },
    ]
  },
  {
    name: 'Life Modules',
    items: [
      { name: 'Finance', path: '/finance', icon: Wallet },
      { name: 'Study', path: '/study', icon: BookOpen },
      { name: 'Health', path: '/health', icon: Heart },
      { name: 'Discipline', path: '/discipline', icon: Target },
      { name: 'Communication', path: '/communication', icon: MessageSquare },
      { name: 'Business', path: '/business', icon: Briefcase },
      { name: 'Power', path: '/power', icon: Zap },
      { name: 'Planner', path: '/planner', icon: Calendar },
      { name: 'Jobs', path: '/jobs', icon: Building },
      { name: 'Notes', path: '/notes', icon: StickyNote },
    ]
  },
  {
    name: 'Intelligence Layer',
    items: [
      { name: 'IoT & Sensors', path: '/iot', icon: Cpu },
      { name: 'Biometrics', path: '/biometrics', icon: ScanFace },
      { name: 'Documents', path: '/documents', icon: FileText },
    ]
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-[#1a1a2e] bg-[#0d0d1a] h-screen flex-col hidden md:flex fix z-20 shadow-[20px_0_40px_rgba(0,0,0,0.4)]">
      <div className="h-16 shrink-0 flex items-center px-6 border-b border-white/5 font-bold text-2xl tracking-tighter text-white">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/20">Z</div>
        Zenith
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.name} className="space-y-2">
            <h3 className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">
              {group.name}
            </h3>
            {group.items.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "group flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 relative overflow-hidden",
                    isActive 
                      ? "bg-indigo-600/10 text-indigo-400 shadow-[inset_0_0_20px_rgba(79,70,229,0.1)] border border-indigo-500/20" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-full"
                    />
                  )}
                  <item.icon className={cn("mr-3 h-5 w-5 flex-shrink-0 transition-all duration-300", isActive ? "text-indigo-400 scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "text-gray-500 group-hover:text-indigo-400")} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5 shrink-0 bg-[#0a0a14]">
        <Link
          to="/settings"
          className={cn(
            "group flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all",
            location.pathname.startsWith('/settings')
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Settings className={cn("mr-3 h-5 w-5 flex-shrink-0", location.pathname.startsWith('/settings') ? "text-white" : "text-gray-500 group-hover:text-white")} />
          Settings
        </Link>
      </div>
    </aside>
  );
}
