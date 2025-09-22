const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guess:['','','',''],
    focus:[true, false, false, false],
    count:10,
    answer:[],
    history:[],
    onGame:true
  },

  fetchValue: function(event)
  {
    return event.detail.value
  },

  getGuess: function()
  {
    return this.data.guess
  },

  getCount: function()
  {
    return this.data.count
  },

  getAnswer: function()
  {
    return this.data.answer
  },

  getHistory: function()
  {
    return this.data.history
  },

  getOnGame: function()
  {
    return this.data.onGame
  },

  setGuess: function(index, value)
  {
    var newGuess = this.getGuess()
    newGuess[index] = value

    this.setData({guess:newGuess})
  },

  setCount: function(newCount)
  {
    this.setData({count:newCount})
  },

  setAnswer: function(newAnswer)
  {
    this.setData({answer:newAnswer})
  },

  setHistory: function(newHistory)
  {
    this.setData({history:newHistory})
  },

  setFocus: function(newFocus)
  {
    this.setData({focus:newFocus})
  },

  setOnGame: function(newOnGame)
  {
    this.setData({onGame:newOnGame})
  },

  generateNumber: function()
  {
    var numbers = []

    for (let i = 0; i < 4; i++)
    {
      do
      {
        var num = Math.floor(Math.random() * 10)
      } while (numbers.indexOf(num) !== -1)

      numbers.push(String(num))
    }

    this.setAnswer(numbers)
  },

  shiftFocus: function(current)
  {
    var newFocus = [false, false, false, false]
    newFocus[current + 1] = true

    this.setFocus(newFocus)
  },

  input_01: function(event)
  {
    if (this.getOnGame() && this.isSingleInputValid(event))
    {
      this.setGuess(0, this.fetchValue(event))
      this.shiftFocus(0)
    }
    else
    {
      this.setGuess(0, '')
    }
  },

  input_02: function(event)
  {
    if (this.getOnGame() && this.isSingleInputValid(event))
    {
      this.setGuess(1, this.fetchValue(event))
      this.shiftFocus(1)
    }
    else
    {
      this.setGuess(1, '')
    }
  },

  input_03: function(event)
  {
    if (this.getOnGame() && this.isSingleInputValid(event))
    {
      this.setGuess(2, this.fetchValue(event))
      this.shiftFocus(2)
    }
    else
    {
      this.setGuess(2, '')
    }
  },

  input_04: function(event)
  {
    if (this.getOnGame() && this.isSingleInputValid(event))
    {
      this.setGuess(3, this.fetchValue(event))
    }
    else
    {
      this.setGuess(3, '')
    }
  },

  isSingleInputValid: function(event)
  {
    return this.fetchValue(event) !== ''
  },

  isAllInputValid: function()
  {
    var guess = this.getGuess()

    for (let i = 0; i < 4; i++)
    {
      if (guess[i] === '')
      {
        return false
      }
    }

    return true
  },

  submit: function()
  {
    if (this.getOnGame() && this.isAllInputValid())
    {
      this.checkGuess()
    }
  },

  satisfyA: function(guess, answer)
  {
    return guess === answer
  },

  satisfyB: function(guess, answer)
  {
    return answer.indexOf(guess) !== -1
  },

  checkGuess:function()
  {
    var guess = this.getGuess()
    var answer = this.getAnswer()
    var history = this.getHistory()
    var newOneHistory = {'guess':'', 'A':0, 'B':0}

    for (let i = 0; i < 4; i++)
    {
      if (this.satisfyA(guess[i], answer[i]))
      {
        newOneHistory.A++
      }
      else if (this.satisfyB(guess[i], answer))
      {
        newOneHistory.B++
      }
    }

    newOneHistory.guess = guess.join('')
    history.push(newOneHistory)
    this.setHistory(history)

    this.countMinusOne()

    if (this.isGameOver())
    {
      wx.showToast({
        title: '游戏结束',
      })

      this.setOnGame(false)
    }
  },

  isGameOver: function()
  {
    var count = this.getCount()

    return count === 0
  },

  countMinusOne: function()
  {
    var count = this.getCount()
    count--

    this.setCount(count)
  },

  start: function()
  {
    this.reSetAnswer()
    this.reSetGuess()
    this.reSetCount()
    this.reSetFocus()
    this.reSetHistory()
    this.reSetOnGame()
  },

  reStart: function()
  {
    this.start()
  },

  reSetAnswer: function()
  {
    this.generateNumber()
  },

  reSetGuess: function()
  {
    for (let i = 0; i < 4; i++)
    {
      this.setGuess(i, '')
    }
  },

  reSetCount: function()
  {
    this.setCount(10)
  },

  reSetFocus: function()
  {
    this.shiftFocus(-1)
  },

  reSetHistory: function()
  {
    this.setHistory([])
  },

  reSetOnGame: function()
  {
    this.setOnGame(true)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.start()
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})