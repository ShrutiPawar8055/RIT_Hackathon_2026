# Healthcare Voice Agent - Setup Guide

## 📋 Overview
This document provides setup instructions for the LiveKit-based voice agent integration for the Triage healthcare application.

## 🏗️ Architecture
```
Frontend (React)          Backend (FastAPI)           External Services
┌─────────────────┐       ┌─────────────────┐        ┌─────────────────┐
│ VoiceAgentPage  │       │ FastAPI Server  │        │ LiveKit Server  │
│ useVoiceAgent   │◄─────►│ /livekit/token  │◄──────►│ WebRTC Audio    │
│ VoiceAgentUI    │       │ /voice/triage   │        │                 │
│ voiceAgentService│       │ /ml/cough-test  │        └─────────────────┘
└─────────────────┘       │ /ml/anemia-test │        ┌─────────────────┐
                          └─────────────────┘        │ Browser STT/TTS│
                                                     │ (Fallback)     │
                                                     └─────────────────┘
```

## 🚀 Quick Start

### 1. Frontend Setup (Already Done)
The voice agent module is already integrated into the React app:
- ✅ LiveKit dependencies installed
- ✅ Voice agent components created
- ✅ Service layer implemented
- ✅ Neumorphic UI components ready

### 2. Backend Setup (Python FastAPI)

#### Install Python Dependencies:
```bash
pip install fastapi uvicorn python-dotenv livekit-api python-multipart
```

#### Start the Backend Server:
```bash
python fastapi-backend-example.py
```
The server will run on `http://localhost:8000`

### 3. LiveKit Setup

#### Option A: LiveKit Cloud (Recommended)
1. Sign up at [LiveKit Cloud](https://livekit.io/cloud)
2. Create a new project
3. Get your API Key and Secret
4. Update `.env` file with your credentials

#### Option B: Self-Hosted LiveKit
```bash
# Using Docker
docker run --rm \
  -p 7880:7880 \
  -p 7881:7881 \
  -p 8080:8080 \
  -e LIVEKIT_KEYS="<key>:<secret>" \
  livekit/livekit-server
```

### 4. Environment Configuration

Copy `.env.example` to `.env` and update:
```env
REACT_APP_LIVEKIT_URL=wss://your-livekit-server.com
REACT_APP_API_URL=http://localhost:8000
LIVEKIT_API_KEY=your-api-key
LIVEKIT_API_SECRET=your-api-secret
```

## 🧪 Testing the Voice Agent

### Independent Testing
1. Run the FastAPI backend: `python fastapi-backend-example.py`
2. Start React dev server: `npm run dev`
3. Navigate to `http://localhost:5173/voice-agent` (temporary route)
4. Test microphone functionality
5. Verify LiveKit connection

### Mock Mode
In development, the system uses mock responses when:
- Backend is unavailable
- LiveKit credentials not configured
- Environment is development (`NODE_ENV=development`)

## 🔌 Integration with Main App

### Current State
The voice agent is implemented as a completely separate module in:
```
src/voice-agent/
├── VoiceAgentPage.jsx    # Main page component
├── VoiceAgentUI.jsx      # UI components
├── useVoiceAgent.js      # React hook
└── voiceAgentService.js  # API service layer
```

### Final Integration Steps

#### 1. Add Route (When Ready)
In `src/App.jsx`, add the voice agent route:

```jsx
import VoiceAgentPage from './voice-agent/VoiceAgentPage';

// Add to your routes:
<Route path="/voice-agent" element={<VoiceAgentPage />} />
```

#### 2. Navigation Integration
Add voice agent link to your navigation:

```jsx
// In your navigation component
<Link to="/voice-agent" className="neumorphic-button">
  Voice Assistant
</Link>
```

#### 3. Environment Variables
Ensure these are set in production:
```env
REACT_APP_LIVEKIT_URL=wss://your-production-livekit-server.com
REACT_APP_API_URL=https://your-fastapi-production-url.com
```

## 🎯 Voice Workflow

### Conversation Flow:
1. User clicks "Start Call" → LiveKit connection established
2. User clicks microphone → Browser STT captures speech
3. Speech sent to FastAPI `/voice/triage` endpoint
4. AI processes symptoms, detects emergencies
5. Response spoken via browser TTS
6. Triage level and doctor recommendation displayed

### Emergency Detection:
- **CRITICAL**: chest pain, cannot breathe, unconscious, bleeding heavily
- **HIGH**: breathing difficulties, severe pain  
- **MODERATE**: fever + cough, persistent symptoms
- **LOW**: mild headaches, general discomfort

## 🔧 Customization

### STT/TTS Providers
The system supports multiple providers:

#### Browser Native (Default)
- SpeechRecognition API
- SpeechSynthesis API

#### External Providers
Update `voiceAgentService.js` to support:
- **Deepgram** - High accuracy STT
- **Whisper** - OpenAI speech recognition  
- **ElevenLabs** - Natural TTS
- **Sarvam AI** - Indian language support

### Adding New Providers

1. Create provider-specific service methods
2. Add configuration options
3. Implement fallback mechanism
4. Update environment variables

## 🚨 Production Checklist

- [ ] Configure LiveKit production credentials
- [ ] Set up HTTPS for production API
- [ ] Implement proper error handling
- [ ] Add loading states and user feedback
- [ ] Test emergency detection scenarios
- [ ] Verify mobile device compatibility
- [ ] Set up monitoring and analytics
- [ ] Implement session recording (if required)
- [ ] Add privacy compliance measures

## 🆘 Troubleshooting

### Common Issues:

1. **Microphone Permission**
   - Ensure browser has microphone access
   - Check HTTPS requirement for microphone

2. **LiveKit Connection**
   - Verify API credentials
   - Check network connectivity
   - Validate CORS settings

3. **Backend Errors**
   - Check FastAPI server is running
   - Verify endpoint responses

### Debug Mode
Enable debug logging by setting:
```env
DEBUG_VOICE_AGENT=true
```

## 📞 Support

For issues with:
- LiveKit integration → Check [LiveKit Docs](https://docs.livekit.io)
- React components → Review component structure
- API endpoints → Test with curl or Postman
- Audio processing → Verify browser permissions

---

**Note**: This voice agent is designed for healthcare triage and should be used alongside, not as a replacement for, professional medical advice.