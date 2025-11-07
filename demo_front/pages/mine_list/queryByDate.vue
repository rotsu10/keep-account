<template>
	<view>
		<SelectTimeVue @select-date="handleDateChange"></SelectTimeVue>
		<financeVue  :income="totalIncome" :expense="totalExpense" :transfer="totalTransfer"></financeVue>
		<van-list
			v-model:loading="loading"
			:finished="finished"
			finished-text="没有更多了"
			:immediate-check="false"
		>
			<van-cell 
				v-for="item in list" 
				:key="item.id"
				:label="`${item.categoryName}`"
				:title="`${item.type === 1 ? '-' : '+'}${item.amount}`"
				@click="goToBillDetail(item.id)"
			/>
		</van-list>
	</view>
</template>

<script setup>
	import SelectTimeVue from '../../components/SelectTime.vue';
	import financeVue from '../../components/finance.vue';
	import {http} from '../../utils/request';
	import {ref,onMounted} from 'vue';

	const selectedDate = ref();
	const loading = ref(false);
	const finished = ref(false);
	const list = ref([]);
	const pageParams = ref({
		page: 1,
		pageSize: 10,
		total: 0
	});
	
	//统计每月账单
	const totalIncome = ref(0);
	const totalExpense = ref(0);
	const totalTransfer = ref(0);

	// 设置默认日期为当前年月
	const getDefaultDate = () => {
		const now = new Date();
		return {
			year: now.getFullYear(),
			month: now.getMonth() + 1
		};
	};

	// 日期变化处理
	const handleDateChange = async (selectDate) => {
		console.log('SelectDate传递时间为：', selectDate);
		selectedDate.value = selectDate;
		// 重置分页参数
		pageParams.value.page = 1;
		list.value = [];
		finished.value = false;
		await loadData();
	}

	// 加载数据
	const loadData = async () => {
		if (loading.value || finished.value) return;

		loading.value = true;
		try {
			const dateParams = selectedDate.value || getDefaultDate();
			const sendDate = {
				year: dateParams.year,
				month: dateParams.month,
				page: pageParams.value.page,
				pageSize: pageParams.value.pageSize
			}
			//查询每月账单
			const res = await http.post("/user/queryRecordByDate", sendDate);
			//统计每月账单
			const statistics = await http.post("/user/statisticsQuery", {year: dateParams.year,month: dateParams.month,});
			totalIncome.value = statistics.income;
			totalExpense.value = statistics.expense;
			totalTransfer.value = statistics.transfer;
			
			const data = res || {};
			const records = data.records || [];
			if (pageParams.value.page === 1) {
				list.value = records;
			} else {
				list.value = [...list.value, ...records];
			}

			pageParams.value.total = data.total || 0;

			// 判断是否加载完成
			if (records.length < pageParams.value.pageSize) {
				finished.value = true;
			} else {
				pageParams.value.page++;
			}
		} catch (err) {
			console.log("根据日期查询err：", err);
			finished.value = true; 
		} finally {
			loading.value = false;
		}
	}
	
	onMounted(() => {
		selectedDate.value = getDefaultDate();
		// 初始化加载数据
		 loadData(); 
	});
	
	
	const goToBillDetail =(billId)=>{
		console.log("账单id:",billId);
		uni.navigateTo({
		    url: `/pages/record/billDetail?id=${billId}`
		})
	}
</script>