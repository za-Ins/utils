
// //开发环境
// var development = {
//   	DOMAIN: location.origin,  //后台接口域名
//     // DOMAIN: 'http://hq-jdt-dev.zhongan.io/',  //后台接口域名
//   	API_ROOT : '/jdt-web',						//后台接口根目录
//   	ROOT_ROUTE_PATH : 'sit/jdt',					//前端路由根目录
//   	ENVIRONMENT : 'sit'								//当前环境名称
// };
//开发环境
var demo = {
  	DOMAIN: location.origin,  //后台接口域名
    // DOMAIN: 'http://hq-jdt-dev.zhongan.io/',  //后台接口域名
  	API_ROOT : '/jdt-web',						//后台接口根目录
  	ROOT_ROUTE_PATH : 'sit/jdt',					//前端路由根目录
  	ENVIRONMENT : 'sit'								//当前环境名称
};

// var mock = {
//   	DOMAIN: location.origin,  //后台接口域名
//     // DOMAIN: 'http://hq-jdt-dev.zhongan.io/',  //后台接口域名
//   	API_ROOT : '/jdt-web',						//后台接口根目录
//   	ROOT_ROUTE_PATH : 'sit/jdt',					//前端路由根目录
//   	ENVIRONMENT : 'sit'								//当前环境名称
// };

var production = {
  	// DOMAIN: 'http://jdtuat.evergrandelife.com.cn',
	DOMAIN: location.origin,
  	API_ROOT : '/jdt-web',
  	ROOT_ROUTE_PATH : 'sit/jdt',
  	ENVIRONMENT : 'sit'
};

var getEnvName = function(){
	console.log(window.env);
	return window.env;
}


module.exports = {
	// development: development,
  demo: demo,
  // mock: mock,
  // production: production,
}['demo'];
