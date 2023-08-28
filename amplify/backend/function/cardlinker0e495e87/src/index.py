from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from mangum import Mangum
import redis
import logging
import os


app = FastAPI()

redis_client = redis.StrictRedis(
    host=os.environ.get("RedisHost"),
    port=os.environ.get("RedisPort"),
    password=os.environ.get("RedisPassword"),
    ssl=True,
)


@app.get("/redirect/{restaurantName}/{cardName}")
async def redirect_to_link(restaurantName: str, cardName: str):
    # Create the key using restaurant_name and card_name
    key = f"{restaurantName}_{cardName}"
    logging.info(f"{restaurantName}_{cardName}")

    if link := redis_client.get(key):
        logging.info(f"https://{link.decode('utf-8')}")
        # If the key exists, redirect to the link
        return RedirectResponse(url=f"https://{link.decode('utf-8')}")
    else:
        # If the key doesn't exist, return an error
        raise HTTPException(status_code=404, detail="Link not found")
    
handler = Mangum(app)
