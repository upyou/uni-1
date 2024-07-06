<template>
	<view>
		<uni-search-bar  :focus="true" v-model="kw"  @input="input" @cancel="cancel" @clear="clear" cancelButton='none' radius='10' bgColor='#fff'>
		</uni-search-bar>
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
				<view class="sugg-item-name">
					{{item.goods_name}}
				</view>
				<uni-icons class="sugg-item-icon" type="right" size="16"></uni-icons>
			</view>
		</view>
		<view class="history" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" @click="clears"></uni-icons>
			</view>
			<view class="historyText">
				<view class="tag-view" v-for="(item,i) in historys" :key="i" @click="search(item)">
					<uni-tag :text="item" custom-style="background-color:#f8f8fa; color:#000; font-weight: bold;" />
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				searchResults:[],
				historyList:[]
			}
		},
		onLoad() {
				this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(async ()=>{
					this.kw = e
					console.log(e);
					this.getSearch()	
					this.historyList.push(e)				
					this.saveHistoryList()
				},500)
			},
			async getSearch(e){
				if(this.kw.length === 0) return
				const {data:res} = await uni.$http.get(`/goods/qsearch?query=${this.kw}`)
				this.searchResults = res.message
				
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			saveHistoryList(){
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			clears(){
				this.historyList = []
				uni.setStorageSync('kw','[]')
			},
			search(item){
				this.kw = item
			}
		},
		computed:{
			historys(){
				return [...this.historyList].reverse()
			},
		}
	}
</script>

<style lang="scss">
.uni-searchbar{
	background-color: red;
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-item{
	height: 50px;
	line-height: 50px;
	display: flex;
	border-bottom: 1px solid #f7f7f7;
	position: relative;
	padding: 0 10px;
	.sugg-item-name{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 12px
	}
	.sugg-item-icon{
		position: absolute;
		right: 0;
	}
}
.history{
	.history-title{
		display: flex;
		justify-content: space-between;
		padding: 5px;
		height: 40px;
		align-items: center;
		font-weight: bold;
	}
	.historyText{
		display: flex;
		flex-wrap: wrap;
		.tag-view{
			margin-right: 5px;
			margin-top: 5px;
		}
	}
}
</style>
