// pages/constellation/constellation.js
let wxTool = require('../../utils/wxTool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    constellation:[]
  },
  chooseConstellationHandle: function(e){

    wxTool.logDir('星座选择结果',e.currentTarget.dataset.cid);
    if(getApp().globalData.storageData.userInfo){
      getApp().globalData.storageData.userInfo.constellation = this.data.constellation[e.currentTarget.dataset.cid-1];
      wx.setStorage({
        data: getApp().globalData.storageData,
        key: getApp().config.storageDataKey,
        success(){
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
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
      constellation: getApp().globalData.storageData.constellation
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