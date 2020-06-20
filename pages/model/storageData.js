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
  //网络类型
  networkType:'',
}

module.exports = storageData;