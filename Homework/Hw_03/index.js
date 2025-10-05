const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: { 'name': '', 'phone': '', 'number': '', 'date': '', 'startTime': '', 'endTime': '', },
    dateRange: {'start':'', 'end':'', },
    timeRange: {'start':'', 'end':'', },
  },

  onInputChange: function(event)
  {
    var field = event.currentTarget.dataset.field
    var value = event.detail.value

    this.setData({[`form.${field}`]:value})
    /** Test input */
    //console.log(this.data.form)
  },

  getDateAfterDays: function (days) 
  {
    var today = new Date()
    var future = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)

    var year = future.getFullYear()
    var month = String(future.getMonth() + 1).padStart(2, '0')
    var day = String(future.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  },

  getTimeAfterHours: function(hours)
  {
    var today = new Date()
    var future = new Date(today.getTime() + hours * 60 * 60 * 1000)

    var hour = String(future.getHours()).padStart(2, '0')
    var minute = String(future.getMinutes()).padStart(2, '0')

    return `${hour}:${minute}`
  },

  isValidPhone: function() {
    var phone = this.data.form.phone;
    // 简单的正则表达式：1 开头 + 10 位数字
    var phoneRegex = /^1\d{10}$/;
  
    return phoneRegex.test(phone);
  },
  
  isValidNumber: function()
  {
    var number = Number(this.data.form.number)

    return number > 0
  },

  isValidTime: function()
  {
    var startTime = this.data.form.startTime
    var endTime = this.data.form.endTime

    let [startHour, startMinute] = startTime.split(':').map(Number)
    let [endHour, endMinute] = endTime.split(':').map(Number)

    var startTotal = startHour * 60 + startMinute
    var endTotal = endHour * 60 + endMinute

    return startTotal < endTotal
  },

  submit: function()
  {
    var name = this.data.form.name
    var phone = this.data.form.phone
    var number = this.data.form.number

    if (!name || !phone || !number)
    {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'error',
      })

      return
    }

    if (!this.isValidPhone())
    {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'error',
      })
      
      return
    }

    if (!this.isValidNumber())
    {
      wx.showToast({
        title: '人数不能为0',
        icon: 'error',
      })
      
      return
    }

    if (!this.isValidTime())
    {
      wx.showToast({
        title: '结束时间不能早于开始时间',
        icon: 'error',
      })
      
      return
    }

    wx.showToast({
      title: '提交成功',
      icon: 'success'
    })
  },

  start: function()
  { /** Generate date and time range */
    var today = this.getDateAfterDays(0)
    var future = this.getDateAfterDays(7)

    this.setData({dateRange:{start:today, end:future}})

    var nowTime = this.getTimeAfterHours(0)
    var middleTime = this.getTimeAfterHours(2)
    var futureTime = this.getTimeAfterHours(4)

    this.setData({timeRange:{start:nowTime, end:futureTime}})
    /** Set default date and time */
    this.setData({'form.date':today, 'form.startTime':nowTime, 'form.endTime':futureTime})
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