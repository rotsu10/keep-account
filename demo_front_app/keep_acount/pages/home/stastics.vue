<!-- 图表 -->
<template>
	<up-navbar
	    title="图表"
		class="nav"
		:placeholder="true"
	>
	</up-navbar>
	<view class="time">
		<AllSelectTimeVue @sendDate='handleDateChange'></AllSelectTimeVue>
		<Finance :income="totalIncome" :expense="totalExpense" :total="total"></Finance>
		<view class="charts-wrapper" style="pointer-events: none;">
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
		</view>
		<view>
			<ListChart
				:type='categoryType'
				:time-type='timeType' 
				:time-value='timeValue'
			></ListChart>
		</view>
	</view>
</template>

<script setup>
	import { ref ,onMounted} from 'vue';
	import AllSelectTimeVue from '../../components/AllSelectTime.vue';
	import dayjsTool from '../../utils/dayjsTool';
	import PieChartVue from '../../components/charts/PieChart.vue';
	import LineChart from '../../components/charts/LineChart.vue';
	import Finance from '../../components/Finance.vue'
	import dayjs from 'dayjs';
	import ListChart from'../../components/charts/ListChart.vue'
	import { statisticsQuery } from '../../api/bill';
	// 时间相关
	const timeType = ref('');
	const timeValue = ref('');
	const categoryType = ref('');
	// 财务统计数据
	const totalIncome = ref(0);
	const totalExpense = ref(0);
	const total = ref(0);
	
	const handleDateChange = (data)=>{
		console.log("AllSelect的data", data);
		timeType.value = data.type;
		timeValue.value = data.value;
		categoryType.value = data.categoryType;
		console.log("categoryType.value的data", categoryType.value);
		if(categoryType.value == 0 || categoryType.value == '' ){
			financeShowData();
		}
	};
	
	

	const financeShowData = async()=>{
		try{
			console.log("finance的params",timeValue,timeType.value)
			const data = {
				timeValue:timeValue.value,
				timeType:timeType.value
			}
			console.log("finance的data",data)
			const result = await statisticsQuery(data);
			console.log("finance的result",result)
			totalIncome.value = result.income || 0;
			totalExpense.value = result.expense || 0;
			total.value = totalIncome.value - totalExpense.value;
		}catch(error){
			console.error("财务数据请求失败：", error);
		}
	}
	
	onMounted(() => {
		financeShowData()
	})
</script>

<style scoped>
	.time{
		margin: 40rpx;
	}
	
	/* 让图表区域不拦截点击事件 */
	/* .charts-wrapper {
		pointer-events: none; 
	} */
	
	/* 但图表内部如果需要交互，需要重新启用 */
	/* .charts-wrapper >>> canvas {
		pointer-events: auto;
	} */
</style>