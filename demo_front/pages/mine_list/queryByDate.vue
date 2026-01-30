<!-- pages/record/BillContainer.vue（父组件，简化版） -->
<template>
  <view class="bill-container">
    <!-- 子组件1：日期选择器 -->
    <SelectTimeVue @select-date="handleDateChange"></SelectTimeVue>

    <!-- 子组件2：财务统计 -->
    <financeVue 
      :income="totalIncome" 
      :expense="totalExpense" 
      :transfer="totalTransfer"
    ></financeVue>

    <!-- 子组件3：账单列表（传递年月查询条件） -->
    <BillList 
      :year="selectedDate.year"
      :month="selectedDate.month"
    ></BillList>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { http } from '../../utils/request';

// 引入三个子组件
import SelectTimeVue from '../../components/SelectTime.vue';
import financeVue from '../../components/finance.vue';
import BillList from '../../components/BillList.vue';

// 1. 全局状态管理（仅维护选中日期和财务统计数据）
const selectedDate = ref({}); // 选中的年月（包含 year 和 month）

// 财务统计数据（传递给 financeVue）
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

// 3. 日期变化处理（接收 SelectTimeVue 的事件，更新选中日期 + 重新查询财务统计）
const handleDateChange = (selectDate) => {
  console.log('SelectDate传递时间为：', selectDate);
  selectedDate.value = selectDate;
  // 重新查询财务统计数据
  loadStatisticsData();
};

// 4. 加载财务统计数据（仅负责财务统计，账单列表由自身处理）
const loadStatisticsData = async () => {
  try {
    const { year, month } = selectedDate.value;
    const statistics = await http.post("/user/statisticsQuery", { year, month });
    totalIncome.value = statistics.income;
    totalExpense.value = statistics.expense;
    totalTransfer.value = statistics.transfer;
  } catch (err) {
    console.error("财务统计查询失败：", err.message);
  }
};

// 5. 初始化加载
onMounted(() => {
  // 设置默认日期
  selectedDate.value = getDefaultDate();
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