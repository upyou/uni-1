<template>
	<view class="my-container">
		<my-login v-if="store.token === ''"> </my-login>
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import {
		useUserStore
	} from '../../store/user'
	const store = useUserStore()
	export default {
		data() {
			return {
				store: store
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page,
	.my-container {
		height: 100%;
	}
</style>