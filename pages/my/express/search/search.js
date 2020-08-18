// pages/xianyu/search/search.js
var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    list:["kn95工业防尘","瘦瘦鞋","瑜伽垫加厚防滑","糖果色衬衫女","健身小器材","大码泫雅风","华为手机","鼠标垫","多肉植物"],
    currentText: ''
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  searchByName: function (e) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8088/get/goods/gjz',
        method: "GET",
        data:{
          name:e
        },
        header:{
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          resolve(res.data)
        },
        fail: function (res) {
          console.log("更新" + res.data.msg)
        }
      })
    })
  },
  searchInput: function () {
    var _this = this
    var inputVal = this.data.inputVal
    console.log(inputVal)
    this.searchByName(inputVal).then((res) => {
      console.log(res.msg)
      var list = JSON.stringify(res.msg)
      wx.navigateTo({
        url: '../result/result?list=' + list,
      })
    })
  },
  search: function (e) {
    var _this = this
    console.log(e)
    var top = e.currentTarget.dataset.top
    this.searchByName(top).then((res) => {
      console.log(res.msg)
      var list = JSON.stringify(res.msg)
      wx.navigateTo({
        url: '../result/result?list=' + list,
      })
    })
  },
  searchTop: function () {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8088/get/goods/top',
        method: "GET",
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
  initRecord: function () {
    var that = this;
    var currentText = this.currentText;
    console.log("start" + currentText)
    if (currentText == true) {
      manager.onStop = function (res) {
        console.log("path:" + res.tempFilePath)
        currentText += res.result;
        that.setData({
          currentText: currentText
        })
      }
    }
  },
  touchS() {
    manager.onStart = function (res) {
      console.log("成功开始录音识别", res)
      wx.showToast({
        title: '正在聆听中',
        icon: 'none',
        duration: 60000,
      })
    }
    manager.start({ duration: 30000, lang: "zh_CN" })
  },
  touchE(e) {
    type = e.currentTarget.dataset.type
    console.log(type)
    manager.stop()
    var _this = this
    manager.onStop = function (res) {
      console.log("record file path", res.tempFilePath)
      console.log("result", res.result)
      _this.setData({
        inputVal: res.result.slice(0,-1)
      })
      wx.hideToast()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    this.initRecord()
    this.searchTop().then((res)=>{
      console.log(res)
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