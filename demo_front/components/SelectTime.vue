<template>
	<view>
		<van-date-picker v-model="currentDate" title="选择日期" :min-date="minDate" :max-date="maxDate" />
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import { onMounted } from 'vue';
	import { http } from '../utils/request';
	console.log("当前时间",new Date())
	const minDate = ref(new Date());
	const maxDate = ref(new Date());
	
	//获取当前日期，数组
	const getCurrentDate = ()=>{
		const now = new Date();
		return [
				now.getFullYear().toString(),
				(now.getMonth() + 1).toString().padStart(2, '0'),
				now.getDate().toString().padStart(2, '0')
		];
	};
	const currentDate = ref(getCurrentDate());
	
	
	const getCurTime = async()=>{
	        try{
	            const result = await http.get("/user/queryCreateTime",{},{loadingText:'加载中'});
	            const [year, month, day, hour, minute, second] = result; 
	            const date = new Date(year, month - 1, day, hour, minute, second);
				console.log("date等于：",date);
	            return date;
	        }catch(err){
	            console.error('获取时间失败', err);
	            return null;
	        }
	    };
	    
	    onMounted(async ()=>{
	        const date = await getCurTime();
	        if(date){
	            minDate.value = date;
	        }
	    })
</script>