// pages/historydetail/historydetail.js
let wxTool = require('../../utils/wxTool.js');
let apiStorageDataTool = require('../../utils/apiStorageDataTool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page =  this;
    wxTool.log('historydetail page onload options eid and title',options.eid + options.title);
    wx.setNavigationBarTitle({
      title: options.title,
    });
    apiStorageDataTool.getHistoryDetail(wx,getApp().globalData.storageData.apiToken,options.eid,function(res){
      if(res && res.length > 0){
        wxTool.logDir('history detail result > 0',res);
        let detail = res[0];
        page.setData({
          historyDetail: detail
        });
      }else{
        wxTool.logDir('history detail result = 0',res);
        page.setData({
          historyDetail: {}
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