import { ref, unref } from 'vue';

import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';
import toObject from 'dayjs/plugin/toObject';
dayjs.extend(toArray);
dayjs.extend(toObject)
//统一把参数转为 dayjs 实例（处理 ref、原生 Date、dayjs 实例）
const getValidDayjs = (date)=>{
	//解包ref
	const rawDate = unref(date);
	
	if(!rawDate){
		console.log('传入日期参数不能为空');
		return null;
	}
	if(dayjs.isDayjs(rawDate)){
		return dayjs(rawDate);
	}
	if(rawDate instanceof Date){
		return dayjs(rawDate);
	}
	return null;
}

//获取时间数组
const timeArr = (date)=>{
	const dayjsIns = getValidDayjs(date);
	return dayjsIns ? dayjsIns.toArray() : [];
}

//获取时间对象
const timeObj  = (date)=>{
	const dayjsIns = getValidDayjs(date);
	return dayjsIns ? dayjsIns.toObject() : {};
}

//格式化日期格式
const timeFormat = (date)=>{
	const dayjsIns = getValidDayjs(date);
	return dayjsIns ? dayjsIns.format('DD/MM/YYYY') : '';
}

export default {
  timeArr,
  timeObj,
  timeFormat
};