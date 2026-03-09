<template>
	<view>
		<view class="clascustom-nav">
			<van-nav-bar title="账本详情">
				<template #right>
					<van-icon name="plus" size="18" @click="showAddLedger" />
				</template>
			</van-nav-bar>
		</view>
		<view>
			<van-cell-group inset>
			    <van-cell title="账本名称" :value="ledgerStore.ledgerName" />
				<van-cell title="创建时间" :value="ledgerStore.createTime" />
			  	<van-cell title="创建者ID" :value="ledgerStore.ownerId" />
			  	<van-cell title="账单数量" :value="ledgerStore.billCount" />
			  	<van-cell title="总收入" :value="ledgerStore.totalIncomeAmount" />
			  	<van-cell title="总支出" :value="ledgerStore.totalOutcomeAmount" />
			</van-cell-group>
		</view>
		
		
		<!-- 添加账本弹出层 -->
		<van-dialog
		  v-model:show="show" 
		  title="添加账本" 
		  show-cancel-button 
		  show-confirm-button 
		  @confirm="addLedger"
		>
		  <van-field 
		    v-model="LedgerName" 
		    label="" 
		    placeholder="请输入账本名"
		  />
		</van-dialog>
	</view>
</template>

<script setup>
	import { onMounted,ref } from 'vue';
	import { useLedgerStore } from '../../stores/useLedgerStore';
	const ledgerStore = useLedgerStore();
	
	const show = ref(false)
	const LedgerName = ref('')
	const ledgerId = uni.getStorageSync('ledgerId');
	onMounted(async()=>{
		const result =await ledgerStore.queryLedgerDetailByID({ledgerId});
		console.log("result",result)
	})
	
	const showAddLedger = () =>{
		show.value = true;
		LedgerName.value = '';
	}
	
	const addLedger = async ()=>{
		const ledgerName = LedgerName.value;
		await ledgerStore.addLedger(ledgerName);
	}
</script>

<style>
	       
</style>
