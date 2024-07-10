<template>
	<view class="my-container">
		<view class="top-box">
			<image :src="store.avatar" class="avatar"></image>
			<text class="username">
				666
			</text>
		</view>
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item" v-for="(item,i) in panelBody" :key="i">
						<text>{{item.count}}</text>
						<text>{{item.text}}</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<text class="panel-title">我的订单</text>
				<view class="panel-body">
					<view class="panel-item" v-for="(item,i) in panelBody2" :key="i">
						<image :src="item.image" class="icon"></image>
						<text>{{item.text}}</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-item-list" v-for="(item,i) in panelBody3 " :key="i" @click="Exit(item)">
					<text class="text">{{item.text}}</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		useUserStore
	} from '../../store/user';
	const store = useUserStore()
	export default {
		name: "my-userInfo",
		data() {
			return {
				store: store,
				panelBody: [{
						count: 8,
						text: '收藏的店铺'
					},
					{
						count: 14,
						text: '收藏的商品'
					},
					{
						count: 18,
						text: '关注的商品'
					},
					{
						count: 84.,
						text: '足迹'
					}
				],
				panelBody2: [{
					image: '../../static/my-icons/icon1.png',
					text: '待付款'
				}, {
					image: '../../static/my-icons/icon2.png',
					text: '待收货'
				}, {
					image: '../../static/my-icons/icon3.png',
					text: '退款/退货'
				}, {
					image: '../../static/my-icons/icon4.png',
					text: '全部订单'
				}],
				panelBody3: [{

					text: '收货地址'
				}, {

					text: '联系客服'
				}, {

					text: '退出登录'
				}]
			};
		},
		methods: {
			Exit(i) {
				if (i.text === '退出登录') {
					uni.showModal({
						content: '确定要退出吗？',
						success(e) {
							if (e.confirm) {
								store.clearUserInfo()
							}
						},
					})

				}
			}
		}
	}
</script>

<style lang="scss">
	.my-container {
		height: 100%;
		background-color: #f4f4f4;

		.top-box {
			height: 400rpx;
			background-color: red;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.avatar {
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid #fff;
				box-shadow: 0 1px 5px black;
			}

			.username {
				margin-top: 10px;
				color: white;
			}
		}

		.panel-list {
			position: relative;
			top: -10px;
			width: 90%;
			margin: auto;


			.panel {
				background-color: #fff;
				border-radius: 4px;
				margin-bottom: 8px;

				.panel-item-list {

					display: flex;
					padding: 5px;
					height: 35px;
					line-height: 35px;

					.text {
						flex: 1;
					}

				}

				.panel-title {
					display: block;
					height: 45px;
					line-height: 45px;
					font-size: 15px;
					border-bottom: 1px solid #f4f4f4;
					margin-left: 5px;
				}

				.panel-body {
					height: 60px;
					border-radius: 8px;
					display: flex;
					justify-content: space-around;
					padding: 0 10px;

					.panel-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						font-size: 13px;

						.icon {
							width: 35px;
							height: 35px;
						}
					}
				}
			}
		}

	}
</style>