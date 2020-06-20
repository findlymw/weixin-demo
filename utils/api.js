'use strict';
const config = require("../config.js")

let api = {
  apiEnvInfo: () => {
    console.log('API HOSTNAME :',config.apiHost);
    console.log('Storage Key:',config.storageDataKey);
  },
  login: (wx, data, callback) => {

    console.dir(data);
    wx.request({
      url: config.apiHost + '/wx/test/login',
      method: 'POST',
      data: data,
      success: res => {
        callback(res.data.result);
      }
    })
  },
  _request: (wx, data, method, callback) => {
    wx.request({
        url: config.apiHost + '/wx/test/api',
        method: method,
        header: {
            "Authorization": getApp().globalData.apiKey
        },
        data: data,
        success: function (res) {
            callback(res.data);
        }
    })
  },

}

module.exports = api;