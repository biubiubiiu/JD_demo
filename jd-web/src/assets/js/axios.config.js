// 设置 axios 拦截器
import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/'

axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.token = 'c1ce3570-63a2-11ea-8274-3745ec932c6a'
  } else {
    config.params = {
      token: 'c1ce3570-63a2-11ea-8274-3745ec932c6a'
    }
  }
  return config;
});

axios.interceptors.response.use((response) => {
  // 统一处理数据
  return response.data.data;
}, (error) => {
  // 处理错误的响应
  return Promise.reject(error);
});

// 绑定到 vue 原型中
Vue.prototype.$http = axios;
