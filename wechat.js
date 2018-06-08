//2017-10-9
import { SHARE_CONFIG, I_GET_LOCATION } from '@/api'

/**
 * 微信授权
 * @params vue vue的实例
 * @params callback 回调
 */
function wxAuthorized (vue, callback) {
}

/**
 * 配置微信的jssdk调用权限
 * @params vue vue的实例
 * @params options 分享或其他调用sdk的参数,type调用sdk的功能名称
 * @params callback 回调
 */
function wxConfigSDk (vue, options, callback) {
  // 判断是否为微信环境
  let isWechat = navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1
  if (isWechat) {
    let href = encodeURIComponent(window.location.href)
    let wx = vue.$wechat
    var apiList = options.jsApiList
    vue.axios.post(SHARE_CONFIG, {url: window.location.href}).then(res => {
      if (res.data.data) {
        let data = res.data.data
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: apiList // 必填，需要使用的JS接口列表
        })
        wx.ready(() => {
          if (options.type == 'share') wxSharingWays(vue, options, callback) // 分享
          else if (options.type == 'locationAndShare') {
            wxSharingWays(vue, options, callback) // 分享
            wxGetLocation(vue, callback) // 获取地理位置
          }
        })
        wx.error(res => {
          location.reload()
        })
      } else {
        this.__toast(res.data.errorMsg)
      }
    }).catch(err => {
      console.log(err)
      throw new Error(err)
    })
  }
}
function wxSharingWays (vue, options, callback) {
  let wx = vue.$wechat
  wx.onMenuShareTimeline({ // 朋友圈
    title: options.title, // 分享标题
    link: options.shareUrl || window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: options.imgUrl, // 分享图标
    success: function () {
      // alert('朋友圈分享成功')
      if (callback) callback()
    },
    cancel: function () {}
  })
  wx.onMenuShareAppMessage({ // 微信好友
    title: options.title,
    link: options.shareUrl || window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: options.imgUrl, // 分享图标
    desc: options.desc, // 分享描述
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      // alert('微信好友分享成功')
      if (callback) callback()
    },
    cancel: function () {}
  })
}
function wxGetLocation (vue, callback) {
  let wx = vue.$wechat
  wx.getLocation({ // 获取地理位置
    success: function (res) {
      let location = res.latitude + ',' + res.longitude // 纬度+经度
      vue.axios.post(I_GET_LOCATION, {location: location}).then(res => {
        if (res.data.status) {
          if (callback) callback(res.data.data)
        } else {
          this.__toast(res.data.errorMsg)
        }
      }).catch(err => {
        console.log(err)
        throw new Error(err)
      })
    },
    cancel: function (res) {
      alert('用户拒绝授权获取地理位置')
    }
  })
}
export default {
  wxConfigSDk
}
