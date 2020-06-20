// pages/loadingpage/loadingpage.js
let wxTool = require('../../utils/wxTool.js');
let app = getApp();
let storageData = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // true: 需要授权并显示按钮，false 已经授权不需要显示按钮
    loginAuthBtnShow: false,
    theme: 'light',
    debuginfo:''
  },
  loginAuthHandle: function(e) {
    console.dir(e.detail.userInfo);
    if (e.detail.userInfo.city){
      this._login(e.detail.userInfo,function(res){
        this.setData({
          loginAuthBtnShow: false,
          theme: 'light',
          debuginfo:JSON.stringify(res)
        });
        if(res){
          wx.switchTab({
            url: '/pages/index/index',
          })
        }else{
          wx.showToast({
            title: '授权登录失败，请重试',
          })
        }
      });
    }
  },
  _login: function (userInfo,callback) {
    // login
    let page = this;
    app.api.login(wx,userInfo,
      function(data){
        wxTool.logDir('Api Auth Code:',data);
        if (data && data.length > 10){
          storageData.apiToken = data;
          wx.setStorageSync(app.config.storageDataKey, storageData);
          wxTool.logDir('获取存储中的storageData',wx.getStorageSync(app.config.storageDataKey));
          callback(storageData.apiToken);
        }else{
          callback('');
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    wx.getStorage({
      key: app.config.storageDataKey,
      success: (res) => {
        storageData = res.data;
        if(storageData && storageData.systemInfo){
          // 判断用户是否已经授权过，如果授权过，如果授权过直接获取用户信息，否则要显示授权按钮
          // 新的版本需要主动的授权按钮让用户进行授权，不能使用getUserInfo的方法自动弹出了。
          app.api.apiEnvInfo();
          wxTool.authCheck(wx,wxTool.scopeArray.userInfo,function(res){
            // console.log('authcheck1:',res);
            if (res === true) {
              page._login(storageData.userInfo);
            }else{
            // console.log('authcheck2:',res);
            page.setData({
                loginAuthBtnShow: false,
                theme: storageData.systemInfo.theme
              });
            }
          });
        }
        wxTool.logDir('loadingpage.js onload',storageData);
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