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
			@longpress="deleteByLongPress(item.id)"
		/>
		</van-list>
		
		<!-- 添加账单按钮 -->
		<PlusBillButton :time="currentDate"></PlusBillButton>
		
		<!-- 删除账单弹窗 -->
		<van-dialog v-model:show="DialogShow" title="删除账单"  show-cancel-button
		confirm-button-text="确认删除" cancel-button-text="取消" @confirm="confirmDelete()">
			<van-row  justify="center">
				<view class="delete">删除该账单</view>
			</van-row>
		</van-dialog>
	</view>
</template>

<script setup>
	import { useBillStore } from '../../stores/useBillStore';
	import { onLoad, onShow, onUnload,onHide } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	import dayjs from 'dayjs';
	import PlusBillButton from '../../components/PlusBillButton.vue'
	import { deleteBill } from '../../api/bill';
	
	const billStore = useBillStore();
	const currentDate = ref('');
	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false);
	const currentPage = ref(1); // 当前页码
	const pageSize = ref(10); // 每页条数
	const total = ref(0); // 总条数
	
	// 存储当前页面的查询参数
	const currentQueryParams = ref({});
	
	// 删除账单
	const DialogShow = ref(false)
	const bill = ref('')  //所选删除账单
	//重新加载列表
	const refreshList = () => {
		// 重置分页状态
		resetPagination();
		// 手动触发加载第一页数据
		loadData();
	}
	
	
	onShow(() => {
	  console.log("页面显示时监听全局事件")
	  uni.$on('billAdded', refreshList);
	});
	onHide(() => {
	  uni.$off('billAdded', refreshList); 
	});
	// 3. 页面卸载时移除监听
	onUnload(() => {
	  uni.$off('billAdded', refreshList);
	});
	
	
	onLoad((options)=>{
		currentQueryParams.value = {
			date: options.date || '', // 日期（其他页面传）
		};
	
		
		if(currentQueryParams.value.date){
			currentDate.value = currentQueryParams.value.date;
		}
		refreshList();
	})
	
	const loadData = async()=>{
		try{
			loading.value = true;
			const dateParts  = currentDate.value.split('-');
			const dateObject = {
				year: parseInt(dateParts[0]),
				month: parseInt(dateParts[1]),
				day: parseInt(dateParts[2]),
				page: currentPage.value, // 传递当前页码
				pageSize: pageSize.value, // 传递每页条数
			};
			console.log("dateObject",dateObject);
			const { records, total: totalCount } = await billStore.queryBillList(dateObject);
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
		loadData(); 
	};
	
	// 重置分页状态
	const resetPagination = () => {
		currentPage.value = 1;
		total.value = 0;
		list.value = [];
		finished.value = false;
	};
	
	//账单详情
	const goToBillDetail =(billId)=>{
		console.log("账单id:",billId);
		uni.navigateTo({
		    url: `/pages/record/billDetail?id=${billId}`
		})
	}
	
	//删除账单
	const deleteByLongPress = (billId) =>{
		console.log("删除账单item",billId);
		bill.value = billId;
		DialogShow.value = true;
	}
	const confirmDelete = async() =>{
		try{
			const data = {
				billId:bill.value,
			};
			await deleteBill(data);
			uni.showToast({ title: '删除成功', icon: 'success' });
			refreshList();
			DialogShow.value = false;
		}catch(error){
			console.error("删除账单失败error",error)
		}
	}
	
</script>
<style>
</style>
