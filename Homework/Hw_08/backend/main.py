# pip install fastapi uvicorn openai
import uvicorn
from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import StreamingResponse
from openai import OpenAI
from pydantic import BaseModel


app = FastAPI()
client = OpenAI(api_key='', base_url="https://api.deepseek.com") # 为了安全, 我把老师的Key删了, 此处可以填你自己的Key

class ChatRequest(BaseModel):
    content: str
@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are a helpful assistant"},
                {"role": "user", "content": request.content},
            ],
            stream=True
        )

        def generate():
            for chunk in response:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
                    print(chunk.choices[0].delta.content)

        return StreamingResponse(generate(), media_type="text/plain")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

