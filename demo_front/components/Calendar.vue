<template>
	<view>
		<van-calendar title="日期" :poppable="false" :min-date="minDate" :max-date="maxDate" :default-date="defaultDate"
			:show-title="false" :show-confirm="false" switch-mode="year-month" :formatter="formatCalendarDay" />
	</view>
</template>

<script setup>
	import {ref,onMounted} from 'vue';
	import {http} from '../utils/request';

	const date = ref('');
	const show = ref(false);
	const currentDate = ref(new Date());
	const defaultDate = ref(currentDate.value);
	const minDate = ref(new Date());
	const maxDate = ref(new Date());

	const dailyCosts = ref({});
	//格式化日期 YYYY-MM-DD
	const formatDateKey = (date) => {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	const formatCalendarDay = (day) => {
		const dateKey = formatDateKey(day.date);
		const dayData = dailyCosts.value[dateKey];
		
		let bottomInfo = '';
		let topInfo = '';
	
		if(dayData){
			 bottomInfo = `+${dayData.income.toFixed(2)}`;
			 topInfo = `-${dayData.cost.toFixed(2)}`;
		}else{
			bottomInfo = '';
			topInfo = '';
		}
		return{
			...day,
			bottomInfo:bottomInfo,
			topInfo:topInfo,
		};
	};

	const getCreateTime = async () => {
		try {
			const result = await http.get("/user/queryCreateTime", {}, {
				loadingText: '加载中'
			});
			const [year, month, day, hour, minute, second] = result.data || result;
			const date = new Date(year, month - 1, day, hour, minute, second);
			return date;
		} catch (err) {
			console.error('获取时间失败', err);
			return new Date();
		}
	};

	const getDailyCosts = async () => {
		try {
			const result = await http.get("/user/queryDailyCosts", {}, {
				loadingText: '加载花费数据...'
			});
			const costMap = {};
			result.forEach(item => {
				costMap[item.date] = item;
			});
			dailyCosts.value = costMap;
		} catch (err) {
			console.log("获取当日花费失败：", err);
			dailyCosts.value = {};
		}
	}

	onMounted(async () => {
		const createDate = await getCreateTime();
		minDate.value = createDate;
		await getDailyCosts();
	});
</script>

<style>
</style>