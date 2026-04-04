<template>
	<view class="content">
		<!-- uv-calendars 正确写法 -->
		<uv-calendars
			:key="calendarKey"
			insert    
			:date="defaultDate"   
			:show-title="false"   
			:show-confirm="false" 
			:selected="selectedList" 
			@change="onDateSelect"    
		></uv-calendars>
	</view>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	import { http } from '../utils/request';
	import dayjs from 'dayjs';
	import { API_PATH } from '../api/api.js';

	const dailyCosts = ref({});
	const calendarKey = ref(0);
	const defaultDate = ref(dayjs().format('YYYY-MM-DD'));
	
	// 日历标记数据（topinfo + info 分别显示 支出 / 收入）
	const selectedList = ref([]);

	// 格式化日期
	const formatDateKey = (date) => dayjs(date).format('YYYY-MM-DD');

	// 获取数据后组装成 selectedList 格式
	async function fetchDailyCosts() {
		try {
			const res = await http.get(API_PATH.BILL.QUERY_DAILY_COSTS);
			const list = Array.isArray(res) ? res : (res?.data || []);
			
			const data = list.map(item => ({
				date: formatDateKey(item.date),
				topinfo: item.cost > 0 ? `-${item.cost.toFixed(2)}` : '',
				topinfoColor: '#ff296b', // 支出红色
				info: item.income > 0 ? `+${item.income.toFixed(2)}` : '',
				infoColor: '#00c48c'     // 收入绿色
			}));
			
			selectedList.value = data;
		} catch (e) {
			console.error('获取失败', e);
		}
	}

	// 点击日期
	const onDateSelect = (e) => {
		console.log('选中:', e.fulldate);
		uni.navigateTo({
			url: `/pages/record/dailyBillList?date=${e.fulldate}`
		});
	};

	// 刷新
	async function refresh() {
		await fetchDailyCosts();
		calendarKey.value++;
	}

	onMounted(() => fetchDailyCosts());
	onShow(() => refresh());
	watch(dailyCosts, () => calendarKey.value++, { deep: true });
</script>
<style scoped>
	.content{
		padding-top: 80rpx;
	}
</style>