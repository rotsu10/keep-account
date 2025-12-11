<template>
  <view class="chart-wrapper">
    <view id="pie-chart" class="chart"></view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { onResize } from '@dcloudio/uni-app';

// 图表实例
let myChart = null;

// 初始化图表（仅适配移动端）
const initChart = () => {
  // 获取移动端容器尺寸（统一逻辑）
  uni.createSelectorQuery().select('#pie-chart').boundingClientRect(rect => {
    if (!rect) return;

    // 销毁旧实例
    if (myChart) {
      myChart.dispose();
    }

    // 初始化ECharts（移动端DOM获取兼容）
    const chartDom = document.getElementById('pie-chart');
    myChart = echarts.init(chartDom);

    // 移动端专属配置
    const option = {
      tooltip: {
        trigger: 'item',
        textStyle: { fontSize: 12 } 
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: { fontSize: 11 }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['35%', '65%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8, 
            borderColor: '#fff',
            borderWidth: 1 
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 28, 
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };

    myChart.setOption(option);
  }).exec();
};

// 移动端屏幕旋转/尺寸变化适配
const handleResize = () => {
  if (myChart) {
    myChart.resize();
  }
};

// 生命周期
onMounted(() => {
  // 移动端延迟初始化（确保DOM渲染）
  setTimeout(initChart, 80);
  // 监听移动端屏幕变化
  onResize(handleResize);
});

onUnmounted(() => {
  // 销毁实例释放内存（移动端性能优化）
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
}

.chart {
  width: 100%;
  height: 100%;
}
</style>