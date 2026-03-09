<template>
	<view class="ledgerShow">
		 {{ledgerId}}{{ledgerStore.ledgerName}}
		  <van-icon name="arrow-down" @click="linkToAllLedger" size="14" />
	</view>
</template>

<script setup>
	import { ref,onMounted } from 'vue'; // 引入ref用于声明响应式变量
	import { useLedgerStore } from '../../stores/useLedgerStore';
	
	const ledgerStore = useLedgerStore();
	
	const ledgerId = uni.getStorageSync('ledgerId');
	
	const ledgerName = ref(''); 
	
	// 4. 定义自定义事件
	const emit = defineEmits(['queryLedgerDetail']);
	
	
	onMounted(() => {
			// 先校验ledgerId是否有效，避免传递空值
			if (ledgerId) {
				emit('queryLedgerDetail', ledgerId);
				console.log("页面加载自动触发查询账本详情，ledgerId：", ledgerId);
			} else {
				console.log("ledgerId为空，跳过自动查询");
			}
		});
	
	const linkToAllLedger = () =>{
		console.log("跳转到allLedger");
		uni.navigateTo({
			url: '/pages/record/allLedger', 
			success: () => {
				console.log("跳转成功");
			},
			fail: (err) => {
				console.error("跳转失败：", err);
			},
		});
	}
</script>

<style>
	.ledgerShow{
   		font-weight: 500;
		width: 200rpx;
		height: 40rpx;
		line-height: 40rpx;
	}
</style>