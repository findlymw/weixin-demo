//index.js
let wxTool = require('../../utils/wxTool.js');
let qqMapWX = require('../../utils/qqmap-wx-jssdk.js');
let api = require('../../utils/api.js');
let qqmap = new qqMapWX({
  key: getApp().config.qqMapKey
});
Page({
  data: {
    location: '',
    pageHide: true

  },
  onLoad: function () {

    wx.showLoading({
      title: '登录中...',
    })

    let app = getApp();
    let page = this;
    //通过userInfo的gender更改我的他bBar样式
    wxTool.changeTabBarItemFormGender(wx,app.globalData.storageData.userInfo.gender);

  //判断apiToken是否存在-start
  if(!app.globalData.storageData.apiToken){
    // 通过userInfo进行登录-start
    api.login(wx,app.globalData.storageData.userInfo,function(res){
      wxTool.logDir('indexjs onLoad login res',res);
      if(res && res.data && res.data.result){
        app.globalData.storageData.apiToken = res.data.result;
        wxTool.logDir('indexjs Onload Login success',res);
        wxTool.saveStorage(wx,app.globalData.storageData,app.config.storageDataKey,function(res){});
      }
    });
    // 通过userInfo进行登录-end
  }
  //判断apiToken是否存在-end

  //检查userlocation是否授权-start
  wxTool.authCheck(wx, wxTool.scopeArray.userLocation,function(res){
    if (res){
        wxTool.getUserLocation(wx, function(res){
          let locationStr = res.latitude + ',' + res.longitude;
          wxTool.getAddressFormLocation(qqmap,locationStr,res => {
            page.setData({
              location: res.result.address_component.city+'.'+res.result.address_component.district
            });
            wxTool.log('indexjs onLoad reverse location:',page.data.location);
          });
        });
    }else{
      wxTool.authorize(wx, wxTool.scopeArray.userLocation, function(res){
        wxTool.getUserLocation(wx, function(res){
          let locationStr = res.latitude + ',' + res.longitude;
          wxTool.getAddressFormLocation(qqmap,locationStr,res => {
            page.setData({
              location: res.result.address_component.city+'.'+res.result.address_component.district
            });
            wxTool.log('indexjs onLoad reverse location:',page.data.location);
          });
        });
      });
    }
  });
//检查userlocation是否授权-end


  },
  onReady: function(){
    wx.hideLoading({complete: (res) => {
      this.setData({ pageHide: false });
    } });
  }
})
