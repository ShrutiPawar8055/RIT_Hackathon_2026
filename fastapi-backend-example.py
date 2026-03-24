"""
FastAPI Backend for Healthcare Voice Agent
This is a separate Python backend service that should run on port 8000
"""

from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uuid
import datetime
import os
from dotenv import load_dotenv
import jwt
import time
from jose import jwt as jose_jwt

# Load environment variables
load_dotenv()

app = FastAPI(title="Healthcare Voice Agent API", version="1.0.0")

# CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "https://localhost:5174", "https://localhost:5173"],  # React dev servers (HTTP & HTTPS)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LiveKit configuration
LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")
LIVEKIT_URL = os.getenv("LIVEKIT_URL", "wss://your-livekit-server.com")

# Request/Response models
class LiveKitTokenRequest(BaseModel):
    roomName: str = "triage-room"
    identity: str

class TriageRequest(BaseModel):
    userSpeech: str
    timestamp: str

class TriageResponse(BaseModel):
    aiResponse: str
    triageLevel: str  # LOW, MODERATE, HIGH, CRITICAL
    doctorRecommendation: str
    suggestedNextStep: Optional[str] = None
    timestamp: str

class MLResponse(BaseModel):
    prediction: str
    confidence: float
    timestamp: str

@app.post("/livekit/token")
async def generate_livekit_token(request: LiveKitTokenRequest):
    """Generate LiveKit access token for WebRTC connections"""
    try:
        if not LIVEKIT_API_KEY or not LIVEKIT_API_SECRET:
            # Return mock token for development if credentials are missing
            return {
                "token": "mock-livekit-token-for-development",
                "url": LIVEKIT_URL,
                "room": request.roomName,
                "identity": request.identity,
                "note": "Using mock token for development. Configure LIVEKIT_API_KEY and LIVEKIT_API_SECRET for production."
            }
        
        # Generate LiveKit JWT token manually
        headers = {
            "alg": "HS256",
            "typ": "JWT"
        }
        
        payload = {
            "iss": LIVEKIT_API_KEY,
            "sub": request.identity,
            "exp": int(time.time()) + 3600,  # 1 hour expiration
            "nbf": int(time.time()) - 10,    # Not before (10 seconds ago)
            "jti": str(uuid.uuid4()),        # Unique token ID
            "video": {
                "room": request.roomName,
                "room_join": True,
                "can_publish": True,
                "can_subscribe": True
            }
        }
        
        jwt_token = jose_jwt.encode(payload, LIVEKIT_API_SECRET, algorithm="HS256", headers=headers)
        
        return {
            "token": jwt_token,
            "url": LIVEKIT_URL,
            "room": request.roomName,
            "identity": request.identity
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Token generation failed: {str(e)}")

@app.post("/voice/triage", response_model=TriageResponse)
async def process_triage_conversation(request: TriageRequest):
    """Process user speech and return AI triage assessment"""
    try:
        user_text = request.userSpeech.lower()
        
        # Emergency keyword detection
        emergency_keywords = [
            'chest pain', 'cannot breathe', 'unconscious', 
            'bleeding heavily', 'heart attack', 'stroke',
            'severe pain', 'difficulty breathing', 'choking'
        ]
        
        has_emergency = any(keyword in user_text for keyword in emergency_keywords)
        
        # Symptom analysis
        symptoms = {
            'fever': 'fever' in user_text or 'temperature' in user_text,
            'cough': 'cough' in user_text or 'coughing' in user_text,
            'headache': 'headache' in user_text or 'head pain' in user_text,
            'breathing': any(term in user_text for term in ['breath', 'breathe', 'shortness']),
            'nausea': 'nausea' in user_text or 'vomit' in user_text,
            'dizziness': 'dizziness' in user_text or 'lightheaded' in user_text,
        }
        
        # Triage logic
        if has_emergency:
            response = {
                "aiResponse": "This sounds like a medical emergency! Please go to the nearest emergency room immediately or call emergency services. Your symptoms require urgent medical attention.",
                "triageLevel": "CRITICAL",
                "doctorRecommendation": "Emergency Room",
                "suggestedNextStep": "EMERGENCY_CALL"
            }
        elif symptoms['breathing'] or 'severe' in user_text:
            response = {
                "aiResponse": "Your symptoms sound concerning. I recommend seeing a healthcare provider today. How long have you had these breathing difficulties? Do you have any fever or chest pain?",
                "triageLevel": "HIGH",
                "doctorRecommendation": "Pulmonologist or Urgent Care",
                "suggestedNextStep": "COUGH_TEST" if symptoms['cough'] else "NONE"
            }
        elif symptoms['fever'] and symptoms['cough']:
            response = {
                "aiResponse": "It sounds like you may have a respiratory infection. I recommend seeing a doctor within 24-48 hours. How high is your fever? Have you experienced any shortness of breath?",
                "triageLevel": "MODERATE",
                "doctorRecommendation": "Primary Care or Urgent Care",
                "suggestedNextStep": "COUGH_TEST"
            }
        elif symptoms['headache'] or symptoms['dizziness']:
            response = {
                "aiResponse": "For headaches and dizziness, I recommend rest and hydration. If symptoms are severe or persistent for more than 48 hours, please see your doctor. Can you describe the pain location and intensity?",
                "triageLevel": "LOW",
                "doctorRecommendation": "Primary Care Physician",
                "suggestedNextStep": "NONE"
            }
        else:
            # Default conversational response
            response = {
                "aiResponse": "Thank you for describing your symptoms. To help me better assess your situation, could you tell me how long you've been experiencing these symptoms and their severity on a scale of 1-10?",
                "triageLevel": "LOW",
                "doctorRecommendation": "Primary Care Physician",
                "suggestedNextStep": "NONE"
            }
        
        return {
            **response,
            "timestamp": datetime.datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Triage processing failed: {str(e)}")

@app.post("/ml/cough-test", response_model=MLResponse)
async def analyze_cough_audio(file: UploadFile = File(...)):
    """Analyze cough audio using ML model"""
    try:
        # Here you would integrate with your actual cough detection model
        # For now, returning mock response
        
        # Example: Load and process the audio file
        # audio_data = await file.read()
        # prediction = your_ml_model.predict(audio_data)
        
        return {
            "prediction": "HEALTHY",  # or "SICK"
            "confidence": 0.85,
            "timestamp": datetime.datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cough analysis failed: {str(e)}")

@app.post("/ml/anemia-test", response_model=MLResponse)
async def analyze_eye_scan(file: UploadFile = File(...)):
    """Analyze eye scan for anemia detection"""
    try:
        # Here you would integrate with your actual anemia detection model
        # For now, returning mock response
        
        # Example: Load and process the image
        # image_data = await file.read()
        # prediction = your_ml_model.predict(image_data)
        
        return {
            "prediction": "NO_ANEMIA",  # or "ANEMIA_DETECTED"
            "confidence": 0.92,
            "timestamp": datetime.datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Anemia analysis failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.datetime.now().isoformat(),
        "services": {
            "livekit": bool(LIVEKIT_API_KEY and LIVEKIT_API_SECRET),
            "ml_models": True  # Assuming models are loaded
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)