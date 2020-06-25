// exchangeratepackage/pages/exchangerate/exchangerate.js
let wxTool = require('../../../utils/wxTool.js');
let api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    exchangeList:[],
    objectExchangeList:[],
    genExchangeRateList:[],
    code1:'',
    code2: '',
    vsResult:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxTool.logDir('subPackage exchangerate page onLoad',options);
    wx.setNavigationBarTitle({
      title: options.name,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindPickerChange: function(e) {
    let page = this;
    if(e.currentTarget.dataset.picker == 1){
      wxTool.log('picker = 1发送选择改变，携带值为', e.detail.value)
      wxTool.log('picker = 1发送选择改变，e.currentTarget.dataset.picker', e.currentTarget.dataset.picker)
      this.setData({
        index1: e.detail.value,
        code1: this.data.objectExchangeList[e.detail.value].code
      });
    }else{
      wxTool.log('picker = 2发送选择改变，携带值为', e.detail.value)
      wxTool.log('picker = 2发送选择改变，e.currentTarget.dataset.picker', e.currentTarget.dataset.picker)
      this.setData({
        index2: e.detail.value,
        code2: this.data.objectExchangeList[e.detail.value].code
      });
    }

    wxTool.log('--------------汇率实时查询-------------','code1:' + this.data.code1 + ' code2:' + this.data.code2);
    
    if(this.data.code1 && this.data.code2){
      api.api_onebox_exchange_currency_Handler(wx,
        getApp().globalData.storageData.apiToken,
        this.data.code1,this.data.code2,
        function(res){
          wxTool.logDir('--------------汇率实时查询结果-------------',res);
          if(res && res.code && res.code == 200 &&  res.result && res.result.result){
            page.setData({
              vsResult: res.result.result
            });
          }
        });
    }

  },
  _genExchangeList:function(){
    
    this.data.objectExchangeList.forEach((item,index) => {
      this.data.exchangeList.push(item.name);
    });
    wxTool.logDir('转换后的数组和object数组', this.data);
    this.setData({
      objectExchangeList: this.data.objectExchangeList,
      exchangeList: this.data.exchangeList
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let page = this;
    let apiToken =getApp().globalData.storageData.apiToken;
    if(!getApp().globalData.storageData.exchangeRate){
      api.api_onebox_exchange_list_Handler(wx,
        getApp().globalData.storageData.apiToken,
        function(res){
          wxTool.logDir('货币列表数据查询接口',res);
          if(res && res.code == 200 && res.result && res.result.result && res.result.result.list){
            page.data.objectExchangeList = res.result.result.list;
            getApp().globalData.storageData.exchangeRate = page.data.objectExchangeList;
            page._genExchangeList();
            wx.setStorage({
              data: getApp().globalData.storageData,
              key: getApp().config.storageDataKey,
            })
          }
        }
      );
    }else{
      page.data.objectExchangeList = getApp().globalData.storageData.exchangeRate;
      page._genExchangeList();
    }


    //获取常用汇率信息
    api.api_onebox_exchange_query_Handler(wx,apiToken,function(res){
      wxTool.logDir('获取常用汇率信息',res);
      if(res && res.result && res.result.result && res.result.result.list){
        page.setData({
          genExchangeRateList: res.result.result.list
        });
      }else{
        page.setData({
          genExchangeRateList: []
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})