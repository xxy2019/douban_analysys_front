// pages/index/express/express.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    title1:"nav_title_active",
    title2:"nav_title",
    title3:"nav_title",
    list1:false,
    list2:true,
    list3:true
  },
  getAllOrder:function(){
    this.setData({
      title1:"nav_title_active",
      title2:"nav_title",
      title3:"nav_title",
      list1:false,
      list2:true,
      list3:true
    })
  },
  getWaitOrder:function(){
    this.setData({
      title2:"nav_title_active",
      title1:"nav_title",
      title3:"nav_title",
      list2:false,
      list1:true,
      list3:true
    })
  },
  getOtherOrder:function(){
    this.setData({
      title3:"nav_title_active",
      title1:"nav_title",
      title2:"nav_title",
      list3:false,
      list1:true,
      list2:true
    })
  },
  searchAll: function (e) { 
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.106.169.28:8028/orders/get/user/all',
        method: "GET",
        data:{
          openid:e
        },
        header:{
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          resolve(res)
        },
        fail: function (res) {
          console.log("更新" + res.data.msg)
        }
      })
    })
  },
  toDetail:function(e){
    var packid = e.currentTarget.dataset.packid
    console.log(e.currentTarget.dataset.packid)
    if (e.currentTarget.dataset.packid!=null){
      wx.navigateTo({
        url: './details/details?packid='+packid,
      })
    }
  },
  delOrder:function(e){
    var _this=this
    var msg = JSON.stringify(e.currentTarget.dataset.order)
    console.log(e.currentTarget.dataset.order)
    wx.request({
      url: 'http://39.106.169.28:8028/orders/delete/user',
      method: "POST",
      data: {
        msg:msg
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      success: function (res) {
        if(res.data.msg=="更新成功"){
          _this.onLoad()
        }
      },
      fail: function (res) {
        console.log("更新" + res.data.msg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var app=getApp();
    this.searchAll(app.globalData.openid).then((res) => {
      console.log(res)
      _this.setData({
        "list": res.data.msg
      })
    })
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