// pages/tools/tools.js
let wxTool = require('../../utils/wxTool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toolsSwitch:[]
  },
  toolsTapHandle: function(e){
    wxTool.logDir('tools tap handle',e);
    wxTool.log('tools tap handle toolsid',e.currentTarget.dataset.toolsid);
    switch(e.currentTarget.dataset.toolsid){
      case 1: 
        wx.navigateTo({
          url: '/zippackage/pages/zip/zip?id='
          +e.currentTarget.dataset.toolsid + '&name='
          +e.currentTarget.dataset.name,
        })
        break;
      case 4: 
        wx.navigateTo({
          url: '/exchangeratepackage/pages/exchangerate/exchangerate?id='
          +e.currentTarget.dataset.toolsid + '&name='
          +e.currentTarget.dataset.name,
        })
        break;
      default: 
        wx.navigateTo({
          url: '/toolspackage/pages/toolsall/toolsall?id='
          +e.currentTarget.dataset.toolsid + '&name='
          +e.currentTarget.dataset.name,
        })
    }
    
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
    this.setData({
      toolsSwitch: getApp().globalData.storageData.toolsSwitch
    });
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