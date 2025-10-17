// pages/contactList/contactList.js

const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    className: '',
    CustomBar: app.globalData.CustomBar,
    loading: true,
    stuList: [],
    selectStuList: [],
  },

  async showClassMember()
  { /** Get className */
    var className = this.data.className
    /** Get the number of the people of the class */
    var ret = await db.collection('Students').where({classname: className}).count()
    var total = ret.total
    var limit = 20
    var batchTime = Math.ceil(total / limit)

    var task = []
    var stuList = []

    for (let i = 0; i < batchTime; i++)
    {
      var subTask = await db.collection('Students').where({classname: className}).skip(i * limit).get()
      task.push(subTask)
    }

    await Promise.all(task).then(res=>{
      for (let i = 0; i < res.length; i++)
      {
        stuList.push(...res[i].data)
      }
    })

    this.setData({
      stuList: stuList,
      selectStuList: stuList,
      loading: false,
    })
  },

  addToContact: function(event)
  {
    var person = event.currentTarget.dataset.person
    var name = person.name
    var phone = person.phone
    var firstName = name.slice(1)
    var lastName = name[0]

    wx.addPhoneContact({
      firstName: firstName,
      lastName: lastName,
      mobilePhoneNumber: phone,
    })
  },

  callPhone: function(event)
  {
    var phone = event.currentTarget.dataset.phone

    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  selectStu: function(event)
  {
    var text = event.detail.value

    var stuList = this.data.stuList
    var selectStuList = []

    for (let i = 0; i < stuList.length; i++)
    {
      var student = stuList[i]
      var index = student.searchText.indexOf(text)

      if (index != -1)
      {
        selectStuList.push(student)
      }
    }

    this.setData({
      selectStuList: selectStuList,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var className = options.className

    this.setData({
      className: className,
      loading: true,
    })

    this.showClassMember()
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