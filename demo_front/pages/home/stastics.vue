<!-- 图表 -->
<template>
	<view class="time">
		<AllSelectTimeVue @sendDate='handleDateChange'></AllSelectTimeVue>
		<!-- <finance></finance> -->
		<PieChartVue 
			:type='categoryType'
			:time-type='timeType' 
			:time-value='timeValue'
		></PieChartVue>
		<LineChart
			:type='categoryType'
			:time-type='timeType' 
			:time-value='timeValue'
		></LineChart>
		<ListChart 
			:type='categoryType'
			:time-type='timeType' 
			:time-value='timeValue'
		></ListChart>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import AllSelectTimeVue from '../../components/AllSelectTime.vue';
	import dayjsTool from '../../utils/dayjsTool';
	import PieChartVue from '../../components/charts/PieChart.vue';
	import LineChart from '../../components/charts/LineChart.vue';
	// import finance from '../../components/finance.vue'
	import dayjs from 'dayjs';
	import ListChart from'../../components/charts/ListChart.vue'
	const timeType = ref('');
	const timeValue = ref('');
	const categoryType = ref('');

	const handleDateChange = (data)=>{
		console.log("AllSelect的data", data);
		// 1. 更新原有变量
		timeType.value = data.type;
		timeValue.value = data.value;
		categoryType.value = data.categoryType;
	};
</script>

<style scoped>
	.time{
		margin: 40rpx;
	}
</style>