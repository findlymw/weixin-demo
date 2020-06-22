'use strict';
var storageData = {
  //登录向后台服务器请求sessionId，openid，unionId时使用的code
  loginCode:'',
  //微信用户的信息对象
  userInfo:{},
  //访问api的token
  apiToken:'',
  //系统信息
  systemInfo:{
    theme:'light'
  },
  //油价列表
  gasPriceList:[],
  //网络类型
  networkType:'',


  //信息类和工具类的开关list,类型分为：1信息类 2工具类
  infosSwitch: [
    { id:0,name: '北京限号',switch: false,sort: 0 },
    { id:1,name: '今日油价',switch: false,sort: 1 },
    { id:2,name: '历史上的今天',switch: false,sort: 2 },
    { id:3,name: '星座运势',switch: false,sort: 3 },
    { id:4,name: '天气预报',switch: false,sort: 4 },
    { id:5,name: '笑话大全',switch: false,sort: 5 }
  ],
  toolsSwitch:[
    { id:0,name: '周公解梦',switch: false,sort: 0 },
    { id:1,name: '邮编查询',switch: false,sort: 1 },
    { id:2,name: '简/繁/火星字转换',switch: false,sort: 2 },
    { id:3,name: '成语词典',type: '2',switch: false,sort: 3 },
    { id:4,name: '汇率',switch: false,sort: 4 },
    { id:5,name: '彩票开奖结果查询',switch: false,sort: 5 },
    { id:6,name: '手机号码归属地',switch: false,sort: 6 }
  ],
  newsType:[
    { id:0,name:"头条",paramName:"top",sort:0 },
    { id:1,name:"社会",paramName:"shehui",sort:1 },
    { id:2,name:"国内",paramName:"guonei",sort:2 },
    { id:3,name:"国际",paramName:"guoji",sort:3 },
    { id:4,name:"娱乐",paramName:"yule",sort:4 },
    { id:5,name:"体育",paramName:"tiyu",sort:5 },
    { id:6,name:"军事",paramName:"junshi",sort:6 },
    { id:7,name:"科技",paramName:"keji",sort:7 },
    { id:8,name:"财经",paramName:"caijing",sort:8 },
    { id:9,name:"时尚",paramName:"shishang",sort:9 }
  ]

}

module.exports = storageData;