import { defineStore } from "pinia";
export const useUserStore = defineStore('user',{
	state:()=>({
		address:{}
	}),
	actions:{
		setUserAddress(i){
			this.address = i
		}
	},
	persist:{
		storage:{
			getItem:uni.getStorageSync,
			setItem:uni.setStorageSync
		}
	}
})