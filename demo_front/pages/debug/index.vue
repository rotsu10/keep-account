<template>
  <view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';
import toObject from 'dayjs/plugin/toObject';
dayjs.extend(toArray);
dayjs.extend(toObject)

//获取时间数组
const timeArr = (date)=>{
	const arr = date.value.toArray();
	console.log(arr);
	return arr;
}

//获取时间对象
const timeObj  = (date)=>{
	const obj = date.value.toObject();
	console.log(obj);
	return obj;
}

//格式化日期格式
const timeFormat = (date)=>{
	const timeFormat = date.value.format('DD/MM/YYYY');
	console.log(timeFormat);
	return timeFormat;
}
</script>

<style>
</style>