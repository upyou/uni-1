<template>
	<view class="goods-list">
		<view class="goods-item" v-for="(item,i) in goodsList" :key="i" @click="gotoGoodsDetail(item)">
			<view class="goods-item-left">
				<image :src="item.goods_small_logo || defaultPic" mode=""></image>
			</view>
			<view class="goods-item-right">
				<view class="goods-item-goods_name" style="font-size: 13px;">
					{{item.goods_name}}
				</view>
				<view class="goods-item-price">
					￥{{item.goods_price.toFixed(2)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:0,
				defaultPic:'',
				isLoading:false
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
			
		},
		onPullDownRefresh() {
			this.goodsList = []
			this.queryObj.pagenum = 1
			this.getGoodsList()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},3000)
		},
		onReachBottom() {
			if(this.isLoading) return
			this.queryObj.pagenum = this.queryObj.pagenum + 1
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
			return uni.showToast({
					title:"加载完毕",
					duration:1500
				})
			 this.getGoodsList()
			 
		},
		methods: {
			async getGoodsList(){
				this.isLoading = true
				const {data:res} = await uni.$http.get('/goods/search',this.queryObj)
				this.total = res.message.total
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.isLoading = false
				console.log(res);
			},
			gotoGoodsDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-list{
	.goods-item{
		display: flex;
		border-bottom: 1px solid #7f7f7f;
		.goods-item-left{
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
			.goods-item-price{
				color: red;
			}
		}
	}
}
</style>
