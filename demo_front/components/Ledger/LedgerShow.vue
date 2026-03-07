<template>
	<view @click="handleClick">
		当前账本id1： {{ledgerId}}
	</view>
</template>

<script setup>
	const ledgerId = uni.getStorageSync('ledgerId');
	const emit = defineEmits(['queryLedgerDetail'])
	const handleClick = () =>{
		emit('queryLedgerDetail',ledgerId);
	}
</script>

<style>
	       
</style>
