<template>
	<view>
		<up-row>
			<up-col span="5">
				<up-cell title="收入" :label="String(income || 0)"/>
			</up-col>
			<up-col span="5">
				<up-cell title="支出" :label="String(expense || 0)"/>
			</up-col>
			<up-col span="5">
				<up-cell title="合计" :label="String(total || 0)" />
			</up-col>
		</up-row>
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
		total: {
			type: Number,
			default: 0
		}
	});
	console.log("月度账单props：", props);
</script>

<style scoped>
	.up-col {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>