<template>
	<view @click="handleClick" class="ledgerShow">
		 {{ledgerId}}{{ledgerName}}
	</view>
</template>

<script setup>
	import { ref } from 'vue'; // 引入ref用于声明响应式变量
	import { useLedgerStore } from '../../stores/useLedgerStore';
	
	// 1. 初始化ledgerStore
	const ledgerStore = useLedgerStore();
	
	// 2. 从本地缓存获取ledgerId（顶层声明，模板可访问）
	const ledgerId = uni.getStorageSync('ledgerId');
	
	// 3. 声明ledgerName为响应式变量（顶层声明，模板/函数均可访问）
	const ledgerName = ref(''); 
	
	// 4. 定义自定义事件
	const emit = defineEmits(['queryLedgerDetail']);
	
	// 5. 点击事件处理函数
	const handleClick = () => {
		// 触发父组件事件，传递ledgerId
		emit('queryLedgerDetail', ledgerId);
		// 更新ledgerName的值（从store中获取）
		// ledgerName.value = ledgerStore.ledgerName;
	};
	
	// 可选：页面初始化时就从store获取ledgerName（根据需求决定）
	ledgerName.value = ledgerStore.ledgerName;
	
	// 此时console.log能正常访问ledgerName
	console.log("ledgerName", ledgerName.value);
</script>

<style>
	.ledgerShow{
   		font-weight: 500;
		width: 200rpx;
		height: 40rpx;
		/* 可选：添加行高，让文字垂直居中 */
		line-height: 40rpx;
	}
</style>