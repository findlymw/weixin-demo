// pages/history/history.js
let wxTool = require('../../utils/wxTool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayOnHistory:[]
  },
  historyDetailHandle: function(e){
    wxTool.log('historyjs historyDetailHandle eid', e.currentTarget.dataset.eid);
    wx.navigateTo({
      url: '/pages/historydetail/historydetail?eid='+e.currentTarget.dataset.eid+
      '&title='+e.currentTarget.dataset.title,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      todayOnHistory: getApp().globalData.storageData.todayOnHistory
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