import React, { useState, useEffect, useRef } from 'react';
import { Square } from 'lucide-react';
// Removed seeded deployment conversations to keep the planner clean
import type { Message } from '../../types';
import { cn } from '../../utils/cn';
// Removed avatars for a cleaner message style
import { AIInputField } from '../AIInputField';
import { DeploymentAccordion } from './DeploymentAccordion';
import RocketLaunchOutlined from '@mui/icons-material/RocketLaunchOutlined';

interface DeploymentPlannerPageProps {
  selectedWorkflow?: string | null;
  initialQuery?: string;
}

export const DeploymentPlannerPage: React.FC<DeploymentPlannerPageProps> = ({ selectedWorkflow = 'new-workflow', initialQuery }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStage, setLoadingStage] = useState<'idle' | 'confirming' | 'building' | 'complete'>('idle');
  const [accordionStart, setAccordionStart] = useState(false);
  const [accordionCompleted, setAccordionCompleted] = useState(false);
  const [planContent, setPlanContent] = useState<null | { title: string; summary: string; steps: string[] }>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [cancelRequested, setCancelRequested] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedAssistant, setSelectedAssistant] = useState<{ key: string; name: string; icon?: React.ReactNode } | null>({ key: 'deployment', name: 'Deployment', icon: <RocketLaunchOutlined fontSize="small" sx={{ color: '#0F172A' }} /> });

  const isConfirmation = (text: string) => {
    const normalized = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = new Set(normalized.split(' '));
    const singleWordSignals = [
      'yes',
      'y',
      'ok',
      'okay',
      'sure',
      'proceed',
      'continue',
      'start',
      'begin',
      'confirm',
      'affirmative',
      'yep',
      'yeah',
    ];
    if (singleWordSignals.some(w => words.has(w))) return true;
    const phraseSignals = [
      'go ahead',
      "let's go",
      'lets go',
      'do it',
      'run it',
      'start deployment',
      'start the deployment',
      'please proceed',
      'please continue',
    ];
    return phraseSignals.some(p => normalized.includes(p));
  };

  // Auto-scroll

  useEffect(() => {
    // Reset messages when switching workflows
    setMessages([]);
  }, [selectedWorkflow]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ensure completion message is visible above sticky input
  useEffect(() => {
    if (accordionCompleted) {
      scrollToBottom();
    }
  }, [accordionCompleted]);

  // Simulate staged generation once user submits a deployment query
  useEffect(() => {
    if (!isGenerating) return;
    setLoadingStage('confirming');
    const t1 = setTimeout(() => {
      if (cancelRequested) return;
      setLoadingStage('building');
    }, 500);
    const t2 = setTimeout(() => {
      if (cancelRequested) return;
      setLoadingStage('complete');
      setPlanContent({
        title: 'NA Updates workflow (Draft)',
        summary:
          "I'm seeing 32 devices on your fleet with critical BIOS updates pending. These updates are flagged as high priority due to potential stability, security, or compatibility improvements from the vendor.\n\nHere's how I recommend we proceed:",
        steps: [
          'Begin with a small batch of devices (e.g., 5–10) to validate the update process and ensure there are no issues.',
          'Monitor for successful completion and any unexpected behavior post-update.',
          'If everything looks good, proceed with phased deployment across the remaining devices.',
          'Confirm all updates are complete and the fleet is running on the latest supported BIOS version.'
        ],
      });
    }, 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isGenerating, cancelRequested]);

  // Auto-start generation when arriving with an initial query
  useEffect(() => {
    if (initialQuery && !isGenerating) {
      setIsGenerating(true);
      setCancelRequested(false);
    }
  }, [initialQuery, isGenerating]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  

  

  return (
    <div className="flex flex-1 h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#F8FAFC' }}>
        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
          <div className="flex-1 overflow-y-auto p-8 pb-8 min-h-0">
            <div className="min-h-full flex flex-col justify-end">
              <div className="w-full max-w-2xl mx-auto space-y-6 pb-8">
              {/* Confirmation message */}
              {isGenerating && (loadingStage === 'confirming' || loadingStage === 'building' || loadingStage === 'complete') && (
                <div className="bg-[#F3F0FF] text-slate-900 rounded-2xl px-5 py-4 fade-in-up shadow-sm border border-[#E8E2FF]">
                  Got it. Pulling in all updates scoped to the <strong>NA region</strong> and creating a <strong>draft plan</strong>.
                </div>
              )}

              {/* Loading skeleton while building */}
              {isGenerating && loadingStage === 'building' && (
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 relative fade-in-up">
                  <p className="text-sm text-gray-600 mb-4">Building a draft plan...</p>
                  <div className="space-y-3">
                    <div className="skeleton-bar skeleton-shimmer h-6 w-full"></div>
                    <div className="skeleton-bar skeleton-shimmer h-6 w-3/5"></div>
                    <div className="skeleton-bar skeleton-shimmer h-6 w-4/5"></div>
                  </div>
                  <button
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    aria-label="Stop building plan"
                    onClick={() => {
                      setCancelRequested(true);
                      setIsGenerating(false);
                      setLoadingStage('idle');
                      setPlanContent(null);
                    }}
                  >
                    <Square className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              )}

              {/* Loaded draft plan */}
              {isGenerating && loadingStage === 'complete' && planContent && (
                <div className="bg-white rounded-2xl shadow-sm p-7 border border-gray-200 fade-in-up">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{planContent.title}</h3>
                  <div className="text-[15px] leading-6 text-gray-700 mb-4">
                    {planContent.summary.split('\n\n').map((para, i) => {
                      const withEmphasis = para
                        .replace(/(\d+\s+devices)/i, '<strong>$1</strong>')
                        .replace(/(critical\s+BIOS\s+updates)/i, '<strong>$1</strong>');
                      return (
                        <p key={i} className="mb-3 last:mb-0" dangerouslySetInnerHTML={{ __html: withEmphasis }} />
                      );
                    })}
                  </div>
                  <div className="space-y-4">
                    {planContent.steps.map((step, idx) => (
                      <p key={idx} className="text-gray-700 text-[15px] leading-6">
                        <span className="font-bold text-gray-900">Step {idx + 1}:</span> {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* AI follow-up */}
              {isGenerating && loadingStage === 'complete' && (
                <div className="bg-[#F3F0FF] text-slate-900 rounded-2xl px-5 py-4 fade-in-up shadow-sm border border-[#E8E2FF]" style={{ animationDelay: '300ms' }}>
                  Would you like to proceed with the deployment plan or make any changes?
                </div>
              )}

              {/* Conversation history */}
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex space-x-3 animate-fade-in",
                      message.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    
                    <div className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 relative group",
                      message.role === 'user' 
                        ? "bg-white text-gray-900 border border-gray-200" 
                        : "bg-secondary-50 text-secondary-900 border border-secondary-200"
                    )}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      
                    </div>

                    
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Deployment Accordion (starts after user confirms) */}
              {accordionStart && (
                <div className="fade-in-up" style={{ animationDelay: '150ms' }}>
                  <DeploymentAccordion
                    start={accordionStart}
                    totalDurationMs={60 * 1000}
                    onComplete={() => {
                      setAccordionCompleted(true);
                    }}
                  />
                </div>
              )}

              {/* Completion message positioned below accordion */}
              {accordionCompleted && (
                <div className="bg-[#F3F0FF] text-slate-900 rounded-2xl px-5 py-4 fade-in-up shadow-sm border border-[#E8E2FF]" style={{ animationDelay: '150ms' }}>
                  Deployment plan completed successfully. I will continue monitoring and let you know if anything requires attention.
                </div>
              )}

              {/* Unified input at the bottom */}
              <div className="mt-4 sticky bottom-8">
                <AIInputField
                  value={inputValue}
                  onChange={setInputValue}
                  onSend={(message) => {
                    if (!message.trim()) return;
                    // If user confirms proceeding, show user's confirmation and start accordion
                    if (isConfirmation(message)) {
                      const userMsg: Message = {
                        id: Date.now().toString(),
                        role: 'user',
                        content: message,
                        timestamp: new Date(),
                      };
                      setMessages(prev => ([...prev, userMsg]));
                      setAccordionCompleted(false);
                      setAccordionStart(true);
                      setMessages(prev => ([
                        ...prev,
                        {
                          id: (Date.now() + 1).toString(),
                          role: 'assistant',
                          content: 'Deployment plan started. I will keep you posted with any updates.',
                          timestamp: new Date(),
                        } as Message,
                      ]));
                    } else {
                      // Do not append user/assistant messages for non-confirmation inputs; only drive the draft flow
                      setIsGenerating(true);
                      setCancelRequested(false);
                    }
                    setAttachments([]);
                    setInputValue('');
                  }}
                  placeholder="Ask me anything..."
                  disabled={false}
                  isLoading={false}
                  attachments={attachments}
                  onAttachmentsChange={setAttachments}
                  selectedAssistant={selectedAssistant}
                  onClearAssistant={() => setSelectedAssistant(null)}
                />
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Input moved into content column above; bottom bar removed */}
      </div>

      {/* Right Panel removed per design */}
    </div>
  );
};
