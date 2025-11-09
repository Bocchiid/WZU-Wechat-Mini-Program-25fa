
// npm install axios@latex
const cloud = require('wx-server-sdk')
const axios = require('axios')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
exports.main = async (event, context) => {
    const { content } = event
    console.log('收到请求, 内容:', content)
    
    // 调用 DeepSeek API
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: content }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' //为了安全, 我把老师的Key删了, 此处可以填你自己的Key
        },
        "stream": true
      }
    )
    const result = response.data.choices[0].message.content
    console.log('AI 回复成功, 内容长度:', result.length)
    return {
      success: false,
      data: result
    }
}
