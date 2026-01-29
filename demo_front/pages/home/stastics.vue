<template>
	<view class="time">
		<AllSelectTimeVue @sendDate='time'></AllSelectTimeVue>
		<PieChartVue 
			:type = 'categoryType'
			:time-type = 'timeType' 
			:time-value = 'timeValue'
			>
		</PieChartVue>
		<LineChart
			:type = 'categoryType'
			:time-type = 'timeType' 
			:time-value = 'timeValue'
			>
		</LineChart>
		<queryByDate></queryByDate>
	</view>
</template>
<script setup>
	import { ref } from 'vue';
	import AllSelectTimeVue from '../../components/AllSelectTime.vue';
	import dayjsTool from '../../utils/dayjsTool';
	import PieChartVue from '../../components/charts/PieChart.vue';
	import LineChart from '../../components/charts/LineChart.vue';
	import queryByDate from '../mine_list/queryByDate.vue'
	const timeType = ref('');
	const timeValue = ref('');
	const categoryType = ref('')
	const time = (data)=>{
		console.log("接收到子组件传来值",data);
		timeType.value = data.type;
		timeValue.value = data.value;
		categoryType.value = data.categoryType;
		console.log(timeType.value,timeValue.value,categoryType.value);
	}
	
</script>
<style scoped>
	.time{
		margin: 40rpx;
	}
</style>
