<template>
	<view>
		<!-- uview-plus 导航栏 -->
		<view class="nav">
			<u-navbar title="账本详情" :autoBack="true" :placeholder="true"/>
		</view>

		<view class="u-p-x-15 u-m-t-15">
			<u-cell-group inset>
				<u-cell title="账本id" :value="ledgerStore.ledgerId" />
				<u-cell title="账本名称" :value="ledgerStore.ledgerName" />
				<u-cell title="创建时间" :value="ledgerStore.createTime" />
				<u-cell title="创建者ID" :value="ledgerStore.ownerId" />
				<u-cell title="创建者" :value="ledgerStore.ownerName" />
				<u-cell 
					title="账单数量" 
					:value="ledgerStore.billCount" 
					@click="queryBillByLedger(ledgerStore.ledgerId)"
					is-link
				/>
				<u-cell title="总收入" :value="ledgerStore.totalIncomeAmount" />
				<u-cell title="总支出" :value="ledgerStore.totalOutcomeAmount" />
				<u-cell 
					title="账本参与者" 
					is-link 
					@click="goToParticipant(ledgerId)"  
				/>
			</u-cell-group>
		</view>
	</view>
</template>

<script setup>
	import { onMounted } from 'vue';
	import { useLedgerStore } from '../../stores/useLedgerStore';
	
	const ledgerStore = useLedgerStore();
	// 从缓存获取账本ID
	const ledgerId = uni.getStorageSync('ledgerId');
	
	// 页面加载获取账本详情
	onMounted(async () => {
		await ledgerStore.queryLedgerDetailByID({ ledgerId });
	})

	// 根据账本ID查询账单
	const queryBillByLedger = (ledgerId, billType) => {
		const queryParams = {
			ledgerId: ledgerId,
			...(billType && { billType: billType })
		};
		uni.navigateTo({
			url:`/pages/record/dailyBillList?params=${encodeURIComponent(JSON.stringify(queryParams))}`
		})
	}
	
	// 跳转到账本参与者页面
	const goToParticipant = (ledgerId) => {
	  uni.navigateTo({
	    url: `/pages/ledger/ledgerParticipant?ledgerId=${ledgerId}`
	  })
	}
</script>

<style scoped>
/* 自定义导航栏样式 */
.clascustom-nav {
	/* 如需自定义可在这里修改 */
}
</style>