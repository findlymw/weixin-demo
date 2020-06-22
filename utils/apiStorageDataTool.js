'use strict';
let api = require('../utils/api.js');
let apiStorageData = require('../pages/model/apiStorageData.js');
let wxTool = require('../utils/wxTool.js');
let weatherTool = require('../utils/weatherhTool.js');

let apiStorageDataTool = {
  
  getWeatherFromCity: (wx,apiToken,city,callback) => {
    api.api_weather_query_Handler(wx,
      apiToken,
      city,
      function(res){
      if (res && res.code && res.code == 200 && res.result && res.result.result){
        callback(weatherTool.getWeaterDataFromWid(res.result.result));
      }else{
        callback(weatherTool.getWeaterDataFromWid(weatherTool.defaultData));
        
      }
    });
  },
  getHistoryDetail: (wx,apiToken,eid,callback) => {
    api.api_todayOnhistory_queryDetail_Handler(wx,apiToken,eid,function(res){
      if(res && res.code && res.code == 200 && res.result && res.result.result){
        callback(res.result.result);
      }else{
        callback([]);
      }
    });
  },

  getIndexData: (wx,apiToken,xingZuoName,xingZuoType,callback) => {
    wxTool.log('get index data start','getIndexData function');
    api.api_bjCarNumber_Handler(wx,apiToken,function(res){
      wxTool.logDir('apiStorageDataTool 北京限号 getIndexData api_bjCarNumber_Handler',res);
      if(res && res.statusCode && res.statusCode == 200 && res.data && res.data.result){
        apiStorageData.restriction = res.data.result;
      }else{
        apiStorageData.restriction = '数据失败';
      }

      // 获取油价
      api.api_gnyj_Handler(wx,apiToken,function(res){
        wxTool.logDir('apiStorageDataTool 获取油价 getIndexData api_gnyj_Handler',res);
        if(res && res.code && res.code == 200 && res.result && res.result.result && res.result.result.length > 0){
          apiStorageData.gasPriceList = res.result.result;
        }else{
          apiStorageData.gasPriceList = [];
        }

        // 获取历史上的今天
        let date = new Date();
        let today = (date.getMonth()+1) + '/' + date.getDate();
        api.api_todayOnhistory_Handler(wx,apiToken,today,function(res){
          wxTool.logDir('apiStorageDataTool 获取历史上的今天('+today+') getIndexData api_todayOnhistory_Handler',res);
          if(res && res.code && res.code == 200 && res.result && res.result.result && res.result.result.length > 0){
            apiStorageData.todayOnHistory = res.result.result;
          }else{
            apiStorageData.todayOnHistory = [];
          }
          //最新笑话
          api.api_joke_new_Handler(wx,apiToken,function(res){
            wxTool.logDir('apiStorageDataTool 最新笑话 getIndexData api_joke_new_Handler',res);
            if(res && res.code && res.code == 200 && res.result &&
               res.result.result && res.result.result.data && res.result.result.data.length > 0){
              apiStorageData.jokes = res.result.result.data;
            }else{
              apiStorageData.jokes = [];
            }

            //星座
            api.api_constellation_getAll_Handler(wx,apiToken,xingZuoName,xingZuoType,function(res){
              wxTool.logDir('apiStorageDataTool 星座 getIndexData api_constellation_getAll_Handler',res);
              if(res && res.code && res.code == 200 && res.result){
               apiStorageData.xingzuo = res.result;
             }else{
               apiStorageData.xingzuo = {};
             }
              wxTool.logDir('-=-=-=-=-=-=-apiStorageData',apiStorageData);
              callback(apiStorageData);
            });
           
          });
        });

      });
    });
  }
}

module.exports = apiStorageDataTool;