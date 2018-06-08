
import { fetchJson } from 'src/utils/fetch'
import StaticToast from 'src/components/common/Toast';
import { isIos } from 'src/utils/validate'
import FUNC from 'src/utils/func'
import $script from 'src/utils/loadJS';
const extend = require('util')._extend;

//const WeiXinJssdk = './jweixin.js';
const WeiXinJssdk = '//res.wx.qq.com/open/js/jweixin-1.1.0.js';//微信SDK
let isReady = false;

let Wechat = {
	isInitialization:false,

	defaultShare : {
		title   : '横琴热销产品',
		imgUrl  : location.origin + require('src/images/share.png'),
		desc	: '横琴热销产品，欢迎选购',
		link    : FUNC.getHrefUrl('/product/list')
	},

	shareInfo :{},

	setShareInfo: function(obj){
		extend(this.shareInfo, obj);
		wx.onMenuShareAppMessage(obj);
		wx.onMenuShareTimeline(obj);
	},

	config : (options) => {
		if(Wechat.isInitialization&&isIos()){
	 		console.info(12,"ios返回了");
	 		if(options.showOptionMenu){
				Wechat.showOptionMenu();
			}else{
				Wechat.hideOptionMenu();
			}
	 		return ;
	 	};
	 	isReady = false;
	 	Wechat.isInitialization = true;
		$script(WeiXinJssdk,()=>{
			fetchJson({
			 	url: '/wx/configdata.do?url='+encodeURIComponent(location.href),
			 	success: (res) => {
			 		if(res.flag == 'Y'){
			 		  	let r = res.value;
					  	Wechat.GetInit(r,options);
			 		}else{
			 			console.log("err3", res.message);
			 		};

			 		if(!isIos()){
			 			console.log("不是ios");
			 			Wechat.isInitialization = false;
			 		};
			 	},
		   		error:()=>{
			 		Wechat.isInitialization = false;
			 	}
			});
		});
	},

	ready : (func) => {
		setTimeout(() => {
		  if (isReady) {
			func && func(wx);
		  } else {
			Wechat.ready(func);
		  };
		}, 0);
	},
	//隐藏右上角菜单
	hideOptionMenu:() => {
		wx.hideOptionMenu();
	},

	showOptionMenu:() => {
		wx.showOptionMenu();
	},

	GetInit(r,options){
		const { debug, jsApiList, ready } = (options||{});
		let APIList = (jsApiList||[].concat(['openEnterpriseChat','hideMenuItems','hideOptionMenu','showOptionMenu','onMenuShareTimeline','onMenuShareAppMessage']));
		wx.config({
			  debug: false,
			  appId: r.appId,
			  timestamp: r.timestamp,
			  nonceStr: r.nonceStr,
			  signature: r.signature,
			  jsApiList: APIList,
			  fail: (res) => {
//			  	alert('err1',JSON.stringify(res));
			  }
			  
			});
			wx.ready(() => {
				isReady = true;

				if(options.showOptionMenu){
					Wechat.showOptionMenu();
				}else{
					Wechat.hideOptionMenu();
				}

				let share = Wechat.shareInfo || Wechat.defaultShare;
			    wx.onMenuShareAppMessage(share);
			    wx.onMenuShareTimeline(share);
			});
		wx.error((err) =>{
			isReady = true;
			console.log('err2',err);
		});
	}
};

module.exports = Wechat;
