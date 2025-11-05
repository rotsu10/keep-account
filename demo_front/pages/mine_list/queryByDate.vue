<template>
	<view>
		<view>
			<SelectTimeVue @select-date="handleDateChange"></SelectTimeVue>
		</view>
		<van-page-list :get-list="getList" ref="pageListRef">
		  <template #item="{ item }">
		    <van-cell :title="item.name" />
		  </template>
		</van-page-list>

	</view>
	
</template>

<script setup>
	import SelectTimeVue from '../../components/SelectTime.vue';
	import { http } from '../../utils/request';
	import { ref } from 'vue';
	
	const selectedDate = ref([]);
	const pageListRef = ref();
	
	// 日期变化处理
	const handleDateChange = async (selectDate) => {
		console.log('SelectDate传递时间为：', selectDate);
		selectedDate.value = selectDate;
		
		// 重置分页并重新加载数据
		if (pageListRef.value) {
			pageListRef.value.refresh();
		}
	}
	
	  
	const getList = (page) => http.post("/user/queryRecordByDate", {
		currentPage: page.page, // 假设后端需要currentPage作为页码参数
		pageSize: page.pageSize,
		year:selectedDate.value[0],
		month:selectedDate.value[1]
	})
</script>

<style>
	       
</style>
