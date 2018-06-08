import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import StaticToast from 'src/components/common/Toast';
import API from 'src/utils/api';
import FUC from 'src/utils/func';
import Storage from 'src/utils/store';


promise.polyfill();
let isFlag = false;//防止重复提交

export const fetchJson = (options) => {
    const { url, type, data, ...others } = options;

    if(data && Storage.get('ACCOUNT_ID')){
        data.accountId = Storage.get('ACCOUNT_ID');
        console.log('formData',data);
    }

    Loading(true);

    isFlag = true;

    let opts = {
        ...others,
        method: type || 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    if(['POST','PUT'].indexOf(opts.method.toUpperCase()) >= 0){
        opts.body = JSON.stringify(data);
    }

    var newUrl = API.DOMAIN + API.CONTEXT + url;
    console.log('newUrl',newUrl);
    fetch(newUrl, opts)
        .then(resData => toJson(resData, opts))
        .then(resData => resHandler(resData, opts))
        .catch(error => errorHandler(error, opts));
};

function toJson(resp, options) {
    
    if (resp.status >= 400) {
        return errorHandler(null, options, resp.status);
    }
    return resp.json();
}

// 请求成功处理
function resHandler(resData, options) {
    isFlag = false;
    Loading(false);

    if (resData.status && resData.status != 200) {
        return errorHandler(resData.error, options, resData.status);
    }
    if (resData) {

        if(resData.resultCode == 99 ){ // 统一处理未登录
            FUC.hrefToHard('/login');
            return false;
        }else if(resData.resultCode == '00'){
            options.success && options.success(resData.data);
        }else if (resData.isSuccess) {
            options.success && options.success(resData);
        }else if(resData.resultCode == '02'){
            options.success && options.error(resData);
        }else if(resData.resultCode == '05'){ //用户下单成功统一跳产品列表页
            StaticToast.confirm(resData.resultMsg,function(){
                FUC.hrefToHard('/product');
                return false;
            });
        }else{
            if(options.error){
                options.error(resData);
            }else{
                let errorMsg = resData.resultMsg;
                if(errorMsg.indexOf('java') >= 0){
                    errorMsg = '网络异常！';
                }
                StaticToast.error(errorMsg);
            }
        }
    } else {
        if(options.error){
            options.error(resData);
        }else{
            StaticToast.error('网络异常！请求未能成功处理');
        }
    }
}

// 异常处理
function errorHandler(error, options, status) {
    isFlag=false;
    Loading(false);
    if(options.error){
        options.error(error);
    }else{
        //StaticToast.err(`网络异常，请稍后重试(${status})`);
    }
}

function Loading(IsShow){

    var loading = document.querySelector('#loadTips');

    if(!loading&&!IsShow){
	  return ;
    }
    if(loading){
        loading.className=!IsShow?'wb-fix hide':'wb-fix';
    }else{
        var str = '<div class="ui-loading ui-loading-open" ><div class="ui-loading-container"><div class="ui-loading-items" ><div class="ui-loading-item" ></div><div class="ui-loading-item" ></div><div class="ui-loading-item" ></div><div class="ui-loading-item" ></div><div class="ui-loading-item" ></div><div class="ui-loading-item" ></div><div class="ui-loading-item" ></div><div class="ui-loading-item" ></div><div class="ui-loading-item" ></div><div class="ui-loading-item" ></div><div class="ui-loading-item"></div><div class="ui-loading-item"></div></div><div class="ui-loading-bottom">数据加载中</div></div><div class="ui-mask transparent"></div></div>';
        var CreateLoad = document.createElement('div');
        CreateLoad.id='loadTips';
        CreateLoad.className=!IsShow?'wb-fix hide':'wb-fix';
        CreateLoad.innerHTML=(str);
        document.body.appendChild(CreateLoad);
    }
}

function urlEncode(param, key, encode) {
    if(param==null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
}

function jsonConvert(param, key, encode){
    var ret = (urlEncode(param, key, encode)).substring(1);
    return ret;
}
