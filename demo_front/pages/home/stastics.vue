<template>
	<view class="time">
		<AllSelectTimeVue @send-Date='time'></AllSelectTimeVue>
		<PieChartVue></PieChartVue>
	</view>
</template>
<script setup>
	import { ref } from 'vue';
	import AllSelectTimeVue from '../../components/AllSelectTime.vue';
	import dayjsTool from '../../utils/dayjsTool';
	import PieChartVue from '../../components/PieChart.vue';
	const type = ref('');
	const timeValue = ref('');
	const time = (data)=>{
		console.log("接收到子组件传来值",data);
		type.value = data.type;
		timeValue.value = data.value;
		console.log(type.value,timeValue.value);
	}
	
</script>
<style scoped>
	.time{
		margin: 40rpx;
	}
</style>
<!-- 
【根页面（TimeChartPage.vue）】→ 父组件（顶层容器）
  ├─ 【TimePicker.vue】→ 子组件1（时间选择器）
  └─ 【Charts.vue】→ 子组件2（图表/图标组件） -->