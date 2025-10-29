<template>
	<view>
		<van-calendar title="日期" 
		:poppable="false" 
		:min-date="minDate" 
		:max-date="maxDate" 
		:style="{ height: '528px' }"
		:default-date="defaultDate" 
		:show-title="false" 
		:show-confirm="false"
		@select = "moreInfo"
		 />
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import { http } from '../utils/request';
	const date = ref('');
	const show = ref(false);
	const currentDate = ref(new Date());
	const defaultDate = currentDate.value;
	const minDate = getCreateTime();
	const maxDate = new Date(2025, 10, 30);
	const formatDate = (date) => `${date.getMonth()}/${date.getDate()}`;
	
	
	const moreInfo = () => {}
	const getCreateTime = async()=>{
		try{
			const result = await http.get("/user/queryCreateTime",{},{loadingText:'加载中'});
			const [year, month, day, hour, minute, second] = result.data; 
			const date = new Date(year, month - 1, day, hour, minute, second);
			return date;
		}catch(err){
			console.error('获取时间失败', err);
			return null;
		}
	};
	
	onMounted(async () => {
		const date = await getCreateTime();
		if (date) {
			minDate.value = date;
		}
	});
</script>

<style>
</style>