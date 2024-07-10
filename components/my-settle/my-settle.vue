<template>
	<view class="my-settle">
		<label class="radio">
			<radio @click="store.setChecked(!isFullChecked)" :checked="isFullChecked" color="#C00000" /><text>全选</text>
		</label>

		<view class="amount-box">
			<view class="amount">
				合计: <text style="color: red;font-weight: bold;">￥{{store.checkedCountPrice}}</text>
			</view>
		</view>

		<view class="btn-settle" @click="settlement">
			提交({{store.checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		storeToRefs
	} from 'pinia';
	import {
		useCartStore
	} from '../../store/cart';
	import {
		useUserStore
	} from '../../store/user';
	const store = useCartStore()
	const ustore = useUserStore()
	const {
		checkedCount
	} = storeToRefs(store)
	export default {
		name: "my-settle",
		data() {
			return {
				store: store,
				checkedCount: checkedCount,
				ustore: ustore
			};
		},
		computed: {
			isFullChecked() {
				return this.store.setTotal === this.store.checkedCount
			}
		},
		watch: {
			checkedCount() {
				store.setBadge()
			}
		},
		methods: {
			settlement() {
				if (store.checkedCount === 0) return uni.showToast({
					title: '请选择要结算的商品',
					icon: 'none'
				})
				if (ustore.addr === '') return uni.showToast({
					title: '请选择收货地址',
					icon: 'none'
				})
				if (ustore.token === '') {
					const redirect = {
						openType: 'switchTab',
						from: '/pages/Cart/Cart'
					}
					ustore.redirectInfo(redirect)
					uni.switchTab({
						url: '/pages/My/My'
					})
					return uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
				}
				this.payOrder()

			},
			async payOrder() {
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: ustore.addr,
					goods: store.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))
				}
				const {
					data: res
				} = await uni.$http.post('/my/orders/create', orderInfo)
				const orderNumber = res.message.order_number
				console.log(orderNumber);
				const {
					data: res2
				} = await uni.$http.post('/my/orders/req_unifiedorder', {
					order_number: orderNumber
				})
				console.log(res2);
				if (res2.message.pay) {
					uni.showToast({
						icon: 'success',
						title: '购买成功'
					})
					store.clearCart()
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-settle {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		justify-content: space-between;
		align-items: center;
		padding: 0 5px;

		.btn-settle {
			width: 100px;
			text-align: center;
			line-height: 50px;
			background-color: #C00000;
			color: white;
		}
	}
</style>