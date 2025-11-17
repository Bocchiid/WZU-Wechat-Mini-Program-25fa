// pages/AIchat/AIchat.js

import {
  decodeArrayBuffer
} from '../../utils/text-decoder';

const db = wx.cloud.database();
const AIchatHistoriesCollection = db.collection('AIchatHistories');
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    scrollTop: 0,
    limit: 6,
    inputText: '',
    history: [],
    lastIndex: '',
  },

  httpRequest(content) {
    var limit = this.data.limit
    var message = [{
      role: 'system',
      content: 'You are a helpful assistant.'
    }]
    var history = this.data.history.slice(-limit)

    for (let i = 0; i < history.length - 1; i++)
    {
      message.push({'role': history[i].role, 'content': history[i].content})
    }

    const requestTask = wx.request({
      url: 'https://api.deepseek.com/chat/completions', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer sk-7cd549044e8f4077ad1462f621cf47ac'
      },
      data: {
        model: 'deepseek-chat',
        messages: message,
        stream: true // 开启流式输出
      },
      enableChunked: true,
      success(res) {
        // console.log(res.data)
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
          if (data === '[DONE]')
          {
            var specificAIchatHistory = this.data.history[this.data.history.length - 1]
            var content = specificAIchatHistory.content

            this.updateAIContent(content)
            return
          }

          if (data && data !== '[DONE]') {
            try {
              const json = JSON.parse(data);
              const content = json.choices[0]?.delta?.content;
              if (content) {
                answer += content;
                // console.log('实时内容:', content);
                this.setData({
                  [`history[${this.data.history.length - 1}].content`]: answer,
                  scrollTop: 99999
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

  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },

  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },

  inputMessage: function(e)
  {
    var inputText = e.detail.value
    this.setData({
      inputText: inputText
    })
  },

  async sendMessage()
  {
    var inputText = this.data.inputText
    this.setData({
      inputText: ''
    })

    await this.showMessage('user', inputText)
    await this.showMessage('assistant', '')
    this.httpRequest(inputText)
  },

  async showMessage(role, content)
  {
    var message = {'role': role, 'content': content, 'index': await this.getNextIndex(), 'timeStamp': this.formatDate()}

    this.setData({
      [`history[${this.data.history.length}]`]:message,
      scrollTop: 99999,
    })
    await this.insertMessage(message)
  },

  async loadHistory()
  {
    var limit = this.data.limit

    await AIchatHistoriesCollection.orderBy('index', 'desc').limit(limit).get().then(res => {
      var data = res.data.reverse()

      this.setData({
        history: [...data],
        lastIndex: data.length ? data[0].index : null,
        scrollTop: 99999
      })
    })
  },

  async loadUpperHistory(e)
  {
    var scrollTop = e.detail.scrollTop

    if (scrollTop > 100)
    {
      return
    }

    var limit = this.data.limit
    var lastIndex = this.data.lastIndex
    var history = this.data.history

    await AIchatHistoriesCollection.where({
      index: _.lt(lastIndex)
    }).orderBy('index', 'desc')
    .limit(limit)
    .get()
    .then(res => {
      var data = res.data.reverse()

      this.setData({
        history: [...data, ...history],
        lastIndex: data.length ? data[0].index : lastIndex,
      })
    })
  },

  async insertMessage(message)
  {
    await AIchatHistoriesCollection.add({
      data: message
    }).then(res => {
      console.log(message.role + " content added successfully");
    })
  },

  async updateAIContent(content)
  {
    let index = this.data.history[this.data.history.length - 1].index

    await AIchatHistoriesCollection.where({
      index: index
    })
    .update({
      data: {content: content}
    }).then(res => {
      console.log("assistant content updated successfully")
    })
  },

  formatDate: function()
  {
    var today = new Date()

    var year = today.getFullYear()
    var month = String(today.getMonth() + 1).padStart(2, '0')
    var day = String(today.getDate()).padStart(2, '0')

    var hour = String(today.getHours()).padStart(2, '0')
    var minute = String(today.getMinutes()).padStart(2, '0')
    var second = String(today.getSeconds()).padStart(2, '0')
    
    return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
  },

  async getNextIndex()
  {
    let res = await AIchatHistoriesCollection.orderBy('index', 'desc').limit(1).get()
    let data = res.data

    if (data.length === 0)
    {
      return 1
    }
    else
    {
      return data[0].index + 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.loadHistory()
    // console.log(await this.getNextIndex())
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})