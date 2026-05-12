import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/src/components/ui/card';
import { User, Mail, Globe, MapPin, Briefcase, GraduationCap, Star, ShieldCheck, Save, X, Plus, Trash2 } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { motion, AnimatePresence } from 'motion/react';

export function Profile() {
  const { userProfile, updateProfile } = useZenithStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userProfile);
    setIsEditing(false);
  };

  const updateAcademic = (index: number, field: string, value: string) => {
    const newAcademic = [...formData.academicHistory];
    (newAcademic[index] as any)[field] = value;
    setFormData({ ...formData, academicHistory: newAcademic });
  };

  const removeAcademic = (index: number) => {
    setFormData({
      ...formData,
      academicHistory: formData.academicHistory.filter((_, i) => i !== index)
    });
  };

  const addAcademic = () => {
    setFormData({
      ...formData,
      academicHistory: [...formData.academicHistory, { degree: '', school: '', year: '' }]
    });
  };

  return (
    <div className="space-y-6 relative animate-in fade-in zoom-in duration-700">
      {/* Background Glows */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex justify-between items-end relative z-10">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">Cortex Link</h2>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Identity Model</h1>
          <p className="text-gray-500 mt-1 font-medium">Deep architectural model of your professional and academic trajectory.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-white text-indigo-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-300 transition-all shadow-xl shadow-white/5"
          >
            Modify Identity
          </button>
        ) : (
          <div className="flex space-x-3">
            <button 
              onClick={handleCancel}
              className="px-6 py-3 bg-white/5 text-gray-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
            >
              <X className="h-4 w-4 md:h-5 md:w-5 inline mr-2" />
              Discard
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20"
            >
              <Save className="h-4 w-4 md:h-5 md:w-5 inline mr-2" />
              Commit Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Left Column: Core Identity */}
        <div className="space-y-6">
          <Card className="bg-[#121225] border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
            <CardContent className="pt-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-[2rem] bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white flex items-center justify-center text-4xl font-black mb-6 shadow-[0_0_40px_rgba(99,102,241,0.3)] transform rotate-3">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                {isEditing ? (
                  <div className="w-full space-y-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:border-indigo-500 outline-none transition-all"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Strategic Role</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:border-indigo-500 outline-none transition-all"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase">{userProfile.name}</h2>
                    <p className="text-sm text-indigo-400 font-bold tracking-wide mt-1 uppercase italic">{userProfile.role}</p>
                  </>
                )}
                
                <div className="mt-8 w-full space-y-4 border-t border-white/5 pt-8">
                  {isEditing ? (
                    <>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Communication Link (Email)</label>
                        <input 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:border-indigo-500 outline-none transition-all"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Geographic Vector</label>
                        <input 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:border-indigo-500 outline-none transition-all"
                          value={formData.location}
                          onChange={e => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center text-sm text-gray-400 font-bold group hover:text-white transition-colors">
                        <div className="p-2 bg-white/5 rounded-lg mr-4 border border-white/5 group-hover:border-indigo-500/30">
                          <Mail className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
                        </div>
                        {userProfile.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-400 font-bold group hover:text-white transition-colors">
                        <div className="p-2 bg-white/5 rounded-lg mr-4 border border-white/5 group-hover:border-indigo-500/30">
                          <MapPin className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
                        </div>
                        {userProfile.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-400 font-bold group hover:text-white transition-colors">
                        <div className="p-2 bg-white/5 rounded-lg mr-4 border border-white/5 group-hover:border-indigo-500/30">
                          <Globe className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
                        </div>
                        {userProfile.timezone}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121225] border-white/5 shadow-2xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center">
                <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 mr-2 text-emerald-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
               <div className="flex items-center justify-between text-sm">
                 <span className="text-gray-500 font-bold">Zenith Tier</span>
                 <span className="font-black text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest border border-indigo-500/20">ZENITH PRO</span>
               </div>
               <div className="flex items-center justify-between text-sm">
                 <span className="text-gray-500 font-bold">Entropy Shield</span>
                 <span className="flex items-center text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                   Hardened (2FA)
                 </span>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Deep Profiles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#121225] border-white/5 shadow-xl">
              <CardHeader className="border-b border-white/5 bg-white/5">
                <CardTitle className="text-sm font-black text-white uppercase tracking-tighter flex items-center italic">
                  <Briefcase className="mr-3 h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
                  Operative Capability
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Core Skillsets</h4>
                  {isEditing ? (
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-indigo-500 outline-none transition-all h-24"
                      value={formData.skills.join(', ')}
                      onChange={e => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
                      placeholder="Comma separated skills..."
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-300 text-[10px] rounded-lg font-black uppercase tracking-widest border border-indigo-400/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Engagement History</h4>
                  {isEditing ? (
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:border-indigo-500 outline-none transition-all"
                      value={formData.workHistory}
                      onChange={e => setFormData({ ...formData, workHistory: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm text-gray-300 font-bold tracking-tight">{userProfile.workHistory}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#121225] border-white/5 shadow-xl">
              <CardHeader className="border-b border-white/5 bg-white/5">
                <CardTitle className="text-sm font-black text-white uppercase tracking-tighter flex items-center italic">
                  <GraduationCap className="mr-3 h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
                  Academic Foundation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <AnimatePresence mode="popLayout">
                  {formData.academicHistory.map((edu, idx) => (
                    <motion.div 
                      key={idx} 
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative p-4 rounded-xl bg-white/5 border border-white/5 group"
                    >
                      {isEditing && (
                        <button 
                          onClick={() => removeAcademic(idx)}
                          className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                      )}
                      {isEditing ? (
                        <div className="space-y-3">
                          <input 
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white text-xs font-bold"
                            value={edu.degree}
                            onChange={e => updateAcademic(idx, 'degree', e.target.value)}
                            placeholder="Degree"
                          />
                          <input 
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white text-xs font-bold"
                            value={edu.school}
                            onChange={e => updateAcademic(idx, 'school', e.target.value)}
                            placeholder="Institution"
                          />
                          <input 
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white text-xs font-bold"
                            value={edu.year}
                            onChange={e => updateAcademic(idx, 'year', e.target.value)}
                            placeholder="Year"
                          />
                        </div>
                      ) : (
                        <div>
                          <p className="font-black text-white text-sm tracking-tight">{edu.degree}</p>
                          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">{edu.school} • {edu.year}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isEditing && (
                  <button 
                    onClick={addAcademic}
                    className="w-full py-2 bg-indigo-500/10 text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
                  >
                    <Plus className="h-3 w-3 md:h-4 md:w-4 inline mr-2" />
                    Extend Foundation
                  </button>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#121225] border-white/5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Star className="h-32 w-32" />
            </div>
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="text-sm font-black text-white uppercase tracking-tighter flex items-center italic">
                <Star className="mr-3 h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                Strategic Vector & Ethos
              </CardTitle>
              <CardDescription className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">Invariants used for AI trajectory modeling.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Core Trajectory</h4>
                  {isEditing ? (
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-indigo-500 outline-none transition-all h-40"
                      value={formData.priorities.join('\n')}
                      onChange={e => setFormData({ ...formData, priorities: e.target.value.split('\n').filter(p => p.trim()) })}
                      placeholder="One priority per line..."
                    />
                  ) : (
                    <ul className="space-y-3">
                      {userProfile.priorities.map(p => (
                        <li key={p} className="flex items-center text-sm font-bold text-gray-300 tracking-tight group">
                          <div className="p-1 bg-white/5 rounded-md mr-4 border border-white/5 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                          </div>
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Productivity Modality</h4>
                   {isEditing ? (
                     <textarea 
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-indigo-500 outline-none transition-all h-40"
                       value={formData.productivityStyle}
                       onChange={e => setFormData({ ...formData, productivityStyle: e.target.value })}
                     />
                   ) : (
                     <p className="text-sm text-gray-300 font-bold leading-relaxed tracking-tight italic bg-white/5 p-4 rounded-xl border border-white/5">
                       "{userProfile.productivityStyle}"
                     </p>
                   )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
