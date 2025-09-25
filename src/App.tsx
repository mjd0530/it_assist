import { useState } from 'react';
import { LeftNavigation } from './components/LeftNavigation';
import { CenterContent } from './components/CenterContent';
import { DeploymentPlannerPage } from './components/DeploymentPlannerPage';
import { AssistantsPage } from './components/AssistantsPage';
import { ThreadsPage } from './components/ThreadsPage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<number | null>(0);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [isNewThread, setIsNewThread] = useState(false);


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
    setCurrentView('home');
    setIsMobileMenuOpen(false);
    setSelectedWorkflow(null);
    setIsNewThread(isNew);
  };

  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflow(workflowId);
    setCurrentView('deploymentPlanner');
    setIsMobileMenuOpen(false);
    setSelectedThread(null);
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
          <DeploymentPlannerPage selectedWorkflow={selectedWorkflow} />
        ) : currentView === 'assistants' ? (
          <AssistantsPage />
        ) : currentView === 'threads' ? (
          <ThreadsPage />
        ) : (
          <CenterContent selectedThread={selectedThread} isNewThread={isNewThread} />
        )}
      </div>
    </div>
  );
}

export default App;