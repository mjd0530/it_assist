import { useState } from 'react';
import { Header } from './components/Header';
import { LeftNavigation } from './components/LeftNavigation';
import { CenterContent } from './components/CenterContent';
import { DeploymentPlannerPage } from './components/DeploymentPlannerPage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  const handleThreadSelect = (threadId: number) => {
    setSelectedThread(threadId);
    setCurrentView('home');
    setIsMobileMenuOpen(false);
    setSelectedWorkflow(null);
  };

  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflow(workflowId);
    setCurrentView('deploymentPlanner');
    setIsMobileMenuOpen(false);
    setSelectedThread(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        onMenuClick={handleMenuClick}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row h-screen pt-16">
        {/* Left Navigation */}
        <LeftNavigation 
          currentView={isMobileMenuOpen ? 'home' : currentView}
          onViewChange={handleViewChange}
          onThreadSelect={handleThreadSelect}
          onWorkflowSelect={handleWorkflowSelect}
        />
        
        {/* Dynamic Content */}
        {currentView === 'deploymentPlanner' ? (
          <DeploymentPlannerPage selectedWorkflow={selectedWorkflow} />
        ) : (
          <CenterContent selectedThread={selectedThread} />
        )}
      </div>
    </div>
  );
}

export default App;