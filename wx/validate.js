const MOBILE_REG = /^1[3|4|5|7|8]\d{9}$/,
      EMAIL_REG = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
      MONEY_REG = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
      NAME_REG = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/,
      CHINESE_REG = /^[\u4e00-\u9fa5]+$/,
      BANKNO_REG=/^([1-9]{1})(\d{15}|\d{18})$/,
      PWD_REG = /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/,
      INTEGER_REG =  /^[0-9]\d*$/,
      ENGNUMBER_REG = /[0-9a-zA_Z]+$/;

function isRule(regText, value) {
  if (!value || value.length == 0)
    return true

  const reg = new RegExp(regText)
  //console.log(reg.test(value));
  //console.log(value);
  if (!reg.test(value)) {
    return false
  }
  return true
}

module.exports = {
  trimStr: (str) => {
    return str ? str.replace(/(^\s*)|(\s*$)/g, "") : ''
  },
  isFromWeixin: () => {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  },
  isUserLogin: (val) => {
    if (val.length <10) {
      return false
    }
    return isRule(ENGNUMBER_REG, val)
  },
  isUser: (val) => {
    if (val.length <10 || val.length >25 ) {
      return false
    }
    return isRule(ENGNUMBER_REG, val)
  },
  isUserPwd: (val) => {
    if (val.length <5 || val.length >13 ) {
      return false
    }
    return isRule(ENGNUMBER_REG, val)
  },
  isEngNumber: (val) => {
    return isRule(ENGNUMBER_REG, val)
  },
  isIos(){
    let userAgent= navigator.userAgent;
    let IsiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return IsiOS;
  },
  isMobile: (mobile) => {
    return isRule(MOBILE_REG, mobile)
  },

  isEmail: (email) => {
    return isRule(EMAIL_REG, email)
  },

  isMoney: (money) => {
    return isRule(MONEY_REG, money)
  },

  isUsername: (name) => {
    return isRule(NAME_REG, name)
  },
  isChinese: (name) => {
    return isRule(CHINESE_REG, name)
  },
  isBankNo: (name) => {
    return isRule(BANKNO_REG, name)
  },

  isNotEmpty: (data) => {
    return data && (data.length > 0)
  },

  isPwd: (pwd) => {
    return isRule(PWD_REG, pwd)
  },
  isSame: (data1, data2) => {
    return data1 === data2
  },
  isIdCard: (card) => {
    if (!card) return true;
    var num = card.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/^\d{17}([0-9]|X)$/.test(num))) {
      return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    var birthday,sex;
    len = num.length;
    if (len == 18) {
      //获取出生日期
      birthday = card.substring(6, 10) + "-" + card.substring(10, 12) + "-" + card.substring(12, 14);
      //获取性别
      sex = parseInt(card.substr(16, 1)) % 2 == 1 ? 'M' : 'F';

      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      var arrSplit = num.match(re);

      //检查生日日期是否正确
      var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
        return false;
      } else {
        //检验18位身份证的校验码是否正确。
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var valnum;
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0,
          i;
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[nTemp % 11];
        if (valnum != num.substr(17, 1)) {
          return false;
        }
      }
    }
    return {
      birthday: birthday,
      sex: sex
    }
  },
  ispassport (e) { //护照
    let pattern = new RegExp('^[a-zA-Z0-9]{7,20}$')
    return pattern.test(e)
  },
  isSolider (e) { // 士兵证
    let pattern = new RegExp('[\u4e00-\u9fa5_a-zA-Z0-9]{10,18}$');
    return pattern.test(e)
  },
  isBack (e) { // 回乡证
    let pattern = new RegExp('^[a-zA-Z0-9]{10,20}$')
    return pattern.test(e)
  },
  isTw (e) { // 台胞证
    let pattern = new RegExp('^[a-zA-Z0-9]{10,20}$');
    return pattern.test(e)
  },
  isBorn (e) {// 出生证
    let pattern = new RegExp('^[A-Za-z][0-9]{9}$')
    return pattern.test(e)
  },
  isInteger: (value)=>{
    return isRule(INTEGER_REG,value);
  },
  isName: (value) => {
    if(!value){
      return
    }
    let va = value.replace(/(^\s*)|(\s*$)/g, "")
    let pattern = new RegExp('^([\u4e00-\u9fa5\s,，、·]{2,10}$|^[A-Za-z\s,，·、\s]{4,20})*$');
    if (!va || va.length < 2 || va.length > 20) {
      return false
    } else if(pattern.test(va)) {
      return true
    } else {
      return false
    }
  }
}
