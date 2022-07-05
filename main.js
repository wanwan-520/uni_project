
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//导入网络请求的包
import { $http } from "@escook/request-miniprogram"

uni.$http = $http

$http.baseUrl = 'http://api-hmugo-web.itheima.net'
// $http.baseUrl = 'https://www.uinav.com'
//商品分类页面列表可以正常使用
// $http.baseUrl = 'http://api-ugo-web.itheima.net'

//请求拦截器
$http.beforeRequest = function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
  
   if (options.url.indexOf('/my/') !== -1) {
      // 为请求头添加身份认证字段
      options.header = {
        // 字段的值可以直接从 vuex 中进行获取
        Authorization: store.state.m_user.token,
      }
    }
}

//响应拦截器
$http.afterRequest = function(){
  uni.hideLoading()
}

//封装弹框的方法
uni.$showMsg = function(title='数据请求失败',duration=2000){
  uni.showToast({
    title:'数据请求失败',
    duration:2000,
    icon:'none'
  })
}
Vue.config.productionTip = false

App.mpType = 'app'
// 1. 导入 store 的实例对象
import store from './store/store.js'
const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif