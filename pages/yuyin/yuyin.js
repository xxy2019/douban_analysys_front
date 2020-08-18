// pages/yuyin/yuyin.js
const plugin = requirePlugin("WechatSI")
const manager = plugin.getRecordRecognitionManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose:false,
    myText:false,
    list:[
      {value:"恢复原样",num:"0"},
      // {value:"变黄色",num:"1"},
      // {value:"变大理石",num:"2"},
      // {value:"变绿色",num:"3"},
      // {value:"换椅子",num:"4"},
      {value:"换沙发",num:"5"},
      {value:"换地毯颜色",num:"11"},
      {value:"换桌子",num:"13"},
      {value:"换地板材质",num:"14"}
    ],
    text:""
  },
  getNum:function(){
    var text=this.data.text.slice(0,-1)
    console.log(text)
    var list=this.data.list
    return new Promise(function(resolve,reject){
      for(let i of list){
        console.log(i.value==text)
        if(i.value==text){
          resolve(i.num)
          break;
        }
      }
    }) 
  },
  streamRecord: function() {
    manager.start({
      lang: 'zh_CN',
    })
    console.log("成功开始录音识别")
    this.setData({
      choose:true
    })
  },
  streamRecordEnd: function() {
    manager.stop()
    console.log("停止录音识别")
  },
  getYuyin:function(e){
    var _this=this
    wx.request({
      url: 'http://47.104.191.228:8028/unity/post',
      method: "POST",
      data:{
        con:e.con,
        status:e.flag
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      success: function (res) {
        console.log(res)
        _this.setData({
          myText:false
        })
      },
      fail: function (res) {
        console.log("登录失败")
        console.log(res)
      }
    })
  },
  initRecord: function() {
    var _this=this
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = (res) => {
      let text = res.result
      console.log(text)
    }
    // 识别结束事件
    manager.onStop = (res) => {
      let text = res.result
      if(text == '') {
        // 用户没有说话，可以做一下提示处理...
        wx.showToast({title: '您可以尝试“换地板”',icon: 'none',duration: 2000,})
      }else{
        _this.setData({choose:false,myText:true,text:text})
        _this.getNum(text).then((res)=>{
          console.log(res)
          wx.showToast({
            title: '正在更换中，请耐心等候！',
            icon: 'none',
            duration: 2000,
          })
          var start={con:res,flag:true}
          var end={con:res,flag:false
          }
          _this.getYuyin(start)
          setTimeout(_this.getYuyin,5000,end)
        })
      }
      // 得到完整识别内容就可以去翻译了 
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getYuyin()
    this.initRecord()
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