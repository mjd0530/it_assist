import React, { useState, useEffect, useRef } from 'react';
import { Play, FileText, Star, Send, Copy, User } from 'lucide-react';
import { SkeletonCard } from '../ShimmerSkeleton/ShimmerSkeleton';
import { deploymentConversations } from '../../services/mockData';
import type { Message } from '../../types';
import { cn } from '../../utils/cn';
import aiIcon from '../../assets/ai_icon_color.svg';

interface DeploymentPlannerPageProps {
  selectedWorkflow?: string | null;
}

export const DeploymentPlannerPage: React.FC<DeploymentPlannerPageProps> = ({ selectedWorkflow = 'new-workflow' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    // Show content after loading
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 2500);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  useEffect(() => {
    // Load conversation messages for the selected workflow
    if (selectedWorkflow && deploymentConversations[selectedWorkflow]) {
      setMessages(deploymentConversations[selectedWorkflow]);
    }
  }, [selectedWorkflow]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom when content first loads
    if (showContent) {
      setTimeout(() => {
        scrollToBottom();
      }, 100); // Small delay to ensure content is rendered
    }
  }, [showContent]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-1 h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
        {isLoading ? (
          // Loading Spinner
          <div className="flex flex-col items-center justify-center space-y-4 p-8 h-full">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-base text-gray-600">Loading deployment planner...</p>
          </div>
        ) : showContent ? (
            // Actual Content (when loaded)
            <div className="flex-1 overflow-y-auto p-8 min-h-0">
              <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
              {/* Deployment Conversation */}
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex space-x-3 animate-fade-in",
                      message.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === 'assistant' && (
                      <img src={aiIcon} alt="AI Icon" className="w-8 h-8 flex-shrink-0" />
                    )}
                    
                    <div className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 relative group",
                      message.role === 'user' 
                        ? "bg-primary-600 text-white" 
                        : "bg-gray-100 text-gray-900"
                    )}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <div className={cn(
                        "flex items-center justify-between mt-2 text-xs",
                        message.role === 'user' ? "text-primary-100" : "text-gray-500"
                      )}>
                        <span>{formatTimestamp(message.timestamp)}</span>
                        <button
                          onClick={() => copyMessage(message.content)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/20 rounded transition-all duration-200"
                          title="Copy message"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* System Scan Results Card - Only show for new-workflow */}
              {selectedWorkflow === 'new-workflow' && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">System scan results</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      Done
                    </span>
                  </div>
                  <p className="text-base text-gray-600 mb-4">142 Total licensed devices.</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Available updates</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                          Critical
                        </span>
                        <span className="text-2xl font-bold text-gray-900">42</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        (impacts 48.83% of total devices)
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                          Recommended
                        </span>
                        <span className="text-2xl font-bold text-gray-900">87</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        (impacts 72.76% of total devices)
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          Optional
                        </span>
                        <span className="text-2xl font-bold text-gray-900">114</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        (impacts 27.35% of total devices)
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom Chat Input Area */}
        <div className="border-t border-gray-200 p-6 bg-white flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Ask Lenovo IT Assist a question..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Send className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <FileText className="w-4 h-4" />
                <span className="text-sm">Explore</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Star className="w-4 h-4" />
                <span className="text-sm">Favorite prompts</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Lenovo IT Assist uses AI. Please double-check results.
          </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[480px] bg-white border-l border-gray-200 flex flex-col h-full">
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Deployment Planner</h2>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
              <Play className="w-4 h-4 mr-2" />
              Start deployment
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto min-h-0">
          {isLoading ? (
            // Shimmer Skeleton Loaders
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : showContent ? (
            // Actual Deployment Stages
            <div className="space-y-6 animate-fade-in">
              {/* Stage 1 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Stage 1: Critical Updates Assessment</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Queued
                  </span>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="text-sm text-gray-600">• Start system scan</li>
                </ul>
              </div>

              {/* Stage 2 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Stage 2: Critical Updates Assessment</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Queued
                  </span>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="text-sm text-gray-600">• Fetch all critical updates that are not tested</li>
                  <li className="text-sm text-gray-600">• Create test batch with 10% requiring reboot and 10% not requiring reboot</li>
                  <li className="text-sm text-gray-600">• Start test updates not requiring reboot immediately</li>
                  <li className="text-sm text-gray-600">• Schedule test updates requiring reboot for deployment at 8:00 PM</li>
                  <li className="text-sm text-gray-600">• Fetch all critical updates that are allowed to deploy</li>
                  <li className="text-sm text-gray-600">• Start updates not requiring reboot immediately</li>
                  <li className="text-sm text-gray-600">• Schedule updates requiring reboot for deployment at 8:00 PM</li>
                </ul>
              </div>

              {/* Stage 3 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Stage 3: Recommended Updates Assessment</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Queued
                  </span>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="text-sm text-gray-600">• Fetch all recommended updates that are not tested</li>
                  <li className="text-sm text-gray-600">• Create test batch with 10% requiring reboot and 10% not requiring reboot</li>
                  <li className="text-sm text-gray-600">• Start test updates not requiring reboot immediately</li>
                  <li className="text-sm text-gray-600">• Schedule test updates requiring reboot for deployment at 8:00 PM</li>
                  <li className="text-sm text-gray-600">• Fetch all recommended updates that are allowed to deploy</li>
                  <li className="text-sm text-gray-600">• Start updates not requiring reboot immediately</li>
                  <li className="text-sm text-gray-600">• Schedule updates requiring reboot for deployment at 8:00 PM</li>
                </ul>
              </div>

              {/* Stage 4 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Stage 4: Optional Updates Assessment</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Queued
                  </span>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="text-sm text-gray-600">• Fetch all optional updates that are not tested</li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
