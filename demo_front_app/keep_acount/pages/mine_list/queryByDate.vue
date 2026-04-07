<!-- 月度收支 -->
<template>
	<up-navbar
	    title="月度收支"
	    :autoBack="true"
		class="nav"
		:placeholder="true"
	>
	</up-navbar>
  <view class="bill-container">
    <!-- 日期选择器 -->
    <SelectTimeVue @select-date="handleDateChange"></SelectTimeVue>

    <!--财务统计 -->
    <FinanceVue 
      :income="totalIncome" 
      :expense="totalExpense"
      :transfer="totalTransfer"
    ></FinanceVue>

    <!-- 账单列表 -->
    <BillList 
      :year="selectedDate.year"
      :month="selectedDate.month"
    ></BillList>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { http } from '../../utils/request';
import { API_PATH } from '../../api/api';
import SelectTimeVue from '../../components/SelectTime.vue';
import FinanceVue from '../../components/Finance.vue';
import BillList from '../../components/BillList.vue';
import { http } from '../../utils/request';
import dayjs from 'dayjs';

// 财务统计数据
const totalIncome = ref(0);
const totalExpense = ref(0);
const totalTransfer = ref(0);

// 2. 设置默认日期为当前年月
const getDefaultDate = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1
  };
};
const selectedDate = ref(getDefaultDate()); 
// 3. 日期变化
const handleDateChange = (selectDate) => {
  selectedDate.value = selectDate;
  loadStatisticsData();
};

// 4. 加载财务统计数据
const loadStatisticsData = async () => {
  try {
    const timeValue = selectedDate.value.date;
	const timeType = 'month'
    const statistics =await http.post(API_PATH.BILL.STATISTICS_QUERY,{timeValue,timeType})
	totalIncome.value = statistics.income;
    totalExpense.value = statistics.expense;
    totalTransfer.value = statistics.transfer;
	console.log("月度账单STATISTICS_QUERY：", statistics);
  } catch (err) {
    console.error("财务统计查询失败：", err.message);
  }
};

// 5. 初始化加载
onMounted(() => {
  // 设置默认日期
  // selectedDate.value = getDefaultDate();
  // 加载默认日期的财务统计数据
  loadStatisticsData();
});
</script>

<style scoped>
.bill-container {
  margin: 10rpx 30rpx;
  box-sizing: border-box;
}
</style>