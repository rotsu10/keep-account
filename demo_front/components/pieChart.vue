<template>
  <view class="chart-wrapper">
    <view id="pie-chart" class="chart"></view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';
import { onResize } from '@dcloudio/uni-app';
import { http } from '../utils/request';


const props = defineProps(['type','timeType', 'timeValue']);
const data = ref('');
// 图表实例
let myChart = null;

const getCategorySum = async()=>{
	try{
		const res = await http.post('/user/getCategorySum',{...props});
		data.value =res;
		console.log("查询到的结果是",res);
	}catch(error){
		console.error("查询错误",error)
	}
}

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
          data: data.value
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

watch([() => props.type, () => props.timeValue], () => {
  getCategorySum(); // 触发接口请求
  initChart(); // 重新渲染图表
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