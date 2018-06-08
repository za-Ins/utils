import env from 'src/utils/env';
import {browserHistory} from 'react-router';

module.exports = {

    jsGetAge :  function(strBirthday){
        if(!strBirthday){
          return null;
        }
        let returnAge;
        let strBirthdayArr=strBirthday.split("-");
        let birthYear = strBirthdayArr[0];
        let birthMonth = strBirthdayArr[1];
        let birthDay = strBirthdayArr[2];

        let d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();

        if(nowYear == birthYear) {
          returnAge = 0;//同年 则为0岁
        } else {
          let ageDiff = nowYear - birthYear ; //年之差
          if(ageDiff > 0) {
            if(nowMonth == birthMonth) {
              let dayDiff = nowDay - birthDay;//日之差
              if(dayDiff < 0) {
                returnAge = ageDiff - 1;
              } else {
                returnAge = ageDiff ;
              }
            } else {
              let monthDiff = nowMonth - birthMonth;//月之差
              if(monthDiff < 0) {
                returnAge = ageDiff - 1;
              } else {
                returnAge = ageDiff ;
              }
            }
          } else {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
          }
        }
        return returnAge;//返回周岁年龄

  },
    jsGetAgeCodey :  function(strBirthday){
        if(!strBirthday){
            return null;
        }
        let returnAge;
        let strBirthdayArr=strBirthday.split("-");
        let birthYear = strBirthdayArr[0];
        let birthMonth = strBirthdayArr[1];
        let birthDay = strBirthdayArr[2];

        let d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();

        if(nowYear == birthYear) {
            returnAge = 0;//同年 则为0岁
        } else {
            let ageDiff = nowYear - birthYear ; //年之差
            if(ageDiff > 0) {
                if(nowMonth == birthMonth) {
                    let dayDiff = nowDay - birthDay;//日之差
                    if(dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
                else {
                    let monthDiff = nowMonth - birthMonth;//月之差
                    if(monthDiff < 0) {
                        returnAge = ageDiff ;
                    } else {
                        returnAge = ageDiff ;
                    }
                }
            } else {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge;//返回周岁年龄

    },

  chineseDateFormat: function(date){
      console.log(date);
        let _date = date.replace('年','-').replace('月','-').replace('日','');
        let dateArr = _date.split('-');
        if(dateArr[1]<10){
            dateArr[1] = '0'+ dateArr[1];
        }
        if(dateArr[2]<10){
            dateArr[2] = '0'+ dateArr[2];
        }
        _date = dateArr.join('-');
        return _date;
  },

  handleDate: function(y, d){
      let newDate = new Date();
      let year = newDate.getFullYear();
      let month = newDate.getMonth()+1;
      let day = newDate.getDate();
      if (typeof d != "undefined") {
        let newDate1 = new Date(newDate-d*24*3600*1000);
        year = newDate1.getFullYear();
        month = newDate1.getMonth()+1;
        day = newDate1.getDate();
      }
      if (typeof y!="undefined") {
        year = year-y;
      }
      if (month<10) month="0"+month;
      if (day<10) day="0"+day;

      return year+"-"+month+"-"+day;
  },

  toDecimal2: function(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return '';
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
  },

  returnFloat : function(value){
     var value=Math.round(parseFloat(value)*100)/100;
     var xsd=value.toString().split(".");
     if(xsd.length==1){
     value=value.toString()+".00";
     return value;
     }
     if(xsd.length>1){
     if(xsd[1].length<2){
     value=value.toString()+"0";
     }
     return value;
     }
  },

  erMsgHandler: function(obj){
      obj.errorMsg = [];

      obj.error = function(msg){
          this.errorMsg.push(msg);
      };

      obj.clearError = function(msg){
          if(msg){
              const i = this.errorMsg.findIndex((item)=>{return item==msg});
              if(i>=0){
                  this.errorMsg.splice(i, 1);
              }
          }else{
            this.errorMsg = [];
          }
      };
  },

  hrefTo: function(url){

      browserHistory.push('/' +　env.ROOT_ROUTE_PATH + url);
  },

  hrefToHard: function(url){
      location.href = location.origin + '/' +　env.ROOT_ROUTE_PATH + url;
  },

  getHrefUrl : function(url){
      return location.origin + '/' +　env.ROOT_ROUTE_PATH + url;
  },

  getRouteUrl : function(url){
      return '/' +　env.ROOT_ROUTE_PATH + url;
  },

  getLCalendarUrl: function(){
      if(env.ENVIRONMENT == 'prd'){
          return env.DOMAIN;
      }else{
          return env.DOMAIN +'/'+ env.ENVIRONMENT
      }
  },

  //签名页面URL
  getAnysignUrl: function(){
      if(env.ENVIRONMENT == 'prd'){
          return env.DOMAIN;
      }else{
          return env.DOMAIN +'/'+ env.ENVIRONMENT
      }
  },

  isEmptyObject: function(obj){
    for(let key in obj){
        return false
    }
    return true
  },

    deepCopy: function(oldObj){
        if(oldObj instanceof Array){
            var newObj = [];
            for(var i=0; i<oldObj.length; i++){
                if(typeof(oldObj[i]) !== 'object'){
                    newObj.push(oldObj[i])
                }else{
                    newObj[i] = this.deepCopy(oldObj[i]);
                }
            }
        }else if(oldObj instanceof Object){
            var newObj = {}
            for(var key in oldObj){
                if(typeof(oldObj[key])!=='object'){
                newObj[key] = oldObj[key]
                }else{
                newObj[key] = this.deepCopy(oldObj[key]);
                }
            }
        }
        return newObj;
    },

    extendObj: function(a,b){
        var newA = this.deepCopy(a);
        return Object.assign(newA, b);
    }

}
