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
// 接收父组件传参
const props = defineProps(['type', 'timeType', 'timeValue']);
// 折线图数据
const chartData = ref([]);
// ECharts实例
let myChart = null;

// 1.折线图数据
const getSumByDate = async () => {
  try {
    console.log("折线图请求参数：", props);
    const params = {
      type: props.type,
      timeType: props.timeType,
      timeValue: props.timeValue
    };
	console.log("折线图params",params)
    // const res = await http.post('/user/getSumByDate', params);
    const res = await http.post(API_PATH.BILL.GET_SUM_BY_DATE, params);
    console.log("获取到的折线图数据res：", res);
    chartData.value = Array.isArray(res) ? res : [];
    console.log("获取到的折线图数据：", chartData.value);
    updateChart();
  } catch (error) {
    console.error("查询日期汇总数据失败：", error);
    chartData.value = [];
  }
};

// 2. 初始化折线图
const initChart = async () => {
  await nextTick();
  uni.createSelectorQuery().select('#line-chart').boundingClientRect(async (rect) => {
    if (!rect || !rect.width || !rect.height) {
      console.warn("折线图容器未获取到尺寸，初始化失败");
      return;
    }

    if (myChart) {
      myChart.dispose();
      myChart = null;
    }

    const chartDom = document.getElementById('line-chart');
    if (!chartDom) return;

    // 初始化ECharts实例
    myChart = echarts.init(chartDom);
    setChartOption();
  }).exec();
};

// 3. 设置折线图配置项
const setChartOption = () => {
  if (!myChart || chartData.value.length === 0) return;

  // 提取横轴数据（timeValue）和系列数据（total）
  const xAxisData = chartData.value.map(item => item.timeValue);
  const seriesData = chartData.value.map(item => item.total);
  console.log("xAxisData,seriesData",xAxisData,seriesData)
  const option = {
    tooltip: {
      trigger: 'axis',
      textStyle: { fontSize: 12 },
      formatter: '{b}收支净额：{c} 元' 
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: { fontSize: 11 },
      data: ['收支总金额']
    },
    grid: {
      left: '8%',
      right: '8%',
      bottom: '15%',
      top: '20%'
    },
	// 横轴：日期
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        fontSize: 10,
        rotate: 30
      },
      axisLine: {
        lineStyle: { color: '#eee' }
      }
    },
    // 纵轴：金额数值
    yAxis: {
      type: 'value',
      name: '金额（元）',
      nameTextStyle: { fontSize: 11 },
      axisLabel: {
        fontSize: 10
      },
      axisLine: {
        lineStyle: { color: '#999' }
      },
	  min: function(value) {
	        // value.min 是数据中的最小值，若最小值大于0，仍保留一定留白；若小于0，向下延伸10个单位
	         return Math.min(value.min, 0) - 10;
	    },
		splitLine: {
		    show: true,
			lineStyle: { color: '#f5f5f5' }
		}
    },
    // 折线图系列配置
    series: [
      {
        name: '收支总金额',
        type: 'line',
        // smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        // 填充区域（可选，增加视觉效果）
        areaStyle: {
          color: echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
          ])
        },
        // 线条样式
        lineStyle: {
          width: 2,
          color: '#409eff'
        },
        // 数据点高亮样式
        emphasis: {
          symbol: 'circle',
          symbolSize: 8
        },
        data: seriesData
      }
    ]
  };

  myChart.setOption(option, true);
};

// 4. 更新图表数据
const updateChart = () => {
  if (!myChart) {
    initChart();
    return;
  }
  setChartOption();
};

// 5. 监听Props变化
watch(
  [() => props.type, () => props.timeType, () => props.timeValue],
  async () => {
    await getSumByDate();
  },
  {
    immediate: true, 
    deep: true 
  }
);

// 挂载时初始化图表
onMounted(async () => {
  await initChart();
});

// 卸载时销毁实例，释放内存
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