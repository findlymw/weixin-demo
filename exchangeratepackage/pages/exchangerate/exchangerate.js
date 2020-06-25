// exchangeratepackage/pages/exchangerate/exchangerate.js
let wxTool = require('../../../utils/wxTool.js');
let api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    exchangeList:{status:false,allData:{}}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxTool.logDir('subPackage exchangerate page onLoad',options);
    wx.setNavigationBarTitle({
      title: options.name,
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
    let page = this;
    if(!this.data.exchangeList.status){
      api.api_onebox_exchange_list_Handler(wx,
        getApp().globalData.storageData.apiToken,
        function(res){
          wxTool.logDir('货币列表数据查询接口',res);
          if(res && res.code == 200 && res.result && res.result.result && res.result.result.list){
            page.data.exchangeList.status= true;
            page.data.exchangeList.allData = res.result.result.list;
          }
        }
      );
    }
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