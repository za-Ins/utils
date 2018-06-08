import { browserHistory } from 'react-router'
import { isFromWeixin,isIos } from 'src/utils/validate';
import Wechat from 'src/plugins/Wechat';//微信初始化相关配置页

let bridge = {
  goWebView: (url) => {
    __DEBUG__ && console.info(`bridge.goWebView(${url})`)
    browserHistory.push(url)
  },
  goBack: () => {
    __DEBUG__ && console.info(`bridge.goBack()`)
    browserHistory.goBack()
  },
  doAction: (action, extra, callBack) => {
    switch (action) {
      case 'setTitle':
        if (isFromWeixin()) {
          wechatSetTitle(extra.title)
        } else {
          document.title = extra.title
        }
        break;
      case 'setWechat':        
        Wechat.config(extra);
        break;
      default:
      
    }
  }
}

// 解决IOS在微信内不更新title的bug;
function wechatSetTitle(title) {
  document.title = title;
  if(isIos()){
    var frame = document.createElement('iframe');
    frame.src = '//static.zhongan.com/website/online/assets/images/favicon.ico';
    frame.style.display = 'none';
      document.body.appendChild(frame);
    frame.onload = ()=>{
      setTimeout(()=>{
        frame.remove();
      }, 10);
    };
  };
};

module.exports = bridge
