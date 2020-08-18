// pages/my/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  mycollection: function (e) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.106.169.28:8028/conllection/sumInfo',
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: {
          openid:e
        },
        dataType: "JSON",
        success: function (res) {
          var user_like=JSON.parse(res.data)
          console.log(user_like)
          resolve(user_like)
        },
        fail: function (res) {
          console.log("获取所有点赞失败")
        }
      })
    })
  },
  toDetail:function(e){
    console.log(e)
    var item=e.currentTarget.dataset.item
    console.log(item)
    this.search(item.name).then((res)=>{
      console.log(res)
      for(let i of res){
        if(i.no==item.no){
          var good=JSON.stringify(i)
          console.log(good)
          break
        }
      }
      wx.navigateTo({
        url: '../../index/details/details?good='+good,
      })
    }) 
  },
  search: function (e) {
    console.log(e)
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'http://39.106.169.28:8028/search/word',
        method: "GET",
        header: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        data:{
          name: e
        },
        success: function (res) {
          console.log(res)
          resolve(res.data.msg)
        },
        fail: function (res) {
          console.log("登录失败")
          console.log(res)
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    var app=getApp()
    var openid=app.globalData.openid
    this.mycollection(openid).then((res)=>{
      _this.setData({
        list:res
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