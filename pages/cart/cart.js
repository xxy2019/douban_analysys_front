// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    checkboxItems: [
      {name: 'standard is dealt for u.', value: '0', checked: true},
      {name: 'standard is dealicient for u.', value: '1'}
    ],
    price:0
  },
  getCart:function(e){
    var _this=this
    wx.request({
      url: 'http://39.106.169.28:8028/Cart/select',
      method: "POST",
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: e,
      success: function (res) {
        console.log(res)
        _this.setData({
          list:res.data.msg,
        })
      },
      fail: function (res) {
        console.log("获取购物车信息失败")
      }
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    // var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    // for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
    //     checkboxItems[i].checked = false;

    //     for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
    //         if(checkboxItems[i].value == values[j]){
    //             checkboxItems[i].checked = true;
    //             break;
    //         }
    //     }
    // }
    // this.setData({
    //     checkboxItems: checkboxItems,
    //     [`formData.checkbox`]: e.detail.value
    // });
    var price=0
    for(var i=0;i<e.detail.value.length;i++){ 
      var choose=parseFloat(e.detail.value[i])
      price=choose*100+price   
    }
    this.setData({
        price: price/100
    });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp()
    var openid=app.globalData.openid
    console.log(openid)
    this.getCart(openid)
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