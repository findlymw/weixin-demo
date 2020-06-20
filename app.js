//app.js
'use strict';
const apiObj = require('./utils/api.js');
const config = require('./config.js');
let storageData = require('./pages/model/storageData.js');
const wxTool = require('./utils/wxTool.js');
App({
  api: apiObj,
  config: config,
  onLaunch: function () {
    //1.先到存储中获取存储的数据
    wx.getStorage({
      key: config.storageDataKey,
      success: (res) => {
        let _storageData = res.data;
        if(!_storageData || !_storageData.systemInfo){
          _storageData = storageData;
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
    
              //将theme保存在globalData中
              this.globalData.storageData = _storageData;
              //保存对象到存储-start
              wx.setStorageSync(config.storageDataKey, this.globalData.storageData);
              wxTool.logDir('app.js init storageData to global',this.globalData.storageData);
              //保存对象到存储-end
            });
            //获取Network类型-end
            
          });
        }else{
          //将theme保存在globalData中
          this.globalData.storageData = _storageData;
          wxTool.logDir('app.js storage storageData',this.globalData.storageData);
        }
      }
    });
    
  },
  globalData: {
    theme: 'light'
  }
})