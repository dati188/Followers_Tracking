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
    contents = await file.read()
    parsed_data = parse_instagram_zip(contents)
    
    if not parsed_data["success"]:
        raise HTTPException(status_code=400, detail=parsed_data["error"])

    current_followers = parsed_data["followers"]
    current_following = parsed_data["following"]

    # Pull past snapshot configuration
    previous_data = MOCK_DB.get(user_id, {})
    previous_followers = previous_data.get("followers", [])
    previous_following = previous_data.get("following", [])

    # Calculations
    unfollowers = []
    new_followers = []
    recently_followed = []
    you_unfollowed = []

    if previous_followers:
        # 1. Who stopped following you
        unfollowers = list(set(previous_followers) - set(current_followers))
        # 2. Who started following you
        new_followers = list(set(current_followers) - set(previous_followers))
    
    if previous_following:
        # 3. Who you recently started following
        recently_followed = list(set(current_following) - set(previous_following))
        # 4. Who you stopped following
        you_unfollowed = list(set(previous_following) - set(current_following))

    # Overwrite historical log with raw text arrays
    MOCK_DB[user_id] = {
        "followers": current_followers,
        "following": current_following
    }

    return {
        "metrics": {
            "followers_count": len(current_followers),
            "following_count": len(current_following),
            "new_followers": new_followers,
            "unfollowers": unfollowers,
            "recently_followed": recently_followed,
            "you_unfollowed": you_unfollowed
        }
    }
