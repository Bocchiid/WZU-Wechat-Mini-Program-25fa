// pages/contact/contact.js

const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: [],
    loading: true,
  },

  async showClassse() {
    var ret = await db.collection('Classes').count()
    var total = ret.total
    /** Check count of total */
    // console.log(total)
    var batchTime = Math.ceil(total / 20)
    var task = []
    var classList = []

    for (let i = 0; i < batchTime; i++) {
      var subTask = await db.collection('Classes').skip(i * 20).get()
      task.push(subTask)
    }

    await Promise.all(task).then(res=>{
      for (let i = 0; i < res.length; i++)
      {
        classList.push(...res[i].data)
      }
    })

    this.setData({
      classList: classList,
      loading: false,
    })
  },

  showClassMember: function(event)
  { /** Get className */
    var className = event.currentTarget.dataset.classname
    /** Create url */
    var url = '../contactList/contactList' + '?' + 'className=' + className
    /** Navigate to contactList page */
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loading: true
    })
    this.showClassse()
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