// pages/login/login.js

const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    showPassword: false,
    enableButton: true,
    user: {'username': '', 'password': '',},
  },

  changeShowPassword: function () {
    var showPassword = !this.data.showPassword
    this.setData({
      showPassword: showPassword
    })
  },

  loginInput: function (event) {
    var key = event.currentTarget.dataset.type
    var value = event.detail.value

    this.data.user[key] = value
  },

  loginIn() {
    this.setData({enableButton: false})

    setTimeout(() => {
      this.setData({enableButton: true})
    }, 3000);

    var username = this.data.user.username
    var password = this.data.user.password

    if (username === '')
    {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'error',
      })

      return
    }

    if (password === '')
    {
      wx.showToast({
        title: '密码不能为空',
        icon: 'error',
      })

      return
    }

    db.collection("Students").where({
      '_id': username,
    }).get().then(res => {
      var data = res.data
      var user = data[0]

      if (data.length != 1 || password !== user.password) 
      {
        wx.showToast({
          title: '用户名密码错误',
          icon: 'error',
        })
      } 
      else 
      {
        wx.setStorageSync('user', user)

        wx.showToast({
          title: '欢迎' + user.name,
          icon: 'success',
        })

        setTimeout(() => {
          wx.reLaunch({
            url: '../home/home',
          })
        }, 2000);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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