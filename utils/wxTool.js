'use strict';
const config = require('../config.js');
const util = require('./util.js')
/**
 * 微信登录授权管理类
 */
let wxTool = {

  scopeArray:{
    userInfo: 'scope.userInfo',
    userLocation: 'scope.userLocation',
    userLocationBackground: 'scope.userLocationBackground',
    address: 'scope.address',
    invoiceTitle: 'scope.invoiceTitle',
    invoice: 'scope.invoice',
    werun: 'scope.werun',
    record: 'scope.record',
    writePhotosAlbum: 'scope.writePhotosAlbum',
    camera: 'scope.camera',
  },
  userInfo:{},
  // 获取loginCode
  loginCode: (wx, callback) => {
    wx.login({
      complete: (res) => {
        callback(res.code);
      },
    });
  },
  // 检查某个授权是否已授权
  authCheck: (wx,scope, callback) => {
    wx.getSetting({
      complete: (res) => {
        if (res.authSetting && res.authSetting[scope]){
          callback(true);
        }else{
          callback(false);
        }
      },
    })
  },
  // 发起某个权限的授权
  authorize: (wx, scope, callback) => {
    wx.authorize({
      scope: scope,
      complete: (res) => {},
      fail: (res) => {},
      success: (res) => {
        callback(res);
      },
    })
  },
  //获取用户信息,通过回调函数将数据传出去
  getUserInfo: (wx, userInfoReadyCallback) => {
    wx.getUserInfo({
      complete: (res) => {
        wxAuth.userInfo = res;
        userInfoReadyCallback(res);
      },
    })
  },
  //获取用户位置信息，通过回调函数将数据传出去
  getUserLocation: (wx, callback) => {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        callback(res);
      }
    })
  },
  //通过经纬度，逆地址解析
  getAddressFormLocation: (qqmap, locationStr,callback) => {
    qqmap.reverseGeocoder({
      location: locationStr,
      success: res => {
        callback(res);
      }
    });
  },
  //通过userInfo的gender更改我的他bBar样式
  changeTabBarItemFormGender: (wx,gender) => {
    // userInfo : gender 0 未知 1 男 2 女
    let tabBarItem = {
      index: 3,
      text: '我'
    };
    if (gender == 1){
      tabBarItem.iconPath = "/res/images/my-boy-dark.png";
      tabBarItem.selectedIconPath = "/res/images/my-boy-light.png";
    }else if(gender == 2){
      tabBarItem.iconPath = "/res/images/my-girl-dark.png";
      tabBarItem.selectedIconPath = "/res/images/my-girl-light.png";
    }
    wx.setTabBarItem(tabBarItem);
  },
  networkType: (wx, callback) => {
    wx.getNetworkType({
      complete: (res) => {
        // networkType: 'wifi'
        callback(res.networkType ? res.networkType : 'Nothing');
      }
    });
  },
  log: (desc,obj) => {
    if (config.debug){
      console.log('[DEBUG - Str]' + util.formatTime(new Date()) + '-' + desc + ' : ' + obj);
    }
  },
  logDir: (desc,obj) => {
    if (config.debug){
      console.log('[DEBUG + Obj]' + util.formatTime(new Date()) + '-' + desc + ' : ' ); 
      console.dir(obj);
    }
  }

}

module.exports = wxTool;

