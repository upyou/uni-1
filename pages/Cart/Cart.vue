<template>
	<view class="cart">
		<view v-if="store.cart.length !== 0">
			<my-settle></my-settle>
			<my-address></my-address>
			<view class="cart-title">
				<uni-icons type="shop" size="30" class="cart-title-icon"></uni-icons>
				<text>购物车</text>
			</view>
		
			<uni-swipe-action>
				<view v-for="(item,i) in store.cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="store.swipeCilck(item)">
						<view class="goods-item">
							<view class="goods-item-left">
								<radio @click="store.radioClick(i)" :checked="item.goods_state" color="#C00000" />
								<image :src="item.goods_small_logo || '' " mode=""></image>
							</view>
							<view class="goods-item-right">
								<view class="goods-item-goods_name" style="font-size: 13px;">
									{{item.goods_name}}
								</view>
								<view class="goods-info-box">
									<view class="goods-item-price">
									￥{{item.goods_price.toFixed(2)}}
									</view>
									<uni-number-box :value="item.goods_count" :min="1" @change="(value)=>store.countChange(value,item)"/>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>
		<view class="empty-cart" v-else>
			<text>购物车空空如也</text> 
		</view>
	</view>	
</template>

<script>
	import { storeToRefs } from 'pinia'
import { useCartStore } from '../../store/cart'
	const store = useCartStore()
	const { setTotal } = storeToRefs(store)
	export default {
		data() {
			return {
				store:store,
				options:[
					{
						text:'删除',
						style:{
							 backgroundColor: '#C00000'
						}
					}
				]
			}
		},
		methods: {
		},
		watch:{
			setTotal(){
				store.setBadge()
			}
		}
	}
</script >

<style lang="scss">
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	text{
		margin-left:10px ;
	}
}
.goods-item{
		display: flex;
		border-bottom: 1px solid #efefef;
		.goods-item-left{
			display: flex;
			justify-content: center;
			align-items: center;
			padding-left:6px ;
			image{
				width: 120px;
				height: 120px;
				margin-right: 20px;
				padding: 10px;
			}
		}
		.goods-item-right{
			display: flex;
			flex-direction: column;
			justify-content:space-around;
			.goods-info-box{
				.goods-item-price{
				color: red;
				}
			}
		}
}
.cart{
	width: 100%;
	height: 100%;
	.empty-cart{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		height: 667px;
		justify-content: center;
		align-items: center;
	}
}

</style>
