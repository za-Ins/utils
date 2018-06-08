/**
 * cookie的处理对象
 * 假如想向document.cookie里面加入一个叫planId的cookie, 值是'PN23'
 * 那么可以用这样的简写方式： cookie.planId = 'PN23'
 * 获取planId用 cookie.planId
 * 删除planId用 delete planId
 * 也可以用全写 cookie.set(key, value [,options]), cookie.get(key), cookie.remove(key)
 */

//  Thanks to:
//  - https://github.com/MoeKit/cookie
//  - http://www.nczonline.net/blog/2009/05/05/http-cookies-explained/
//  - http://developer.yahoo.com/yui/3/cookie/

let isNonEmptyString = s => typeof s === 'string' && s.length > 0
const cookie = {
  set (name, value, {expires, domain, path, secure} = {}) {
    console.assert(typeof value === 'string', '设置cookie时，值应是字符串')
    let text = name + '=' + encodeURIComponent(value)

    let date = expires
    if (typeof date === 'number') {
      date = new Date()
      date.setDate(date.getDate() + expires)
    }
    if (date instanceof Date) {
      text += '; expires=' + date.toUTCString()
    }

    if (isNonEmptyString(domain)) {
      text += '; domain=' + domain
    }

    if (isNonEmptyString(path)) {
      text += '; path=' + path
    }

    if (secure) {
      text += '; secure'
    }

    document.cookie = text
    return text
  },
  get (name) {
    for (let part of document.cookie.split(/;\s/)) {
      let [key, value = ''] = part.split('=')
      if (name === key) {
        return decodeURIComponent(value)
      }
    }
  },
  remove (name) {
    return this.set(name, '', {expires: new Date(0)})
  }
}
export default cookie
// export default new Proxy(cookie, {
//   set (target, key, value) {
//     return target.set(key, value)
//   },
//   get (target, key) {
//     return target.get(key)
//   },
//   deleteProperty (target, key, receiver) {
//     return target.remove(key)
//   }

// })
