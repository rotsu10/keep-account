<template>
  <div ref="chartRef" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
onMounted(() => {
  const myChart = echarts.init(chartRef.value);
  // 用 let 声明 option，避免全局污染
  let option = {
    title: { text: '圆环图的例子', left: 'center', top: 'center' },
    series: [
      {
        type: 'pie',
        data: [
          { value: 335, name: 'A' },
          { value: 234, name: 'B' },
          { value: 1548, name: 'C' }
        ],
        radius: ['40%', '70%'] // 圆环图：内半径40%，外半径70%
      }
    ]
  };
  myChart.setOption(option);
});
</script>