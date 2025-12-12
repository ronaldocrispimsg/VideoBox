import os
from pathlib import Path

import aiofiles
from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

STREAM_PATH = Path(os.getenv("STREAM_PATH", "/var/www/html/streams"))
STREAM_PATH.mkdir(parents=True, exist_ok=True)

STREAM_BASE_URL = os.getenv("STREAM_BASE_URL", "http://172.31.76.247/streams").rstrip("/")

app = FastAPI()

class CompletePayload(BaseModel):
    playlist_name: str = "playlist.m3u8"

def _target_path(video_id: str, relative_path: str) -> Path:
    safe_relative = relative_path.lstrip("/").replace("..", "")
    return STREAM_PATH / video_id / safe_relative

@app.post("/videos/{video_id}/segments")
async def receive_segment(video_id: str, file: UploadFile, relative_path: str = Form(...)):
    target_path = _target_path(video_id, relative_path)
    target_path.parent.mkdir(parents=True, exist_ok=True)

    async with aiofiles.open(target_path, "wb") as out_file:
        while chunk := await file.read(1024 * 1024):
            await out_file.write(chunk)

    return {"status": "stored", "path": str(target_path)}


@app.post("/videos/{video_id}/complete")
async def complete_upload(video_id: str, payload: CompletePayload):
    playlist = payload.playlist_name
    playlist_path = STREAM_PATH / video_id / playlist
    if not playlist_path.exists():
        raise HTTPException(status_code=400, detail="Playlist não encontrada")

    stream_url = f"{STREAM_BASE_URL}/{video_id}/{playlist}"
    return {"stream_url": stream_url}


@app.get("/streams/{video_id}/{relative_path:path}")
async def serve_stream_file(video_id: str, relative_path: str):
    target_path = _target_path(video_id, relative_path)
    if not target_path.exists() or not target_path.is_file():
        raise HTTPException(status_code=404, detail="Arquivo não encontrado")

    media_type = "video/mp2t"
    if target_path.suffix == ".m3u8":
        media_type = "application/vnd.apple.mpegurl"
    elif target_path.suffix == ".mp4":
        media_type = "video/mp4"

    return FileResponse(target_path, media_type=media_type)
