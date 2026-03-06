<template>
  <view class="chart-wrapper">
    <view id="line-chart" class="chart"></view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import {http} from '../../utils/request.js'
import { API_PATH } from '../../api/api.js';

const props = defineProps(['type', 'timeType', 'timeValue']);
const chartData = ref([]);
let myChart = null;

// 1. 【新增】封装一个“确保图表初始化”的函数
const ensureChartInit = async () => {
  if (myChart) return; // 已有实例直接返回
  await nextTick();
  return new Promise((resolve) => {
    uni.createSelectorQuery().select('#line-chart').boundingClientRect((rect) => {
      if (!rect || !rect.width || !rect.height) {
        resolve(false);
        return;
      }
      const chartDom = document.getElementById('line-chart');
      if (chartDom) {
        myChart = echarts.init(chartDom);
        resolve(true);
      } else {
        resolve(false);
      }
    }).exec();
  });
};

// 2. 获取数据
const getSumByDate = async () => {
  try {
    console.log("折线图请求参数：", props);
    const params = { type: props.type, timeType: props.timeType, timeValue: props.timeValue };
    console.log("折线图params",params)
    const res = await http.post(API_PATH.BILL.GET_SUM_BY_DATE, params);
    console.log("获取到的折线图数据res：", res);
    chartData.value = Array.isArray(res) ? res : [];
    console.log("获取到的折线图数据：", chartData.value);
    
    // 先确保初始化，再更新图表
    await ensureChartInit(); 
    updateChart();
  } catch (error) {
    console.error("查询日期汇总数据失败：", error);
    chartData.value = [];
  }
};

// 3. 初始化图表
const initChart = async () => {
  await nextTick();
  uni.createSelectorQuery().select('#line-chart').boundingClientRect(async (rect) => {
    if (!rect || !rect.width || !rect.height) return;
    if (myChart) myChart.dispose();
    const chartDom = document.getElementById('line-chart');
    if (!chartDom) return;
    myChart = echarts.init(chartDom);
    myChart.resize({ width: rect.width, height: rect.height });
    setChartOption();
  }).exec();
};

// 4. 设置配置项
const setChartOption = () => {
  if (!myChart) return;
  
  const xAxisData = chartData.value.map(item => item.timeValue);
  const seriesData = chartData.value.map(item => item.total);
  console.log("xAxisData,seriesData",xAxisData,seriesData)
  const option = {
    tooltip: { trigger: 'axis', textStyle: { fontSize: 12 }, formatter: '{b}收支净额：{c} 元' },
    legend: { top: '5%', left: 'center', textStyle: { fontSize: 11 }, data: ['收支总金额'] },
    grid: { left: '8%', right: '8%', bottom: '15%', top: '20%' },
    xAxis: { type: 'category', data: xAxisData, axisLabel: { fontSize: 10, rotate: 30 }, axisLine: { lineStyle: { color: '#eee' } } },
    yAxis: { 
      type: 'value', name: '金额（元）', nameTextStyle: { fontSize: 11 }, 
      axisLabel: { fontSize: 10 }, axisLine: { lineStyle: { color: '#999' } },
      min: (v) => Math.min(v.min, 0) - 10,
      splitLine: { show: true, lineStyle: { color: '#f5f5f5' } }
    },
    series: [{
      name: '收支总金额', type: 'line', symbol: 'circle', symbolSize: 6,
      areaStyle: { show: false },
	  lineStyle: { width: 2, color: '#409eff' },
      emphasis: { symbol: 'circle', symbolSize: 8 },
      data: seriesData
    }]
  };
  myChart.setOption(option, true); // 强制更新
};

// 5. 更新图表
const updateChart = () => {
  if (!myChart) {
    initChart();
    return;
  }
  setChartOption();
};

// 6. 监听和生命周期
watch([() => props.type, () => props.timeType, () => props.timeValue], async () => {
  await getSumByDate();
}, { immediate: true, deep: true });

onMounted(async () => {
  await initChart();
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 400rpx;
  padding: 15rpx;
  box-sizing: border-box;
  min-height: 200rpx;
}
.chart {
  width: 100%;
  height: 100%;
  display: block;
}
</style>