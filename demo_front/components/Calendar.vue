<template>
	<view>
	  <van-calendar
	    title="日期"
	    :key="calendarKey"
	    :poppable="false" 
	    :default-date="defaultDate"
	    :show-title="false" 
	    :show-confirm="false"
	    @select = "onDateSelect"
		:formatter="formatCalendarDay" 
	    switch-mode="year-month" 
	  ></van-calendar>
	</view>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue';
	import { http } from '../utils/request';
	import dayjs from 'dayjs'; 
	
	// 1. 去掉 Pinia，改用 ref 直接管理数据（核心修改）
	const dailyCosts = ref({}); // 每日收支数据（响应式）
	// 用于强制刷新日历的 key
	const calendarKey = ref(0);
	// 默认日期
	const defaultDate = ref(new Date());

	// 格式化日期 YYYY-MM-DD
	const formatDateKey = (date) => {
		const formatted = dayjs(date).format('YYYY-MM-DD');
		return formatted;
	};

	// 自定义日历日期展示内容（收支金额）
	const formatCalendarDay = (day) => {
		const dateKey = formatDateKey(day.date);
		const dayData = dailyCosts.value[dateKey] || {}; // 兜底空对象
		
		// 处理金额：避免无数据时 toFixed 报错
		const income = dayData.income || 0;
		const cost = dayData.cost || 0;
		
		return {
			...day,
			bottomInfo: income > 0 ? `+${income.toFixed(2)}` : '', // 收入
			topInfo: cost > 0 ? `-${cost.toFixed(2)}` : '',         // 支出
		};
	};

	// 异步获取每日收支数据
	async function fetchDailyCosts() {
		try {
			// await 等待异步请求结果
			const result = await http.get("/user/queryDailyCosts", {}, {
				loadingText: '加载花费数据...'
			});
			
			// 安全校验：确保 result 是数组
			const dataList = Array.isArray(result) ? result : (result?.data || []);
			console.log("dataList",dataList)
			const costMap = {};
			dataList.forEach(item => {
				const dateKey = formatDateKey(item.date);
				costMap[dateKey] = item;
			});
			
			dailyCosts.value = costMap;
			return costMap;
		} catch (err) {
			console.error("获取当日花费失败：", err);
			dailyCosts.value = {}; 
			return null;
		}
	}
	
	// 页面挂载时加载数据
	onMounted(async () => {
		const res = await fetchDailyCosts();
		console.log("获取每日花费结果：", res);
	});
	
	// 传递选择的日期
	const onDateSelect = (date) => {
		const selectDay = formatDateKey(date);
		console.log("选中的日期：", selectDay);
	    uni.navigateTo({
	    	url: `/pages/record/daiyBillList?date=${selectDay}`
	    });
	};
	
	// 监听收支数据变化，刷新日历
	watch(
		dailyCosts,
		() => {
			calendarKey.value++;
		},
		{ deep: true }
	);
</script>

<style>
	/* 可选：自定义日历收支金额样式 */
	.van-calendar__day-top-info {
		color: #f44336; /* 支出红色 */
		font-size: 12px;
	}
	.van-calendar__day-bottom-info {
		color: #4caf50; /* 收入绿色 */
		font-size: 12px;
	}
</style>