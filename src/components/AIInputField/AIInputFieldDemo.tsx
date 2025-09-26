import React, { useState } from 'react';
import { AIInputField } from './AIInputField';

export const AIInputFieldDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; content: string; attachments?: File[] }>>([]);

  const handleSend = async (message: string, fileAttachments?: File[]) => {
    if (!message.trim() && (!fileAttachments || fileAttachments.length === 0)) return;

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      attachments: fileAttachments || []
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setAttachments([]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: `AI Response: I received your message "${message}"${fileAttachments && fileAttachments.length > 0 ? ` and ${fileAttachments.length} file(s)` : ''}.`,
        attachments: []
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    setAttachments(prev => [...prev, ...files]);
  };

  const handleVoiceRecord = (isRecording: boolean) => {
    console.log('Voice recording:', isRecording);
    if (isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setInputValue(prev => prev + ' Voice input: Hello from voice recording!');
      }, 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Chat Input Component Demo</h1>
        <p className="text-gray-600 mb-6">
          A modern, responsive chat input component with file attachments, voice recording, and auto-resize functionality.
        </p>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Features:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Vertical layout: Input on top, buttons below</li>
              <li>• Auto-resizing textarea</li>
              <li>• File drag & drop support</li>
              <li>• Voice recording toggle</li>
              <li>• Attachment previews</li>
              <li>• Keyboard shortcuts (Enter to send)</li>
              <li>• Loading states</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Layout Structure:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="font-mono bg-gray-100 p-2 rounded text-xs">
                ┌─────────────────────────┐<br/>
                │ Ask me anything...      │ ← Input (top)<br/>
                ├─────────────────────────┤<br/>
                │ [+]    [🎤]      [&gt;]   │ ← Buttons (bottom)<br/>
                └─────────────────────────┘
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Display */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Messages</h3>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No messages yet. Try sending a message below!</p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-900 mb-2">{message.content}</div>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="text-xs text-gray-600">
                      Attachments: {message.attachments.map(f => f.name).join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Input Field */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Try the AI Input Field:</h3>
        <AIInputField
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          onFileUpload={handleFileUpload}
          onVoiceRecord={handleVoiceRecord}
          placeholder="Type a message or drag files here..."
          disabled={false}
          isLoading={isLoading}
          attachments={attachments}
          onAttachmentsChange={setAttachments}
          maxHeight={120}
        />
      </div>

      {/* Current State Display */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Current State:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div>Input Value: "{inputValue}"</div>
          <div>Attachments: {attachments.length} file(s)</div>
          <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
          <div>Messages: {messages.length}</div>
        </div>
      </div>
    </div>
  );
};
