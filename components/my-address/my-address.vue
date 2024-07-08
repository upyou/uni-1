<template>
	<view>
		<view class="address" v-if="JSON.stringify(address) === '{}'" @click="setAddress">
			<view class="address-text">
				请选择收货地址
			</view>
			<image src="../../static/cart_border@2x.png" mode=""></image>
		</view>
		<view class="address-info" @click="setAddress" v-else>
			<view class="row1">
				<view class="left">
					收货人:{{address.userName}}
				</view>
				<view class="right">
					<view class="phone">
						电话:{{address.telNumber}}
						<uni-icons type="right" size="16"></uni-icons>
					</view>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址:
				</view>
				<view class="row2-rgiht">
					{{address.provinceName+address.cityName+address.countyName+address.detailInfo}}
				</view>
			</view>
			<image src="../../static/cart_border@2x.png" mode=""></image>
		</view>
	</view>
</template>

<script>
import { useUserStore } from '../../store/user';
const store = useUserStore()
	export default {
		name:"my-address",
		data() {
			return {
				store:store,
				address: store.address || {}
			};
		},
		methods:{
			async setAddress(){
				const res = await uni.chooseAddress()
				this.store.setUserAddress(res)
				this.address = this.store.address
			}
		}
	}
</script>

<style lang="scss">
.address{
	height: 60px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.address-text{
		flex: 1;
		text-align: center;
		line-height: 55px;
	}
	image{
		display: block;
		width: 100%;
		height: 5px;
	}
}
.address-info{
	padding: 10px 0;
	font-size: 14px;
	image{
		display: block;
		width: 100%;
		height: 5px;
		margin-top: 10px;
	}
	.row1{
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		padding: 5px;
	}
	.row2{
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		padding: 5px;
		.row2-rgiht{
			white-space: nowrap;
		}
	}
}
</style>