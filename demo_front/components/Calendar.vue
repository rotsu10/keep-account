<template>
	<view>
		<van-calendar title="日期"
		:key= "calendarKey"
		:poppable="false" 
		:min-date="minDate" 
		:max-date="maxDate" 
		:default-date="defaultDate"
		:show-title="false" 
		:show-confirm="false" 
		switch-mode="year-month" 
		:formatter="formatCalendarDay" />
	</view>
</template>

<script setup>
	import {ref,onMounted, watch} from 'vue';
	import {http} from '../utils/request';
	import { storeToRefs } from 'pinia';
	import { useBillStore } from '../stores/useBillStore';
	
	const billStore = useBillStore();
	const { dailyCosts } = storeToRefs(billStore);
	console.log("dailyCosts",dailyCosts.value);
	
	//用于强制刷新日历的 key
	const calendarKey = ref(0);
	
	const date = ref('');
	const show = ref(false);
	const currentDate = ref(new Date());
	const defaultDate = ref(currentDate.value);
	const minDate = ref(new Date());
	const maxDate = ref(new Date());

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

	
	
	onMounted(async () => {
		const createDate = await getCreateTime();
		minDate.value = createDate;
		await billStore.fetchDailyCosts();
	});
	
	watch(
		()=>dailyCosts.value.cost,
		()=>{
			calendarKey.value++;
		},
		{deep:true}
	)
	console.log("dailyCosts.value,aaaaaaaaaaaaaaaaaa",dailyCosts.value)
</script>

<style>
</style>