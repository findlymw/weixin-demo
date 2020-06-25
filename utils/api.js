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
  api_joke_random_Handler: function (wx,token,callback) {
    let data = {
        "url": "http://v.juhe.cn/joke/randJoke.php",
    };
    this.api_request(wx,token,data, 'POST', function (res) {
      callback(res);
    });
  },
  api_constellation_getAll_Handler: function (wx,token,name,type,callback) { //星座
    let data = {
        "url": "http://web.juhe.cn:8080/constellation/getAll",
        "consName": name,//	星座名称，如:双鱼座
        "type": type//运势类型：today,tomorrow,week,month,year
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_product_query:function (wx,token,barcode,callback) {
    let that = this;
    wx.request({
        url: config.apiHost + '/wx/test/queryBarcodeinfo?barcode='+barcode,
        method: 'POST',
        header: {
            "Authorization": token
        },
        success: function (res) {
            callback(res);
        },
        fail(res){
          callback(null);
        }

    })
  },
  api_dream_query_Handler: function (wx,token,content,callback) {
    let data = {
        "url": "http://v.juhe.cn/dream/query",
        "q": content, //梦境关键字，如：黄金 需要utf8 urlencode
        "full": 1 //	是否显示详细信息，1:是 0:否，默认
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_charconvert_change_Handler: function (wx,token,content,contentType,callback) {
    let data = {
        "url": "http://japi.juhe.cn/charconvert/change.from",
        "text": content,
        "type": contentType,//需要转换成的类型。0：简体 1：繁体 2：火星文
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_chengyu_query_Handler: function (wx,token,content,callback) {
    let data = {
        "url": "http://v.juhe.cn/chengyu/query",
        "word": content,
        "dtype": "json"
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_mobile_get_Handler:function (wx,token,content,callback) {
    let data = {
        "url": "http://apis.juhe.cn/mobile/get",
        "phone":content
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_postcode_pcd_Handler: function (wx,token,callback) {
    let data = {
        "url": "http://v.juhe.cn/postcode/pcd",
        "dtype": "json"

    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_postcode_search_Handler: function (wx,token,pcd,addr,callback) {
    let data = {
        "url": "http://v.juhe.cn/postcode/search",
        "pid": pcd[0],
        "cid": pcd[1],
        "did": pcd[2],
        "q": addr,
        "page": 1,
        "pagesize": 20,
        "dtype": "json"

    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_postcode_query_Handler: function (wx,token,zip,callback) {
    let data = {
        "url": "http://v.juhe.cn/postcode/query",
        "postcode": zip,
        "page": 1,
        "pagesize": 20,
        "dtype": "json"

    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_onebox_exchange_list_Handler: function (wx,token,callback) {
    let that = this;
    let data = {
        "url": "http://op.juhe.cn/onebox/exchange/list",
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },
  api_onebox_exchange_query_Handler: function (wx,token,callback) {
    let data = {
        "url": "http://op.juhe.cn/onebox/exchange/query",
    };
    this.api_request(wx,token,data, 'POST', function (res) {
       callback(res);
    });
  },
  api_onebox_exchange_currency_Handler: function (wx,token,from,to,callback) {
    let that = this;
    let data = {
        "url": "http://op.juhe.cn/onebox/exchange/currency",
        "from": from,
        "to": to
    };
    this.api_request(wx,token,data, 'POST', function (res) {
        callback(res);
    });
  },

}

module.exports = api;