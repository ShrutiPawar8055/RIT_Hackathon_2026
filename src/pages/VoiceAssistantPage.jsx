import React from 'react';
import VoiceAgentPage from '../voice-agent/VoiceAgentPage';

const VoiceAssistantPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header with Avatar */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          {/* Male Doctor Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative overflow-hidden">
            {/* Avatar Face */}
            <div className="absolute w-12 h-12 bg-white rounded-full top-6"></div>
            {/* Eyes */}
            <div className="absolute w-2 h-2 bg-blue-800 rounded-full top-8 left-8"></div>
            <div className="absolute w-2 h-2 bg-blue-800 rounded-full top-8 right-8"></div>
            {/* Smile */}
            <div className="absolute w-8 h-1 bg-blue-800 rounded-full bottom-8"></div>
            {/* Doctor Coat */}
            <div className="absolute w-20 h-12 bg-white bottom-0 rounded-t-xl"></div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          🗣️ AI Voice Assistant
        </h1>
        <p className="text-gray-600 text-sm">
          Conversational healthcare support
        </p>
      </div>

      {/* Voice Agent Component */}
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <VoiceAgentPage />
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Click the microphone to start speaking</li>
          <li>• Describe your symptoms clearly</li>
          <li>• Emergency keywords are automatically detected</li>
          <li>• Receive AI-powered triage assessment</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceAssistantPage;