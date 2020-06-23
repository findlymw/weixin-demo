//app.js
'use strict';
const config = require('./config.js');
const api = require('./utils/api.js');
let storageData = require('./pages/model/storageData.js');
const wxTool = require('./utils/wxTool.js');
App({
  config: config,
  initData: function(callback){
    let app = this;
    //1.先到存储中获取存储的数据
    wx.getStorage({
      key: config.storageDataKey,
      success: (res) => {
        let _storageData = res.data;
        //保存在globalData中
        app.globalData.storageData = _storageData;
        wxTool.logDir('app.js storage storageData',app.globalData.storageData);
        callback('init success');
      },
      fail:(res) => {
        let _storageData = storageData;
          //获取系统信息
          _storageData.systemInfo = wx.getSystemInfoSync();
          //获取login code
          wxTool.loginCode(wx, function(res){
            _storageData.loginCode = res;
            wxTool.log('Login Code',_storageData.loginCode);
    
            //获取Network类型-start
            wxTool.networkType(wx,function(res){
              _storageData.networkType = res;
              wxTool.log('Network Type',_storageData.networkType);
    
              //保存在globalData中
              app.globalData.storageData = _storageData;
              //保存对象到存储-start
              wx.setStorageSync(config.storageDataKey, app.globalData.storageData);
              wxTool.logDir('app.js init storageData to global',app.globalData.storageData);
              //保存对象到存储-end
              callback('init success');
            });
            //获取Network类型-end
          });
      }
    });
  },
  onLaunch: function () {
    this.initData(function(){});
  },
  globalData: {
  },
  onHide: function(){
    console.log('hide');
  },
  onShow: function(){
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function(){
      wx.showModal({
        content: '新版本下载完成，是否立即重启',
        success(res){
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      })
    });
    console.log('show');
    this.initData(function(){});
  }
})