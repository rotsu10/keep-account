<template>
  <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="balanceList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card :title="item.userName">
          <div>ID：{{ item.userId}}</div>
          <div>参与结余：{{ item.participateBalance }}</div>
          <div>付款/收款：{{ item.billBalance }}</div>
          <div>汇总：{{ item.total }}</div>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
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