import React from 'react';
import VoiceAgentPage from './voice-agent/VoiceAgentPage';
import './index.css';

/**
 * COMPLETELY SEPARATE VOICE AGENT TEST APP
 * This is a standalone application for testing the voice agent
 * without interfering with your main Triage application
 */
const VoiceAgentTestApp = () => {
  return (
    <div 
      className="min-h-screen" 
      style={{ 
        background: 'var(--bg)',
        padding: '20px',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🏥 Voice Agent Test Environment
        </h1>
        <p className="text-gray-600">
          Standalone test page for healthcare voice agent
        </p>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a separate test environment. 
            Your main app remains unchanged.
          </p>
        </div>
      </div>

      {/* Voice Agent Component */}
      <div className="max-w-4xl mx-auto">
        <VoiceAgentPage />
      </div>

      {/* Test Instructions */}
      <div className="mt-8 p-6 rounded-2xl" style={{ 
        background: 'var(--bg)',
        boxShadow: 'var(--shadow-raised)'
      }}>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Testing Instructions
        </h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span>Click <strong>Start Call</strong> to initialize voice connection</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span>Click the microphone button to start speaking</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span>Describe your symptoms clearly (e.g., "I have a cough and fever")</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <span>Click microphone again to stop and process your speech</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <span>Listen to AI response and see triage assessment</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">Emergency Keywords Test:</h3>
          <p className="text-sm text-yellow-700">
            Try phrases like: "chest pain", "cannot breathe", "unconscious", 
            "bleeding heavily", "heart attack" for CRITICAL triage level detection.
          </p>
        </div>
      </div>

      {/* Back to Main App Link */}
      <div className="text-center mt-8">
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 rounded-xl font-medium transition-all duration-200"
          style={{
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-raised-sm)',
          }}
          onMouseDown={(e) => {
            e.target.style.boxShadow = 'var(--shadow-pressed-sm)';
            e.target.style.transform = 'scale(0.97)';
          }}
          onMouseUp={(e) => {
            e.target.style.boxShadow = 'var(--shadow-raised-sm)';
            e.target.style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = 'var(--shadow-raised-sm)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ← Back to Main Application
        </button>
      </div>
    </div>
  );
};

export default VoiceAgentTestApp;