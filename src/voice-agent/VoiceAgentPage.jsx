import React from 'react';
import VoiceAgentUI from './VoiceAgentUI';
import useVoiceAgent from './useVoiceAgent';

const VoiceAgentPage = () => {
  const voiceAgent = useVoiceAgent();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Healthcare Voice Assistant
        </h1>
        
        <VoiceAgentUI {...voiceAgent} />
        
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">How it works:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click the microphone button to start the conversation</li>
            <li>Describe your symptoms clearly</li>
            <li>The AI will ask follow-up questions about duration, severity, etc.</li>
            <li>Emergency keywords are automatically detected</li>
            <li>Receive triage assessment and doctor recommendations</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgentPage;