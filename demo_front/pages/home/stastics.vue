<template>
	<view class="time">
		<AllSelectTimeVue @send-Date ='time'></AllSelectTimeVue>
	</view>
</template>
<script setup>
	import AllSelectTimeVue from '../../components/AllSelectTime.vue';
	
	const time = (type,value)=>{
		console.log("接收到子组件传来值",type,value);
	}
</script>
<style scoped>
	.time{
		margin: 40rpx;
	}
</style>