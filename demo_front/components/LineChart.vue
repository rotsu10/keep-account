<template>
  <view class="chart-wrapper">
    <view id="line-chart" class="chart"></view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import { http } from '../utils/request';

const props = defineProps(['type', 'timeType', 'timeValue']);
const chartData = ref([])
let mychart = null;

</script setup>
const getList = async()=>{
	try{
		console.log("")
	}
}
<style>
	       
</style>
