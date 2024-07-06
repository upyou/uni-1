<template>
	<view>
		<view class="scroll-view-container">
			<view class="left">
				<scroll-view
				show-scrollbar="true"
				scroll-y="true" :style="{height: wh + 'px'}" 
				class="left-scroll"
				>
					<block v-for="(itme,i) in cateList" :key="i">
						<view :class="['left-item',i === active ? 'active' : '']"
					    @click="onClickChange(i)">
							{{itme.cat_name}}
						</view>
					</block>
				</scroll-view>
			</view>
			
			<view class="rgiht">
				<scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
					<view v-for="(item,i) in cateListl2" :key="i">
						<view class="rgiht-item-title">{{item.cat_name}}</view>
						<view class="rgiht-item-list">
							<view class="rgiht-item-list-item" v-for="(item2,i2) in item.children" :key="i2" @click="gotoGoodsList(item2)">
								<image :src="item2.cat_icon" mode="widthFix"></image>
								<text>{{item2.cat_name}}</text>
							</view>
						</view>
						
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0,
				cateList:[],
				active:0,
				cateListl2:[],
				scrollTop:0
			}
		},
		onLoad() {
		this.getSystemInfo()
		this.getCateList()
		},
		methods: {
			async getCateList(){
				const {data:res} = await uni.$http.get('/categories')
				console.log(res.message);
				this.cateList = res.message
				this.cateListl2 = res.message[0].children
			},
			async getSystemInfo(){
				const wh = await uni.getSystemInfo()
				this.wh = wh.windowHeight
			},
			onClickChange(i){
				this.active = i
				this.cateListl2 = this.cateList[i].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
					}
				)
			}
		},
		
	}
</script>

<style lang="scss">
.scroll-view-container{
	width: 100%;
	display: flex;
	.left{
		.left-scroll{
			width: 200rpx;
			.left-item{
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px
			}
			.active{
				background-color: #fff;
				position: relative;
				&::before{
					content: '';
					position: absolute;
					width: 3px;
					height: 30px;
					background-color: red;
					display: block;
					top: 50%;
					left: 0;
					transform:translateY(-50%)
				}
			}
		}
	}
	
}
.rgiht{
	width: 100%;
	.rgiht-item-title{
		width: 100%;
		text-align: center;
		font-size: 12px;
		font-weight: bold;
		padding: 15px 0px;
	}
	.rgiht-item-list{
		display: flex;
		flex-wrap: wrap;
			
		.rgiht-item-list-item{
			display: flex;
			width: 33.33%;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
				image{
				width: 60px;
				height: 60px;
			}
				text{
					font-size: 12px
				}
		}
		
	}
}

</style>
