//  将一个字符串首字母大写
export let firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('')

//  类型判断函数的生成函数，可以生成 isArray, isFunction 等等
export let is = function (type) {
  return function (target) {
    return ({}).toString.call(target) === `[object ${firstUpperCase(type)}]`
  }
}

//  判断一个对象是否是数组
export let isArray = Array.isArray || is('array')

export let isObject = is('object')

export let isDate = is('date')

/**
 * 判断一个参数是否已经是“最基础的”，
 * 这里基础包括null、基础类型、正则表达式、字符串等，一般不再允许操纵它内部再小料度的东西。
 * 字符串虽然可以操纵更小粒度，但却不再是当前字符串，所以严格意义上并不视作可操纵内部
 * 注意，对数组进行typeof运算，会得出'object'，而这里是期望如此的
 * @param it  将要作为判断的参数
 */
export let isAtom = it => (typeof it !== 'object' || it === null)
