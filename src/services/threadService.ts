import type { Thread, Message } from '../types';

export interface DeploymentState {
  messages: Message[];
  accordionStart: boolean;
  accordionCompleted: boolean;
  planContent: {
    title: string;
    summary: string;
    steps: string[];
  } | null;
  initialQuery: string;
}

const STAGE_TITLES = [
  'Stage 1: Perform system scan',
  'Stage 2: Critical updates assessment',
  'Stage 3: Recommended updates assessment',
  'Stage 4: Optional updates assessment',
];

const TOTAL_DEPLOYMENT_DURATION_MS = 30 * 1000; // 30 seconds

interface DeploymentTimer {
  threadId: number;
  startTime: number;
  totalDuration: number;
  intervalId: NodeJS.Timeout;
}

class ThreadService {
  private threads: Thread[] = [
    {
      id: 0,
      name: "New thread",
      date: new Date().toLocaleString(),
      status: 'idle',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  private nextId = 1000; // Start at 1000 to avoid collision with demo thread IDs (0-100)
  
  // Store messages for each thread
  private threadMessages: Map<number, Message[]> = new Map();
  
  // Store deployment state for each thread
  private deploymentStates: Map<number, DeploymentState> = new Map();
  
  // Track active deployment timers
  private deploymentTimers: Map<number, DeploymentTimer> = new Map();

  getThreads(): Thread[] {
    return [...this.threads].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  addThread(): Thread {
    const now = new Date();
    const newThread: Thread = {
      id: this.nextId++,
      name: "New thread",
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
    }
  }

  deleteThread(id: number): void {
    // Don't allow deleting the default thread (id: 0)
    if (id === 0) {
      return;
    }
    
    this.threads = this.threads.filter(t => t.id !== id);
    
    // Clean up associated data
    this.threadMessages.delete(id);
    this.deploymentStates.delete(id);
    this.stopDeploymentTimer(id);
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
      
      // Update thread name based on first user message if still "New thread"
      if (thread.name === 'New thread' && messages.length > 0) {
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

  // Start deployment for a thread with background simulation
  startDeployment(id: number, deploymentName: string): void {
    const thread = this.threads.find(t => t.id === id);
    if (!thread) return;
    
    // Stop any existing timer for this thread
    this.stopDeploymentTimer(id);
    
    thread.name = deploymentName;
    thread.deploymentProgress = {
      isActive: true,
      currentStage: 1,
      totalStages: STAGE_TITLES.length,
      stageName: STAGE_TITLES[0]
    };
    thread.updatedAt = new Date();
    
    // Start background timer
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      this.updateDeploymentBackground(id, startTime);
    }, 1000);
    
    this.deploymentTimers.set(id, {
      threadId: id,
      startTime,
      totalDuration: TOTAL_DEPLOYMENT_DURATION_MS,
      intervalId
    });
  }
  
  // Update deployment progress in the background
  private updateDeploymentBackground(id: number, startTime: number): void {
    const thread = this.threads.find(t => t.id === id);
    if (!thread || !thread.deploymentProgress) return;
    
    const elapsed = Date.now() - startTime;
    
    // Check if deployment is complete
    if (elapsed >= TOTAL_DEPLOYMENT_DURATION_MS) {
      this.completeDeployment(id);
      this.stopDeploymentTimer(id);
      return;
    }
    
    // Calculate current stage based on elapsed time
    const stageDuration = TOTAL_DEPLOYMENT_DURATION_MS / STAGE_TITLES.length;
    const currentStageIndex = Math.min(
      Math.floor(elapsed / stageDuration),
      STAGE_TITLES.length - 1
    );
    
    // Update thread progress if stage has changed
    if (thread.deploymentProgress.currentStage !== currentStageIndex + 1) {
      thread.deploymentProgress.currentStage = currentStageIndex + 1;
      thread.deploymentProgress.stageName = STAGE_TITLES[currentStageIndex];
      thread.updatedAt = new Date();
    }
  }
  
  // Stop deployment timer
  private stopDeploymentTimer(id: number): void {
    const timer = this.deploymentTimers.get(id);
    if (timer) {
      clearInterval(timer.intervalId);
      this.deploymentTimers.delete(id);
    }
  }

  // Update deployment progress
  updateDeploymentProgress(id: number, currentStage: number, stageName: string): void {
    const thread = this.threads.find(t => t.id === id);
    if (thread && thread.deploymentProgress) {
      thread.deploymentProgress.currentStage = currentStage;
      thread.deploymentProgress.stageName = stageName;
      thread.updatedAt = new Date();
    }
  }

  // Complete deployment
  completeDeployment(id: number): void {
    const thread = this.threads.find(t => t.id === id);
    if (thread) {
      thread.deploymentProgress = {
        isActive: false,
        currentStage: thread.deploymentProgress?.totalStages || STAGE_TITLES.length,
        totalStages: thread.deploymentProgress?.totalStages || STAGE_TITLES.length,
        stageName: 'Completed'
      };
      thread.updatedAt = new Date();
      this.stopDeploymentTimer(id);
    }
  }

  // Clear deployment progress
  clearDeploymentProgress(id: number): void {
    const thread = this.threads.find(t => t.id === id);
    if (thread) {
      thread.deploymentProgress = undefined;
      thread.updatedAt = new Date();
      this.stopDeploymentTimer(id);
    }
  }

  // Save deployment state
  saveDeploymentState(id: number, state: DeploymentState): void {
    this.deploymentStates.set(id, state);
  }

  // Get deployment state
  getDeploymentState(id: number): DeploymentState | undefined {
    return this.deploymentStates.get(id);
  }

  // Clear deployment state
  clearDeploymentState(id: number): void {
    this.deploymentStates.delete(id);
  }
  
  // Get deployment timer info for progress calculation
  getDeploymentTimer(id: number): { elapsed: number; total: number; progress: number } | null {
    const timer = this.deploymentTimers.get(id);
    if (!timer) return null;
    
    const elapsed = Date.now() - timer.startTime;
    const progress = Math.min(elapsed / timer.totalDuration, 1);
    
    return {
      elapsed,
      total: timer.totalDuration,
      progress
    };
  }
  
  // Get stage titles
  getStageInfo() {
    return {
      stages: STAGE_TITLES,
      totalStages: STAGE_TITLES.length,
      totalDuration: TOTAL_DEPLOYMENT_DURATION_MS
    };
  }
}

export const threadService = new ThreadService();
