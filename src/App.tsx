import { useState } from 'react';
import { LeftNavigation } from './components/LeftNavigation';
import { CenterContent } from './components/CenterContent/CenterContent';
import { DeploymentPlannerPage } from './components/DeploymentPlannerPage/DeploymentPlannerPage';
import { AssistantsPage } from './components/AssistantsPage';
import { ThreadsPage } from './components/ThreadsPage';
import { threadService } from './services/threadService';
import type { AssistantOption } from './components/AssistantMenu';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<number | null>(0);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [isNewThread, setIsNewThread] = useState(true); // Start as true for initial load
  const [deploymentInitialQuery, setDeploymentInitialQuery] = useState<string | null>(null);
  const [initialAssistant, setInitialAssistant] = useState<AssistantOption | null>(null);



  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
    // Clear selected thread when navigating away from home
    if (view !== 'home') {
      setSelectedThread(null);
    }
    // Clear selected workflow when navigating away from deployment planner
    if (view !== 'deploymentPlanner') {
      setSelectedWorkflow(null);
    }
  };

  const handleThreadSelect = (threadId: number, isNew: boolean = false) => {
    setSelectedThread(threadId);
    setIsMobileMenuOpen(false);
    setIsNewThread(isNew);
    setInitialAssistant(null); // Clear initial assistant when switching threads
    
    // Check if this thread has an active deployment OR saved deployment state
    const thread = threadService.getThread(threadId);
    const hasSavedDeploymentState = threadService.getDeploymentState(threadId);
    
    if (thread?.deploymentProgress?.isActive || hasSavedDeploymentState) {
      // Thread has active deployment or saved deployment history, show deployment planner
      setCurrentView('deploymentPlanner');
      setSelectedWorkflow('active-deployment');
      setDeploymentInitialQuery(null); // Don't auto-start, resume existing
    } else {
      // Normal thread, show chat
      setCurrentView('home');
      setSelectedWorkflow(null);
    }
  };

  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflow(workflowId);
    setCurrentView('deploymentPlanner');
    setIsMobileMenuOpen(false);
    setSelectedThread(null);
  };

  const handleStartDeploymentPlan = (initialQuery: string) => {
    setDeploymentInitialQuery(initialQuery);
    setSelectedWorkflow('new-workflow');
    setCurrentView('deploymentPlanner');
    setIsMobileMenuOpen(false);
    
    // Update thread name for the deployment plan
    if (selectedThread !== null && selectedThread !== undefined) {
      // Extract a meaningful name from the query (first 50 chars)
      const deploymentName = initialQuery.slice(0, 50) + (initialQuery.length > 50 ? '...' : '');
      threadService.updateThreadName(selectedThread, deploymentName);
      // Don't start deployment progress yet - wait until user confirms to proceed
    }
  };

  const handleStartThread = (assistant: AssistantOption) => {
    // Create a new thread
    const newThread = threadService.addThread();
    
    // Set the thread as selected and navigate to home view
    setSelectedThread(newThread.id);
    setIsNewThread(true);
    setCurrentView('home');
    setIsMobileMenuOpen(false);
    
    // Set the assistant to be pre-populated in the chat
    setInitialAssistant(assistant);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Navigation */}
        <LeftNavigation 
          currentView={isMobileMenuOpen ? 'home' : currentView}
          onViewChange={handleViewChange}
          onThreadSelect={handleThreadSelect}
          onWorkflowSelect={handleWorkflowSelect}
          selectedThread={selectedThread}
        />
        
        {/* Dynamic Content */}
        {currentView === 'deploymentPlanner' ? (
          <DeploymentPlannerPage 
            selectedWorkflow={selectedWorkflow} 
            initialQuery={deploymentInitialQuery || undefined}
            threadId={selectedThread}
          />
        ) : currentView === 'assistants' ? (
          <AssistantsPage onStartThread={handleStartThread} />
        ) : currentView === 'threads' ? (
          <ThreadsPage 
            onThreadSelect={(threadId) => {
              setSelectedThread(threadId);
              setCurrentView('home');
              setIsNewThread(false);
              setInitialAssistant(null);
            }}
            onNewThread={() => {
              const newThread = threadService.addThread();
              setSelectedThread(newThread.id);
              setCurrentView('home');
              setIsNewThread(true);
              setInitialAssistant(null);
            }}
          />
        ) : (
          <CenterContent 
            selectedThread={selectedThread} 
            isNewThread={isNewThread} 
            onStartDeploymentPlan={handleStartDeploymentPlan}
            initialAssistant={initialAssistant}
          />
        )}
      </div>
    </div>
  );
}

export default App;