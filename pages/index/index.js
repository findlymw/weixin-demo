//index.js
let wxTool = require('../../utils/wxTool.js');
let qqMapWX = require('../../utils/qqmap-wx-jssdk.js');
let api = require('../../utils/api.js');
let apiStorageDataTool = require('../../utils/apiStorageDataTool.js');
let qqmap = new qqMapWX({
  key: getApp().config.qqMapKey
});

Page({
  data: {
    location: '',
    weatherCity:'',
    weather:{},
    todayOnHistory:[],
    gasPriceList: [],
    restriction: '',
    jokes:[],
    pageHide: true

  },
  oilPriceHandle: function(){
    wx.navigateTo({
      url: '/pages/oil/oil',
    })
  },
  historyMoreHandle: function(){
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  onLoad: function () {
    let page = this;

    //检查userlocation是否授权-start
  wxTool.authCheck(wx, wxTool.scopeArray.userLocation,function(res){
    if (res){
        wxTool.getUserLocation(wx, function(res){
          let locationStr = res.latitude + ',' + res.longitude;
          wxTool.getAddressFormLocation(qqmap,locationStr,res => {
            let city = res.result.address_component.city.replace('市','');
            city = res.result.address_component.city.replace('区','')
            page.setData({
              location: res.result.address_component.city+'.'+res.result.address_component.district,
              weatherCity: city
            });
            //获取天气
            apiStorageDataTool.getWeatherFromCity(wx,
              getApp().globalData.storageData.apiToken
              ,page.data.weatherCity,
              function(res){
              wxTool.logDir('indexjs 天气情况 onReady from network ',res);
              page.setData({
                weather: res
              });
            });
            wxTool.logDir('indexjs onLoad reverse location res',res);
            wxTool.log('indexjs onLoad reverse location:',page.data.location);
          });
        });
    }else{
      wxTool.authorize(wx, wxTool.scopeArray.userLocation, function(res){
        wxTool.getUserLocation(wx, function(res){
          let locationStr = res.latitude + ',' + res.longitude;
          wxTool.getAddressFormLocation(qqmap,locationStr,res => {
            let city = res.result.address_component.city.replace('市','');
            city = res.result.address_component.city.replace('区','')
            page.setData({
              location: res.result.address_component.city+'.'+res.result.address_component.district,
              weatherCity: city
            });
            //获取天气
            apiStorageDataTool.getWeatherFromCity(wx,
              getApp().globalData.storageData.apiToken
              ,page.data.weatherCity,
              function(res){
              wxTool.logDir('indexjs 天气情况 onReady from storage ',res);
              page.setData({
                weather: res
              });
            });
            wxTool.logDir('indexjs onLoad reverse location res',res);
            wxTool.log('indexjs onLoad reverse location:',page.data.location);
          });
        });
      });
    }
  });
//检查userlocation是否授权-end


  //从api获取wid的数据和city的数据（已经静态化处理，不用执行）
  //api.api_weather_wids_Handler(wx,getApp().globalData.storageData.apiToken,wxTool);
  //api.api_weather_city_Handler(wx,getApp().globalData.storageData.apiToken,wxTool);
  


  },
  onReady: function(){},
  onShow: function(){
    wx.showLoading({
      title: '加载中...',
    });
    wxTool.log('index page on show ...','showing');
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
          //get api data
          apiStorageDataTool.getIndexData(wx,getApp().globalData.storageData.apiToken,function(res){
            wxTool.log('1++++++++++++++++++++++' + JSON.stringify(res));
            page.setData({
              gasPriceList: res.gasPriceList?[res.gasPriceList[0]]:[],
              restriction: res.restriction,
              todayOnHistory:res.todayOnHistory?[[
                res.todayOnHistory[0],res.todayOnHistory[0],res.todayOnHistory[0]]]:[],
              jokes: res.jokes  
            });
            page.setData({ pageHide: false });
            wx.hideLoading({complete: (res) => {} });
            getApp().globalData.storageData.gasPriceList = res.gasPriceList;
            getApp().globalData.storageData.todayOnHistory = res.todayOnHistory;
            wx.setStorage({
              data: getApp().globalData.storageData,
              key: getApp().config.storageDataKey,
            });
          });
        }
      });
      // 通过userInfo进行登录-end
    }else{
      //get api data
      apiStorageDataTool.getIndexData(wx,getApp().globalData.storageData.apiToken,function(res){
        wxTool.log('2++++++++++++++++++++++' + JSON.stringify(res));
        page.setData({
          gasPriceList: res.gasPriceList?[res.gasPriceList[0]]:[],
          restriction: res.restriction,
          todayOnHistory:res.todayOnHistory?[res.todayOnHistory[0]]:[],
          jokes: res.jokes 
        });
        page.setData({ pageHide: false });
        wx.hideLoading({complete: (res) => {} });
        getApp().globalData.storageData.gasPriceList = res.gasPriceList;
        getApp().globalData.storageData.todayOnHistory = res.todayOnHistory;
        wx.setStorage({
          data: getApp().globalData.storageData,
          key: getApp().config.storageDataKey,
        });
      });
    }
    //判断apiToken是否存在-end
  }
})
