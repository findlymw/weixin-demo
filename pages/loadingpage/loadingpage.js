// pages/loadingpage/loadingpage.js
let wxTool = require('../../utils/wxTool.js');

let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // true: 需要授权并显示按钮，false 已经授权不需要显示按钮
    loginAuthBtnShow: true,
    theme: app.globalData.systemInfo.theme,
    loginCode: wxTool.loginCode()
  },
  loginAuthHandle: (e) => {
    console.dir(e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo;
    wx.setStorageSync('userInfo', e.detail.userInfo);
    if (app.globalData.userInfo.city){
      wx.switchTab({
        url: '/pages/index/index',
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    // 判断用户是否已经授权过，如果授权过，如果授权过直接获取用户信息，否则要显示授权按钮
    // 新的版本需要主动的授权按钮让用户进行授权，不能使用getUserInfo的方法自动弹出了。
    let page = this;
    wxTool.authCheck(wx,wxTool.scopeArray.userInfo,function(res){
      console.log('authcheck1:',res);
      if (res === true) {
        wx.switchTab({
          url: '/pages/index/index',
        });
      }else{
        console.log('authcheck2:',res);
        page.setData({
          loginAuthBtnShow: false
        });
      }
    });
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