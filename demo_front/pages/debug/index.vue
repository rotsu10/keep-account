<template>
  <view>
    <van-calendar 
      title="日期" 
      :poppable="false" 
      :min-date="minDate" 
      :max-date="maxDate" 
      :default-date="defaultDate"
      :show-title="false" 
      :show-confirm="false" 
      switch-mode="year-month" 
      :formatter="formatCalendarDay" 
    />
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { http } from '../../utils/request';
// 1. 正确导入 useBillStore 函数
import { useBillStore } from '../../stores/useBillStore';
import { storeToRefs } from 'pinia'; // 导入 storeToRefs

// 2. 调用函数，获取 store 实例
const billStore = useBillStore();

const { dailyCosts } = storeToRefs(billStore);
// 4. 直接从 store 实例中获取 action
const getDailyCostsAction = billStore.getDailyCosts;

// --- 以下部分基本不变 ---
const date = ref('');
const show = ref(false);
const currentDate = ref(new Date());
const defaultDate = ref(currentDate.value);
const minDate = ref(new Date());
const maxDate = ref(new Date());

// 格式化日期 YYYY-MM-DD
const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 5. 修改 formatter，使其使用从 Store 中解构出的 dailyCosts
const formatCalendarDay = (day) => {
  const dateKey = formatDateKey(day.date);
  // 使用 dailyCosts.value，因为它是 ref 对象
  const dayData = dailyCosts.value[dateKey];
  console.log("dayData:",dayData);
  console.log("dayKey:",dateKey);
  let bottomInfo = '';
  let topInfo = '';

  if (dayData) {
    bottomInfo = `+${dayData.income.toFixed(2)}`;
    topInfo = `-${dayData.cost.toFixed(2)}`;
  }
  
  return {
    ...day,
    bottomInfo: bottomInfo,
    topInfo: topInfo,
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
  // 6. 在 onMounted 中调用 store 的 action 来初始化数据
  await getDailyCostsAction();
});

// 7. (关键) 监听 Store 中 dailyCosts 的变化，强制日历刷新
//    van-calendar 可能不会主动检测其 formatter 函数内部依赖的深层数据变化
//    监听并切换一个无关的属性（如 key）是一个可靠的强制刷新手段
const calendarKey = ref(0);
watch(
  () => dailyCosts.value, // 监听 Store 中 dailyCosts 的变化
  () => {
    calendarKey.value++; // 变化时，更新 key
	console.log("calendarKey",calendarKey.value);
  },
  { deep: true } // 深度监听，确保能检测到对象内部的变化
);
</script>

<style>
</style>