import React, { useState, useEffect } from 'react';
import { Play, FileText, Star, Send } from 'lucide-react';
import { SkeletonCard } from '../ShimmerSkeleton/ShimmerSkeleton';

export const DeploymentPlannerPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

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

  return (
    <div className="flex flex-1">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Content Area */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        {isLoading ? (
          // Loading Spinner
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-base text-gray-600">Loading deployment planner...</p>
          </div>
        ) : showContent ? (
            // Actual Content (when loaded)
            <div className="w-full max-w-4xl space-y-6 animate-fade-in">
              {/* System Scan Results Card */}
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

              {/* Action Button */}
              <div className="flex justify-center">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-base font-medium">
                  Run a system scan
                </button>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-700">Deployment plan started.</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    ORIGINAL MESSAGE Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom Chat Input Area */}
        <div className="border-t border-gray-200 p-6 bg-white">
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
      <div className="w-full lg:w-[480px] bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Deployment Planner</h2>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
              <Play className="w-4 h-4 mr-2" />
              Start deployment
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
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
