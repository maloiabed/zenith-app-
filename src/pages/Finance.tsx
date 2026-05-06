import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/src/components/ui/card';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, TrendingUp, Filter, Smartphone, Landmark, ShieldCheck, CheckCircle2, Clock, Globe, CreditCard, ChevronRight, AlertCircle, X, Shield, Activity, Lock } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function Finance() {
  const { transactions, financialAccounts, addTransaction, addFinancialAccount, verifyFinancialAccount } = useZenithStore();
  const [isAddingTx, setIsAddingTx] = useState(false);
  const [isLinkingAccount, setIsLinkingAccount] = useState(false);
  const [txForm, setTxForm] = useState({ amount: '', type: 'expense', category: 'General', description: '' });
  const [accountForm, setAccountForm] = useState({ name: '', type: 'bank' as 'bank' | 'mobile', identifier: '' });

  const handleAddTx = () => {
    if (!txForm.amount || !txForm.description) return;
    addTransaction({
      amount: parseFloat(txForm.amount),
      type: txForm.type as 'income' | 'expense',
      category: txForm.category,
      description: txForm.description
    });
    setTxForm({ amount: '', type: 'expense', category: 'General', description: '' });
    setIsAddingTx(false);
  };

  const handleLinkAccount = () => {
    if (!accountForm.name || !accountForm.identifier) return;
    addFinancialAccount({
      name: accountForm.name,
      type: accountForm.type,
      identifier: accountForm.identifier,
      balance: 0,
      status: 'pending' // Initialize as pending per security requirement
    });
    setAccountForm({ name: '', type: 'bank', identifier: '' });
    setIsLinkingAccount(false);
  };

  const handleVerify = (id: string) => {
    // Show a simulated security confirmation
    const code = Math.floor(100000 + Math.random() * 900000);
    const userInput = prompt(`STRATEGIC SECURITY PROTOCOL\nA verification code has been dispatched to your linked device.\nEnter the 6-digit hash to authorize this node:`, "");
    
    if (userInput) {
      verifyFinancialAccount(id);
    }
  };

  const totalBalance = (financialAccounts || [])
    .filter(a => a.status === 'verified')
    .reduce((acc, account) => acc + account.balance, 0);

  const monthlySpending = (transactions || [])
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase italic">Capital Orchestration</h1>
          <p className="text-gray-500 mt-1 font-medium tracking-wide">High-fidelity tracking of capital flows and liquidity orchestration.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            className="flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
            onClick={() => setIsLinkingAccount(true)}
          >
            <Plus className="mr-2 h-4 w-4 text-indigo-600" />
            Integrate Service
          </button>
          <button 
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
            onClick={() => setIsAddingTx(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Commit Entry
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-8">
          <Card className="bg-[#0f172a] text-white border-none shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
              <Wallet className="h-32 w-32" />
            </div>
            <CardHeader className="pb-4 relative z-10">
              <CardDescription className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em]">Net Liquid Assets</CardDescription>
              <CardTitle className="text-5xl font-black tracking-tighter italic mt-1">${totalBalance.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 w-fit px-2 py-1 rounded-md border border-emerald-400/20">
                <TrendingUp className="h-3 w-3 mr-1.5" />
                +2.4% Strategic Momentum
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-white/5 bg-white/5 flex justify-between items-center px-6">
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 italic">Sync: Real-time</div>
              <Activity className="h-3 w-3 text-indigo-500 animate-pulse" />
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1 flex items-center">
              <Landmark className="h-3.5 w-3.5 mr-2" />
              Integrated Capital Nodes
            </h3>
            <div className="space-y-3">
              {(financialAccounts || []).map(account => (
                <Card key={account.id} className="border-gray-100 shadow-sm hover:translate-x-1 hover:border-indigo-500/30 transition-all group overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={cn(
                          "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all shadow-sm",
                          account.status === 'verified' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                        )}>
                          {account.type === 'bank' ? <Landmark className="h-6 w-6" /> : <Smartphone className="h-6 w-6" />}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-black text-gray-900 uppercase italic tracking-tight">{account.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{account.identifier}</p>
                        </div>
                      </div>
                      {account.status === 'verified' ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <button 
                          onClick={() => handleVerify(account.id)}
                          className="px-3 py-1 bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all hover:bg-gray-900 shadow-lg shadow-orange-600/20 animate-pulse"
                        >
                          Verify Node
                        </button>
                      )}
                    </div>
                    {account.status === 'verified' && (
                      <div className="mt-4 flex justify-between items-end bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200">Active Node</div>
                        <div className="text-base font-black text-gray-900 italic tracking-tighter">${account.balance.toLocaleString()}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <button 
              onClick={() => setIsLinkingAccount(true)}
              className="w-full py-4 bg-gray-50 border border-dashed border-gray-300 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-inner"
            >
              + Integrate New Channel
            </button>
          </div>
        </div>

        <div className="md:col-span-3 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Card className="border-none shadow-sm bg-white overflow-hidden p-0">
               <CardHeader className="px-8 pt-8 pb-4 border-b border-gray-50">
                  <CardTitle className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Liquid Resource Depletion</CardTitle>
               </CardHeader>
               <CardContent className="p-8">
                  <div className="flex justify-between items-end mb-4">
                    <div className="text-4xl font-black text-gray-900 tracking-tighter italic">${monthlySpending.toLocaleString()}</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cap Threshold: $6,000.00</div>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden p-0.5 border border-gray-200">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out shadow-sm", 
                        monthlySpending > 6000 ? "bg-red-500 shadow-red-500/50" : "bg-indigo-600 shadow-indigo-600/50"
                      )} 
                      style={{ width: `${Math.min((monthlySpending / 6000) * 100, 100)}%` }} 
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                     <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">0.00</span>
                     <span className={cn(
                       "text-[9px] font-black uppercase tracking-widest",
                       monthlySpending > 6000 ? "text-red-500" : "text-indigo-600"
                     )}>
                        {Math.round((monthlySpending / 6000) * 100)}% of Allocation
                     </span>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-[#121121] text-white overflow-hidden p-0">
               <CardHeader className="px-8 pt-8 pb-4 border-b border-white/5">
                  <CardTitle className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center">
                    <ShieldCheck className="h-3.5 w-3.5 mr-2" />
                    Security Protocols
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
                        <Lock className="h-5 w-5 text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-[11px] font-black uppercase italic tracking-tight">Active 2FA Protocol</div>
                        <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Mobile links secured via Biometrics</div>
                      </div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
                        <Globe className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-[11px] font-black uppercase italic tracking-tight">Quantum Shield Engaged</div>
                        <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">End-to-End Ledger Encryption</div>
                      </div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
               </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-sm bg-white overflow-hidden p-0">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 p-8">
              <div>
                <CardTitle className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Capital Ledger</CardTitle>
                <CardDescription className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1 italic">Verified cryptographic transactions across integrated nodes.</CardDescription>
              </div>
              <button className="h-12 w-12 flex items-center justify-center text-gray-400 hover:text-indigo-600 border border-gray-100 rounded-2xl hover:bg-indigo-50 transition-all group">
                <Filter className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                {(transactions || []).length > 0 ? (
                  (transactions || []).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-all group">
                      <div className="flex items-center">
                        <div className={cn(
                          "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all shadow-sm group-hover:rotate-6",
                          tx.type === 'income' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                        )}>
                          {tx.type === 'income' ? <ArrowUpRight className="h-6 w-6" /> : <ArrowDownLeft className="h-6 w-6" />}
                        </div>
                        <div className="ml-6">
                          <p className="text-base font-black text-gray-900 uppercase italic tracking-tight group-hover:text-indigo-600 transition-colors">{tx.description}</p>
                          <div className="flex items-center space-x-3 mt-1">
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tx.category}</span>
                             <span className="h-1 w-1 bg-gray-300 rounded-full" />
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(tx.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                         <div className={cn(
                           "text-xl font-black tracking-tighter italic",
                           tx.type === 'income' ? 'text-emerald-600' : 'text-gray-900'
                         )}>
                           {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                         </div>
                         <div className="flex items-center justify-end space-x-1.5 mt-1">
                           <Shield className="h-2.5 w-2.5 text-gray-300" />
                           <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest italic">Immutable Entry</span>
                         </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-20 text-center">
                    <div className="p-6 bg-gray-50 rounded-full w-fit mx-auto mb-6">
                      <CreditCard className="h-12 w-12 text-gray-300" />
                    </div>
                    <h4 className="text-lg font-black text-gray-900 uppercase italic tracking-tight">Zero Net Cycles Detected</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 italic">Initialization required for high-fidelity ledger.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {isLinkingAccount && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/90 backdrop-blur-xl p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="w-full max-w-lg">
              <Card className="border-none shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden bg-white text-gray-900">
                <CardHeader className="bg-[#121121] text-white p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                     <Globe className="h-40 w-40" />
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <CardTitle className="text-3xl font-black uppercase italic tracking-tighter">Node Integration</CardTitle>
                      <CardDescription className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mt-2 opacity-80">Synchronizing high-fidelity capital vectors.</CardDescription>
                    </div>
                    <button onClick={() => setIsLinkingAccount(false)} className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center">
                      <CreditCard className="h-3 w-3 mr-2 text-indigo-600" />
                      Infrastructure Tier
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setAccountForm({...accountForm, type: 'bank'})}
                        className={cn(
                          "flex items-center justify-center py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2",
                          accountForm.type === 'bank' ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-600/20" : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"
                        )}
                      >
                        <Landmark className="h-4 w-4 mr-3" />
                        Bank Node
                      </button>
                      <button 
                        onClick={() => setAccountForm({...accountForm, type: 'mobile'})}
                        className={cn(
                          "flex items-center justify-center py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2",
                          accountForm.type === 'mobile' ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-600/20" : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"
                        )}
                      >
                        <Smartphone className="h-4 w-4 mr-3" />
                        Mobile Link
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Entity Identifier</label>
                      <input 
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-gray-900 text-base font-black italic focus:border-indigo-600 outline-none transition-all placeholder:text-gray-300" 
                        placeholder="e.g. WELLS FARGO CENTRAL" 
                        value={accountForm.name} 
                        onChange={e => setAccountForm({...accountForm, name: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Access Credential Hash</label>
                      <input 
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-gray-900 text-base font-black italic focus:border-indigo-600 outline-none transition-all placeholder:text-gray-300" 
                        placeholder="e.g. account index or identifier" 
                        value={accountForm.identifier} 
                        onChange={e => setAccountForm({...accountForm, identifier: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex items-start space-x-5">
                    <ShieldCheck className="h-8 w-8 text-indigo-600 shrink-0 mt-1" />
                    <div>
                      <h5 className="text-[11px] font-black text-indigo-900 uppercase italic tracking-tight">Financial Secrecy protocol v4.2</h5>
                      <p className="text-[10px] font-bold text-indigo-600/70 uppercase tracking-widest mt-1">Establishing secure websocket link to institution...</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-10 pt-0">
                  <button 
                    onClick={handleLinkAccount} 
                    className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-sm font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all shadow-2xl shadow-indigo-600/30 group grow overflow-hidden relative"
                  >
                    <span className="relative z-10 italic">Authorize Integration</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAddingTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/90 backdrop-blur-xl p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="w-full max-w-lg">
              <Card className="border-none shadow-2xl overflow-hidden bg-white text-gray-900">
                <CardHeader className="bg-[#121121] text-white p-10">
                   <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-3xl font-black uppercase italic tracking-tighter">Commit Capital Entry</CardTitle>
                      <CardDescription className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mt-2 opacity-80">Appending verified transaction to global ledger.</CardDescription>
                    </div>
                    <button onClick={() => setIsAddingTx(false)} className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Vector Direction</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setTxForm({...txForm, type: 'income'})}
                        className={cn(
                          "flex items-center justify-center py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2",
                          txForm.type === 'income' ? "bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-600/20" : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"
                        )}
                      >
                        <ArrowUpRight className="h-4 w-4 mr-3" />
                        Inflow
                      </button>
                      <button 
                        onClick={() => setTxForm({...txForm, type: 'expense'})}
                        className={cn(
                          "flex items-center justify-center py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2",
                          txForm.type === 'expense' ? "bg-red-600 text-white border-red-600 shadow-xl shadow-red-600/20" : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"
                        )}
                      >
                        <ArrowDownLeft className="h-4 w-4 mr-3" />
                        Outflow
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Capital Magnitude (USD)</label>
                       <input 
                         type="number"
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-gray-900 text-3xl font-black italic focus:border-indigo-600 outline-none transition-all" 
                         placeholder="0.00" 
                         value={txForm.amount} 
                         onChange={e => setTxForm({...txForm, amount: e.target.value})} 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Allocation Description</label>
                       <input 
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-gray-900 text-base font-black italic focus:border-indigo-600 outline-none transition-all placeholder:text-gray-300" 
                         placeholder="e.g. Strategic Asset Purchase" 
                         value={txForm.description} 
                         onChange={e => setTxForm({...txForm, description: e.target.value})} 
                       />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-10 pt-0">
                  <button 
                    onClick={handleAddTx} 
                    className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-sm font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all shadow-2xl shadow-indigo-600/30 italic"
                  >
                    Append to Ledger
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
