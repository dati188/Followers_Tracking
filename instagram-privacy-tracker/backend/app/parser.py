import zipfile
import json
import io

def parse_instagram_zip(zip_bytes: bytes) -> dict:
    followers_list = []
    following_list = []

    followers_path = "connections/followers_and_following/followers_1.json"
    following_path = "connections/followers_and_following/following.json"

    try:
        # Open the zip archive completely in-memory
        with zipfile.ZipFile(io.BytesIO(zip_bytes), 'r') as archive:
            file_list = archive.namelist()

            # 1. Parse Followers
            if followers_path in file_list:
                with archive.open(followers_path) as f:
                    followers_data = json.load(f)
                    for item in followers_data:
                        if "string_list_data" in item and item["string_list_data"]:
                            username = item["string_list_data"][0].get("value")
                            if username:
                                followers_list.append(username)

            # 2. Parse Following
            if following_path in file_list:
                with archive.open(following_path) as f:
                    following_data = json.load(f)
                    actual_following = following_data.get("relationships_following", [])
                    for item in actual_following:
                        if "string_list_data" in item and item["string_list_data"]:
                            username = item["string_list_data"][0].get("value")
                            if username:
                                following_list.append(username)

        return {
            "success": True,
            "followers": followers_list,
            "following": following_list
        }
    except Exception as e:
        return {"success": False, "error": str(e)}