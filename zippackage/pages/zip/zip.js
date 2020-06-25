// zippackage/pages/zip/zip.js
let wxTool = require('../../../utils/wxTool.js');
let api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    citys: {status:false, allData:{}}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxTool.logDir('subPackage zip page onLoad',options);
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
    if(!this.data.citys.status){
      api.api_postcode_pcd_Handler(wx,
        getApp().globalData.storageData.apiToken,
        function(res){
          wxTool.logDir('邮编查询的城市列表数据查询接口',res);
          if(res && res.code == 200 && res.result && res.result.result){
            page.data.citys.status= true;
            page.data.citys.allData = res.result.result;
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