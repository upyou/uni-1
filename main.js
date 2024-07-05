
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import { $http } from '@escook/request-miniprogram'

export function createApp() {
	uni.$http = $http
	
	$http.beforeRequest = function (options) {
	  wx.showLoading({
	    title: '数据加载中...',
	  })
	}
	
	$http.afterRequest = function () {
	  // do something...
	  wx.hideLoading()
	}
	
	uni.$showMsg = function(title = '请求失败',duration = 1500){
		uni.showToast({
			title,
			duration,
			icon:'error'
		})
	}
	$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif