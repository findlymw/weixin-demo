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
  //历史上的今天
  todayOnHistory:[],
  //网络类型
  networkType:'',


  //信息类和工具类的开关list,类型分为：1信息类 2工具类
  infosSwitch: [
    { id:0,name: '北京限号',switch: true,sort: 0 },
    { id:1,name: '今日油价',switch: true,sort: 1 },
    { id:2,name: '历史上的今天',switch: true,sort: 2 },
    { id:3,name: '星座运势',switch: true,sort: 3 },
    { id:4,name: '天气预报',switch: true,sort: 4 },
    { id:5,name: '笑话大全',switch: true,sort: 5 }
  ],
  toolsSwitch:[
    { id:0,name: '周公解梦',switch: true,sort: 0 },
    { id:1,name: '邮编查询',switch: true,sort: 1 },
    { id:2,name: '简/繁/火星字转换',switch: true,sort: 2 },
    { id:3,name: '成语词典',type: '2',switch: true,sort: 3 },
    { id:4,name: '汇率',switch: true,sort: 4 },
    { id:5,name: '彩票开奖结果查询',switch: true,sort: 5 },
    { id:6,name: '手机号码归属地',switch: true,sort: 6 }
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
  ],
  constellation:[
    {
      id: 1,
      image: '../../res/images/constellation/1-aries-321-419-baishangzuo.jpg',
      flag: '♈️',
      name: '白羊座',
      englist: 'Aries',
      dateLimit: '03/21 - 04/19'
    },
    {
      id: 2,
      image: '../../res/images/constellation/2-taurus-420-520-jinniuzuo.jpg',
      flag: '♉️',
      name: '金牛座',
      englist: 'Taurus',
      dateLimit: '04/20 - 05/20'
    }
    ,
    {
      id: 3,
      image: '../../res/images/constellation/3-gemini-521-620-shuangzizuo.jpg',
      flag: '♊️',
      name: '双子座',
      englist: 'Gemini',
      dateLimit: '05/21 - 06/20'
    }
    ,
    {
      id: 4,
      image: '../../res/images/constellation/4-cancer-621-722-juxiezuo.jpg',
      flag: '♋️',
      name: '巨蟹座',
      englist: 'Cancer',
      dateLimit: '06/21 - 07/22'
    }
    ,
    {
      id: 5,
      image: '../../res/images/constellation/5-leo-723-822-shizizuo.jpg',
      flag: '♌️',
      name: '狮子座',
      englist: 'Leo',
      dateLimit: '07/23 - 08/22'
    }
    ,
    {
      id: 6,
      image: '../../res/images/constellation/6-virgo-823-922-chunvzuo.jpg',
      flag: '♍️',
      name: '处女座',
      englist: 'Virgo',
      dateLimit: '08/23 - 09/22'
    }
    ,
    {
      id: 7,
      image: '../../res/images/constellation/7-libra-923-1022-tianchengzuo.jpg',
      flag: '♎️',
      name: '天秤座',
      englist: 'Libra',
      dateLimit: '09/23 - 10/22'
    }
    ,
    {
      id: 8,
      image: '../../res/images/constellation/8-scorpio-1023-1121-tianxiezuo.jpg',
      flag: '♏️',
      name: '天蝎座',
      englist: 'Scorpio',
      dateLimit: '10/23 - 11/21'
    }
    ,
    {
      id: 9,
      image: '../../res/images/constellation/9-sagittarius-1122-1221-sheshouzuo.jpg',
      flag: '♐️',
      name: '射手座',
      englist: 'Sagittarius',
      dateLimit: '11/22 - 12/21'
    }
    ,
    {
      id: 10,
      image: '../../res/images/constellation/10-capricorn-1222-119-mojiezuo.jpg',
      flag: '♑️',
      name: '摩羯座',
      englist: 'Capricorn',
      dateLimit: '12/22 - 01/19'
    }
    ,
    {
      id: 11,
      image: '../../res/images/constellation/11-aquarius-120-218-shuipingzuo.jpg',
      flag: '♒️',
      name: '水瓶座',
      englist: 'Aquarius',
      dateLimit: '01/20 - 02/18'
    },
    {
      id: 12,
      image: '../../res/images/constellation/12-pisces-219-320-shuangyuzuo.jpg',
      flag: '♓️',
      name: '双鱼座',
      englist: 'Pisces',
      dateLimit: '02/19 - 03/20'
    }
  ]

}

module.exports = storageData;