<template>
  <view class="chart-wrapper">
    <view id="pie-chart" class="chart"></view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
// import { onResize } from '@dcloudio/uni-app';
import { http } from '../../utils/request';
import { API_PATH } from '../../api/api';

// 接收父组件传参
const props = defineProps(['type', 'timeType', 'timeValue']);
// 图表数据
const chartData = ref([]);
// ECharts实例
let myChart = null;
// 防抖标记
// let resizeTimer = null;

// 1. 异步获取分类统计数据
const getCategorySum = async () => {
  try {
    console.log("请求参数：", props);
    const params = {
      type: props.type,
      timeType: props.timeType,
      timeValue: props.timeValue
    };
    // const res = await http.post('/user/getCategorySum', params);
    const res = await http.post(API_PATH.BILL.GET_CATEGORY_SUM, params);
    chartData.value = Array.isArray(res) ? res : [];
    console.log("获取到的图表数据：", chartData.value);
    updateChart();
  } catch (error) {
    console.error("查询分类统计失败：", error);
    chartData.value = [];
  }
};

// 2. 初始化图表
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
    setChartOption();
  }).exec();
};

// 3. 更新图表配置
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
        // avoidLabelOverlap: true,
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

// 4. 仅更新图表数据
const updateChart = () => {
  if (!myChart) {
    initChart();
    return;
  }
  setChartOption();
};

// 5. 防抖处理屏幕尺寸变化（移动端性能优化）
// const handleResize = () => {
//   clearTimeout(resizeTimer);
//   resizeTimer = setTimeout(() => {
//     if (myChart) {
//       myChart.resize();
//     }
//   }, 100); // 防抖延迟100ms
// };

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
  // onResize(handleResize);
});

onUnmounted(() => {
  // clearTimeout(resizeTimer);
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