import React, { useEffect, useMemo, useRef, useState } from 'react';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { threadService } from '../../services/threadService';

interface DeploymentAccordionProps {
  /** Thread ID to track deployment progress */
  threadId?: number | null;
  /** If true, the accordion begins simulating progress immediately */
  start?: boolean;
  /** Callback fired once all stages are complete */
  onComplete?: () => void;
}

type StageStatus = 'pending' | 'in_progress' | 'complete';

export const DeploymentAccordion: React.FC<DeploymentAccordionProps> = ({
  threadId,
  start = false,
  onComplete,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [, setTick] = useState(0); // Force re-render
  const hasCompletedRef = useRef(false);
  
  const stageInfo = threadService.getStageInfo();
  const STAGE_TITLES = stageInfo.stages;

  const Spinner = () => (
    <span
      className="inline-block w-5 h-5 rounded-full border-2 border-secondary-200 border-t-secondary-500 animate-spin"
      aria-label="Loading"
      role="status"
    />
  );

  // Get progress from thread service
  const thread = threadId !== null && threadId !== undefined ? threadService.getThread(threadId) : undefined;
  const deploymentTimer = threadId !== null && threadId !== undefined ? threadService.getDeploymentTimer(threadId) : null;
  
  const progressMs = deploymentTimer?.elapsed || 0;
  const totalDurationMs = deploymentTimer?.total || stageInfo.totalDuration;
  
  const currentStageIndex = useMemo(() => {
    if (!thread?.deploymentProgress) return 0;
    // Stage is 1-indexed in the progress, so subtract 1 for 0-indexed array
    return (thread.deploymentProgress.currentStage || 1) - 1;
  }, [thread?.deploymentProgress]);

  const stageStatuses: StageStatus[] = useMemo(() => {
    const isComplete = thread?.deploymentProgress && !thread.deploymentProgress.isActive;
    
    return STAGE_TITLES.map((_, idx) => {
      if (isComplete) return 'complete';
      if (idx < currentStageIndex) return 'complete';
      if (idx === currentStageIndex && progressMs < totalDurationMs) return 'in_progress';
      return 'pending';
    });
  }, [currentStageIndex, progressMs, totalDurationMs, thread?.deploymentProgress, STAGE_TITLES]);

  useEffect(() => {
    if (!start) return;
    setExpandedIndex(0);
    // Reset completion guard when a new run starts
    hasCompletedRef.current = false;
  }, [start]);

  useEffect(() => {
    if (!start) return;
    
    // Check if deployment is complete
    if (thread?.deploymentProgress && !thread.deploymentProgress.isActive) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
      return;
    }

    // Poll for updates every second to update UI
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
      
      // Auto-expand the current stage
      if (thread?.deploymentProgress) {
        const stageIdx = (thread.deploymentProgress.currentStage || 1) - 1;
        setExpandedIndex(stageIdx);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [start, thread?.deploymentProgress, onComplete]);

  const renderDot = (status: StageStatus) => {
    if (status === 'complete') {
      return <CheckCircle fontSize="small" className="text-green-500" />;
    }
    if (status === 'in_progress') {
      return <Spinner />;
    }
    return <span className="w-3 h-3 rounded-full bg-gray-200 inline-block"></span>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      {STAGE_TITLES.map((title, idx) => {
        const status = stageStatuses[idx];
        const isOpen = expandedIndex === idx;
        return (
          <div key={idx} className={`border-b border-gray-200 ${idx === STAGE_TITLES.length - 1 ? 'rounded-b-2xl' : ''}`}>
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50"
              onClick={() => setExpandedIndex(idx)}
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                {renderDot(status)}
                <span className="font-medium text-gray-900 text-sm md:text-base">{title}</span>
              </div>
              <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 text-sm text-gray-600">
                {status === 'in_progress' && (
                  <p>In progress… collecting device data and preparing tasks.</p>
                )}
                {status === 'pending' && (
                  <p>Pending… will begin after prior stages complete.</p>
                )}
                {status === 'complete' && (
                  <p>Completed.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DeploymentAccordion;


