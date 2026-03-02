<template>
	<view>
		当前账本id1： {{ledgerId}}
	</view>
</template>

<script setup>
	const ledgerId = uni.getStorageSync('ledgerId');
</script>

<style>
	       
</style>
