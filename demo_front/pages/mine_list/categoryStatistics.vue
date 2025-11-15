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
import { http } from '../../utils/request';

const timeValue = ref('');
const timeType = ref('');
const TypeText = ref('');
const TypeValue = ref('');

const chartRef = ref(null);
let myChart = ref(null); 

const handleTimeRangeSelect = (data) => {
	console.log("父组件收到数据:", data);
	timeValue.value = data.time.value;  //2025
	timeType.value = data.time.timeType; //year
  
	TypeText.value = data.type.text; //收入
    TypeValue.value = data.type.value; //1
	categoryStatistics();
};

const categoryStatistics = async()=>{
	try{
		const sendData = {
			timeValue :timeValue.value,
			timeType :timeType.value,
			type:TypeValue.value,
		}
		console.log("sendData:", sendData);
		const res =await http.post("/user/categoryStatistics",sendData,{});
		console.log("统计结果",res);
		if(res && res.length > 0){
			const newOption = {
				title:{
					text:`${timeValue.value}${TypeText.value}`,
					left:'center',
					top:'center'
				},
				series:[
					{
						type: 'pie',
						data: res, 
						radius: ['40%', '70%']
					}
				]
			}
			myChart.value.setOption(newOption);
		}
	}catch(err){
		console.log("失败",err);
	}
}

onMounted(() => {
  myChart.value = echarts.init(chartRef.value);
  const initialOption = {
    title: { text: '请选择时间和类型', left: 'center', top: 'center' },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: '金额',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [] // 初始为空
      }
    ]
  };
  myChart.value.setOption(initialOption);
});
</script>