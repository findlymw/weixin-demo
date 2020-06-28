// pages/news/news.js
let wxTool = require('../../utils/wxTool.js');
let api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[],
    actionTab: 0,
    today:{},
    tomorrow:{},
    week:{},
    month:{},
    year:{}
  },
  _constellationQuery(constellationName, time,callback){
    const apiToken = getApp().globalData.storageData.apiToken;
    //星座
    api.api_constellation_getAll_Handler(wx,apiToken,constellationName,time,function(res){
      wxTool.logDir('constellationall.js 星座 _constellationQuery api_constellation_getAll_Handler',res);
      if(res && res.code && res.code == 200 && res.result){
        callback(res.result);
     }else{
      callback({});
     }
    });
  },
  _getConstellationByIndex(index){
    if(getApp().globalData.storageData.constellation){
      return getApp().globalData.storageData.constellation[index];
    }
  },
  _getConstellationToData(index){
    const constellation = this._getConstellationByIndex(index);
    if(constellation){
    wxTool.logDir('----onTabClick通过下标获取星座对象',constellation);
      this._constellationQuery(constellation.name,'today',(res) => {
        this.setData({
          today: res
        });
        this._constellationQuery(constellation.name,'tomorrow',(res) => {
          this.setData({
            tomorrow: res
          });
          this._constellationQuery(constellation.name,'week',(res) => {
            this.setData({
              week: res
            });
            this._constellationQuery(constellation.name,'month',(res) => {
              this.setData({
                month: res
              });
              this._constellationQuery(constellation.name,'year',(res) => {
                this.setData({
                  year: res
                });
                wxTool.logDir('------constellation data object',this.data);
              });
            });
          });
        });
      });
    }
  },
  onTabClick(e){
    const index = e.detail.index;
    this.setData({
      activeTab: index
    });
    this._getConstellationToData(index);
    
    
  },
  onChange(e){
    const index = e.detail.index
    this.setData({
      activeTab: index
    });
    this._getConstellationToData(index);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tabs: getApp().globalData.storageData.constellation
    });
    this._getConstellationToData(0);
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