const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList:[],
    loading:true,
  },

  async showClassse()
  {
    var ret = await db.collection('Classes').count()
    var total = ret.total
    /** Check count of total */
    // console.log(total)
    var times = Math.ceil(total / 20)
    var list = []

    for (let i = 0; i < times; i++)
    {
      var result = await db.collection('Classes').skip(i * 20).get()
      var data = result.data
      list.push(...data)
    }

    this.setData({loading:false, classList:list})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({loading:true})
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