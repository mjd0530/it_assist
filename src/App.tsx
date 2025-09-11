import { useState } from 'react';
import { Header } from './components/Header';
import { LeftNavigation } from './components/LeftNavigation';
import { CenterContent } from './components/CenterContent';
import { DeploymentPlannerPage } from './components/DeploymentPlannerPage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
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
        />
        
        {/* Dynamic Content */}
        {currentView === 'deploymentPlanner' ? (
          <DeploymentPlannerPage />
        ) : (
          <CenterContent />
        )}
      </div>
    </div>
  );
}

export default App;