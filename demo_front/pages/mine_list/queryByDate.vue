<template>
	<view>
		<SelectTimeVue @select-date="handleDateChange"></SelectTimeVue>
		<van-page-list :get-list="getList" ref="pageListRef">
		  <template #item="{ item }">
		    <van-cell :title="`分类：${item.categoryName}`"/>
		  </template>
		</van-page-list>

	</view>
	
</template>

<script setup>
	import SelectTimeVue from '../../components/SelectTime.vue';
	import { http } from '../../utils/request';
	import { ref,onMounted,nextTick } from 'vue';
	const selectedDate = ref();
	const pageListRef = ref();
	
	// 设置默认日期为当前年月
	const getDefaultDate = () => {
	  const now = new Date();
	  return {
	    year: now.getFullYear(),
	    month: now.getMonth() + 1
	  };
	};

	
	// 日期变化处理
	const handleDateChange = async (selectDate) => {
		console.log('SelectDate传递时间为：', selectDate);
		selectedDate.value = selectDate;
		if (pageListRef.value && pageListRef.value.refresh) {
			pageListRef.value.refresh(); // 重置到第一页，并触发getList
		}
	}

	const getList = async(page)=>{
		// 如果没有选择日期，使用默认日期
		const dateParams = selectedDate.value || getDefaultDate();
		try{
			const sendDate = {
				year: dateParams.year, // 传递年份
				month: dateParams.month, // 传递月份
				page:page.page,
				pageSize:page.pageSize
			}
			console.log("根据日期查询账单sendDate:",sendDate);
			const res = await http.post("/user/queryRecordByDate",sendDate);
			console.log("根据日期查询账单res:",res);
			return {
				list: res.data.records || [],
				total: res.data.total || 0
			}
		}catch(err){
			console.log("根据日期查询err：",err);
			return {list:[],total:0};
		}
	}
	
	onMounted(async () => {
	  selectedDate.value = getDefaultDate();
	  await nextTick();
	  if (pageListRef.value && pageListRef.value.refresh) {
	    pageListRef.value.refresh(); // 触发列表刷新
	  }
	});
</script>

<style>
	       
</style>
