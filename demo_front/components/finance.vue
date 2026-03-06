<template>
	<view>
		<van-row>
			<van-col span="8">
				<van-cell-group>
					<van-cell title="收入" :label="income" />
				</van-cell-group>
			</van-col>
			<van-col span="8">
				<van-cell-group>
					<van-cell title="支出" :label="expense" />
				</van-cell-group>
			</van-col>
			<van-col span="8">
				<van-cell-group>
					<van-cell title="转账" :label="transfer" />
				</van-cell-group>
			</van-col>
		</van-row>
	</view>
</template>

<script setup>
	import { defineProps } from 'vue';
	const props = defineProps({
		income: {
			type: Number,
			default: 0
		},
		expense: {
			type: Number,
			default: 0
		},
		transfer: {
			type: Number,
			default: 0
		}
	});
	console.log("月度账单props：", props);
</script>

<style scoped>
	.van-col {
		display: flex;
		justify-content: center;
	}
</style>