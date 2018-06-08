export const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
export const isFirefox = typeof InstallTrigger !== 'undefined';
// Safari 3.0+ "[object HTMLElementConstructor]"
export const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] ||     safari.pushNotification);
// 是否是IOS系统
export const isIOS = navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad');
// 获取IOS系统版本
export const IOSVer = navigator.userAgent.match(/\d[\d]*_\d[_\d]*/i) && parseFloat(navigator.userAgent.match(/\d[\d]*_\d[_\d]*/i)[0].split('_').join('.'));
// Internet Explorer 6-11
export const isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
export const isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
export const isChrome = !!window.chrome;
// Blink engine detection
export const isBlink = (isChrome || isOpera) && !!window.CSS;