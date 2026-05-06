import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Search, Plus, Tag, Trash2, Edit3, X, Save } from 'lucide-react';
import { useZenithStore, Note } from '@/src/store/zenithStore';
import { motion, AnimatePresence } from 'motion/react';

export function Notes() {
  const store = useZenithStore();
  const notes = store.notes || [];
  const { addNote, deleteNote } = store;
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSave = () => {
    if (!newNote.title.trim()) return;
    addNote({
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags.split(',').map(t => t.trim()).filter(Boolean)
    });
    setNewNote({ title: '', content: '', tags: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Notes & Knowledge</h1>
          <p className="text-gray-500 mt-1">Capture ideas, synthesize information, and build your cognitive library.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all shadow-md"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search your library..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-indigo-200 shadow-lg shadow-indigo-50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Draft New Insight</CardTitle>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-red-500">
                  <X className="h-5 w-5" />
                </button>
              </CardHeader>
              <CardContent className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Note Title" 
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-bold"
                />
                <textarea 
                  placeholder="Start writing..." 
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="w-full h-40 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Tags (comma separated)" 
                    value={newNote.tags}
                    onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                    className="flex-1 px-4 py-1 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
                <div className="flex justify-end">
                   <button 
                    onClick={handleSave}
                    className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-md"
                   >
                     <Save className="mr-2 h-4 w-4" />
                     Save to Memory
                   </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <motion.div 
            key={note.id} 
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="h-full hover:border-indigo-200 transition-all group relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base font-bold line-clamp-1">{note.title}</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {note.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-bold uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed italic">
                  "{note.content}"
                </p>
                <div className="mt-6 flex justify-between items-center bg-gray-50 -mx-6 -mb-6 px-6 py-3">
                  <span className="text-[10px] text-gray-400 font-medium">
                    {new Date(note.date).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-gray-400 hover:text-indigo-600">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteNote(note.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredNotes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
             <Edit3 className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No notes found</h3>
          <p className="text-gray-500 mt-1">Start capturing your thoughts to build the Zenith library.</p>
        </div>
      )}
    </div>
  );
}
