import { useState, useEffect } from 'react';
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
  FileText,
  FileJson,
  Activity,
  Search,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

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
      { name: 'Labs', path: '/labs', icon: Zap },
      { name: 'Network', path: '/network', icon: Activity },
      { name: 'Archive', path: '/archive', icon: Search },
      { name: 'IoT & Sensors', path: '/iot', icon: Cpu },
      { name: 'Biometrics', path: '/biometrics', icon: ScanFace },
      { name: 'Documents', path: '/documents', icon: FileText },
      { name: 'Backend Report', path: '/backend-report', icon: FileJson },
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside 
        className={cn(
          "bg-[#0d0d1a] h-screen flex-col fixed md:sticky top-0 z-50 transition-all duration-300 shadow-[20px_0_40px_rgba(0,0,0,0.4)] border-r border-[#1a1a2e] flex",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className={cn(
          "h-16 shrink-0 flex items-center border-b border-white/5 font-bold text-2xl tracking-tighter text-white overflow-hidden transition-all",
          isCollapsed ? "px-4 justify-center" : "px-6"
        )}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">Z</div>
          {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-3">Zenith</motion.span>}
          
          <button 
            onClick={onClose}
            className="md:hidden ml-auto p-2 text-gray-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 scrollbar-hide">
          {navGroups.map((group) => (
            <div key={group.name} className="space-y-2">
              {!isCollapsed && (
                <h3 className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 truncate">
                  {group.name}
                </h3>
              )}
              {group.items.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    title={isCollapsed ? item.name : undefined}
                    className={cn(
                      "group flex items-center py-2.5 text-sm font-bold rounded-xl transition-all duration-300 relative overflow-hidden",
                      isCollapsed ? "px-0 justify-center" : "px-4",
                      isActive 
                        ? "bg-indigo-600/10 text-indigo-400 shadow-[inset_0_0_20px_rgba(79,70,229,0.1)] border border-indigo-500/20" 
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-full"
                      />
                    )}
                    <item.icon className={cn(
                      "h-5 w-5 flex-shrink-0 transition-all duration-300", 
                      isActive ? "text-indigo-400 scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "text-gray-500 group-hover:text-indigo-400 shadow-none",
                      !isCollapsed && "mr-3"
                    )} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 shrink-0 bg-[#0a0a14] space-y-2">
          <Link
            to="/settings"
            title={isCollapsed ? "Settings" : undefined}
            className={cn(
              "group flex items-center py-3 text-sm font-bold rounded-xl transition-all",
              isCollapsed ? "px-0 justify-center" : "px-4",
              location.pathname.startsWith('/settings')
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Settings className={cn("h-5 w-5 flex-shrink-0", !isCollapsed && "mr-3", location.pathname.startsWith('/settings') ? "text-white" : "text-gray-500 group-hover:text-white")} />
            {!isCollapsed && "Settings"}
          </Link>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex w-full items-center justify-center py-2 text-gray-600 hover:text-indigo-400 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
      </aside>
    </>
  );
}
