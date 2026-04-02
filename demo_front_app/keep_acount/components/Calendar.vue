<template>
	<view>
		<!-- uni-calendar 替换 vant 日历，保持所有功能一致 -->
		<uni-calendar
			:insert="true"
			:lunar="false"
			:show-month="true"
			:calendar="calendarData"
			@change="onDateSelect"
		></uni-calendar>
	</view>
</template>

<script setup>
	import { ref, onMounted, watch, computed } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	import { http } from '../utils/request';
	import dayjs from 'dayjs';
	import { API_PATH } from '../api/api.js';

	// 每日收支数据
	const dailyCosts = ref({});
	// 日历组件需要的数据源
	const calendarData = ref([]);

	// 格式化日期 YYYY-MM-DD
	const formatDateKey = (date) => {
		return dayjs(date).format('YYYY-MM-DD');
	};

	// 【核心】把收支数据转成 uni-calendar 需要的 extra 格式
	const renderCalendarWithMoney = () => {
		const costMap = dailyCosts.value;
		const result = [];

		// 遍历所有有数据的日期，给日历添加金额标记
		Object.keys(costMap).forEach(date => {
			const item = costMap[date];
			const income = item.income || 0;
			const cost = item.cost || 0;

			let extraInfo = '';
			// 收入显示 +，支出显示 -
			if (income > 0) {
				extraInfo = `+${income.toFixed(2)}`;
			}
			if (cost > 0) {
				extraInfo = `-${cost.toFixed(2)}`;
			}

			result.push({
				date: date,
				extra: extraInfo // uni-calendar 日期下方显示的文字
			});
		});

		calendarData.value = result;
	};

	// 获取每日收支数据
	async function fetchDailyCosts() {
		try {
			const result = await http.get(API_PATH.BILL.QUERY_DAILY_COSTS);
			const dataList = Array.isArray(result) ? result : (result?.data || []);
			
			const costMap = {};
			dataList.forEach(item => {
				const dateKey = formatDateKey(item.date);
				costMap[dateKey] = item;
			});
			
			dailyCosts.value = costMap;
			renderCalendarWithMoney(); // 刷新日历显示
			return costMap;
		} catch (err) {
			console.error("获取数据失败：", err);
			dailyCosts.value = {};
			renderCalendarWithMoney();
			return null;
		}
	}

	// 点击日期跳转
	const onDateSelect = (e) => {
		const selectDay = e.fulldate; // uni-calendar 返回格式：2026-04-01
		uni.navigateTo({
			url: `/pages/record/daiyBillList?date=${selectDay}`
		});
	};

	// 刷新日历数据
	async function refreshCalendarData() {
		await fetchDailyCosts();
	}

	// 生命周期
	onMounted(async () => {
		await fetchDailyCosts();
	});

	onShow(async () => {
		await refreshCalendarData();
	});

	// 监听数据变化，自动刷新日历展示
	watch(
		dailyCosts,
		() => {
			renderCalendarWithMoney();
		},
		{ deep: true }
	);
</script>

<style>
/* 可选：美化金额文字样式 */
.uni-calendar-item-extra {
	font-size: 12px !important;
	color: #ff4d4f !important; /* 支出红色 */
}
</style>