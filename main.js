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
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import {
	$http
} from '@escook/request-miniprogram'
import pinia from './store/store'
import tabBadge from './mixins/tab.js'
import {
	useCartStore
} from './store/cart'
import {
	watch
} from 'vue'
import {
	useUserStore
} from './store/user'
export function createApp() {
	const app = createSSRApp(App)
	app.use(pinia)
	app.mixin(tabBadge)
	const store = useCartStore()
	const ustore = useUserStore()
	uni.$http = $http
	watch(store.setTotal, (n, o) => {
		store.setBadge()
	})
	$http.beforeRequest = function(options) {
		wx.showLoading({
			title: '数据加载中...',
		})
		if (options.url.indexOf('/my') !== -1) {
			options.header = {
				Authorization: ustore.token
			}
		}
	}

	$http.afterRequest = function() {
		// do something...
		wx.hideLoading()
	}

	uni.$showMsg = function(title = '请求失败', duration = 1500) {
		uni.showToast({
			title,
			duration,
			icon: 'error'
		})
	}
	$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'

	return {
		app
	}
}
// #endif