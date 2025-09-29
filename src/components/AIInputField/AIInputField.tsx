import React, { useRef, useState, useEffect } from 'react';
import { Plus, Mic, Send, Paperclip } from 'lucide-react';

export interface AIInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string, attachments?: File[]) => void;
  onFileUpload?: (files: File[]) => void;
  onVoiceRecord?: (isRecording: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  autoFocus?: boolean;
  className?: string;
  maxHeight?: number;
  attachments?: File[];
  onAttachmentsChange?: (attachments: File[]) => void;
}

export const AIInputField: React.FC<AIInputFieldProps> = ({
  value,
  onChange,
  onSend,
  onFileUpload,
  onVoiceRecord,
  placeholder = "Ask me anything...",
  disabled = false,
  isLoading = false,
  autoFocus = false,
  className = "",
  maxHeight = 120,
  attachments = [],
  onAttachmentsChange
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Auto-focus when component mounts if autoFocus is true
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value, maxHeight]);

  // Reset drag state when mouse leaves the window
  useEffect(() => {
    const handleMouseLeave = () => {
      setIsDragOver(false);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);



  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && !isLoading && (value.trim() || attachments.length > 0)) {
        onSend(value.trim(), attachments);
      }
    }
  };

  const handleSendClick = () => {
    if (!disabled && !isLoading && (value.trim() || attachments.length > 0)) {
      onSend(value.trim(), attachments);
    }
  };

  const handleMicClick = () => {
    if (disabled) return;
    
    const newRecordingState = !isRecording;
    setIsRecording(newRecordingState);
    onVoiceRecord?.(newRecordingState);
  };

  const handleAttachClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileUpload?.(files);
      onAttachmentsChange?.([...attachments, ...files]);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only set isDragOver to false if we're actually leaving the container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload?.(files);
      onAttachmentsChange?.([...attachments, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    onAttachmentsChange?.(newAttachments);
  };


  const canSend = value.trim() || attachments.length > 0;

  return (
    <div className={`w-full ${className}`}>
      {/* File input (hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept="*/*"
      />

      {/* Main container */}
      <div 
        className={`
          relative bg-white border rounded-2xl shadow-sm transition-all duration-200
          ${isFocused 
            ? 'shadow-md ring-2 ring-purple-200 border-purple-600' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${isDragOver ? 'bg-purple-50 border-purple-600' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Attachment previews */}
        {attachments.length > 0 && (
          <div className="px-4 pt-3 pb-2 border-b border-gray-100">
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm"
                >
                  <Paperclip className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700 truncate max-w-32">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={disabled}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Text input area - TOP section */}
        <div className="px-4 pt-4 pb-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full resize-none bg-transparent focus:outline-none text-gray-900 placeholder-gray-500
              ${disabled ? 'cursor-not-allowed' : 'cursor-text'}
            `}
            style={{ 
              minHeight: '24px',
              maxHeight: `${maxHeight}px`,
              lineHeight: '1.5'
            }}
            rows={1}
          />
        </div>

        {/* Buttons row - BOTTOM section */}
        <div className="flex items-center justify-between px-4 pb-4 pt-1">
          {/* Left side - Attachment button */}
          <button 
            onClick={handleAttachClick}
            disabled={disabled}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Attach file"
            aria-label="Attach file"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>

          {/* Right side - Voice and Send buttons */}
          <div className="flex items-center gap-2">
            {/* Voice input button */}
            <button 
              onClick={handleMicClick}
              disabled={disabled}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isRecording 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'hover:bg-gray-100 text-gray-600'
                }
              `}
              title={isRecording ? "Stop recording" : "Voice input"}
              aria-label={isRecording ? "Stop recording" : "Start voice input"}
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Send button */}
            <button 
              onClick={handleSendClick}
              disabled={!canSend || disabled || isLoading}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all
                disabled:opacity-50 disabled:cursor-not-allowed shadow-sm
                ${canSend && !disabled && !isLoading
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400'
                }
              `}
              title="Send message"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center mt-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="ml-2 text-sm text-gray-500">AI is thinking...</span>
        </div>
      )}
    </div>
  );
};
