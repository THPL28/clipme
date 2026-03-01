import os
import uuid
import shutil
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from utils.effects import apply_video_effects

app = FastAPI(title="ClipMe Backend")

# Enable CORS for React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "videos/temp"
PROCESSED_DIR = "videos/processed"

# Ensure directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "ClipMe Video API is running!"}

@app.post("/upload-video")
async def upload_video(file: UploadFile = File(...)):
    video_id = str(uuid.uuid4())
    extension = file.filename.split(".")[-1]
    file_path = os.path.join(UPLOAD_DIR, f"{video_id}.{extension}")
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"video_id": video_id, "status": "pendente", "filename": f"{video_id}.{extension}"}

@app.post("/apply-effects")
async def apply_effects(
    video_id: str = Form(...),
    effect: str = Form(None),
    template: str = Form(None),
    text: str = Form(None),
    audio_effect: str = Form(None)
):
    # Find original file
    original_file = None
    for f in os.listdir(UPLOAD_DIR):
        if f.startswith(video_id):
            original_file = os.path.join(UPLOAD_DIR, f)
            break
    
    if not original_file:
        raise HTTPException(status_code=404, detail="Video not found")
    
    output_filename = f"processed_{video_id}.mp4"
    output_path = os.path.join(PROCESSED_DIR, output_filename)
    
    # Process video (this should Ideally be background task)
    # For MVP, we'll do it synchronously but with a status
    try:
        success = apply_video_effects(original_file, output_path, effect, template, text, audio_effect)
        if success:
            return {
                "status": "processando", 
                "video_id": video_id, 
                "download_url": f"/download-video/{video_id}"
            }
        else:
            raise HTTPException(status_code=500, detail="Error processing video")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download-video/{video_id}")
async def download_video(video_id: str):
    processed_file = None
    for f in os.listdir(PROCESSED_DIR):
        if video_id in f:
            processed_file = os.path.join(PROCESSED_DIR, f)
            break
            
    if not processed_file:
        raise HTTPException(status_code=404, detail="Processed video not found")
        
    return FileResponse(processed_file, media_type="video/mp4")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
