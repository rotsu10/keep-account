<template>
	<view>
		<van-list
		  v-model:loading="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="handleLoad"
		>
			
		<van-cell
			v-for="item in list" 
			:key="item.id"
			:label="`${item.categoryName}`"
			:title="`${item.type === 1 ? '+' : '-'}${item.amount}`"
			:value="`${dayjs(item.createTime).format('YYYY/MM/DD')}`"
			@click="goToBillDetail(item.id)"
		/>
		</van-list>
		<PlusBillButton :time="currentDate"></PlusBillButton>
	</view>
</template>

<script setup>
	import { useBillStore } from '../../stores/useBillStore';
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	import dayjs from 'dayjs';
	import PlusBillButton from '../../components/PlusBillButton.vue'
	const billStore = useBillStore();
	const currentDate = ref('');
	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false);
	const currentPage = ref(1); // 当前页码
	const pageSize = ref(10); // 每页条数
	const total = ref(0); // 总条数
	onLoad((options)=>{
		if(options.date){
			currentDate.value = options.date;
			// currentDate.value = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));
			console.log("currentDate",currentDate.value);
			resetPagination();
		}
	})
	
	const loadData = async()=>{
		try{
			const dateParts  = currentDate.value.split('-');
			console.log("dateParts",dateParts);
			const dateObject = {
				year: parseInt(dateParts[0]),
				month: parseInt(dateParts[1]),
				day: parseInt(dateParts[2]),
				page: currentPage.value, // 传递当前页码
				pageSize: pageSize.value, // 传递每页条数
			};
			console.log("dateObject",dateObject);
			const { records, total: totalCount } = await billStore.queryBillList(dateObject);
			console.log("records",records);
			console.log("currentPage",currentPage);
			if(totalCount == 0) finished.value = true;
			if(currentPage.value === 1){
				list.value = records;
			}else{
				list.value.push(...records);
			}
			total.value = totalCount;
			currentPage.value++;
			if(list.value.length >= total.value){
				finished.value = true;
			}
		}catch(error){
			console.error('加载账单失败:', error);
		}finally {
			loading.value = false; // 结束加载
		}
	}
	
	// van-list 触发的加载事件
	const handleLoad = () => {
		if (finished.value) return; 
		loading.value = true; 
		loadData(); 
	};
	
	// 重置分页状态
	const resetPagination = () => {
		currentPage.value = 1;
		total.value = 0;
		list.value = [];
		finished.value = false;
	};
	
	const goToBillDetail =(billId)=>{
		console.log("账单id:",billId);
		uni.navigateTo({
		    url: `/pages/record/billDetail?id=${billId}`
		})
	}
</script>
<style>
</style>
