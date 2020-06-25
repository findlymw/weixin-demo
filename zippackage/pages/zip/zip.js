// zippackage/pages/zip/zip.js
let wxTool = require('../../../utils/wxTool.js');
let api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    detailed: '点击选择地区并填写地址进行查询',
    inputValue:'',
    pcd:[],
    citys: {
      status: false,
      allData: []
    },
    tabBar:{
      bar1:{active:true},
      bar2:{active:false}
    },
    addrResult:{}
  },
  chooseBarHandle: function(e){
    this.setData({
      addrResult: []
    });
    wxTool.log('choose bar',e.currentTarget.dataset.bar);
    if(e.currentTarget.dataset.bar == 1){
      wxTool.log('=====================1 in','');
      this.setData({
        tabBar:{
          bar1:{active:true},
          bar2:{active:false}
        }
      });
    }else{
      wxTool.log('=====================2 in','');
      this.setData({
        tabBar:{
          bar1:{active:false},
          bar2:{active:true}
        }
      });
    }
  },
  bindconfirmZipToAddrHandle: function(e){
    let page = this;
    wxTool.logDir('bindconfirmHandle:',e);
    let apiToken = getApp().globalData.storageData.apiToken;
    if(e.detail.value){
      api.api_postcode_query_Handler(wx,apiToken,e.detail.value,function(res){
        wxTool.logDir('通过邮编查询地址的结果',res);
        if(res && res.code == 200 && res.result && res.result.result && res.result.result.list){
          page.setData({
            addrResult: res.result.result.list
          });
        }else{
          page.setData({
            addrResult: []
          });
        }
      });
    }else{
      page.setData({
        addrResult: []
      });
    }

  },
  bindconfirmHandle: function(e){
    let page = this;
    wxTool.logDir('bindconfirmHandle:',e);
    wxTool.logDir('bindconfirmHandle thisdata:',this.data);
    let apiToken = getApp().globalData.storageData.apiToken;
    if(this.data.pcd && this.data.pcd.length == 3 && e.detail.value){
      api.api_postcode_search_Handler(wx,apiToken,this.data.pcd,e.detail.value,function(res){
        wxTool.logDir('通过选择省市区和填写地址进行邮编的查询结果',res);
        if(res && res.code == 200 && res.result && res.result.result && res.result.result.list){
          page.setData({
            addrResult: res.result.result.list
          });
        }else{
          page.setData({
            addrResult: []
          });
        }
      });
    }else{
      page.setData({
        addrResult: []
      });
    }
  },
  _queryIds(pcd){
    let p = pcd[0];
    let c = pcd[1];
    let d = pcd[2];
    if(this.data.citys.status){
      wxTool.log('pcd',p+c+d);
      let pid = -1;
      let cid = -1;
      let did = -1;
      for(let i=0;i<this.data.citys.allData.length;i++){
        let item = this.data.citys.allData[i];
        if(item.province == p){
          let pid = item.id;
          for(let j=0;j<item.city.length;j++){
            let c_item = item.city[j];
            if(c_item.city == c){
              cid = c_item.id;
              for(let k=0;k<c_item.district.length;k++){
                let d_item = c_item.district[k];
                if(d_item.district == d){
                  did = d_item.id;
                  wxTool.log('省市区转ID号，区',d_item.id + '-' + d_item.district);
                  //return {"pid":pid,"cid":cid,"did":did};
                  return [pid,cid,did];
                  break;
                }
              }
              wxTool.log('省市区转ID号，市',c_item.id + '-' + c_item.city);
              break;
            }
          }
          wxTool.log('省市区转ID号，省',item.id + '-' + item.province);
          break;
        }
      }
      
    }
  },
  //省市联动
  bindRegionChange: function (e) {
    var that = this
    //为了让选择框有个默认值，    
    that.setData({
      clas: ''
    }) //下拉框所选择的值
    
    wxTool.log('picker发送选择改变，携带值为', JSON.stringify(e.detail.value));
    this.setData({
      //拼的字符串传后台
      detailed: e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2],
      //下拉框选中的值
      region: e.detail.value
    });

      this.setData({
        pcd: this._queryIds(e.detail.value)
      });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxTool.logDir('subPackage zip page onLoad', options);
    wx.setNavigationBarTitle({
      title: options.name,
    });
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
    let page = this;
    wxTool.logDir('查看data的citys',this.data.citys);
    if (!getApp().globalData.storageData.citysData || getApp().globalData.storageData.citysDatalength<=0) {
      api.api_postcode_pcd_Handler(wx,
        getApp().globalData.storageData.apiToken,
        function (res) {
          wxTool.logDir('邮编查询的城市列表数据查询接口', res);
          if (res && res.code == 200 && res.result && res.result.result) {
            page.data.citys.status = true;
            page.data.citys.allData = res.result.result;
            getApp().globalData.storageData.citysData = page.data.citys.allData;
            wx.setStorage({
              data: getApp().globalData.storageData,
              key: getApp().config.storageDataKey,
            })
          }
        }
      );
    }else{
      page.data.citys.status = true;
      page.data.citys.allData = getApp().globalData.storageData.citysData;
    }
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