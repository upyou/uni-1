<template>
	<view v-if="goodsInfo.goods_name" style="padding-bottom: 50px;">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,i) in goodsInfo.pics">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box">
			<view class="price">
				￥{{goodsInfo.goods_price}}
			</view>
			<view class="goods-info-body">
				<view class="goods-info-name">
					{{goodsInfo.goods_name}}
				</view>
				<view class="goods-info-icon">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yun">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<view class="goods-carts">
					<uni-goods-nav 
					:options="options" :fill="true" 
					:button-group="buttonGroup" @click="onClick"
					@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				goodsInfo:{},
				options: [
					{
						icon:'shop',
						text:'店铺'
					},
					{
						icon:'cart',
						text:'购物车',
						info:0
					}
				],
				buttonGroup:[
					{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
			}
				
		},
		onLoad(option) {
			this.id = option.goods_id
			this.getGoodsDetail()
		},
		methods: {
			async getGoodsDetail(){
				const {data:res} = await uni.$http.get('/goods/detail?goods_id='+ this.id)
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"').replace(/webp/g, 'jpg')
				this.goodsInfo = res.message
			},
			preview(i){
				uni.previewImage({
					current:i,
					urls:this.goodsInfo.pics.map(i => i.pics_big)
				})
			},
			onClick(e){
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/Cart/Cart'
					})
				}
			}
		
		}
	}
</script>

<style lang="scss">
swiper{
	height: 750rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.goods-info-box{
	padding: 6px;
	.price{
		font-size: 18px;
		color: red;
		margin: 8px;
	}
	.goods-info-body{
		display: flex;
		justify-content: space-between;
		.goods-info-name{
			font-size: 12px;
			margin-right: 10px;
		}
		.goods-info-icon{
			width: 120px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-left: 1px solid #e7e7e7;
			color: gray;
		}
	}
	.yun{
		font-size: 12px;
		margin: 10px 0;
		color: gray;
	}
}
.goods-carts{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
