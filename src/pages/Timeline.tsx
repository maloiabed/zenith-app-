import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Calendar, Clock, CheckCircle2, AlertCircle, ShoppingBag, Briefcase, Heart, BookOpen, Search, Filter } from 'lucide-react';

export function Timeline() {
  const events = [
    { time: '11:15 AM', type: 'health', title: 'HRV Spike Detected', description: 'Stress index rose to 65 during ML study session.', icon: Heart, color: 'text-red-500' },
    { time: '10:00 AM', type: 'study', title: 'Focus Session Complete', description: '60m session on Neural Networks. 42 cards reviewed.', icon: BookOpen, color: 'text-indigo-500' },
    { time: '09:00 AM', type: 'finance', title: 'Automated Savings Sweep', description: '$450 moved to Vanguard LifeStrategy fund.', icon: ShoppingBag, color: 'text-green-500' },
    { time: '08:00 AM', type: 'discipline', title: 'Habit Logged', description: 'Morning Read (30m) consistency streak now 12 days.', icon: CheckCircle2, color: 'text-orange-500' },
    { time: '07:30 AM', type: 'health', title: 'Sleep Data Analysis', description: '7h 12m sleep logged. Optimal REM reached.', icon: Heart, color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">Life Timeline</h1>
           <p className="text-gray-500 mt-1">Unified historical view of all events, logs, and biometric alerts.</p>
        </div>
        <div className="flex items-center space-x-3">
           <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search history..." 
                className="pl-9 pr-4 py-2 w-48 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
           </div>
           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
             <Filter className="h-4 w-4 md:h-5 md:w-5" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {/* Timeline View */}
          <div className="relative pl-8 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[2px] before:bg-gray-100">
             {events.map((event, i) => (
                <div key={i} className="relative">
                   <div className={`absolute -left-11 h-6 w-6 md:h-8 md:w-8 md:-left-[44px] rounded-full bg-white border-2 border-gray-100 flex items-center justify-center z-10 transition-colors hover:border-indigo-500`}>
                      <event.icon className={`h-3 w-3 md:h-4 md:w-4 ${event.color}`} />
                   </div>
                   <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between group">
                      <div className="space-y-1">
                         <div className="flex items-center space-x-3">
                            <span className="text-xs font-bold text-gray-400 font-mono tracking-tighter">{event.time}</span>
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                         </div>
                         <p className="text-sm text-gray-600 leading-relaxed max-w-xl">{event.description}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                         <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-bold uppercase">{event.type}</span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>

        <div className="space-y-6">
           <Card>
              <CardHeader>
                 <CardTitle className="text-sm">Filter by Module</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                 {['Everything', 'Health', 'Finance', 'Study', 'Discipline', 'Business'].map(module => (
                   <button key={module} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                     module === 'Everything' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'
                   }`}>
                     {module}
                   </button>
                 ))}
              </CardContent>
           </Card>

           <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-none shadow-xl shadow-indigo-100">
              <CardHeader>
                 <CardTitle className="text-sm flex items-center">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    Archive Intelligence
                 </CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-xs text-indigo-100/80 leading-relaxed mb-4">
                    Based on your historical study timeline, you are most cognitively efficient between **09:30 AM and 11:45 AM**.
                 </p>
                 <div className="p-3 bg-white/10 rounded-lg text-[10px] italic">
                   "You've completed 84 Focus Sessions in the last 30 days, placing you in the top 1% of efficiency scores."
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
