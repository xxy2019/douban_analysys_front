//app.js
App({
  onLaunch: function () {
    var _this=this
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          console.log('通过login接口的code换取openid');
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              //填上自己的小程序唯一标识
              appid: 'wx0f771713bd503163',
              //填上自己的小程序的 app secret
              secret: 'a49a85d613842bd1a7a004871ab2f843',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (openIdRes) {
              console.log(openIdRes)
              console.info("登录成功返回的openId：" + openIdRes.data.openid);
              _this.globalData.openid = openIdRes.data.openid
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:"",
    userStatus:"",
    phone:""
  }
})