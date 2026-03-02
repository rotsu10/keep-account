<template>
  <view class="chart-wrapper">
    <view id="pie-chart" class="chart"></view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import { http } from '../../utils/request';
import { API_PATH } from '../../api/api';

// 接收父组件传参
const props = defineProps(['type', 'timeType', 'timeValue']);
// 图表数据
const chartData = ref([]);
// ECharts实例
let myChart = null;

// 1. 封装确保图表初始化的函数
const ensureChartInit = async () => {
  if (myChart) return; // 已有实例直接返回
  await nextTick();
  return new Promise((resolve) => {
    uni.createSelectorQuery().select('#pie-chart').boundingClientRect((rect) => {
      if (!rect || !rect.width || !rect.height) {
        resolve(false);
        return;
      }
      const chartDom = document.getElementById('pie-chart');
      if (chartDom) {
        myChart = echarts.init(chartDom);
        myChart.resize({ width: rect.width, height: rect.height });
        resolve(true);
      } else {
        resolve(false);
      }
    }).exec();
  });
};

// 2. 异步获取分类统计数据
const getCategorySum = async () => {
  try {
    console.log("请求参数：", props);
    const params = {
      type: props.type,
      timeType: props.timeType,
      timeValue: props.timeValue
    };
    const res = await http.post(API_PATH.BILL.GET_CATEGORY_SUM, params);
    chartData.value = Array.isArray(res) ? res : [];
    console.log("获取到的图表数据：", chartData.value);
    
    await ensureChartInit();
    updateChart();
  } catch (error) {
    console.error("查询分类统计失败：", error);
    chartData.value = [];
  }
};

// 3. 初始化图表
const initChart = async () => {
  await nextTick();
  uni.createSelectorQuery().select('#pie-chart').boundingClientRect(async (rect) => {
    if (!rect || !rect.width || !rect.height) {
      console.warn("图表容器未获取到尺寸，初始化失败");
      return;
    }

    if (myChart) {
      myChart.dispose();
      myChart = null;
    }

    const chartDom = document.getElementById('pie-chart');
    if (!chartDom) return;

    myChart = echarts.init(chartDom);
    myChart.resize({ width: rect.width, height: rect.height });
    setChartOption();
  }).exec();
};

// 4. 更新图表配置
const setChartOption = () => {
  if (!myChart) return;

  const option = {
    tooltip: {
      trigger: 'item',
      textStyle: { fontSize: 12 },
      position: ['50%', '50%'],
    },
    legend: {
      top: '2%',
      left: 'center',
      textStyle: { fontSize: 11 },
      formatter: (name) => {
        return name.length > 6 ? `${name.slice(0, 6)}...` : name;
      }
    },
    series: [
      {
        name: '收支金额', 
        type: 'pie',
        radius: ['35%', '55%'],
        center: ['50%', '50%'],
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          show: true,
          position:'outside',
          fontSize:10,
          formatter: '{b}: {d}%',
        },
        labelLine: {
          show: true, 
          length:5,
          lineStyle: {
            width: 1, 
            color: '#666' 
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold'
          }
        },
        data: chartData.value
      }
    ]
  };

  myChart.setOption(option, true);
};

// 5. 更新图表数据
const updateChart = () => {
  if (!myChart) {
    initChart();
    return;
  }
  setChartOption();
};

// 6. 监听Props变化
watch(
  [() => props.type, () => props.timeType, () => props.timeValue],
  async () => {
    await getCategorySum(); 
  },
  {
    immediate: true,
    deep: true 
  }
);

// 生命周期管理
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
  height: 600rpx;
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