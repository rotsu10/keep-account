<template>
	<view>
		<view class="clascustom-nav">
			<van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
		</view>
		<view>
			<van-cell-group inset>
			    <van-cell title="账本名称" :value="ledgerStore.ledgerName" />
				<van-cell title="创建时间" :value="ledgerStore.createTime" />
			  	<van-cell title="创建者ID" :value="ledgerStore.ownerId" />
			  	<van-cell title="创建者" :value="ledgerStore.ownerName" />
			  	<van-cell title="账单数量" :value="ledgerStore.billCount" />
			  	<van-cell title="总收入" :value="ledgerStore.totalIncomeAmount" />
			  	<van-cell title="总支出" :value="ledgerStore.totalOutcomeAmount" />
			</van-cell-group>
		</view>
		
	</view>
</template>

<script setup>
	import { onMounted,ref } from 'vue';
	import { useLedgerStore } from '../../stores/useLedgerStore';
	
	const onClickLeft = () => uni.navigateBack();
	
	const ledgerStore = useLedgerStore();

	const ledgerId = uni.getStorageSync('ledgerId');
	onMounted(async()=>{
		const result =await ledgerStore.queryLedgerDetailByID({ledgerId});
		console.log("result",result)
	})

</script>

<style>
	       
</style>
