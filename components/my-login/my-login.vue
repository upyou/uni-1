<template>
	<view class="login">
		<uni-icons type="person" size="100" color="#AFAFAF"></uni-icons>
		<button type="warn" open-type="chooseAvatar" @chooseavatar="chooseavatar">一键登录</button>
		<text>登录后享受更多权益</text>
	</view>
</template>

<script>
	import {
		useUserStore
	} from '../../store/user';
	const store = useUserStore()
	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	export default {
		name: "my-login",
		data() {
			return {
				avatarUrl: defaultAvatarUrl
			}
		},
		methods: {
			async chooseavatar(e) {
				const {
					avatarUrl
				} = e.detail
				this.avatarUrl = avatarUrl
				store.setAvatarUrl(avatarUrl)
				if (avatarUrl) {
					this.getUserInfo()
				}
			},
			async getUserInfo() {
				uni.getUserProfile({
					desc: '登录',
					success(e) {
						console.log(e);
					}
				})
				const res = await uni.login()
				const query = {
					code: res.code,
					encryptedData: store.userInfo.encryptedData,
					iv: store.userInfo.iv,
					rawData: store.userInfo.rawData,
					signature: store.userInfo.signature
				}
				const {
					data: login
				} = await uni.$http.post('/users/wxlogin', query)
				if (login.meta.status) {
					store.setToken(
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
					)
					uni.showToast({
						icon: 'success',
						title: '登陆成功'
					})
					if (store.redirect && store.redirect.openType === 'switchTab') {
						uni.switchTab({
							url: store.redirect.from
						})
						store.redirectInfo({})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 750rpx;
		position: relative;
		overflow: hidden;
		background-color: #f8f8f8;

		button {
			width: 90%;
			border-radius: 50px;
			margin: 10px;
		}

		image {
			width: 100px;
			height: 100px;
		}

		text {
			font-size: 12px;
			color: gray;
		}

		&::after {
			content: ' ';
			display: block;
			width: 100%;
			height: 50px;
			border-radius: 100%;
			background-color: #fff;
			position: absolute;
			bottom: 0;
			left: 0;
			transform: translateY(50%);
		}
	}
</style>