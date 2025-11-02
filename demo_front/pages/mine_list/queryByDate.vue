<template>
	<view>
		<SelectTimeVue @select-date="queryByDate"></SelectTimeVue>
	</view>
</template>

<script setup>
	import SelectTimeVue from '../../components/SelectTime.vue';
	import { http } from '../../utils/request';
	const queryByDate = async(selectDate)=>{
		try{
			const result = await http.post(
				{"/user/queryByDate"},
				{selectDate},
				{loadingText:'加载中'}
			)
		}catch(err){
			console.log("根据时间查询数据失败：",err);
		}
		console.log('SelectDate传递时间为：',selectDate);
	}
</script>

<style>
	       
</style>
