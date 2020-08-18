// pages/index/address/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    isphone: true,
    value: ""
  },
  isphone: function (e) {
    console.log(e)
    var _this = this
    if (e.length != 11) {
      _this.setData({
        "isphone": false
      })
      wx.showToast({
        title: '不是11位手机号，请重新输入！',
        icon: "none",
        duration: 2000
      })
    } else {
      _this.setData({
        "isphone": true,
      })
    }
  },
  getPhone: function (e) {
    this.setData({
      "phone": e.detail.value
    })
    this.isphone(e.detail.value)
  },
  formAdd: function (e) {
    var _this = this
    var user = e.detail.value
    if(user.name==""){
      wx.showToast({
        title: '收件人姓名不能为空！',
        icon:"none",
        duration:2000
      })
    } else if (!_this.data.isphone|user.phone==""){
      wx.showToast({
        title: '手机号填写有误！',
        icon: "none",
        duration: 2000
      })
    }else if(user.addr==""){
      wx.showToast({
        title: '地址不能为空！',
        icon: "none",
        duration: 2000
      })
    }else{
      var app = getApp()
      var openid = app.globalData.openid
      var myAddress = JSON.stringify({
        openid: openid,
        phone: user.phone,
        addr: user.addr,
        name:user.name
      })
      _this.addAddr(myAddress).then((res) => {
        console.log(res)
        if (res == "插入成功") {
          _this.setData({
            value:""
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: '不明原因，请向开发者反映!',
            icon: "none",
            duration: 2000
          })
        }
      })
    }
  },
  addAddr: function (e) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.106.169.28:8028/address/insert',
        method: "POST",
        dataType: "json",
        data: {
          msg: e
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          resolve(res.data.msg)

          
        },
        fail: function (res) {
          console.log("添加地址失败")
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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