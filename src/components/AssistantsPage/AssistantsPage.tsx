import React from 'react';
import motoLogo from '../../assets/moto_ai_prc.svg';
import rocketIcon from '../../assets/RocketLaunchOutlined.svg';

export const AssistantsPage: React.FC = () => {
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

          {/* Assistants Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-bold text-gray-900" style={{ fontSize: '1.125rem' }}>Assistants</h2>
            <button 
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

            {/* Adaptive Device Configuration Assistant */}
            <div className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow" style={{ borderRadius: '0.75rem' }}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="#171717" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1" style={{ fontSize: '1.125rem' }}>Adaptive Device Configuration Assistant</h3>
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


