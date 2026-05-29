from pydantic import BaseModel
from datetime import datetime
from typing import List

class FollowerSnapshot(BaseModel):
    id: str
    user_id: str
    followers_list: List[str]
    following_list: List[str]
    captured_at: datetime