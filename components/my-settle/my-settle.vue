<template>
	<view class="my-settle">
		<label class="radio">
			<radio @click="store.setChecked(!isFullChecked)" 
			:checked="isFullChecked" color="#C00000" /><text>全选</text>
		</label>
		
		<view class="amount-box">
			<view class="amount">
				合计: <text style="color: red;font-weight: bold;">￥{{store.checkedCountPrice}}</text>
			</view>
		</view>
		
		<view class="btn-settle">
			提交({{store.checkedCount}})
		</view>
	</view>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useCartStore } from '../../store/cart';
const store = useCartStore()
const {checkedCount} = storeToRefs(store)
	export default {
		name:"my-settle",
		data() {
			return {
				store:store,
				checkedCount:checkedCount
			};
		},
		computed:{
			isFullChecked(){
				return this.store.setTotal === this.store.checkedCount
			}
		},
		watch:{
			checkedCount(){
				store.setBadge()
			}
		}
	}
</script>

<style lang="scss">
	
.my-settle{
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px;
	.btn-settle{
		width: 100px;
		text-align: center;
		line-height: 50px;
		background-color: #C00000;
		color: white;
	}
}
</style>