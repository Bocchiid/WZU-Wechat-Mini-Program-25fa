const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message_01: "Hello World!",
    message_02: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.btnClick_02()
  },
  /**
   * Generate random message and show it to users
   */
  btnClick_01: function () 
  {
    var messages = ["Hello Mini Program", "Hello Computer Science", "Hit me"]
    var randomNumber = Math.floor(Math.random() * messages.length)
    // Test randomNumber
    // console.log(randomNumber)
    var newMessage  = messages[randomNumber]
    // Output new message to front_end
    this.setData({message_01:newMessage})
  },
  /**
   * Generate four different numbers between 0 and 9, then show the list to users
   */
  btnClick_02: function ()
  {
    var list = []
    // Generate four different numbers between 0 and 9
    for (let i = 0; i < 4; i++)
    {
      do
      {
        var number = Math.floor(Math.random() * 10)
      } while (list.indexOf(number) != -1)

      list.push(number)
    }
    // Test randomList
    // console.log(list)
    // Output new message to front_end
    this.setData({message_02:list})
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