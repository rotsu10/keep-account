<template>
	<view>
		<SelectTimeVue @select-date="handleDateChange"></SelectTimeVue>
		<financeVue  :income="totalIncome" :expense="totalExpense" :transfer="totalTransfer"></financeVue>
		<van-list
			v-model:loading="loading"
			:finished="finished"
			finished-text="没有更多了"
			:immediate-check="false"
			@load="loadData"
		>
			<van-cell 
				v-for="item in list" 
				:key="item.id"
				:label="`${item.categoryName}`"
				:title="`${item.type === 1 ? '-' : '+'}${item.amount}`"
				:value="`${item.createTime[1]}-${item.createTime[2]}`"
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
	const loading = ref(false); //加载状态
	const finished = ref(false); //是否加载完毕
	const list = ref([]);
	
	const currentPage = ref(1); // 当前页码
	const pageSize = ref(10); // 每页条数
	const total = ref(0); // 总条数
	
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
		currentPage.value = 1;
		total.value = 0;
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
			console.log("dateParams",dateParams);
			const sendDate = {
				year: dateParams.year,
				month: dateParams.month,
				page: currentPage.value,
				pageSize: pageSize.value
			}
			//查询每月账单
			const res = await http.post("/user/queryRecordByDate", sendDate);
			const data = res || {};
			const records = data.records || [];
			total.value = data.total || 0;
			if (currentPage.value === 1) {
				list.value = records;
			} else {
				list.value = list.value.concat(records);
			}
			if(list.value.length >= total.value){
				finished.value = true;
			}
			else {
			    currentPage.value++;
			}
			
			//统计每月账单
			const statistics = await http.post("/user/statisticsQuery", {year: dateParams.year,month: dateParams.month,});
			totalIncome.value = statistics.income;
			totalExpense.value = statistics.expense;
			totalTransfer.value = statistics.transfer;
			
		} catch (err) {
			console.error("根据日期查询：", err.message);
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