<template>
	<view class="my-search-container" @click="searchBox">
		<view class="my-search-box" >
			<uni-icons type="search" class="my-search-icon"></uni-icons>
			<text>搜索</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchBox(){
				this.$emit('click')
			}
		}	
	}
</script>

<style lang="scss">
.my-search-container{
	width: 100%;
	height: 60px;
	background-color: red;
	display: flex;
	align-items: center;
	.my-search-box{
		height: 35px;
		margin: auto;
		line-height: 35px;
		border-radius: 15px;
		width: 90%;
		background-color: #fff;
		text-align: center;
		.my-search-icon{
			margin-right: 5px;
		}
	}
}
</style>