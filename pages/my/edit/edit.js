// pages/index/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:["密码","手机号"],
    pickindex:0,
    isHide:true,
    pwd:"",
    phone:"",
    isphone:true,
    rightcode: true,
    notcode: true,
    code: "em",
    codeClass: "code_btn"
  },
  bindPickerChange:function(e){
    console.log(e)
    var isHide=this.data.isHide
    this.setData({
      pickindex: e.detail.value,
      isHide:!isHide
    })
  },
  getPwd: function (e) {
    this.setData({
      "pwd": e.detail.value
    })
  },
  getPhone:function(e){
    var _this=this
    if (e.detail.value.length!=11){
      wx.showToast({
        title: '请输入11位手机号！！！',
        icon: "none",
        duration: 2000
      })
      _this.setData({
        isphone:false,
      })
    }else{
      _this.setData({
        isphone: true,
        phone: e.detail.value
      })
    }
  },
  codeInput: function (e) {
    var _this = this
    var inputCode = e.detail.value
    var code = this.data.code
    console.log(inputCode + " " + code)
    console.log(inputCode == code)
    if (inputCode == code) {
      _this.setData({
        "notcode": false
      })
    }
  },
  getCode: function () {
    var _this = this
    this.setData({
      codeClass:"codebtn"
    })
    setTimeout(function () {
      _this.setData({
        codeClass: "code_btn"
      })
    }, 2000)
    var phone = this.data.phone
    console.log(this.data.isphone + phone)
    if (this.data.isphone) {
      wx.request({
        url: 'http://39.106.169.28:8028/send/' + phone,
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          var list = res.data.data.split(',')
          var code = list[0].slice(5)
          console.log(code)
          _this.setData({
            "code": code
          })
          console.log(_this.data.code)
        },
        fail: function (res) {
          console.log(res.data.msg)
        }
      })
    }
  },
  formSubmit:function(e){
    var _this = this
    var user = e.detail.value
    var app=getApp()
    user.openid=app.globalData.openid
    var msg=JSON.stringify(user)
    if(this.data.isHide){
      if (this.data.pwd != user.password) {
        wx.showToast({
          title: '确认密码输入错误！！！',
          icon: "none",
          duration: 2000
        })
      } else {
        _this.editPwd(msg).then((res) => {
          if (res.data == "修改成功") {
            var app=getApp()
            app.globalData.userStatus="notLogin"
            wx.navigateBack({
              delta:1
            })
          } else {
            wx.showToast({
              title: '修改失败，原因不明！',
              icon: "none",
              duration: 2000
            })
          }
        })
      }
    }else{
      if (!_this.data.notcode){
        if(user.phone.length==11){
          _this.editPhone(msg).then((res) => {
            if (res.data == "修改成功") {
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showToast({
                title: '修改失败，原因不明！',
                icon: "none",
                duration: 2000
              })
            }
          })
        }
      }else{
        wx.showToast({
          title: '验证码错误！！！',
          icon: "none",
          duration: 2000
        })
      }
    }  
  },
  editPhone:function(e){
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.106.169.28:8028/user/alter/phone',
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
          resolve(res)
        },
        fail: function (res) {
          console.log("修改失败")
        }
      })
    })
  },
  editPwd: function (e) {
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'http://39.106.169.28:8028/user/alter/pass',
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
          resolve(res)
        },
        fail: function (res) {
          console.log("修改失败")
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.isHide)
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