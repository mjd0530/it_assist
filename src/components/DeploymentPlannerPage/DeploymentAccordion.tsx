import React, { useEffect, useMemo, useState } from 'react';
import CheckCircle from '@mui/icons-material/CheckCircle';

interface DeploymentAccordionProps {
  /** If true, the accordion begins simulating progress immediately */
  start?: boolean;
  /** Total duration to finish all stages, in milliseconds (default: 5 minutes) */
  totalDurationMs?: number;
  /** Callback fired once all stages are complete */
  onComplete?: () => void;
}

type StageStatus = 'pending' | 'in_progress' | 'complete';

const STAGE_TITLES = [
  'Stage 1: Perform system scan',
  'Stage 2: Critical updates assessment',
  'Stage 3: Recommended updates assessment',
  'Stage 4: Optional updates assessment',
];

export const DeploymentAccordion: React.FC<DeploymentAccordionProps> = ({
  start = false,
  totalDurationMs = 5 * 60 * 1000,
  onComplete,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [progressMs, setProgressMs] = useState(0);

  const Spinner = () => (
    <span
      className="inline-block w-5 h-5 rounded-full border-2 border-secondary-200 border-t-secondary-500 animate-spin"
      aria-label="Loading"
      role="status"
    />
  );

  const stageDurations = useMemo(() => {
    // Evenly split total time across stages
    const perStage = Math.floor(totalDurationMs / STAGE_TITLES.length);
    return [perStage, perStage, perStage, totalDurationMs - perStage * 3];
  }, [totalDurationMs]);

  const stageBoundaries = useMemo(() => {
    const bounds: number[] = [];
    let acc = 0;
    for (const dur of stageDurations) {
      acc += dur;
      bounds.push(acc);
    }
    return bounds; // cumulative ends for stages [s1End, s2End, ...]
  }, [stageDurations]);

  const currentStageIndex = useMemo(() => {
    for (let i = 0; i < stageBoundaries.length; i++) {
      if (progressMs < stageBoundaries[i]) return i;
    }
    return STAGE_TITLES.length - 1;
  }, [progressMs, stageBoundaries]);

  const stageStatuses: StageStatus[] = useMemo(() => {
    return STAGE_TITLES.map((_, idx) => {
      if (idx < currentStageIndex) return 'complete';
      if (idx === currentStageIndex && progressMs < totalDurationMs) return 'in_progress';
      return progressMs >= totalDurationMs ? 'complete' : 'pending';
    });
  }, [currentStageIndex, progressMs, totalDurationMs]);

  useEffect(() => {
    if (!start) return;
    setExpandedIndex(0);
    setProgressMs(0);
  }, [start]);

  useEffect(() => {
    if (!start) return;
    if (progressMs >= totalDurationMs) {
      onComplete?.();
      return;
    }

    // Smooth progress update every second
    const interval = setInterval(() => {
      setProgressMs(prev => {
        const next = Math.min(prev + 1000, totalDurationMs);
        // Expand the panel corresponding to the active stage
        const idx = stageBoundaries.findIndex(boundary => next <= boundary);
        setExpandedIndex(idx === -1 ? STAGE_TITLES.length - 1 : idx);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start, progressMs, totalDurationMs, stageBoundaries, onComplete]);

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


