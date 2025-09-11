import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Settings, MoreVertical, FileText, Plus, Rocket, Shield, Zap, Users } from 'lucide-react';
import aiIcon from '../../assets/ai_icon_color.svg';
import type { Assistant } from '../../types';

interface LeftNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onThreadSelect: (threadId: number) => void;
  onWorkflowSelect: (workflowId: string) => void;
}

export const LeftNavigation: React.FC<LeftNavigationProps> = ({ currentView, onViewChange, onThreadSelect, onWorkflowSelect }) => {
  const [assistantsExpanded, setAssistantsExpanded] = useState(true);
  const [threadsExpanded, setThreadsExpanded] = useState(true);
  const [, setActiveThread] = useState(0);
  const [deploymentAssistantExpanded, setDeploymentAssistantExpanded] = useState(true);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<number | null>(0);

  // Assistant data structure
  const assistants: Assistant[] = [
    {
      id: 'deployment-assistant',
      name: 'Deployment Assistant',
      icon: 'settings',
      isExpanded: deploymentAssistantExpanded,
      workflows: [
        { id: 'new-workflow', name: 'New workflow', icon: 'rocket' },
        { id: 'latam-workflow', name: 'LATAM workflow', icon: 'rocket' },
        { id: 'pst-bios-workflow', name: 'PST Bios updates workflow', icon: 'rocket' }
      ]
    },
    {
      id: 'security-assistant',
      name: 'Security Assistant',
      icon: 'shield'
    },
    {
      id: 'performance-assistant',
      name: 'Performance Assistant',
      icon: 'zap'
    },
    {
      id: 'user-management-assistant',
      name: 'User Management Assistant',
      icon: 'users'
    }
  ];


  const handleDeploymentAssistantClick = () => {
    setDeploymentAssistantExpanded(!deploymentAssistantExpanded);
  };

  const handleWorkflowClick = (workflowId: string) => {
    // Set the selected workflow, clear thread selection, and navigate to deployment planner page
    setSelectedWorkflow(workflowId);
    setSelectedThread(null);
    onWorkflowSelect(workflowId);
  };

  const handleThreadClick = (index: number) => {
    // Set the selected thread, clear workflow selection, and navigate to home
    setSelectedThread(index);
    setSelectedWorkflow(null);
    setActiveThread(index);
    onThreadSelect(index);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'settings':
        return <Settings className="w-4 h-4 text-gray-500" />;
      case 'rocket':
        return <Rocket className="w-4 h-4 text-gray-500" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-gray-500" />;
      case 'zap':
        return <Zap className="w-4 h-4 text-gray-500" />;
      case 'users':
        return <Users className="w-4 h-4 text-gray-500" />;
      default:
        return <Settings className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {currentView === 'home' && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => onViewChange('home')}
        />
      )}

      {/* Navigation Sidebar */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 flex flex-col z-50
        lg:relative lg:top-0 lg:h-full lg:z-auto
        w-80
        ${currentView === 'home' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
      {/* Top section with logo and New button */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img src={aiIcon} alt="AI Icon" className="w-8 h-8" />
            <span className="text-lg font-semibold text-gray-900">Lenovo IT Assist</span>
          </div>
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1">
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Assistants Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <button
            onClick={() => setAssistantsExpanded(!assistantsExpanded)}
            className="flex items-center justify-between w-full text-left mb-2"
          >
            <span className="text-base font-medium text-gray-900">Assistants</span>
            {assistantsExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {assistantsExpanded && (
            <div className="space-y-1">
              {/* Render all assistants */}
              {assistants.map((assistant) => (
                <div key={assistant.id}>
                  {/* Deployment Assistant with expandable workflows */}
                  {assistant.id === 'deployment-assistant' ? (
                    <>
                      <div 
                        className={`flex items-center justify-between p-2 rounded-lg group cursor-pointer transition-colors ${
                          currentView === 'deploymentPlanner' 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={handleDeploymentAssistantClick}
                      >
                        <div className="flex items-center space-x-3">
                          {deploymentAssistantExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                          {getIcon(assistant.icon)}
                          <span className="text-sm text-gray-700">{assistant.name}</span>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      
                      {/* Workflows under Deployment Assistant */}
                      {deploymentAssistantExpanded && assistant.workflows && (
                        <div className="ml-6 space-y-1 mt-1">
                          {assistant.workflows.map((workflow) => {
                            const isSelected = selectedWorkflow === workflow.id;
                            return (
                              <div 
                                key={workflow.id}
                                className={`flex items-center justify-between p-2 rounded-lg group cursor-pointer transition-colors ${
                                  isSelected 
                                    ? 'bg-blue-50' 
                                    : 'hover:bg-gray-50'
                                }`}
                                onClick={() => handleWorkflowClick(workflow.id)}
                              >
                                <div className="flex items-center space-x-3">
                                  {isSelected ? (
                                    <Rocket className="w-4 h-4 text-blue-600" />
                                  ) : (
                                    getIcon(workflow.icon)
                                  )}
                                  <span className={`text-sm ${
                                    isSelected ? 'text-blue-600' : 'text-gray-700'
                                  }`}>
                                    {workflow.name}
                                  </span>
                                </div>
                                <button className={`opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded ${
                                  isSelected ? 'opacity-100' : ''
                                }`}>
                                  <MoreVertical className={`w-4 h-4 ${
                                    isSelected ? 'text-blue-600' : 'text-gray-500'
                                  }`} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Other assistants (placeholders) */
                    <div className="flex items-center justify-between p-2 rounded-lg group cursor-pointer transition-colors hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        {getIcon(assistant.icon)}
                        <span className="text-sm text-gray-700">{assistant.name}</span>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Threads Section */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setThreadsExpanded(!threadsExpanded)}
            className="flex items-center justify-between w-full text-left mb-2"
          >
            <span className="text-base font-medium text-gray-900">Threads</span>
            {threadsExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {threadsExpanded && (
            <div className="space-y-1">
              {[
                { name: "New thread on 09/08 2:50 PM", date: "09/08 2:50 PM" },
                { name: "Windows Update deployment strategy", date: "09/07 4:23 PM" },
                { name: "BIOS update troubleshooting", date: "09/07 11:15 AM" },
                { name: "Network driver compatibility issues", date: "09/06 3:42 PM" },
                { name: "Laptop battery optimization settings", date: "09/06 9:30 AM" }
              ].map((thread, i) => {
                const isSelected = selectedThread === i;
                return (
                  <div
                    key={i}
                    onClick={() => handleThreadClick(i)}
                    className={`flex items-center justify-between p-2 rounded-lg group cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <FileText className={`w-4 h-4 flex-shrink-0 ${
                        isSelected ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm truncate ${
                        isSelected ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {thread.name}
                      </span>
                    </div>
                    <button className={`opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded ${
                      isSelected ? 'opacity-100' : ''
                    }`}>
                      <MoreVertical className={`w-4 h-4 ${
                        isSelected ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};
