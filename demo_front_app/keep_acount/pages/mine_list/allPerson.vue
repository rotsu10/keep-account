<template>
	<view>
	    <up-navbar
	        title="所有人统计"
	        :autoBack="true"
			class="nav"
			:placeholder="true"
	    >
			<template #right>
				<up-icon name="info-circle" size="23" @click="show=true"></up-icon>
			</template>
	    </up-navbar>
	</view>
	<view>
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
			<view class="empty" v-if="balanceList.length == 0">
				<up-empty text="暂无数据" mode="list"></up-empty>
			</view>
		</up-list>
	</view>
	<view>
		<up-modal :show = "show" @confirm="show = false">
			只展示多人账本统计数据
		</up-modal>
	</view>
	
</template>
<script setup>
	import {onMounted, ref } from 'vue';
	import { computeBalance } from '../../api/bill';
	const show = ref(false)
	const balanceList = ref([])
	
	const getBalance = async()=>{
		const computeBalanceRes = await computeBalance();
		balanceList.value = computeBalanceRes;
		console.log("balanceList",balanceList.value.length)
		console.log("balanceList",balanceList.value)
	}
	onMounted(()=>{
		getBalance();
	})
</script>
<style scoped>
	.empty{
		padding-top: 200rpx;
	}
</style>