//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getNetworkType({
      complete: (res) => {
        // networkType: 'wifi'
        this.globalData.networkType = res;
      }
    });
  },
  globalData: {
    userInfo: null,
    systemInfo: wx.getSystemInfoSync(),
    networkType: {}
  }
})