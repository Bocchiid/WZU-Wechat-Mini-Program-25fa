// pages/home/home.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    swiperList: [{
      url: 'cloud://cloud1-8gylym58ae4d6da9.636c-cloud1-8gylym58ae4d6da9-1382384471/home/swiper images/1.jpg'
    }, {
      url: 'cloud://cloud1-8gylym58ae4d6da9.636c-cloud1-8gylym58ae4d6da9-1382384471/home/swiper images/2.jpg',
    }, {
      url: 'cloud://cloud1-8gylym58ae4d6da9.636c-cloud1-8gylym58ae4d6da9-1382384471/home/swiper images/3.jpg'
    }, {
      url: 'cloud://cloud1-8gylym58ae4d6da9.636c-cloud1-8gylym58ae4d6da9-1382384471/home/swiper images/4.jpg'
    }],
    gridCol: 4,
    iconList: [{
      icon: '../../images/icon/login.png',
      name: '登录',
      key: 'login',
      auth: [],
    }, {
      icon: '../../images/icon/appointment.png',
      name: '预约',
      key: 'appointment',
      auth: ['student', 'teacher', 'admin'],
    }, {
      icon: '../../images/icon/contact.png',
      name: '通讯录',
      key: 'contact',
      auth: ['teacher', 'admin'],
    }, {
      icon: '../../images/icon/game.png',
      name: '猜数字',
      key: 'numberguessing',
      auth: [],
    }, {
      icon: '../../images/icon/news.png',
      name: '新闻',
      key: 'news',
      auth: [],
    }, {
      icon: '../../images/icon/album.png',
      name: '相册',
      key: 'album',
      auth: [],
    }, {
      icon: '../../images/icon/AIchat.png',
      name: 'AI聊天',
      key: 'test',
      auth: [],
    }],
    tipList: [{
      'text': '温州大学小程序上线啦~'
    }, {
      'text': '这是一条新消息~'
    }, {
      'text': '没有新消息了~'
    }],
  },

  navigateToNewPage: function(event)
  {
    var dst = event.currentTarget.dataset.key
    var authList = event.currentTarget.dataset.authlist
    var user = app.globalData.user
    var auth = user.auth
    var url = '../' + dst + '/' + dst

    if (authList.length === 0)
    {
      if (dst === 'login')
      {
        if (user)
        {
          wx.showToast({
            title: '无需重复登录',
            icon: 'error',
          })

          return
        }
      }

      wx.navigateTo({
        url: url,
      })
    }
    else
    {
      if (user)
      {
        if (authList.includes(auth))
        {
          wx.navigateTo({
            url: url,
          })
        }
        else
        {
          wx.showToast({
            title: '您没有权限',
            icon: 'error',
          })
        }
      }
      else
      {
        wx.showToast({
          title: '请先登录',
          icon: 'loading',
        })

        setTimeout(() => {
          wx.navigateTo({
            url: '../login/login',
          })
        }, 500);
      }
    }
  },

  setAfterLogin: function()
  {
    var user = app.globalData.user

    if (user)
    {
      var iconList = this.data.iconList
      iconList[0].name = user.name

      this.setData({
        iconList: iconList
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var user = wx.getStorageSync('user')
    app.globalData.user = user

    this.setAfterLogin()
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