import React from 'react';

const VoiceAgentUI = ({
  isConnected,
  isSpeaking,
  isListening,
  transcription,
  aiResponse,
  triageLevel,
  doctorRecommendation,
  onStartCall,
  onEndCall,
  onToggleMicrophone
}) => {
  return (
    <div className="space-y-6">
      {/* Connection Status Card */}
      <div 
        className="p-6 rounded-2xl"
        style={{
          background: 'var(--bg)',
          boxShadow: 'var(--shadow-raised)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Connection Status</h2>
          <div className="flex items-center gap-2">
            <div 
              className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="text-sm">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={onStartCall}
            disabled={isConnected}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200"
            style={{
              background: isConnected ? '#e5e7eb' : 'var(--bg)',
              color: isConnected ? '#9ca3af' : 'var(--text-primary)',
              boxShadow: isConnected ? 'var(--shadow-pressed-sm)' : 'var(--shadow-raised-sm)',
              cursor: isConnected ? 'not-allowed' : 'pointer',
            }}
          >
            Start Call
          </button>
          
          <button
            onClick={onEndCall}
            disabled={!isConnected}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200"
            style={{
              background: !isConnected ? '#e5e7eb' : 'var(--bg)',
              color: !isConnected ? '#9ca3af' : 'var(--text-primary)',
              boxShadow: !isConnected ? 'var(--shadow-pressed-sm)' : 'var(--shadow-raised-sm)',
              cursor: !isConnected ? 'not-allowed' : 'pointer',
            }}
          >
            End Call
          </button>
        </div>
      </div>

      {/* Microphone Control */}
      <div 
        className="p-6 rounded-2xl text-center"
        style={{
          background: 'var(--bg)',
          boxShadow: 'var(--shadow-raised)',
        }}
      >
        <button
          onClick={onToggleMicrophone}
          disabled={!isConnected}
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all duration-200 ${
            !isConnected ? 'bg-gray-300 cursor-not-allowed' : 
            isListening ? 'bg-red-400' : 'bg-white'
          }`}
          style={{
            boxShadow: !isConnected ? 'var(--shadow-pressed)' : 
                       isListening ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'var(--shadow-raised-lg)',
          }}
        >
          <span className="text-2xl">
            {!isConnected ? '🎤' : isListening ? '🔴' : '🎤'}
          </span>
        </button>
        
        <p className="mt-4 text-sm text-gray-600">
          {!isConnected ? 'Connect to start' : 
           isListening ? 'Listening...' : 'Click to speak'}
        </p>
      </div>

      {/* Transcription Panel */}
      <div 
        className="p-6 rounded-2xl"
        style={{
          background: 'var(--bg)',
          boxShadow: 'var(--shadow-raised)',
        }}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Speech</h3>
        <div className="min-h-20 p-4 rounded-xl bg-white bg-opacity-50">
          {transcription ? (
            <p className="text-gray-700">{transcription}</p>
          ) : (
            <p className="text-gray-400 italic">Your speech will appear here...</p>
          )}
        </div>
      </div>

      {/* AI Response Panel */}
      <div 
        className="p-6 rounded-2xl"
        style={{
          background: 'var(--bg)',
          boxShadow: 'var(--shadow-raised)',
        }}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">AI Response</h3>
        <div className="min-h-20 p-4 rounded-xl bg-white bg-opacity-50">
          {aiResponse ? (
            <p className="text-gray-700">{aiResponse}</p>
          ) : (
            <p className="text-gray-400 italic">AI responses will appear here...</p>
          )}
        </div>
      </div>

      {/* Triage Results */}
      {triageLevel && (
        <div 
          className="p-6 rounded-2xl"
          style={{
            background: 'var(--bg)',
            boxShadow: 'var(--shadow-raised)',
          }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Triage Assessment</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-medium">Risk Level:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                triageLevel === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                triageLevel === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                triageLevel === 'MODERATE' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {triageLevel}
              </span>
            </div>
            
            {doctorRecommendation && (
              <div>
                <span className="font-medium">Recommended:</span>
                <span className="ml-2 text-blue-600">{doctorRecommendation}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAgentUI;