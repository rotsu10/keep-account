<template>
	<view>
		<van-tabbar :fixed="true" :placeholder="true">
			<van-tabbar-item 
				v-for="item in tabList"
				:key="item.name"
				:name="item.name"
				:icon="item.icon"
				:active-icon="item.activeIcon"  
				@click="switchToTab(item.url)"
			>
			{{ item.text }}
			</van-tabbar-item>
		</van-tabbar>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { showToast } from 'vant';
	const active = ref(0);
	const tabList = [
		{ text: '首页', name: 'home', url: '/pages/home/home',icon: 'home-o'},
		{ text: '分类', name: 'category', url: '/pages/home/category' ,icon: 'apps-o'},
		{ text: '我的', name: 'mine', url: '/pages/home/mine', icon: 'user-o'}
	]
	
	const switchToTab = (url) =>{
		uni.switchTab({
			url,
			success:()=>{
				console.log('跳转成功')
			},
			fail:(err)=>{
				console.log('跳转失败',err)
			}
		})
	}

</script>

<style scoped>

</style>
