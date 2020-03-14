import Vue from 'vue'

/**
 * 金额数据处理
 * 保留两位小数
 * @param value 调用过滤器时，调用的文本
 */
Vue.filter('priceValue', function (value) {
  if(!value)  return '0.00'
  let result = parseFloat(value)
  if(Number.isInteger(result)) {
    return result
  }
  return result.toFixed(2)
});

/**
 * 时间处理
 * 保留两位小数
 * @param value 调用过滤器时，调用的文本
 */
Vue.filter('time', function (value) {
  if(!value)  return ''

  // value 不是时间格式，直接返回
  if(value.indexOf(":") === -1) {
    return value
  }

  let result = ''
  const arr = value.split(':')
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] < 10) {
      result += ':0'+arr[i]
    } else {
      result += ':'+arr[i]
    }
  }

  // 去除前导的 ':'
  return result.substr(1)
});