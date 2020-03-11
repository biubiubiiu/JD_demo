import Vue from 'vue'

/**
 * 金额数据处理
 * 保留两位小数
 * @param value 调用过滤器时，调用的文本
 */
Vue.filter('priceValue', function (value) {
  if(!value)  return ''
  let result = parseFloat(value)
  if(Number.isInteger(result)) {
    return result
  }
  return result.toFixed(2)
});