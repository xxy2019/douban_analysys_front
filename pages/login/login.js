// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:"active",
    register:"notactive",
    img:"../../img/login_bg.png",
    codeClass: "code_btn",
    phone: '',
    pwd: "",
    isphone: true,
    ispwd: true,
    notcode: true,
    code: "em",
    value:""
  },
  clickLogin:function(){
    this.setData({
      img:"../../img/login_bg.png",
      login: "active",
      register: "notactive",
    })
  },
  clickLogin: function () {
    this.setData({
      img: "../../img/login_bg.png",
      login: "active",
      register: "notactive",
    })
  },
  clickRegister: function () {
    this.setData({
      img: "../../img/register_bg.png",
      login: "notactive",
      register: "active",
    })
  },
  formLogin:function(e){
    console.log(e)
    var _this = this
    var app = getApp()
    var user ={
      openid:app.globalData.openid,
      password: e.detail.value.pwd
    }
    this.personLogin(user).then((res) => {
      if (res == "登录为空") {
        wx.showToast({
          title: '账号或密码错误！！！',
          icon: "none",
          duration: 2000
        })
      } else if (JSON.stringify(res).length == 11) {
        app.globalData.phone = res
        app.globalData.userStatus = "login"
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  },
  personLogin: function (e) {
    var msg = JSON.stringify(e)
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.106.169.28:8028/user/login',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: {
          msg: msg
        },
        success: function (res) {
          console.log(res)
          resolve(res.data)
        },
        fail: function (res) {
          console.log("登录失败")
          console.log(res)
        }
      })
    })
  },
  formRegister:function(e){
    var _this = this
    var user = e.detail.value
    if (this.data.pwd != user.password) {
      _this.setData({
        ispwd: false
      })
      wx.showToast({
        title: '再次输入密码错误，请重新填写！',
        icon: "none",
        duration: 2000
      })
    } else {
      if (!_this.data.notcode) {
        var app=getApp()
        var openid=app.globalData.openid
        var person = JSON.stringify({
          openid: openid,
          phone: user.phone,
          password: user.password
        })
        console.log(person)
        _this.register(person).then((res) => {
          if (res.data == "注册成功") {
            var app = getApp()
            app.globalData.userStatus = "login"
            app.globalData.phone = user.phone
            wx.redirectTo({
              url: '../index/index',
            })
          } else {
            _this.setData({
              value:""
            })
            wx.showToast({
              title: '该用户已被注册，请直接登录!',
              icon: "none",
              duration: 2000
            })
          }
        })
      }
    }
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
  getPwd: function (e) {
    this.setData({
      "pwd": e.detail.value
    })
  },
  hidden: function () {
    this.setData({
      ispwd: true
    })
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
      console.log(_this.data.notcode)
    } else {
      wx.showToast({
        title: '验证码错误，请重新输入！',
        icon: "none",
        duration: 2000
      })
    }
  },
  getCode: function () {
    var _this = this
    this.setData({
      codeClass: "codebtn"
    })
    setTimeout(function () {
      _this.setData({
        codeClass: "code_btn"
      })
    }, 2000)
    if (this.data.result == null) {
      var phone = this.data.phone
    } else {
      var phone = this.data.result.phone
    }
    this.isphone(phone)
    if (this.data.isphone) {
      // wx.request({
      //   url: 'http://39.106.169.28:8028/send/' + phone,
      //   method: "GET",
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      //   },
      //   success: function (res) {
      //     console.log(res)
      //     var list = res.data.data.split(',')
      //     var code = list[0].slice(5)
      //     console.log(code)
      //     _this.setData({
      //       "code": code
      //     })
      //     console.log(_this.data.code)
      //   },
      //   fail: function (res) {
      //     console.log(res.data.msg)
      //   }
      // })
      _this.setData({
        "code": "12345"
      })
    }
  },
  register: function (e) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8028/user/register',
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
          console.log("注册失败")
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