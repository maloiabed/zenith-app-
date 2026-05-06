import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { FileText, Search, Plus, Filter, FileUp, Shield, Layers, Zap, Clock, ExternalLink, X } from 'lucide-react';
import { useZenithStore } from '@/src/store/zenithStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Documents() {
  const store = useZenithStore();
  const documents = store.documents || [];
  const { addDocument } = store;
  const [isAdding, setIsAdding] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('Finance');

  const handleAdd = () => {
    if (!newDocName.trim()) return;
    addDocument({ name: newDocName, type: newDocType });
    setNewDocName('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">Document Intelligence</h1>
           <p className="text-gray-500 mt-1">OCR, classification, and knowledge extraction from your life documents.</p>
        </div>
        <div className="flex space-x-3">
           <button 
             onClick={() => setIsAdding(!isAdding)}
             className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
           >
            {isAdding ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {isAdding ? 'Cancel' : 'New Entry'}
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            <FileUp className="mr-2 h-4 w-4" />
            Upload File
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="bg-indigo-50/50 border-dashed border-2 border-indigo-200 shadow-none">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                      placeholder="Document Name (e.g. Tax_Return_2024.pdf)"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <select
                      value={newDocType}
                      onChange={(e) => setNewDocType(e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option>Finance</option>
                      <option>Health</option>
                      <option>Jobs</option>
                      <option>Business</option>
                      <option>Legal</option>
                    </select>
                  </div>
                  <button
                    onClick={handleAdd}
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md shadow-indigo-100"
                  >
                    Confirm Ingest
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{420 + documents.length}</div>
            <p className="text-xs text-gray-500 mt-1">1.2 GB Storage used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Extracted Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">2,104</div>
            <p className="text-xs text-indigo-600 font-bold mt-1">Ready for AI query</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">OCR Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">99.4%</div>
            <p className="text-xs text-gray-500 mt-1">Industry-leading extraction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Security Layer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">AES-256</div>
            <p className="text-xs text-green-600 font-bold mt-1 flex items-center">
              <Shield className="h-3 w-3 mr-1" /> End-to-end Encrypted
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Semantic search across all documents..." 
                  className="pl-9 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
             </div>
             <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg border border-gray-200">
                  <Filter className="h-4 w-4" />
                </button>
             </div>
          </div>

          <div className="space-y-3">
             {documents.map((doc, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={doc.id} 
                  className="p-4 bg-white border border-gray-100 rounded-xl hover:border-indigo-100 transition-all group flex items-center justify-between shadow-sm"
                >
                   <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">{doc.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                           <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded uppercase">{doc.type}</span>
                           <span className="text-gray-300 px-1">•</span>
                           <span className="text-[10px] text-gray-500">{doc.date}</span>
                        </div>
                      </div>
                   </div>
                   <div className="flex items-center space-x-4">
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{doc.status}</span>
                      <button className="p-2 text-gray-300 hover:text-indigo-600 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>

        <div className="space-y-6">
           <Card>
              <CardHeader>
                 <CardTitle className="text-md flex items-center">
                    <Layers className="mr-2 h-4 w-4 text-gray-400" />
                    Extraction Queue
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-4 bg-gray-50 border border-indigo-100 rounded-xl relative overflow-hidden">
                    <div className="relative z-10">
                       <h6 className="text-xs font-bold text-gray-900">Processing Medical.zip</h6>
                       <div className="flex justify-between items-center mt-2 mb-1">
                          <span className="text-[10px] text-gray-500 italic">Extracting pathology data...</span>
                          <span className="text-[10px] font-bold text-indigo-600">82%</span>
                       </div>
                       <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600" style={{ width: '82%' }} />
                       </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-24 bg-indigo-500/5 blur-2xl" />
                 </div>
              </CardContent>
           </Card>

           <Card className="bg-black text-white">
              <CardHeader>
                 <CardTitle className="text-sm flex items-center">
                    <Zap className="mr-2 h-4 w-4 text-indigo-400" />
                    Insight Extraction
                 </CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-xs text-indigo-100/70 leading-relaxed italic border-l-2 border-indigo-500 pl-4 py-1">
                    "I've combined data from your 2023 Tax Return and May Vanguard Statement. You have $14k in unrealized losses that could be used for tax-loss harvesting this quarter."
                 </p>
                 <button className="w-full mt-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                    Generate Strategy PDF
                 </button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
