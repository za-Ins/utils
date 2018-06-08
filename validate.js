export default {
  /**
    [isEmpty 检查是否为空]
    @params {[number | string]} val [验证的值]
    @return Booleans(true or false)
  **/
  isEmpty: function (val) {
    if (val.trim().length <= 0) {
      return true
    }
    return false
  },
  /**
    [isEmail 检查邮箱是否正确]
    @params {[string]} email [邮箱地址]
    @return Booleans
  **/
  isEmail: function (email) {
    var reg = new RegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)
    if (reg.test(email)) {
      return true
    }
    return false
  },
  /**
   * [isEqual 两个值是否相等]
   * @param  {[number],[string]}  val1,val2[验证的值]
   * @return {Boolean}
   */
  isEqual: function (val1, val2) {
    return val1 === val2
  },
  /**
   * [isPhone 验证手机号]
   * @param  {[string]}  phone [手机号]
   * @return {Boolean}
   */
  isPhone: function (phone) {
    var reg = new RegExp(/^1[3|4|5|7|8]\d{9}$/)
    return reg.test(phone)
  },
  /**
   * [isNum 是否是数字]
   * @param  {[number]}  val [验证的值]
   * @return {Boolean}
   */
  isNum: function (val) {
    var reg = new RegExp(/^[0-9]*.$/)
    return reg.test(val)
  },
  /**
   * [isNum 密码]
   * @param  {[string]}  pwd [验证的值:数字和字母,6-16位]
   * @return {Boolean}
   */
  isPwd: function (pwd) {
    var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)
    return reg.test(pwd)
  },
  /**
   * [isName 姓名]
   * @param  {[string]}  name [验证的值:数字和字母,6-20位]
   * @return {Boolean}
   */
  isName: function (name) {
    var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/)
    return reg.test(name)
  }
}
