'use strict';
const config = require('../config.js')
const wxTool = require('./wxTool.js');

let api = {
  apiEnvInfo: () => {
    console.log('API HOSTNAME :',config.apiHost);
    console.log('Storage Key:',config.storageDataKey);
  },
  login: (wx, data, callback) => {
    wx.request({
      url: config.apiHost + '/wx/test/login',
      method: 'POST',
      data: data,
      success(res) {
        res.urlPath = config.apiHost + '/wx/test/login';
        callback(res);
      },
      fail(res){
        res.urlPath = config.apiHost + '/wx/test/login';
        callback(res);
      }
    })
  },
  api_request: (wx,token, data, method, callback) => {
    wxTool.log('apijs api_request api token',token);
    wx.request({
        url: config.apiHost + '/wx/test/api',
        method: method,
        header: {
            "Authorization": token
        },
        data: data,
        success: function (res) {
            callback(res.data);
        },
        fail(res){
          callback(res);
        }
    })
  },
  /**
   * 今日油价
   * @param e
   */
  api_gnyj_Handler: function (wx,token,callback) {
    let data = {
        "url": "http://apis.juhe.cn/gnyj/query"
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  /**
   * 北京限号
   * @param e
   */
  api_bjCarNumber_Handler: function (wx,token,callback) {
    wx.request({
      url: config.apiHost + '/wx/test/getTodayTrafficControl',
      method: 'GET',
      header: {
          "Authorization": token
      },
      success: function (res) {
          callback(res);
      },
      fail: function(res){
        callback(res);
      }
    });
  },
  // 通过城市查询天气情况
  api_weather_query_Handler: function (wx,token,city,callback) {
    let data = {
        "url": "http://apis.juhe.cn/simpleWeather/query",
        "city": city,
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_weather_wids_Handler: function (wx,token,wxTool) {
    let data = {
        "url": "http://apis.juhe.cn/simpleWeather/wids",
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        wxTool.log('',JSON.stringify(res));
    });
  },
  api_weather_city_Handler: function (wx,token,wxTool) {
    let data = {
        "url": "http://apis.juhe.cn/simpleWeather/cityList",
    };
    this.api_request(wx,token,data, 'POST', function (res) {
      wxTool.log('',JSON.stringify(res));
    });
  },
  api_todayOnhistory_Handler: function (wx,token,dateStr,callback) {
    let data = {
        "url": "http://v.juhe.cn/todayOnhistory/queryEvent.php",
        "date": dateStr,//		日期,格式:月/日 如:1/1,/10/1,12/12 如月或者日小于10,前面无需加0
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_todayOnhistory_queryDetail_Handler: function (wx,token,id,callback) {
    let data = {
        "url": "http://v.juhe.cn/todayOnhistory/queryDetail.php",
        "e_id": id,//
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_joke_new_Handler: function (wx,token,callback) {
    let data = {
        "url": "http://v.juhe.cn/joke/content/text.php",
        "page": config.jokePage,//	当前页数,默认1,最大20
        "pagesize": config.jokeSize,//	每次返回条数,默认1,最大20
    };
    this.api_request(wx,token,data, 'POST', function (res) {
       callback(res);
    });
  },

}

module.exports = api;