<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator :url="'/subpkg/goods_detail/goods_detail?id=' + item.goods_id" class="swiper-item">
					<image :src="item.image_src" alt="" />
				</navigator>
			</swiper-item>
		</swiper>

		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" 
			@click="navClick(item.name)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
				<view class="floor-img-box">
					<navigator :url="item.product_list[0].url" class="left">
						<image :src="item.product_list[0].image_src" 
						:style="{width:item.product_list[0].image_width + 'rpx'}" 
						mode="widthFix">
						</image>
					</navigator>
					<view class="rgiht">
						<navigator
						class="rgiht-item" 
						v-for="(item2,i2) in item.product_list" :key="i2"
						:url="item2.url"
						>
							<image
							 v-if="i2 !== 0"
							 :src="item2.image_src" mode="widthFix"
							 :style="{width:item2.image_width + 'rpx'}" >
							 </image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			}
		},
		onLoad() {
			this.getSwiperList(),
			this.getNavList(),
			this.getFoorList()
		},
		methods: {
			async getSwiperList(){
			const {data:res} = await uni.$http.get('/home/swiperdata')
			console.log(res);
			if(res.meta.status!=200){
				return uni.$showMsg()
			}
			this.swiperList = res.message
			},
			async getNavList(){
				const {data:res} = await uni.$http.get('/home/catitems')
				console.log(res);
				if(res.meta.status!=200){
					return uni.$showMsg()
				}
				this.navList = res.message
			},
			navClick(item){
				if(item === '分类'){
					uni.switchTab({
						url:'/pages/Cate/Cate'
					})
				}
			},
			async getFoorList(){
				const {data:res} = await uni.$http.get('/home/floordata')
				console.log(res);
				if(res.meta.status!=200){
					return uni.$showMsg()
				}
				res.message.forEach(floor =>{
					floor.product_list.forEach(prod=>{
						prod.url = "/subpkg/goods_list/goods_list?" + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item{
		image{
			width: 100%;
		}
	}
}
.nav-list{
	display: flex;
	justify-content: space-around;
	margin: 15rpx 0;
	.nav-item image{
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-list{
	.floor-title{
		width: 100%;
		height: 60rpx;
	}
	.floor-img-box{
		display: flex;
		padding-left: 10rpx;
		
		.rgiht{
			justify-content: space-around;
			display: flex;
			flex-wrap: wrap;
			.rgiht-item{
				
			}
	}
	}
	
}
</style>
