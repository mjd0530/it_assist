import React, { useState, useEffect } from 'react';
import motoLogo from '../../assets/moto_ai_prc.svg';
import rocketIcon from '../../assets/RocketLaunchOutlined.svg';
import { AssistantForm } from '../AssistantForm';
import type { CustomAssistant } from '../AssistantForm';
import { customAssistantService } from '../../services/customAssistantService';

export const AssistantsPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [customAssistants, setCustomAssistants] = useState<CustomAssistant[]>([]);
  const [editingAssistant, setEditingAssistant] = useState<CustomAssistant | undefined>();
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  useEffect(() => {
    loadCustomAssistants();
  }, []);

  const loadCustomAssistants = () => {
    const assistants = customAssistantService.getAll();
    setCustomAssistants(assistants);
  };

  const handleSaveAssistant = (assistant: Omit<CustomAssistant, 'id'>) => {
    if (editingAssistant) {
      customAssistantService.update(editingAssistant.id, assistant);
    } else {
      customAssistantService.create(assistant);
    }
    loadCustomAssistants();
    setView('list');
    setEditingAssistant(undefined);
  };

  const handleEditAssistant = (assistant: CustomAssistant) => {
    setEditingAssistant(assistant);
    setView('edit');
    setMenuOpenId(null);
  };

  const handleDeleteAssistant = (id: string) => {
    if (window.confirm('Are you sure you want to delete this assistant?')) {
      customAssistantService.delete(id);
      loadCustomAssistants();
    }
    setMenuOpenId(null);
  };

  const handleCancel = () => {
    setView('list');
    setEditingAssistant(undefined);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'deployment':
        return (
          <img src={rocketIcon} alt="Deployment" className="w-6 h-6" />
        );
      case 'ticketManagement':
        return (
          <svg className="w-6 h-6" fill="none" stroke="#171717" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
          </svg>
        );
      case 'powerManagement':
        return (
          <svg className="w-6 h-6" fill="none" stroke="#171717" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        );
      case 'applicationManagement':
        return (
          <svg className="w-6 h-6" fill="none" stroke="#171717" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
        );
      case 'adaptiveDeviceConfiguration':
        return (
          <svg className="w-6 h-6" fill="none" stroke="#171717" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
          </svg>
        );
      default:
        return (
          <img src={rocketIcon} alt="Assistant" className="w-6 h-6" />
        );
    }
  };

  if (view === 'create' || view === 'edit') {
    return (
      <AssistantForm
        assistant={editingAssistant}
        onSave={handleSaveAssistant}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="flex-1 p-8" style={{ paddingTop: '6rem' }}>
        <div className="max-w-[640px] mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src={motoLogo} alt="IT Assist Logo" className="w-24 h-24" />
            </div>
            <h1 
              className="font-bold mb-4"
              style={{
                fontSize: '1.5rem',
                background: 'linear-gradient(135deg, #4625EB 0%, #A500BF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Welcome to assistants
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1rem' }}>
              Assistant helps streamline and simplify the rollout of software, updates, and configurations across devices. Below are some prompts to get you started.
            </p>
          </div>

          {/* Custom Assistants Section */}
          {customAssistants.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-bold text-gray-900" style={{ fontSize: '1.125rem' }}>Custom</h2>
                <button 
                  onClick={() => setView('create')}
                  className="text-white transition-colors font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #4625EB 0%, #A500BF 100%)',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    padding: '0.5rem 1rem'
                  }}
                >
                  Create new
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {customAssistants.map((assistant) => (
                  <div 
                    key={assistant.id}
                    className="bg-white border border-gray-200 hover:shadow-md transition-shadow relative" 
                    style={{ borderRadius: '0.75rem' }}
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                          {getCategoryIcon(assistant.category)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1" style={{ fontSize: '1.125rem' }}>
                            {assistant.name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
                            {assistant.description}
                          </p>
                          <button
                            className="text-white font-medium transition-colors"
                            style={{
                              background: 'linear-gradient(135deg, #4625EB 0%, #A500BF 100%)',
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem',
                              padding: '0.375rem 0.75rem'
                            }}
                          >
                            New thread
                          </button>
                        </div>
                        {/* Overflow Menu Button */}
                        <div className="relative">
                          <button
                            onClick={() => setMenuOpenId(menuOpenId === assistant.id ? null : assistant.id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="6" r="1.5"/>
                              <circle cx="12" cy="12" r="1.5"/>
                              <circle cx="12" cy="18" r="1.5"/>
                            </svg>
                          </button>
                          
                          {/* Dropdown Menu */}
                          {menuOpenId === assistant.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setMenuOpenId(null)}
                              />
                              <div 
                                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-20"
                                style={{ borderRadius: '0.5rem' }}
                              >
                                <button
                                  onClick={() => handleEditAssistant(assistant)}
                                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                  style={{ fontSize: '0.875rem' }}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                  </svg>
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteAssistant(assistant.id)}
                                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                  style={{ fontSize: '0.875rem' }}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Assistants Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-bold text-gray-900" style={{ fontSize: '1.125rem' }}>Assistants</h2>
            {customAssistants.length === 0 && (
              <button 
                onClick={() => setView('create')}
                className="text-white transition-colors font-medium"
                style={{
                  background: 'linear-gradient(135deg, #4625EB 0%, #A500BF 100%)',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  padding: '0.5rem 1rem'
                }}
              >
                Create new
              </button>
            )}
          </div>
          
          {/* Assistant Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deployment Assistant */}
            <div className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow" style={{ borderRadius: '0.75rem' }}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <img src={rocketIcon} alt="Rocket" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1" style={{ fontSize: '1.125rem' }}>Deployment Assistant</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: '0.875rem' }}>
                    (Mobile Device Management) agents for configuring and securing mobile devices.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Management Assistant */}
            <div className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow" style={{ borderRadius: '0.75rem' }}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="#171717" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1" style={{ fontSize: '1.125rem' }}>Application Management Assistant</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: '0.875rem' }}>
                    Remote Monitoring and Management agents for MSPs and IT teams.
                  </p>
                </div>
              </div>
            </div>

            {/* Ticket Assistant */}
            <div className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow" style={{ borderRadius: '0.75rem' }}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="#171717" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1" style={{ fontSize: '1.125rem' }}>Ticket Assistant</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: '0.875rem' }}>
                    Patch management agents (e.g., Ivanti, ManageEngine) that handle OS and app up...
                  </p>
                </div>
              </div>
            </div>

            {/* Adaptive Device Configuration Assistant */}
            <div className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow" style={{ borderRadius: '0.75rem' }}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="#171717" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1" style={{ fontSize: '1.125rem' }}>Adaptive Device Configuration A...</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: '0.875rem' }}>
                    Patch management agents (e.g., Ivanti, ManageEngine) that handle OS and app up...
                  </p>
                </div>
              </div>
            </div>

            {/* Power Management Assistant */}
            <div className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow" style={{ borderRadius: '0.75rem' }}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="#171717" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1" style={{ fontSize: '1.125rem' }}>Power Management Assistant</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: '0.875rem' }}>
                    Patch management agents (e.g., Ivanti, ManageEngine) that handle OS and app up...
                  </p>
                </div>
              </div>
            </div>

            {/* PMA assistant */}
            <div className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow" style={{ borderRadius: '0.75rem' }}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="#171717" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1" style={{ fontSize: '1.125rem' }}>PMA assistant</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: '0.875rem' }}>
                    Advanced device configuration and management for adaptive IT environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


