import type { Thread, Message } from '../types';

class ThreadService {
  private threads: Thread[] = [
    {
      id: 0,
      name: "New thread on " + new Date().toLocaleString(),
      date: new Date().toLocaleString(),
      status: 'idle',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  private nextId = 1000; // Start at 1000 to avoid collision with demo thread IDs (0-100)
  
  // Store messages for each thread
  private threadMessages: Map<number, Message[]> = new Map();

  getThreads(): Thread[] {
    return [...this.threads].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  addThread(): Thread {
    const now = new Date();
    const newThread: Thread = {
      id: this.nextId++,
      name: `New thread on ${now.toLocaleString()}`,
      date: now.toLocaleString(),
      status: 'idle',
      createdAt: now,
      updatedAt: now
    };
    
    // Add at the beginning of the array (most recent first)
    this.threads.unshift(newThread);
    return newThread;
  }

  updateThreadStatus(id: number, status: Thread['status']): void {
    const thread = this.threads.find(t => t.id === id);
    if (thread) {
      thread.status = status;
      thread.updatedAt = new Date();
      
      // Update thread name if it's still "New thread..."
      if (thread.status === 'completed' && thread.name.startsWith('New thread')) {
        thread.name = `Thread completed on ${new Date().toLocaleString()}`;
      }
    }
  }

  deleteThread(id: number): void {
    this.threads = this.threads.filter(t => t.id !== id);
  }

  getThread(id: number): Thread | undefined {
    return this.threads.find(t => t.id === id);
  }

  updateThreadName(id: number, name: string): void {
    const thread = this.threads.find(t => t.id === id);
    if (thread) {
      thread.name = name;
      thread.updatedAt = new Date();
    }
  }

  // Get messages for a specific thread
  getThreadMessages(id: number): Message[] {
    return this.threadMessages.get(id) || [];
  }

  // Save/update messages for a specific thread
  setThreadMessages(id: number, messages: Message[]): void {
    this.threadMessages.set(id, messages);
    
    // Update thread's updatedAt timestamp
    const thread = this.threads.find(t => t.id === id);
    if (thread) {
      thread.updatedAt = new Date();
      
      // Update thread name based on first user message if still "New thread..."
      if (thread.name.startsWith('New thread') && messages.length > 0) {
        const firstUserMessage = messages.find(m => m.role === 'user');
        if (firstUserMessage) {
          // Use first 50 chars of first message as thread name
          const truncatedContent = firstUserMessage.content.slice(0, 50);
          thread.name = truncatedContent + (firstUserMessage.content.length > 50 ? '...' : '');
        }
      }
    }
  }

  // Add a message to a thread
  addMessageToThread(id: number, message: Message): void {
    const messages = this.getThreadMessages(id);
    this.setThreadMessages(id, [...messages, message]);
  }
}

export const threadService = new ThreadService();
