<template>
	<view>
		
	</view>
</template>

<script setup>
	import { http } from '../../utils/request';

	const dailyBillList = await(selectDate)=>{
		const res = await http.post("/user/queryRecordByDate");
		console.log("每日查询账单："selectDate,res);
	}
</script>
<style>
</style>
