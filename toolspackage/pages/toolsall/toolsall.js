// toolspackage/pages/toolsall/toolsall.js
let apiStorageDataTool = require('../../../utils/apiStorageDataTool.js');
let api = require('../../../utils/api.js');
let wxTool = require('../../../utils/wxTool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:-1,
    title:'',
    dreamData:[],
    placeholder:'快告诉周公梦见什么啦',
    inputValue:'',
    queryResult:'',
    huoxingItems: [
      {value: '2', name: '火星文',checked: false},
      {value: '1', name: '繁体' ,checked: false},
      {value: '0', name: '简体',checked: false}
    ],
    chengyuObj:{},
    mobileObj:{}
  },
  huoxingInputHandle: function(e){
    this.data.inputValue = e.detail.value;
  },
  radioChangeHandle: function(e){
    let page = this;
    wxTool.log('radio发生change事件，携带value值为：', e.detail.value)
    let apiToken = getApp().globalData.storageData.apiToken;
    const items = this.data.huoxingItems
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
   

    api.api_charconvert_change_Handler(wx,apiToken,this.data.inputValue,e.detail.value,function(res){
      wxTool.logDir('huoxingwen res', res);
      if(res && res.code == 200 && res.result && res.result.outstr){
        page.setData({
          huoxingItems: items,
          queryResult: res.result.outstr
        })
        wxTool.log('火星转换结果res.result.result：',res.result.outstr);
        wxTool.log('火星转换结果data：',page.data.queryResult);
      }
    });

  },
  bindconfirmHandle: function(e){
    let page = this;
    wxTool.logDir('bindconfirmHandle:',e);
    let apiToken = getApp().globalData.storageData.apiToken;

    // 周公解梦
    if(this.data.id == 0){
      apiStorageDataTool.api_dream_query_Handler(wx,apiToken,e.detail.value,function(res){
        wxTool.logDir('subPackage tools page bindconfirmHandle dream',res);
      
        page.setData({
          dreamData: res?res:[],
          placeholder:'快告诉周公梦见什么啦',
          inputValue: '',
          queryResult: res?'':'周公不能理解你的梦，请问的简单点儿'
        });
      });
    }

    
    
    //成语词典
    if(this.data.id == 3){
      wxTool.log('成语词典查询日志',e.detail.value);
      if(e.detail.value){
        api.api_chengyu_query_Handler(wx,apiToken,e.detail.value,function(res){
          wxTool.logDir('成语词典 api res', res);
          if(res && res.code == 200 && res.result && res.result.result){
            page.setData({
              chengyuObj: res.result.result,
              queryResult:''
            });
          }else{
            page.setData({
              inputValue: '',
              chengyuObj:{},
              queryResult: res.result.reason
            });
          }
        });
      }else{

      }
    }
    
    //手机号
    if(this.data.id == 5){
      wxTool.log('手机号归属地查询日志',e.detail.value);
      if(e.detail.value){
        api.api_mobile_get_Handler(wx,apiToken,e.detail.value,function(res){
          wxTool.logDir('手机归属地查询 api res', res);
          if(res && res.code == 200 && res.result && res.result.result){
            page.setData({
              mobileObj: res.result.result,
              queryResult:'',

            });
          }else{
            page.setData({
              inputValue: '',
              mobileObj:{},
              queryResult: res.result.reason
            });
          }
        });
      }else{

      }
    }

    
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxTool.logDir('subPackage tools page onLoad',options);
    wx.setNavigationBarTitle({
      title: options.name,
    });
    this.setData({
      id:options.id,
      title: options.name
    });

    //火星文字
    if(this.data.id == 2){
      this.setData({
        placeholder:'请输入要转换的文字',
        inputValue: ''
      });
    }
    //成语词典
    if(this.data.id == 3){
      this.setData({
        placeholder:'请输入要查询的成语',
        inputValue: ''
      });
    }
    //手机号码归属地
    if(this.data.id == 5){
      this.setData({
        placeholder:'请输入要查询的手机号',
        inputValue: ''
      });
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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