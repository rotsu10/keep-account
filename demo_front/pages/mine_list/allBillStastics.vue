<!-- 统计 -->
<template>
	<div>
		<van-dropdown-menu>
			<van-dropdown-item v-model="value1" :options="option1" />
			<van-dropdown-item v-model="value2" :options="option2" />
			<van-dropdown-item v-model="value3" :options="option3" />
		</van-dropdown-menu>
		<van-row v-if="value3 === 'multiple' && value1 != 0">
			<!-- 实际 -->
			<van-col span="8" >
				<van-cell-group>
					<van-cell title="实际收入" :label="income"/>
				</van-cell-group>
			</van-col>
			<van-col span="8">
				<van-cell-group>
					<van-cell title="实际支出" :label="expense" />
				</van-cell-group>
			</van-col>
			<van-col span="8">
				<van-cell-group>
					<van-cell title="结余" :label="balance" />
				</van-cell-group>
			</van-col>
		</van-row>
		<van-row  v-if="value3 === 'multiple' && value1 != 0">
			<!-- 参与 -->
			<van-col span="8">
				<van-cell-group>
					<van-cell title="参与收入" :label="participateIncome" />
				</van-cell-group>
			</van-col>
			<van-col span="8">
				<van-cell-group>
					<van-cell title="参与支出" :label="participateExpense" />
				</van-cell-group>
			</van-col>
			<van-col span="8">
				<van-cell-group>
					<van-cell title="结余" :label="participateBalance" />
				</van-cell-group>
			</van-col>
		</van-row>
		
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
	import { onShow } from '@dcloudio/uni-app'; 
	import {getAllLedgerUser} from '../../api/ledger';
	import { queryBillByUserType ,computeAmount,computeParticipateAmount} from '../../api/bill';
	const value1 = ref(0);
	const value2 = ref(0);
	const value3 = ref(null);		//1.single 2.multiple
	const option1 = ref([]);
	const option2 = ref([
		{text: '全部收支',value: 0},
		{text: '收入',value: 1},
		{text: '支出',value: 2},
	])
	const option3 = ref([
		{text: '全部模式',value: null},
		{text: '个人账单',value: 'single'},
		{text: '多人账单',value: 'multiple'},
	])
	
	const income = ref(0);
	const expense = ref(0);
	const balance = ref(0);
	
	const participateIncome = ref(0)
	const participateExpense = ref(0)
	const participateBalance = ref(0)
	//列表数据
	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false);
	const pageNum = ref(1);
	const pageSize = ref(15);
	//统计用户的实际收入支出
	const getStasticsAmount = async () => {
	    const userId = value1.value;
	    console.log("调用 userId", userId);
	
	    // 全部人员不统计
	    if (userId === 0) {
	        income.value = 0
	        expense.value = 0
	        balance.value = 0
	        participateIncome.value = 0
	        participateExpense.value = 0
	        participateBalance.value = 0
	        return
	    }
	
	    try {
	        // 1. 我的账单统计
	        const computeAmountResult = await computeAmount(userId);
	        console.log("computeAmountResult", computeAmountResult);
	        
	        const myData = computeAmountResult.find(item => item.userId === userId) || {};
	        income.value = myData.totalIncome || 0;
	        expense.value = myData.totalExpend || 0;
	        balance.value = myData.totalBalance || 0;
	
	        // 2. 我参与的账单统计
	        const computeParticipateAmountResult = await computeParticipateAmount(userId);
	        console.log("参与的数据", computeParticipateAmountResult);
	        
	        const participateData = computeParticipateAmountResult.find(item => item.userId === userId) || {};
	        participateIncome.value = participateData.totalIncome || 0;
	        participateExpense.value = participateData.totalExpend || 0;
	        participateBalance.value = participateData.totalBalance || 0;
	
	    } catch (error) {
	        console.error("统计报错", error);
	        income.value = 0
	        expense.value = 0
	        balance.value = 0
	        participateIncome.value = 0
	        participateExpense.value = 0
	        participateBalance.value = 0
	    }
	};
	
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
					text: '全部人员',
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
				billType:value3.value,
				page:pageNum.value,
				pageSize:10
			}
			const result = await queryBillByUserType(data);
			
			if(pageNum.value === 1){
				list.value = result.records;
			}else{
				list.value.push(...result.records);
			}
			
			if(result.records.length<pageSize.value){
				finished.value = true;
			}
						
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
		uni.navigateTo({
			 url: `/pages/record/billDetail?id=${billId}`
		})
	}
	
	onShow(() => {
	  resetAndRefresh();
	});

	
	onMounted(() => {
		getAllUser();
	})
	
	watch(
		[value1, value2,value3], 
		([new1, new2,new3]) => {
			resetAndRefresh();
			console.log("new1",new1,new2,new3);
			}, 
		{immediate:true}
	)
	
	// watch([value1,value3],
	// 	([new1,new3])=>{
	// 		getStasticsAmount();
	// 		console.log("new1,new3",new1,new3)
	// 	}
	// )
	
	watch([value1],
		([new1])=>{
			getStasticsAmount();
			console.log("new1",new1)
		}
	)
	
</script>
<style scoped>
	.van-col {
		display: flex;
		justify-content: center;
	}
</style>