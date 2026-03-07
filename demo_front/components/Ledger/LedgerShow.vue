<template>
	<view @click="handleClick" class="ledgerShow">
		 {{ledgerId}}{{ledgerName}}>
	</view>
</template>

<script setup>
	import { useLedgerStore } from '../../stores/useLedgerStore';
	const ledgerStore = useLedgerStore();
	const ledgerId = uni.getStorageSync('ledgerId');
	const emit = defineEmits(['queryLedgerDetail'])
	const handleClick = () =>{
		emit('queryLedgerDetail',ledgerId);
	}
	const ledgerName = ledgerStore.ledgerName;
</script>

<style>
	.ledgerShow{
		font-weight: 500;
		width: 160rpx;
		height: 40rpx;
	}
</style>
