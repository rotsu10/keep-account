<template>
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
</template>

<script setup>
	import { onMounted } from 'vue';
	import { useLedgerStore } from '../../stores/useLedgerStore';
	const ledgerStore = useLedgerStore();
	
	const ledgerId = uni.getStorageSync('ledgerId');
	onMounted(async()=>{
		const result =await ledgerStore.queryLedgerDetailByID({ledgerId});
		console.log("result",result)
	})
</script>

<style>
	       
</style>
