import {
	defineStore
} from "pinia";
export const useUserStore = defineStore('user', {
	state: () => ({
		address: {},
		addr: '',
		token: '',
		userInfo: {},
		avatar: '',
		redirect: {}
	}),
	actions: {
		setUserAddress(address) {
			this.address = address
			this.addr = address.provinceName + address.cityName + address.countyName + address.detailInfo
		},
		setUserInfo(user) {
			this.userInfo = user
		},
		setToken(token) {
			this.token = token
		},
		setAvatarUrl(avatarUrl) {
			this.avatar = avatarUrl
		},
		clearUserInfo() {
			this.addr = ''
			this.address = {}
			this.token = ''
			this.userInfo = {}
			this.avatar = ''
		},
		redirectInfo(info) {
			this.redirect = info
		}
	},
	persist: {
		storage: {
			getItem: uni.getStorageSync,
			setItem: uni.setStorageSync
		}
	}
})