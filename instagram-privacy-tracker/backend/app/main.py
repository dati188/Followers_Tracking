from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.parser import parse_instagram_zip
import uuid
from datetime import datetime

app = FastAPI()

# Enable CORS so your frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory global mock database simulating historic snapshot storage
MOCK_DB = {}

@app.post("/upload/{user_id}")
async def upload_data(user_id: str, file: UploadFile = File(...)):
    if not file.filename.endswith('.zip'):
        raise HTTPException(status_code=400, detail="File must be a valid ZIP archive.")

    contents = await file.read()
    parsed_data = parse_instagram_zip(contents)

    if not parsed_data["success"]:
        raise HTTPException(status_code=420, detail=parsed_data["error"])

    current_followers = parsed_data["followers"]
    current_following = parsed_data["following"]

    # Pull past snapshot configurations if they exist
    previous_followers = MOCK_DB.get(user_id, {}).get("followers", [])

    # Calculate Relationships (Current Data File Analysis)
    not_following_back = list(set(current_following) - set(current_followers))
    fans = list(set(current_followers) - set(current_following))

    # Calculate Historic Changes
    unfollowers = []
    new_followers = []
    if previous_followers:
        unfollowers = list(set(previous_followers) - set(current_followers))
        new_followers = list(set(current_followers) - set(previous_followers))

    # Overwrite historical snapshot log with latest plain text strings
    MOCK_DB[user_id] = {
        "followers": current_followers,
        "following": current_following,
        "updated_at": datetime.now().isoformat()
    }

    return {
        "metrics": {
            "followers_count": len(current_followers),
            "following_count": len(current_following),
            "not_following_back": not_following_back,
            "fans": fans,
            "unfollowers": unfollowers,
            "new_followers": new_followers
        }
    }