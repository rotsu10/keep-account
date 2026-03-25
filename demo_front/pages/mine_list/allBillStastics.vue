<template>
	<div>
		<van-dropdown-menu>
			<van-dropdown-item v-model="value1" :options="option1" />
			<van-dropdown-item v-model="value2" :options="option2" />
		</van-dropdown-menu>
		
		<van-list
		  v-model:loading="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="onLoad"
		>
		  <van-cell v-for="item in list" 
			:key="item.id"
			:title="item.categoryName" 
			:label="item.billType" 
			:value="item.type === 1 ? '+' +item.amount :'-'+ item.amount"
			@click = "goBillDetail(item.id)"/>
		</van-list>
	</div>
</template>
<script setup>
	import {onMounted,ref,watch} from 'vue';
	import {getAllLedgerUser} from '../../api/ledger';
	import { queryBillByUserType } from '../../api/bill';
	const value1 = ref(0);
	const value2 = ref(0);
	const option1 = ref([]);
	const option2 = ref([{
			text: '全部类型',
			value: 0
		},
		{
			text: '收入',
			value: 1
		},
		{
			text: '支出',
			value: 2
		},
	])
	
	//列表数据
	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false);
	const pageNum = ref(1);
	const pageSize = ref(10);
	
	//查询账本拥有者
	const getAllUser = async () => {
		try {
			const userList = await getAllLedgerUser();
			const userOptions = userList.map(user => ({
				text: user.username,
				value: user.id
			}));
			console.log("userOptions",userOptions)
			option1.value = [{
					text: '全部人',
					value: 0
				},
				...userOptions
			];
		} catch (error) {
			console.error("error", error)
		}

	}
	
	//获取billList
	const getbillList =async ()=>{
		loading.value = true;
		try{
			const data = {
				userId:value1.value,
				type:value2.value,
				page:pageNum.value,
				pageSize:10
			}
			console.log("账单列表",data)
			const result = await queryBillByUserType(data);
			
			if(pageNum.value === 1){
				list.value = result.records;
			}else{
				list.value.push(...result.records);
			}
			
			if(result.records.length<pageSize.value){
				finished.value = true;
			}
			
			console.log("result",result)
			
		}catch(error){
			console.error("error",error)
		} finally {
			loading.value = false;
		}
	} 
	
	//上拉加载更多
	const onLoad = async()=>{
		if(finished.value) return;
		pageNum.value++;
		await getbillList();
	}
	
	//筛选条件改变，重置分页并刷新
	const resetAndRefresh = ()=>{
		list.value = [];
		pageNum.value = 1;
		finished.value = false;
		getbillList();
	}
	
	//查询账单详情
	const goBillDetail = (billId) => {
		console.log("查询账单详情",billId);
		uni.navigateTo({
			 url: `/pages/record/billDetail?id=${billId}`
		})
	}
	
	onMounted(() => {
		getAllUser();
	})
	
	watch(
		[value1, value2], 
		([new1, new2]) => {
			resetAndRefresh()
			console.log("new1",new1,new2)
			}, 
		{immediate:true}
	)
	
</script>
<style scoped>

</style>