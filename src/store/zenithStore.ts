import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  module: string;
  status: 'open' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: 'applied' | 'interviewing' | 'offer' | 'rejected';
  lastAction: string;
}

export interface HealthLog {
  id: string;
  type: 'sleep' | 'mood' | 'exercise' | 'recovery';
  value: number | string;
  date: string;
}

export interface Deck {
  id: string;
  name: string;
  cardsCount: number;
}

export interface BusinessProject {
  id: string;
  name: string;
  revenue: number;
  status: 'active' | 'completed' | 'proposal';
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  date: string;
}

export interface DailyRitual {
  date: string;
  startRendered: boolean;
  endRendered: boolean;
  reflection: string;
}

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  subject: string;
  date: string;
  time: string;
  channel: 'Zenith' | 'Email' | 'WhatsApp' | 'LinkedIn' | 'Slack';
  messages: ChatMessage[];
  linkedModules: string[];
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  backupStatus: 'none' | 'pending' | 'synced';
}

export interface IoTDevice {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'standby';
  power: boolean;
  value?: string;
  location: string;
  consumption_kWh?: number;
}

export interface ConsumptionLog {
  id: string;
  deviceId: string;
  timestamp: string;
  consumption_kWh: number;
}

export interface PowerLimit {
  id: string;
  target: string; // deviceId or location
  threshold_kWh: number;
  action: 'alert' | 'auto-off';
}

export interface ErrorLog {
  id: string;
  deviceId: string;
  timestamp: string;
  errorType: 'spike' | 'overheating' | 'anomaly';
  actionTaken: string;
}

export interface MessageThread {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
}

export interface LifeDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'Processed' | 'Parsed' | 'Extracted' | 'Shared';
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  value: number;
  status: 'hot' | 'warm' | 'cold';
  type: 'referral' | 'outreach' | 'inbound';
  date: string;
}

export interface CourseUnit {
  id: string;
  code: string;
  name: string;
  credits: number;
  documents: string[]; // IDs of linked documents
}

export interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  units: string[]; // IDs of course units
  timetable: { day: string; activity: string; time: string; unitId?: string }[];
}

export interface FinancialAccount {
  id: string;
  name: string;
  type: 'bank' | 'mobile';
  identifier: string; // Account number or phone number
  status: 'pending' | 'verified';
  balance: number;
  linkedAt: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'Active' | 'Paused';
}

export interface BiometricsData {
  rhr: number;
  hrv: number;
  stress: 'Low' | 'Moderate' | 'High';
  recovery: number;
  respiration: number;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  location: string;
  timezone: string;
  skills: string[];
  workHistory: string;
  academicHistory: { degree: string; school: string; year: string }[];
  priorities: string[];
  productivityStyle: string;
}

interface ZenithState {
  tasks: Task[];
  habits: Habit[];
  transactions: Transaction[];
  jobApplications: JobApplication[];
  healthLogs: HealthLog[];
  decks: Deck[];
  projects: BusinessProject[];
  notes: Note[];
  dailyRituals: DailyRitual[];
  conversations: Conversation[];
  iotDevices: IoTDevice[];
  consumptionLogs: ConsumptionLog[];
  powerLimits: PowerLimit[];
  errorLogs: ErrorLog[];
  threads: MessageThread[];
  principles: string[];
  documents: LifeDocument[];
  opportunities: Opportunity[];
  semesters: Semester[];
  courseUnits: CourseUnit[];
  financialAccounts: FinancialAccount[];
  automations: AutomationRule[];
  biometrics: BiometricsData;
  userProfile: UserProfile;
  auth: {
    user: any | null;
    isAuthenticated: boolean;
    isChecking: boolean;
  };
  systemStatus: {
    battery: number;
    weather: { temp: number; condition: string; forecast: string };
    linkedAccounts: { id: string; platform: string; status: 'connected' | 'disconnected'; icon: string }[];
  };
  
  // Actions
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completedToday'>) => void;
  toggleHabit: (id: string) => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
  addHealthLog: (log: Omit<HealthLog, 'id' | 'date'>) => void;
  addProject: (p: Omit<BusinessProject, 'id'>) => void;
  addNote: (note: Omit<Note, 'id' | 'date'>) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  addDeck: (deck: Omit<Deck, 'id' | 'cardsCount'>) => void;
  addJobApplication: (app: Omit<JobApplication, 'id' | 'lastAction'>) => void;
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'date'>) => void;
  completeRitual: (type: 'start' | 'end', reflection?: string) => void;
  addConversation: (conv: Omit<Conversation, 'id' | 'date' | 'time'>) => string;
  addMessageToConversation: (convId: string, message: ChatMessage) => void;
  toggleIoTDevice: (id: string) => void;
  updateIoTDeviceValue: (id: string, value: string) => void;
  addIoTDevice: (device: Omit<IoTDevice, 'id' | 'power' | 'status' | 'location'>) => void;
  addConsumptionLog: (log: Omit<ConsumptionLog, 'id'>) => void;
  setPowerLimit: (limit: Omit<PowerLimit, 'id'>) => void;
  addErrorLog: (log: Omit<ErrorLog, 'id'>) => void;
  addMessageThread: (thread: Omit<MessageThread, 'id' | 'timestamp' | 'status'>) => void;
  addPrinciple: (principle: string) => void;
  addDocument: (doc: Omit<LifeDocument, 'id' | 'date' | 'status'>) => void;
  addSemester: (sem: Omit<Semester, 'id'>) => void;
  addCourseUnit: (unit: Omit<CourseUnit, 'id' | 'documents'>) => void;
  updateCourseUnit: (id: string, updates: Partial<Omit<CourseUnit, 'id'>>) => void;
  linkDocumentToUnit: (unitId: string, docId: string) => void;
  addFinancialAccount: (account: Omit<FinancialAccount, 'id' | 'status' | 'linkedAt'>) => void;
  verifyFinancialAccount: (id: string) => void;
  addAutomationRule: (rule: Omit<AutomationRule, 'id' | 'status'>) => void;
  updateBiometrics: (data: Partial<BiometricsData>) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  updateSystemStatus: (data: Partial<ZenithState['systemStatus']>) => void;
  setAuth: (user: any) => void;
  toggleLinkedAccount: (id: string) => void;
  updatePrinciples: (principles: string[]) => void;
  
  // Intelligence
  getIntelligenceSummary: () => string;
}

export const useZenithStore = create<ZenithState>()(
  persist(
    (set, get) => ({
      tasks: [
        { id: '1', title: 'Review Q4 Financial Projections', module: 'Business', status: 'open', priority: 'high' },
        { id: '2', title: 'Client follow-up: Wayne Enterprises', module: 'Communication', status: 'open', priority: 'medium' },
        { id: '3', title: 'Study session: Machine Learning', module: 'Study', status: 'open', priority: 'high' },
      ],
      habits: [
        { id: '1', name: 'Morning Read (30m)', streak: 12, completedToday: true },
        { id: '2', name: 'Zero Inbox', streak: 5, completedToday: false },
        { id: '3', name: 'Hydration (2L)', streak: 21, completedToday: true },
      ],
      transactions: [
        { id: '1', amount: 124.00, type: 'expense', category: 'Services', description: 'AWS Subscription', date: new Date().toISOString() },
        { id: '2', amount: 5000.00, type: 'income', category: 'Client Work', description: 'Project Invoice #44', date: new Date().toISOString() },
      ],
      jobApplications: [
        { id: '1', company: 'Google', role: 'Staff Designer', status: 'interviewing', lastAction: '2 days ago' },
      ],
      healthLogs: [
        { id: '1', type: 'recovery', value: 42, date: new Date().toISOString() },
        { id: '2', type: 'sleep', value: '6h 12m', date: new Date().toISOString() },
      ],
      decks: [
        { id: '1', name: 'Machine Learning Fundamentals', cardsCount: 145 },
        { id: '2', name: 'Advanced Macroeconomics', cardsCount: 82 },
      ],
      projects: [
        { id: '1', name: 'Zenith Launch Strategy', revenue: 12000, status: 'active' },
        { id: '2', name: 'Identity API Integration', revenue: 4500, status: 'proposal' },
      ],
      notes: [
        { id: '1', title: 'Cognitive Offloading Protocol', content: 'Always store raw ideas in the buffer module first...', tags: ['Zenith', 'Strategy'], date: new Date().toISOString() },
      ],
      dailyRituals: [],
      conversations: [
        { 
          id: '1', 
          subject: 'Core Welcome', 
          date: new Date().toISOString().split('T')[0], 
          time: '08:00 AM', 
          channel: 'Zenith',
          messages: [{ 
            id: 'm1',
            role: 'assistant', 
            content: 'Zenith Core Online. How can I assist with your life objectives today?',
            timestamp: new Date().toISOString()
          }],
          linkedModules: ['General'],
          tags: ['Onboarding'],
          priority: 'low',
          backupStatus: 'synced'
        }
      ],
      iotDevices: [
        { id: '1', name: 'Smart Lighting (Main Hub)', type: 'Lighting', status: 'online', power: true, location: 'Living Room', consumption_kWh: 0.15 },
        { id: '2', name: 'HRM Sync', type: 'Health', status: 'online', power: true, value: '72 BPM', location: 'Office', consumption_kWh: 0.05 },
        { id: '3', name: 'Climate Controller', type: 'Infrastructure', status: 'online', power: true, location: 'Quarters', consumption_kWh: 1.2 },
      ],
      consumptionLogs: [],
      powerLimits: [
        { id: '1', target: 'Living Room', threshold_kWh: 5.0, action: 'auto-off' }
      ],
      errorLogs: [
        { id: '1', deviceId: '3', timestamp: new Date().toISOString(), errorType: 'anomaly', actionTaken: 'Auto-throttled output' }
      ],
      threads: [
        { id: '1', sender: 'Wayne Enterprises', content: 'The Q4 projections look solid. Requesting final sign-off.', timestamp: '2h ago', status: 'unread' },
      ],
      principles: [
        'Prioritize asymmetric bets with capped downside.',
        'High-agency intervention at systemic bottlenecks.',
        'Contemplation is the engine of high-leverage action.',
      ],
      documents: [
        { id: '1', name: 'Vanguard_Statement_Apr.pdf', type: 'Finance', date: '2 days ago', status: 'Processed' },
      ],
      opportunities: [
        { id: '1', title: 'Network Referral: DeepMind', company: 'Google', value: 12500, status: 'warm', type: 'referral', date: new Date().toISOString() }
      ],
      semesters: [
        { 
          id: '1', 
          name: 'Fall 2025', 
          startDate: '2025-09-01', 
          endDate: '2025-12-20', 
          units: ['1', '2'],
          timetable: [
            { day: 'Mon', activity: 'Neural Networks', time: '10:00 - 12:00', unitId: '1' },
            { day: 'Wed', activity: 'Advanced Algorithms', time: '14:00 - 16:00', unitId: '2' }
          ]
        }
      ],
      courseUnits: [
        { id: '1', code: 'CS502', name: 'Neural Networks', credits: 4, documents: [] },
        { id: '2', code: 'CS505', name: 'Advanced Algorithms', credits: 4, documents: [] }
      ],
      financialAccounts: [
        { id: '1', name: 'Chase Checking', type: 'bank', identifier: '**** 4291', status: 'verified', balance: 12450, linkedAt: '2023-01-12' }
      ],
      automations: [
        { id: '1', name: 'Financial Sweep', trigger: 'Income > $1000', action: 'Move 20% to Vanguard', status: 'Active' },
      ],
      biometrics: {
        rhr: 52,
        hrv: 78,
        stress: 'Moderate',
        recovery: 42,
        respiration: 14.2
      },
      userProfile: {
        name: 'Alexander Maloia',
        email: 'maloiabed@gmail.com',
        role: 'Systems Designer & Strategist',
        location: 'London, UK',
        timezone: 'UTC +0 (London)',
        skills: ['Strategic Planning', 'System Design', 'React / TS', 'AI Context Engineering'],
        workHistory: 'Lead Architect at Antigravity Solutions',
        academicHistory: [
          { degree: 'MSc Artificial Intelligence', school: 'University of Oxford', year: '2024' },
          { degree: 'BSc Computer Science', school: 'Imperial College London', year: '2022' }
        ],
        priorities: ['Strategic Momentum', 'Physical Vitality', 'Knowledge Compounding'],
        productivityStyle: 'High-intensity morning focus with contemplative evening reflection. Prefers asynchronous communication.'
      },
      auth: {
        user: null,
        isAuthenticated: false,
        isChecking: true,
      },
      systemStatus: {
        battery: 88,
        weather: { temp: 18, condition: 'Partly Cloudy', forecast: 'Mild with clear spells tonight' },
        linkedAccounts: [
          { id: '1', platform: 'GitHub', status: 'connected', icon: 'Github' },
          { id: '2', platform: 'Google', status: 'connected', icon: 'Globe' },
          { id: '3', platform: 'Slack', status: 'disconnected', icon: 'MessageSquare' },
          { id: '4', platform: 'Stripe', status: 'disconnected', icon: 'CreditCard' },
        ]
      },

      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: Math.random().toString(36).substr(2, 9) }]
      })),
      
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, status: t.status === 'open' ? 'completed' : 'open' } : t)
      })),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      addHabit: (habit) => set((state) => ({
        habits: [...state.habits, { ...habit, id: Math.random().toString(36).substr(2, 9), streak: 0, completedToday: false }]
      })),

      toggleHabit: (id) => set((state) => ({
        habits: state.habits.map(h => h.id === id ? { ...h, completedToday: !h.completedToday, streak: !h.completedToday ? h.streak + 1 : h.streak } : h)
      })),

      addTransaction: (tx) => set((state) => ({
        transactions: [{ ...tx, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() }, ...state.transactions]
      })),

      addHealthLog: (log) => set((state) => ({
        healthLogs: [{ ...log, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() }, ...state.healthLogs]
      })),

      addProject: (p) => set((state) => ({
        projects: [...state.projects, { ...p, id: Math.random().toString(36).substr(2, 9) }]
      })),
      
      addNote: (note) => set((state) => ({
        notes: [{ ...note, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() }, ...state.notes]
      })),

      updateNote: (id, content) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, content } : n)
      })),

      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter(n => n.id !== id)
      })),

      addDeck: (deck) => set((state) => ({
        decks: [...state.decks, { ...deck, id: Math.random().toString(36).substr(2, 9), cardsCount: 0 }]
      })),

      addJobApplication: (app) => set((state) => {
        const newApp = { ...app, id: Math.random().toString(36).substr(2, 9), lastAction: 'Just now' };
        
        // AI Logic: Detect Opportunity from action
        const relatedOpp: Opportunity = {
          id: Math.random().toString(36).substr(2, 9),
          title: `Strategic Network Expansion: ${app.company}`,
          company: app.company,
          value: Math.floor(Math.random() * 5000) + 8000,
          status: 'warm',
          type: 'referral',
          date: new Date().toISOString()
        };

        return {
          jobApplications: [newApp, ...state.jobApplications],
          opportunities: [relatedOpp, ...(state.opportunities || [])]
        };
      }),

      addOpportunity: (opp) => set((state) => ({
        opportunities: [{ ...opp, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() }, ...(state.opportunities || [])]
      })),

      completeRitual: (type, reflection) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const existing = state.dailyRituals.find(r => r.date === today);
        
        if (existing) {
          return {
            dailyRituals: state.dailyRituals.map(r => r.date === today ? {
              ...r,
              startRendered: type === 'start' ? true : r.startRendered,
              endRendered: type === 'end' ? true : r.endRendered,
              reflection: reflection || r.reflection
            } : r)
          };
        } else {
          return {
            dailyRituals: [...state.dailyRituals, {
              date: today,
              startRendered: type === 'start',
              endRendered: type === 'end',
              reflection: reflection || ''
            }]
          };
        }
      }),

      addConversation: (conv) => {
        const id = Math.random().toString(36).substr(2, 9);
        const now = new Date();
        set((state) => ({
          conversations: [{
            backupStatus: 'none',
            tags: [],
            priority: 'medium',
            channel: 'Zenith',
            ...conv,
            id,
            date: now.toISOString().split('T')[0],
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }, ...state.conversations]
        }));
        return id;
      },

      addMessageToConversation: (convId, message) => set((state) => ({
        conversations: state.conversations.map(c => 
          c.id === convId ? { 
            ...c, 
            messages: [...c.messages, { ...message, id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString() }] 
          } : c
        )
      })),

      toggleIoTDevice: (id) => set((state) => ({
        iotDevices: state.iotDevices.map(d => d.id === id ? { ...d, power: !d.power } : d)
      })),

      updateIoTDeviceValue: (id, value) => set((state) => ({
        iotDevices: state.iotDevices.map(d => d.id === id ? { ...d, value } : d)
      })),

      addIoTDevice: (device) => set((state) => ({
        iotDevices: [...state.iotDevices, { ...device, id: Math.random().toString(36).substr(2, 9), power: false, status: 'online', location: 'Unknown', consumption_kWh: 0 }]
      })),

      addConsumptionLog: (log) => set((state) => ({
        consumptionLogs: [...state.consumptionLogs, { ...log, id: Math.random().toString(36).substr(2, 9) }]
      })),

      setPowerLimit: (limit) => set((state) => ({
        powerLimits: [...state.powerLimits.filter(p => p.target !== limit.target), { ...limit, id: Math.random().toString(36).substr(2, 9) }]
      })),

      addErrorLog: (log) => set((state) => ({
        errorLogs: [...state.errorLogs, { ...log, id: Math.random().toString(36).substr(2, 9) }]
      })),

      addMessageThread: (thread) => set((state) => ({
        threads: [{ ...thread, id: Math.random().toString(36).substr(2, 9), timestamp: 'Just now', status: 'unread' }, ...state.threads]
      })),

      addPrinciple: (principle) => set((state) => ({
        principles: [principle, ...state.principles]
      })),

      updatePrinciples: (principles) => set(() => ({
        principles
      })),

      addDocument: (doc) => set((state) => ({
        documents: [{ ...doc, id: Math.random().toString(36).substr(2, 9), date: 'Just now', status: 'Processed' }, ...state.documents]
      })),

      addSemester: (sem) => set((state) => ({
        semesters: [...(state.semesters || []), { ...sem, id: Math.random().toString(36).substr(2, 9) }]
      })),

      addCourseUnit: (unit) => set((state) => ({
        courseUnits: [...(state.courseUnits || []), { ...unit, id: Math.random().toString(36).substr(2, 9), documents: [] }]
      })),
      
      updateCourseUnit: (id, updates) => set((state) => ({
        courseUnits: state.courseUnits.map(u => u.id === id ? { ...u, ...updates } : u)
      })),

      linkDocumentToUnit: (unitId, docId) => set((state) => ({
        courseUnits: state.courseUnits.map(u => u.id === unitId ? { ...u, documents: [...u.documents, docId] } : u)
      })),

      addFinancialAccount: (account) => set((state) => ({
        financialAccounts: [...(state.financialAccounts || []), { ...account, id: Math.random().toString(36).substr(2, 9), status: 'pending', linkedAt: new Date().toISOString() }]
      })),

      verifyFinancialAccount: (id) => set((state) => ({
        financialAccounts: (state.financialAccounts || []).map(a => a.id === id ? { ...a, status: 'verified' } : a)
      })),

      addAutomationRule: (rule) => set((state) => ({
        automations: [{ ...rule, id: Math.random().toString(36).substr(2, 9), status: 'Active' }, ...state.automations]
      })),

      updateBiometrics: (data) => set((state) => ({
        biometrics: { ...state.biometrics, ...data }
      })),
      updateProfile: (data) => set((state) => ({
        userProfile: { ...state.userProfile, ...data }
      })),
      updateSystemStatus: (data) => set((state) => ({
        systemStatus: { ...state.systemStatus, ...data }
      })),
      setAuth: (user) => set(() => ({
        auth: {
          user,
          isAuthenticated: !!user,
          isChecking: false
        }
      })),
      toggleLinkedAccount: (id) => set((state) => ({
        systemStatus: {
          ...state.systemStatus,
          linkedAccounts: state.systemStatus.linkedAccounts.map(a => a.id === id ? { ...a, status: a.status === 'connected' ? 'disconnected' : 'connected' } : a)
        }
      })),

      getIntelligenceSummary: () => {
        const state = get();
        const tasks = state.tasks || [];
        const healthLogs = state.healthLogs || [];
        const jobApplications = state.jobApplications || [];
        const habits = state.habits || [];
        const projects = state.projects || [];
        const opportunities = state.opportunities || [];
        
        const recoveryLog = healthLogs.find(l => l.type === 'recovery');
        const recovery = (recoveryLog?.value as number) || 0;
        const openTasks = tasks.filter(t => t.status === 'open').length;
        const activeProjects = projects.filter(p => p.status === 'active').length;
        const interviews = jobApplications.filter(j => j.status === 'interviewing').length;
        const habitsDone = habits.filter(h => h.completedToday).length;

        let summary = `Zenith Intelligence: `;
        
        if (recovery < 50) {
          summary += `Recovery is low (${recovery}%). Auto-prioritizing health buffers. `;
        }
        
        summary += `${activeProjects} active projects running. ${openTasks} tasks pending. `;
        
        if (interviews > 0) {
          summary += `Interview pipeline active. `;
        }

        if (opportunities.length > (state.jobApplications || []).length) {
          summary += `Found ${opportunities.length - (state.jobApplications || []).length} latent network opportunities. `;
        }

        if (habits.length > 0) {
          summary += `Daily habits: ${Math.round((habitsDone / habits.length) * 100)}% consistency today.`;
        }
        
        return summary;
      }
    }),
    {
      name: 'zenith-storage',
      version: 6,
      migrate: (persistedState: any, version: number) => {
        if (version < 6) {
          return {
            ...persistedState,
            financialAccounts: persistedState.financialAccounts || [
              { id: '1', name: 'Chase Checking', type: 'bank', identifier: '**** 4291', status: 'verified', balance: 12450, linkedAt: '2023-01-12' }
            ],
            semesters: persistedState.semesters || [
              { 
                id: '1', 
                name: 'Fall 2025', 
                startDate: '2025-09-01', 
                endDate: '2025-12-20', 
                units: ['1', '2'],
                timetable: [
                  { day: 'Mon', activity: 'Neural Networks', time: '10:00 - 12:00', unitId: '1' },
                  { day: 'Wed', activity: 'Advanced Algorithms', time: '14:00 - 16:00', unitId: '2' }
                ]
              }
            ],
            courseUnits: persistedState.courseUnits || [
              { id: '1', code: 'CS502', name: 'Neural Networks', credits: 4, documents: [] },
              { id: '2', code: 'CS505', name: 'Advanced Algorithms', credits: 4, documents: [] }
            ],
            systemStatus: persistedState.systemStatus || {
              battery: 88,
              weather: { temp: 18, condition: 'Partly Cloudy', forecast: 'Mild with clear spells tonight' },
              linkedAccounts: [
                { id: '1', platform: 'GitHub', status: 'connected', icon: 'Github' },
                { id: '2', platform: 'Google', status: 'connected', icon: 'Globe' },
                { id: '3', platform: 'Slack', status: 'disconnected', icon: 'MessageSquare' },
                { id: '4', platform: 'Stripe', status: 'disconnected', icon: 'CreditCard' },
              ]
            }
          };
        }
        return persistedState;
      },
    }
  )
);
