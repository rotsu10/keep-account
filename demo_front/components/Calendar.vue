<template>
	<view>
		<van-calendar title="日期" :poppable="false" :min-date="minDate" :max-date="maxDate" :default-date="defaultDate"
			:show-title="false" :show-confirm="false" switch-mode="year-month" :formatter="formatCalendarDay" />
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		http
	} from '../utils/request';

	const date = ref('');
	const show = ref(false);
	const currentDate = ref(new Date());
	const defaultDate = currentDate.value;
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
		const cost = dailyCosts.value[dateKey];
		return {
			...day, // 保留原有属性（日期、是否选中、是否禁用等）
			bottomInfo: cost !== undefined ? `¥${cost.toFixed(2)}` : '¥0.00', // 下方显示的花费（无数据时显示0）
			bottomInfoStyle: {
				fontSize: '12px',
				color: '#999'
			}
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

	//获取当日花费
	// [
	//   { "date": "2024-05-20", "cost": 128.5 },
	//   { "date": "2024-05-21", "cost": 88.0 },
	//   ...
	// ]
	const getDailyCosts = async () => {
		try {
			const result = await http.get("/user/queryDailyCosts", {}, {
				loadingText: '加载花费数据...'
			});
			const costMap = {};
			result.forEach(item => {
				costMap[item.date] = item.cost;
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