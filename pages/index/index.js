// pages/index1/index1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    list:[]
  },
  searchInput: function (e) {
    var _this=this
    console.log(e.detail.value)
    wx.request({
      url: 'http://39.106.169.28:8028/search/word',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      data:{
        name: e.detail.value
      },
      success: function (res) {
        console.log(res)
        _this.setData({
          list:res.data.msg,
          inputVal:""
        })
      },
      fail: function (res) {
        console.log("登录失败")
        console.log(res)
      }
    })
  },
  searchAll:function(){
    var _this = this
    wx.request({
      url: 'http://39.106.169.28:8028/search/findAll',
      method: "POST",
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: function (res) {
        console.log(res)
        _this.setData({
          list: res.data.msg
        })
      },
      fail: function (res) {
        console.log("登录失败")
        console.log(res)
      }
    })
  },
  toDetail:function(e){
    console.log(e.currentTarget.dataset.index)
    var good=JSON.stringify(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: './details/details?good='+good,
    })
  },
  jiami:function(e){
    var _this=this
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'https://www.qlybit.xyz:8087/exe/encrypt',
        method: "GET",
        header: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        data:{
          str:e
        },
        success: function (res) {
          console.log(res)
          resolve(res.data)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }) 
  },
  jiemi:function(e){
    var _this=this
    console.log(e)
    wx.request({
      url: 'https://www.qlybit.xyz:8087/exe/decrypt',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      data:{
        str:e
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    this.searchAll()
    this.jiami("124").then((res)=>{
      _this.jiemi(res)
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
    this.searchAll()
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