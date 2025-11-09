from openai import OpenAI
client = OpenAI(api_key='',base_url="https://api.deepseek.com") # 为了安全, 我把老师的Key删了, 此处你可以填自己的Key

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "写一首关于春天的诗歌。"},
    ],
    stream=True
)

for chunk in response:
    # 检查是否有内容
    content = chunk.choices[0].delta.content
    if content:
        # print 默认会换行，使用 end='' 让内容连续
        # flush=True 确保内容立即被打印，而不是等缓冲区满了
        print(content, end='', flush=True)


# print(response.choices[0].message.content)
