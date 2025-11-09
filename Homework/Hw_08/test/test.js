import { decodeArrayBuffer } from '../../utils/text-decoder';
Page({
  data: {
    answer:''
  },

  chat(content)
  {
    const requestTask = wx.request({
      url: 'http://127.0.0.1:8000/chat', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        content: '温州大学藏头诗，每句一行'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      enableChunked: true,
      success(res) {
        console.log(res.data)
      }
    })

    let answer = '';
    requestTask.onChunkReceived((res) => {
      const chunk = decodeArrayBuffer(res.data);
      answer += chunk;
      console.log('实时内容:', chunk);
      this.setData({
        answer: answer
      });
    });
  },

  chat_cloud(content)
  {
    wx.cloud.callFunction({
      name: 'deepseek',
      data: {
        content: content
      },
      success: res => {
        console.log('调用成功:', res.result)
        if (!res.result.success) {
          console.log('AI 回复:', res.result.data)
          this.setData({
            answer: res.result.data
          });
        }
      },
      fail: err => {
        console.error('调用失败:', err)
      }
    })
  },
  httpRequest(content) {
    const requestTask = wx.request({
      url: 'https://api.deepseek.com/chat/completions', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' //为了安全, 我把老师的Key删了, 此处可以填上你自己的Key
      },
      data: {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: content }
        ],
        stream: true  // 开启流式输出
      },
      enableChunked: true,
      success(res) {
        console.log(res.data)
      }
    })

    let answer = '';
    requestTask.onChunkReceived((res) => {
      const chunk = decodeArrayBuffer(res.data);
      
      // 解析 SSE 格式数据
      const lines = chunk.split('\n');
      lines.forEach(line => {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data && data !== '[DONE]') {
            try {
              const json = JSON.parse(data);
              const content = json.choices[0]?.delta?.content;
              if (content) {
                answer += content;
                console.log('实时内容:', content);
                this.setData({
                  answer: answer
                });
              }
            } catch (e) {
              console.error('解析错误:', e);
            }
          }
        }
      });
    });
  },

  onLoad(options) {
    // this.chat('写一首温州大学藏头诗')
    // this.chat_cloud('你好,请介绍一下自己')
    this.httpRequest('用100字介绍温州大学')
  },

})
