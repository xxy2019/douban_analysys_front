// pages/index/express/details/detais.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [{
      content: "【石家庄市】 快件已在 【长安三部】 签收,签收人: 本人, 感谢使用中通快递,期待再次为您服务!",
      time: "2018-03-09 11:59:26"
    }, {
      content: "【石家庄市】 快件已到达 【长安三部】（0311-85344265）,业务员 容晓光（13081105270） 正在第1次派件, 请保持电话畅通,并耐心等待",
      time: "2018-03-09 09:03:10"
    }, {
      content: "【石家庄市】 快件离开 【石家庄】 发往 【长安三部】",
      time: "2018-03-08 23:43:44"
    }, {
      content: "【石家庄市】 快件到达 【石家庄】",
      time: "2018-03-08 21:00:44"
    }, {
      content: "【广州市】 快件离开 【广州中心】 发往 【石家庄】",
      time: "2018-03-07 01:38:45"
    }, {
      content: "【广州市】 快件到达 【广州中心】",
      time: "2018-03-07 01:36:53"
    }, {
      content: "【广州市】 快件离开 【广州花都】 发往 【石家庄中转】",
      time: "2018-03-07 00:40:57"
    }, {
      content: "【广州市】 【广州花都】（020-37738523） 的 马溪 （18998345739） 已揽收",
      time: "2018-03-07 00:01:55"
    }]
  },
  getExpressInfo: function (e) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://cexpress.market.alicloudapi.com/cexpress', //【1】仅为示例，并非真实的接口地址
        method: 'GET',								   //【2】需要修改为对应的GET 或者 POST 方法
        header: {
          "Authorization": "APPCODE de4f081d7c1140148bf4fcc8024bdb30"  //【3】传入自己的appcode，在买家中心查看。注意appcode与值之间有一个必须的空格 58ac025da**********3341f029ce  改为自己的APPCODE
        },
        data: {  //【4】仅为示例，传入实际的相关参数 ，data数组里的参数可参考产品详情
          no: e
        },
        // 【1】~ 【4】 许要修改成对应的，区分大小写！
        success: function (res) {
          resolve(res.data.list)         //cb(res.data);
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    console.log(options.packid)
    console.log(this.data.order)
    // this.getExpressInfo(options.packid).then((res)=>{
    //   console.log(res)
    //   _this.setData({
    //     order:res
    //   })
    // })
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