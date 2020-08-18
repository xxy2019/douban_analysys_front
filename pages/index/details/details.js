// pages/xianyu/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good:{},
    bnrUrl:"../../../img/yuyin_bg.png",
    msg:{},
    report:false,
    like:false,
    favor:false,
    showActionsheet: false,
    close:false,
    groups: [
        { text: '确定', value: 1 }
    ],
    type:["大型","中型","小型"],
    num:1,
    choose:0
  },
  addCart:function(){
      this.setData({
        showActionsheet: true
    })
  },
  close: function () {
    this.setData({
        showActionsheet: false
    })
  },
  btnClick(e) {
      console.log(e)
      var _this=this
      var app=getApp()
      var good=e.currentTarget.dataset.good
      console.log(good)
      var msg=JSON.stringify({
        openid:app.globalData.openid,
        no:good.no,
        name:good.name,
        count:_this.data.num,
        detail:good.detail,
        totalprice:_this.data.num*good.price,
        photo:good.photo
      })
      console.log(msg)
      wx.request({
        url: 'http://39.106.169.28:8028/Cart/insert',
        method: "POST",
        header: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        data:  msg,
        dataType: "JSON",
        success: function (res) {
          console.log(res)
          _this.close()
        },
        fail: function (res) {
          console.log("加入购物车失败")
        }
      }) 
  },
  choose:function(e){
    this.setData({
      choose:e.currentTarget.dataset.index
    })
  },
  reduce:function(){
    var num=this.data.num
    this.setData({
      num:num-1
    })
  },
  add:function(){
    var num=this.data.num
    this.setData({
      num:num+1
    })
  },
  getNum:function(e){
    console.log(e)
    this.setData({
      num:e.detail.value
    })
  },
  myTime: function () {
    var time = new Date()
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var day = time.getDate()
    var hour = time.getHours()
    var minute = time.getMinutes()
    var second = time.getSeconds()
    const formatNumber1 = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    return [year, month, day].map(formatNumber1).join('-') + " " + [hour, minute, second].map(formatNumber1).join(':')
  },
  getLike:function(){
    var _this=this
    var like = _this.data.like
    var msg = _this.data.msg
    if(!like){  
      wx.request({
        url: 'http://39.106.169.28:8028/favorite/add',
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data:  msg,
        dataType: "JSON",
        success: function (res) {
          console.log(res)
          _this.setData({
            like: !like
          })
        },
        fail: function (res) {
          console.log("点赞失败")
        }
      })
    }else{
      wx.request({
        url: 'http://39.106.169.28:8028/favorite/cancel',
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: msg,
        dataType: "JSON",
        success: function (res) {
          console.log(res)
          _this.setData({
            like: !like
          })
        },
        fail: function (res) {
          console.log("取消点赞失败")
        }
      })
    }  
  },
  getFavor: function () {
    var _this = this
    var favor = _this.data.favor
    var msg = _this.data.msg
    if (!favor) {
      wx.request({
        url: 'http://39.106.169.28:8028/conllection/add',
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data:  msg,
        dataType: "JSON",
        success: function (res) {
          console.log(res)
          _this.setData({
            favor: !favor
          })
        },
        fail: function (res) {
          console.log("收藏失败")
        }
      })
    } else {
      wx.request({
        url: 'http://39.106.169.28:8028/conllection/cancel',
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: msg,
        dataType: "JSON",
        success: function (res) {
          console.log(res)
          _this.setData({
            favor: !favor
          })
        },
        fail: function (res) {
          console.log("取消收藏失败")
        }
      })
    }
  },
  getBuy:function(){
    var _this=this
    var e = JSON.parse(_this.data.msg)
    var msg = JSON.stringify({
      buyeridCard: e.idCard,
      publishIdCard: e.publishIdCard,
      pDate: e.pDate,
      date:_this.myTime()
    })
    wx.request({
      url: 'http://47.104.191.228:8088/buy',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: {
        msg: msg
      },
      dataType: "JSON",
      success: function (res) {
        console.log(res)
        if (res.data =="无法自己购买"){
          wx.showToast({
            title: "无法购买自己发布的商品",
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == "购买成功"){
          wx.showToast({
            title: '购买成功,请去个人中心查看',
            icon: 'none',
            duration: 2000
          })
        }  
      },
      fail: function (res) {
        console.log("购买失败")
      }
    })
  },
  mylike: function (e) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.106.169.28:8028/search/isFavorite',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: {
          openid:e.openid,
          no:e.no
        },
        dataType: "JSON",
        success: function (res) {
          console.log(res)
          resolve(res.data)
        },
        fail: function (res) {
          console.log("获取点赞失败")
        }
      })
    })
  },
  myfavor: function (e) {
    console.log(e)
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.106.169.28:8028/search/isConllection',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: {
          openid:e.openid,
          no:e.no
        },
        dataType: "JSON",
        success: function (res) {
          console.log(res)
          resolve(res.data)
        },
        fail: function (res) {
          console.log("获取收藏失败")
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var good=JSON.parse(options.good)
    console.log(good)
    var _this=this
    var app=getApp()
    var msg = {
      openid: app.globalData.openid,
      no: good.no,
      name: good.name
    }
    this.setData({
      good: good,
      msg: msg
    })
    this.mylike(msg).then((res)=>{
      if(res=="已经点赞过"){
        _this.setData({
          like:true
        })
      }else{
        _this.setData({
          like: false
        })
      }
    })
    this.myfavor(msg).then((res)=>{
      if (res == "已经收藏过") {
        _this.setData({
          favor: true
        })
      } else {
        _this.setData({
          favor: false
        })
      }
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
    var _this = this
    var msg = this.data.msg
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