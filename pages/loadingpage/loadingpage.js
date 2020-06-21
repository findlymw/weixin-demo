// pages/loadingpage/loadingpage.js
let wxTool = require('../../utils/wxTool.js');
let api = require('../../utils/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // true: 需要授权并显示按钮，false 已经授权不需要显示按钮
    loginAuthBtnHide: true,
    timesCount: getApp().config.skipTimes,
    timesCountHide: true,
    theme: 'light'
  },
  skipTimesCount: function(){
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  loginAuthHandle: function(e) {
    let app = getApp();
    wxTool.logDir('loadingpagejs loginAuthHandle userinfo',e.detail.userInfo);
    wxTool.log('loadingpagejs loginAuthHandle userinfo city',e.detail.userInfo.city);
    if (e.detail.userInfo.city){
      app.globalData.storageData.userInfo = e.detail.userInfo;
      wxTool.saveStorage(wx,app.globalData.storageData,app.config.storageDataKey,function(res){
        if(res){
          wxTool.logDir('loadingpagejs _login set storage success',res);
          wx.switchTab({
            url: '/pages/index/index',
          })
        }else{
          wxTool.logDir('loadingpagejs _login set storage fail',res);
        }
      });
    }else{
      wx.showToast({
        title: '授权失败'
      })
    }
  },
  _authCheck: function(){
    let app = getApp();
    let page = this;
    wxTool.authCheck(wx,wxTool.scopeArray.userInfo,function(res){
      // console.log('authcheck1:',res);
      if (res === true && app.globalData.storageData.userInfo.city) {
        if(page.data.loginAuthBtnHide){
          let interval = setInterval(function(){
            page.setData({
              timesCount: page.data.timesCount - 1,
              timesCountHide: false
            });
            if(page.data.timesCount <= 0){
              clearInterval(interval);
              wx.switchTab({
                url: '/pages/index/index',
              });
            }
          },1000);
        }
      }else{
      // console.log('authcheck2:',res);
        page.setData({
          loginAuthBtnHide: false,
          theme: app.globalData.storageData.systemInfo.theme
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    let app = getApp();
    if(!app.globalData.storageData || !app.globalData.storageData.systemInfo){
      app.initData(function(){
        wxTool.logDir('loadingpagejs onLoad line 1',app.globalData.storageData);
        api.apiEnvInfo();
        page._authCheck();
        wxTool.logDir('loadingpage.js onload',app.globalData.storageData);
      });
    }else{
      page._authCheck();
      wxTool.logDir('loadingpage.js onload else data',app.globalData.storageData);
    }
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