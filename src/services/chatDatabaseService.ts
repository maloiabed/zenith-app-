import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { Conversation, ChatMessage } from '../store/zenithStore';

export const chatDatabaseService = {
  async backupConversation(userId: string, conversation: Conversation) {
    const path = `users/${userId}/conversations`;
    try {
      const convRef = doc(db, path, conversation.id);
      
      // We don't want to save the messages array directly in the conversation doc if we want deep structure,
      // but let's stick to the blueprint which has a subcollection for messages.
      const { messages, ...convData } = conversation;
      
      const batch = writeBatch(db);
      
      // Save conversation metadata
      batch.set(convRef, {
        ...convData,
        lastSyncedAt: serverTimestamp()
      });
      
      // Save all messages in subcollection
      messages.forEach((msg) => {
        const msgId = msg.id || Math.random().toString(36).substr(2, 9);
        const msgRef = doc(db, `${path}/${conversation.id}/messages`, msgId);
        batch.set(msgRef, {
          ...msg,
          id: msgId
        });
      });
      
      await batch.commit();
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async loadConversations(userId: string): Promise<Conversation[]> {
    const path = `users/${userId}/conversations`;
    try {
      const q = query(collection(db, path), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      
      const conversations: Conversation[] = [];
      
      for (const convDoc of snapshot.docs) {
        const convData = convDoc.data() as Omit<Conversation, 'messages'>;
        
        // Load messages for this conversation
        const messagesPath = `${path}/${convDoc.id}/messages`;
        const msgSnapshot = await getDocs(query(collection(db, messagesPath), orderBy('timestamp', 'asc')));
        const messages = msgSnapshot.docs.map(d => d.data() as ChatMessage);
        
        conversations.push({
          ...convData,
          id: convDoc.id,
          messages
        });
      }
      
      return conversations;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  }
};
