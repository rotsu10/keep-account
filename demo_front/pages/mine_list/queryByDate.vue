<!-- 月度收支 -->
<template>
  <view class="bill-container">
    <!-- 日期选择器 -->
    <SelectTimeVue @select-date="handleDateChange"></SelectTimeVue>

    <!--财务统计 -->
    <financeVue 
      :income="totalIncome" 
      :expense="totalExpense" 
      :transfer="totalTransfer"
    ></financeVue>

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
import financeVue from '../../components/finance.vue';
import BillList from '../../components/BillList.vue';
import { http } from '../../utils/request';

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
  console.log('SelectDate传递时间为：', selectDate);
  selectedDate.value = selectDate;
  // 重新查询财务统计数据
  loadStatisticsData();
};

// 4. 加载财务统计数据
const loadStatisticsData = async () => {
  try {
    const { year, month } = selectedDate.value;
    // const statistics = await http.post("/user/statisticsQuery", { year, month });
    const statistics =await http.post(API_PATH.BILL.STATISTICS_QUERY,{ year, month })
	totalIncome.value = statistics.income;
    totalExpense.value = statistics.expense;
    totalTransfer.value = statistics.transfer;
	console.log("月度账单：", statistics);
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
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>