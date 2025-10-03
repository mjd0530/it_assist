import React, { useState } from 'react';
import { getFileTypeIcon } from './FileTypeIcons';

export const FileChipTest: React.FC = () => {
  const [testFiles, setTestFiles] = useState<File[]>([]);

  const createTestFile = (name: string, type: string): File => {
    const file = new File([''], name, { type });
    return file;
  };

  const addTestFile = (name: string, type: string) => {
    const file = createTestFile(name, type);
    setTestFiles(prev => [...prev, file]);
  };

  const removeTestFile = (index: number) => {
    setTestFiles(prev => prev.filter((_, i) => i !== index));
  };

  const testFileTypes = [
    { name: 'document.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    { name: 'spreadsheet.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { name: 'presentation.pptx', type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
    { name: 'report.pdf', type: 'application/pdf' },
    { name: 'notes.txt', type: 'text/plain' },
    { name: 'image.jpg', type: 'image/jpeg' },
    { name: 'photo.png', type: 'image/png' },
    { name: 'video.mp4', type: 'video/mp4' },
    { name: 'audio.mp3', type: 'audio/mpeg' },
    { name: 'archive.zip', type: 'application/zip' },
    { name: 'script.js', type: 'application/javascript' },
    { name: 'styles.css', type: 'text/css' },
    { name: 'database.sql', type: 'application/sql' },
    { name: 'program.exe', type: 'application/x-msdownload' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Windows 11 File Chip Test</h1>
      
      {/* Test File Buttons */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Add Test Files</h2>
        <div className="flex flex-wrap gap-2">
          {testFileTypes.map((fileType, index) => (
            <button
              key={index}
              onClick={() => addTestFile(fileType.name, fileType.type)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Add {fileType.name}
            </button>
          ))}
        </div>
      </div>

      {/* File Chips Display */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">File Chips ({testFiles.length})</h2>
        {testFiles.length === 0 ? (
          <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
            No files added yet. Click the buttons above to add test files.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {testFiles.map((file, index) => {
              const iconData = getFileTypeIcon(file);
              return (
                <div
                  key={`${file.name}-${file.size}-${index}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm max-w-xs border border-gray-200"
                  style={{ backgroundColor: '#F8FAFC' }}
                >
                  {/* File type icon - Windows 11 style with built-in background */}
                  <div className="w-6 h-6 flex items-center justify-center">
                    {iconData.icon}
                  </div>
                  
                  {/* File info */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-gray-700 truncate font-medium">
                      {file.name}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {file.name.split('.').pop()?.toUpperCase()} · {(Math.random() * 5 + 0.1).toFixed(1)} MB
                    </span>
                  </div>
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeTestFile(index)}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-200"
                    aria-label="Remove file"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Clear All Button */}
      {testFiles.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => setTestFiles([])}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Files
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Test Instructions</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click the buttons above to add different file types</li>
          <li>• Each file chip shows the appropriate Windows 11 Fluent Design icon</li>
          <li>• Icons are color-coded according to Microsoft's design system</li>
          <li>• Click the X button on any chip to remove it</li>
          <li>• Use "Clear All Files" to reset the test</li>
        </ul>
      </div>
    </div>
  );
};
