<template>
  <view class="chart-wrapper">
    <view id="line-chart" class="chart"></view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import {http} from '../../utils/request.js'

// 接收父组件传参（与饼图保持一致，保证调用统一）
const props = defineProps(['type', 'timeType', 'timeValue']);
// 折线图数据（存储后端返回的原始数据）
const chartData = ref([]);
// ECharts实例
let myChart = null;

// 1. 异步获取折线图数据（接口更换为/user/getSumByDate）
const getSumByDate = async () => {
  try {
    console.log("折线图请求参数：", props);
    const params = {
      type: props.type,
      timeType: props.timeType,
      timeValue: props.timeValue
    };
    // 调用指定接口 /user/getSumByDate
	console.log("折线图params",params)
    const res = await http.post('/user/getSumByDate', params);
    console.log("获取到的折线图数据res：", res);
	// 校验返回数据格式，确保是数组
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
  // 适配uni-app获取容器尺寸
  uni.createSelectorQuery().select('#line-chart').boundingClientRect(async (rect) => {
    if (!rect || !rect.width || !rect.height) {
      console.warn("折线图容器未获取到尺寸，初始化失败");
      return;
    }

    // 销毁已有实例，避免内存泄漏
    if (myChart) {
      myChart.dispose();
      myChart = null;
    }

    const chartDom = document.getElementById('line-chart');
    if (!chartDom) return;

    // 初始化ECharts实例
    myChart = echarts.init(chartDom);
    // 设置图表配置项
    setChartOption();
  }).exec();
};

// 3. 设置折线图配置项（适配后端返回的timeValue和total）
const setChartOption = () => {
  if (!myChart || chartData.value.length === 0) return;

  // 提取横轴数据（timeValue）和系列数据（total）
  const xAxisData = chartData.value.map(item => item.timeValue);
  const seriesData = chartData.value.map(item => item.total);

  const option = {
    // 提示框配置：悬浮显示金额
    tooltip: {
      trigger: 'axis',
      textStyle: { fontSize: 12 },
      formatter: '{b}<br/>总金额：{c} 元' // 自定义提示文案
    },
    // 图例（可选，若需多系列可扩展）
    legend: {
      top: '5%',
      left: 'center',
      textStyle: { fontSize: 11 },
      data: ['收支总金额']
    },
    // 网格：避免图表紧贴容器边缘
    grid: {
      left: '8%',
      right: '8%',
      bottom: '15%',
      top: '20%'
    },
    // 横轴：日期/月份/星期
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        fontSize: 10,
        // 横轴文字旋转（避免内容重叠）
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
        lineStyle: { color: '#eee' }
      },
      // 纵轴最小值设为0，避免图表失真
      min: 0
    },
    // 折线图系列配置
    series: [
      {
        name: '收支总金额',
        type: 'line',
        // 折线是否平滑
        smooth: true,
        // 数据点样式
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
        // 绑定系列数据
        data: seriesData
      }
    ]
  };

  // 应用配置项，true表示不与现有配置合并，直接替换
  myChart.setOption(option, true);
};


// 折线图组件中，修改 setChartOption()，手动设置模拟数据
// const setChartOption = () => {
//   if (!myChart) return;

//   // 手动模拟数据，不依赖 chartData.value
//   const xAxisData = ['2026-01-01', '2026-01-02', '2026-01-03'];
//   const seriesData = [100, 200, 120];

//   const option = {
//     tooltip: {
//       trigger: 'axis',
//       textStyle: { fontSize: 12 },
//       formatter: '{b}<br/>总金额：{c} 元'
//     },
//     legend: {
//       top: '5%',
//       left: 'center',
//       textStyle: { fontSize: 11 },
//       data: ['收支总金额']
//     },
//     grid: {
//       left: '8%',
//       right: '8%',
//       bottom: '15%',
//       top: '20%'
//     },
//     xAxis: {
//       type: 'category',
//       data: xAxisData,
//       axisLabel: {
//         fontSize: 10,
//         rotate: 30
//       },
//       axisLine: {
//         lineStyle: { color: '#eee' }
//       }
//     },
//     yAxis: {
//       type: 'value',
//       name: '金额（元）',
//       nameTextStyle: { fontSize: 11 },
//       axisLabel: {
//         fontSize: 10
//       },
//       axisLine: {
//         lineStyle: { color: '#eee' }
//       },
//       min: 0
//     },
//     series: [
//       {
//         name: '收支总金额',
//         type: 'line',
//         smooth: true,
//         symbol: 'circle',
//         symbolSize: 6,
//         areaStyle: {
//           color: echarts.graphic.LinearGradient(0, 0, 0, 1, [
//             { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
//             { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
//           ])
//         },
//         lineStyle: {
//           width: 2,
//           color: '#409eff'
//         },
//         emphasis: {
//           symbol: 'circle',
//           symbolSize: 8
//         },
//         data: seriesData
//       }
//     ]
//   };

//   myChart.setOption(option, true);
// };

// 4. 更新图表数据（复用初始化逻辑，避免重复代码）
const updateChart = () => {
  if (!myChart) {
    initChart();
    return;
  }
  setChartOption();
};

// 5. 监听Props变化（与饼图保持一致，实现参数联动更新）
watch(
  [() => props.type, () => props.timeType, () => props.timeValue],
  async () => {
    await getSumByDate();
  },
  {
    immediate: true, // 立即执行一次
    deep: true // 深度监听对象类型props
  }
);

// 生命周期管理：挂载时初始化图表
onMounted(async () => {
  await initChart();
});

// 生命周期管理：卸载时销毁实例，释放内存
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