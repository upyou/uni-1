import {
	defineStore
} from "pinia";
export const useCartStore = defineStore('cart', {
	state: () => ({
		cart: []
	}),
	actions: {
		addCart(goods) {
			const item = this.cart.find(i => i.goods_id === goods.goods_id)
			if (!item) {
				this.cart.push(goods)
			} else {
				item.goods_count++
			}
		},
		setBadge() {
			if (this.setTotal !== 0) {
				uni.setTabBarBadge({
					index: 2,
					text: this.setTotal + ''
				})
			}
		},
		radioClick(i) {
			this.cart[i].goods_state = !this.cart[i].goods_state
		},
		countChange(v, i) {
			const item = this.cart.find(x => x.goods_id === i.goods_id)
			if (item) {
				item.goods_count = v
			}
		},
		swipeCilck(i) {
			this.cart = this.cart.filter(x => x.goods_id !== i.goods_id)
		},
		setChecked(check) {
			this.cart.forEach((item, i) => item.goods_state = check)
		},
		clearCart() {
			this.cart = []
		}
	},
	getters: {
		setTotal() {
			return this.cart.reduce(function(prev, cur) {
				return cur.goods_count + prev;
			}, 0);
		},
		checkedCount() {
			return this.cart.filter(x => x.goods_state).reduce((total, item) => {
				return total + item.goods_count
			}, 0);
		},
		checkedCountPrice() {
			return this.cart.filter(x => x.goods_state).reduce((total, item) => {
				return total + item.goods_price * item.goods_count
			}, 0).toFixed(2);
		}
	},
	persist: {
		storage: {
			getItem: uni.getStorageSync,
			setItem: uni.setStorageSync
		}
	}
})