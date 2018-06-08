import * as Wechat from 'src/plugins/Wechat'


const SHAREOBJ_DEFAULT ={
  title   : '邂逅【健康马力】，小米净化器免费领！',
  imgUrl  : location.origin + require('src/images/share.png'),
  desc    : '一起探索健康领域的“葵花宝典”！手指一抖，健康我有！',
  link    : location.origin + '/api/crius/login/redirectUrl?callbackUrl=' + location.pathname
}

const wechatShare = {

  shareDefault : (SHAREOBJ)=>{

    SHAREOBJ = {...SHAREOBJ_DEFAULT,...SHAREOBJ};

    Wechat.config({
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
      ]
    })
    Wechat.ready((wx) => {
      wx.onMenuShareTimeline({
        title   : SHAREOBJ.title,
        imgUrl  : SHAREOBJ.imgUrl,
        link    : SHAREOBJ.link
      });
      wx.onMenuShareAppMessage({
        title   : SHAREOBJ.title,
        desc    : SHAREOBJ.desc,
        imgUrl  : SHAREOBJ.imgUrl,
        link    : SHAREOBJ.link
      });
    })
  }
}
module.exports = wechatShare;