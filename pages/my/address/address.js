// pages/index/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[]
  },
  getAddress:function(){
    var app=getApp()
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'http://39.106.169.28:8028/address/insert',
        method: "GET",
        data: {
          openid: app.globalData.openid
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          resolve(res.data.msg)

        },
        fail: function (res) {
          console.log("更新" + res.data.msg)
        }
      })
    })
  },
  addAddr:function(){
    wx.navigateTo({
      url: './add/add',
    })
  },
  delAddr: function (e) {
    var _this = this
    var msg = JSON.stringify(e.currentTarget.dataset.order)
    console.log(e.currentTarget.dataset.order)
    wx.request({
      url: 'http://39.106.169.28:8028/address/delete/addr',
      method: "GET",
      data: {
        msg: msg
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      success: function (res) {
        console.log(res)
        if (res.data.msg == "删除成功") {
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
    var _this=this
    this.getAddress().then((res)=>{
      console.log(res)
      _this.setData({
        address:res
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
    this.onLoad()
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