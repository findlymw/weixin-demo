// pages/my/my.js
let wxTool = require('../../utils/wxTool.js');
'use strict';
Page({
  changeInfosSwitchHandle: function(e){
    getApp().globalData.storageData.infosSwitch[e.currentTarget.dataset.id].switch = 
    !getApp().globalData.storageData.infosSwitch[e.currentTarget.dataset.id].switch;
    this.data.infosSwitch = getApp().globalData.storageData.infosSwitch;
    wxTool.saveStorage(wx,getApp().globalData.storageData,getApp().config.storageDataKey,function(res){});
    console.dir(getApp().globalData.storageData);
  },
  changeToolsSwitchHandle: function(e){
    getApp().globalData.storageData.toolsSwitch[e.currentTarget.dataset.id].switch = 
    !getApp().globalData.storageData.toolsSwitch[e.currentTarget.dataset.id].switch;
    this.data.toolsSwitch = getApp().globalData.storageData.toolsSwitch;
    wxTool.saveStorage(wx,getApp().globalData.storageData,getApp().config.storageDataKey,function(res){});
    console.dir(getApp().globalData.storageData);
  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    apiToken:'',
    infosSwitch:[],
    toolsSwitch:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp();
    console.dir(app.globalData.storageData);
    this.setData({
      userInfo: app.globalData.storageData.userInfo,
      apiToken: app.globalData.storageData.apiToken,
      infosSwitch: app.globalData.storageData.infosSwitch,
      toolsSwitch: app.globalData.storageData.toolsSwitch
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