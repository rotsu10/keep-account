<template>
	<view class="selected">
		<TimeRangeVue @time-range="handleTimeRangeSelect"></TimeRangeVue>
	</view>
  <div ref="chartRef" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import TimeRangeVue from '../../components/TimeRange.vue';
const selectedTime = ref('');
const selectedType = ref('');
const timeType = ref('');
const handleTimeRangeSelect = (data) => {
  console.log("父组件收到数据:", data);
  selectedTime.value = data.time.text;
  selectedType.value = data.type.text;
  timeType.value = data.time.timeType;
};

const chartRef = ref(null);
onMounted(() => {
  const myChart = echarts.init(chartRef.value);
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