import React, { useState } from 'react';

export interface CustomAssistant {
  id: string;
  name: string;
  description: string;
  instructions: string;
  toolIntegration: {
    lenovoDeviceOrchestration: boolean;
    serviceNow: boolean;
    teams: boolean;
  };
  category: 'deployment' | 'ticketManagement' | 'powerManagement' | 'applicationManagement' | 'adaptiveDeviceConfiguration';
  isCustom: boolean;
}

interface AssistantFormProps {
  assistant?: CustomAssistant;
  onSave: (assistant: Omit<CustomAssistant, 'id'>) => void;
  onCancel: () => void;
}

export const AssistantForm: React.FC<AssistantFormProps> = ({ assistant, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: assistant?.name || '',
    description: assistant?.description || '',
    instructions: assistant?.instructions || '',
    toolIntegration: assistant?.toolIntegration || {
      lenovoDeviceOrchestration: true,
      serviceNow: false,
      teams: false,
    },
    category: assistant?.category || 'deployment' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      isCustom: true,
    });
  };

  const handleToolChange = (tool: keyof typeof formData.toolIntegration) => {
    setFormData(prev => ({
      ...prev,
      toolIntegration: {
        ...prev.toolIntegration,
        [tool]: !prev.toolIntegration[tool],
      },
    }));
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="flex-1 p-8" style={{ paddingTop: '6rem' }}>
        <div className="max-w-[640px] mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <h1 
              className="font-bold mb-8"
              style={{
                fontSize: '1.5rem',
                background: 'linear-gradient(135deg, #4625EB 0%, #A500BF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {assistant ? 'Edit' : 'Create new'}
            </h1>

            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2" style={{ fontSize: '0.875rem' }}>
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Name of assistant"
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ 
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            {/* Description Field */}
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2" style={{ fontSize: '0.875rem' }}>
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Add a short description about what this assistant does"
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ 
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            {/* Instructions Field */}
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2" style={{ fontSize: '0.875rem' }}>
                Instructions
              </label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                placeholder="What does this assistant do? How does it behave? What should it avoid doing?"
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                style={{ 
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            {/* Tool Integration */}
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-3" style={{ fontSize: '0.875rem' }}>
                Tool Integration
              </label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50"
                  style={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: formData.toolIntegration.lenovoDeviceOrchestration ? '#4625EB' : 'white',
                    color: formData.toolIntegration.lenovoDeviceOrchestration ? 'white' : '#171717',
                    borderColor: formData.toolIntegration.lenovoDeviceOrchestration ? '#4625EB' : '#D1D5DB',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.toolIntegration.lenovoDeviceOrchestration}
                    onChange={() => handleToolChange('lenovoDeviceOrchestration')}
                    className="mr-2"
                    style={{ 
                      accentColor: '#4625EB',
                      display: formData.toolIntegration.lenovoDeviceOrchestration ? 'none' : 'inline',
                    }}
                  />
                  {formData.toolIntegration.lenovoDeviceOrchestration && (
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                  <span style={{ fontSize: '0.875rem' }}>Lenovo Device Orchestration</span>
                </label>

                <label className="flex items-center px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50"
                  style={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: formData.toolIntegration.serviceNow ? '#4625EB' : 'white',
                    color: formData.toolIntegration.serviceNow ? 'white' : '#171717',
                    borderColor: formData.toolIntegration.serviceNow ? '#4625EB' : '#D1D5DB',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.toolIntegration.serviceNow}
                    onChange={() => handleToolChange('serviceNow')}
                    className="mr-2"
                    style={{ 
                      accentColor: '#4625EB',
                      display: formData.toolIntegration.serviceNow ? 'none' : 'inline',
                    }}
                  />
                  {formData.toolIntegration.serviceNow && (
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                  <span style={{ fontSize: '0.875rem' }}>Service Now</span>
                </label>

                <label className="flex items-center px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50"
                  style={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: formData.toolIntegration.teams ? '#4625EB' : 'white',
                    color: formData.toolIntegration.teams ? 'white' : '#171717',
                    borderColor: formData.toolIntegration.teams ? '#4625EB' : '#D1D5DB',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.toolIntegration.teams}
                    onChange={() => handleToolChange('teams')}
                    className="mr-2"
                    style={{ 
                      accentColor: '#4625EB',
                      display: formData.toolIntegration.teams ? 'none' : 'inline',
                    }}
                  />
                  {formData.toolIntegration.teams && (
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                  <span style={{ fontSize: '0.875rem' }}>Teams</span>
                </label>
              </div>
            </div>

            {/* Assistant Category */}
            <div className="mb-8">
              <label className="block text-gray-900 font-medium mb-3" style={{ fontSize: '0.875rem' }}>
                Assistant Category
              </label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50"
                  style={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: formData.category === 'deployment' ? '#4625EB' : 'white',
                    color: formData.category === 'deployment' ? 'white' : '#171717',
                    borderColor: formData.category === 'deployment' ? '#4625EB' : '#D1D5DB',
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    value="deployment"
                    checked={formData.category === 'deployment'}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="mr-2"
                    style={{ 
                      accentColor: '#4625EB',
                      display: formData.category === 'deployment' ? 'none' : 'inline',
                    }}
                  />
                  {formData.category === 'deployment' && (
                    <div className="w-4 h-4 rounded-full border-2 border-white mr-2 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                  <span style={{ fontSize: '0.875rem' }}>Deployment</span>
                </label>

                <label className="flex items-center px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50"
                  style={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: formData.category === 'ticketManagement' ? '#4625EB' : 'white',
                    color: formData.category === 'ticketManagement' ? 'white' : '#171717',
                    borderColor: formData.category === 'ticketManagement' ? '#4625EB' : '#D1D5DB',
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    value="ticketManagement"
                    checked={formData.category === 'ticketManagement'}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="mr-2"
                    style={{ 
                      accentColor: '#4625EB',
                      display: formData.category === 'ticketManagement' ? 'none' : 'inline',
                    }}
                  />
                  {formData.category === 'ticketManagement' && (
                    <div className="w-4 h-4 rounded-full border-2 border-white mr-2 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                  <span style={{ fontSize: '0.875rem' }}>Ticket Management</span>
                </label>

                <label className="flex items-center px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50"
                  style={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: formData.category === 'powerManagement' ? '#4625EB' : 'white',
                    color: formData.category === 'powerManagement' ? 'white' : '#171717',
                    borderColor: formData.category === 'powerManagement' ? '#4625EB' : '#D1D5DB',
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    value="powerManagement"
                    checked={formData.category === 'powerManagement'}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="mr-2"
                    style={{ 
                      accentColor: '#4625EB',
                      display: formData.category === 'powerManagement' ? 'none' : 'inline',
                    }}
                  />
                  {formData.category === 'powerManagement' && (
                    <div className="w-4 h-4 rounded-full border-2 border-white mr-2 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                  <span style={{ fontSize: '0.875rem' }}>Power Management</span>
                </label>

                <label className="flex items-center px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50"
                  style={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: formData.category === 'applicationManagement' ? '#4625EB' : 'white',
                    color: formData.category === 'applicationManagement' ? 'white' : '#171717',
                    borderColor: formData.category === 'applicationManagement' ? '#4625EB' : '#D1D5DB',
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    value="applicationManagement"
                    checked={formData.category === 'applicationManagement'}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="mr-2"
                    style={{ 
                      accentColor: '#4625EB',
                      display: formData.category === 'applicationManagement' ? 'none' : 'inline',
                    }}
                  />
                  {formData.category === 'applicationManagement' && (
                    <div className="w-4 h-4 rounded-full border-2 border-white mr-2 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                  <span style={{ fontSize: '0.875rem' }}>Application Management</span>
                </label>

                <label className="flex items-center px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50"
                  style={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: formData.category === 'adaptiveDeviceConfiguration' ? '#4625EB' : 'white',
                    color: formData.category === 'adaptiveDeviceConfiguration' ? 'white' : '#171717',
                    borderColor: formData.category === 'adaptiveDeviceConfiguration' ? '#4625EB' : '#D1D5DB',
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    value="adaptiveDeviceConfiguration"
                    checked={formData.category === 'adaptiveDeviceConfiguration'}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="mr-2"
                    style={{ 
                      accentColor: '#4625EB',
                      display: formData.category === 'adaptiveDeviceConfiguration' ? 'none' : 'inline',
                    }}
                  />
                  {formData.category === 'adaptiveDeviceConfiguration' && (
                    <div className="w-4 h-4 rounded-full border-2 border-white mr-2 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                  <span style={{ fontSize: '0.875rem' }}>Adaptive Device Configuration</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                style={{
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-white font-medium transition-colors"
                style={{
                  background: 'linear-gradient(135deg, #4625EB 0%, #A500BF 100%)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

