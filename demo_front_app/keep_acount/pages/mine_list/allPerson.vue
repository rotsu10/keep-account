<template>
	<view>
	    <up-navbar
	        title="所有人统计"
	        :autoBack="true"
			class="nav"
			:placeholder="true"
	    >
	    </up-navbar>
	</view>
	<up-list>
		<up-list-item v-for="(item, index) in balanceList" :key="index">
			<up-card :title="item.userName">
				<template #body>
					<div>ID：{{ item.userId}}</div>
					<div>参与结余：{{ item.participateBalance }}</div>
					<div>付款/收款：{{ item.billBalance }}</div>
					<div>汇总：{{ item.total }}</div>
				</template>
			</up-card>
		</up-list-item>
	</up-list>
</template>
<script setup>
	import {onMounted, ref } from 'vue';
	import { computeBalance } from '../../api/bill';
	const balanceList = ref([])
	
	const getBalance = async()=>{
		const computeBalanceRes = await computeBalance();
		balanceList.value = computeBalanceRes;
	}
	onMounted(()=>{
		getBalance();
	})
</script>
<style scoped></style>