//index.js
let wxTool = require('../../utils/wxTool.js');
let qqMapWX = require('../../utils/qqmap-wx-jssdk.js');
//获取应用实例
const app = getApp()
let qqmap = new qqMapWX({
  key: 'U6UBZ-EPICP-Z4GDT-VZG76-M4BO6-7CFT4'
});
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    location: ''
  },
  onLoad: function () {
    //通过userInfo的gender更改我的他bBar样式
    wxTool.changeTabBarItemFormGender(wx,this.data.userInfo.gender);

    let page = this;

    wxTool.authCheck(wx, wxTool.scopeArray.userLocation,function(res){
      if (res){
        wxTool.getUserLocation(wx, function(res){
          wxTool.getUserLocation(wx, function(res){
            // console.dir(res);
            // console.log('--->' + res.latitude + ',' + res.longitude);
            let locationStr = res.latitude + ',' + res.longitude;
            wxTool.getAddressFormLocation(qqmap,locationStr,res => {
              // console.dir(res);
              page.setData({
                location: res.result.address_component.city+'.'+res.result.address_component.district
              });
              console.log('location:',page.data.location);
            });
          });
        });
      }else{
        wxTool.authorize(wx, wxTool.scopeArray.userLocation, function(res){
          console.dir(res);
        });
      }
    });


  }
})
