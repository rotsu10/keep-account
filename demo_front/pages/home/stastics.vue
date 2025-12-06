<template>
	<view>
		<a-space :size="12">
			<a-select v-model:value="type">
				<a-select-option value="time">Time</a-select-option>
				<a-select-option value="date">Date</a-select-option>
				<a-select-option value="week">Week</a-select-option>
				<a-select-option value="month">Month</a-select-option>
				<a-select-option value="quarter">Quarter</a-select-option>
				<a-select-option value="year">Year</a-select-option>
			</a-select>
			<template v-if="type === 'time'" >
				<a-time-picker v-model:value="selectedTime" />
			</template>
			<template v-else>
				<a-date-picker :picker="type" v-model:value="selectedDate" />
			</template>
		</a-space>
	</view>
</template>
<script setup>
	import {ref} from 'vue';
	
	// 1. 绑定下拉选择的类型（默认 time）
	const type = ref('time');
	// 2. 绑定时间选择器的选中值（响应式）
	const selectedTime = ref('');
	// 3. 绑定日期选择器的选中值（响应式）
	const selectedDate = ref('');
	
	const emit = defineEmits('sendDate');
	const date = {
		type:type.value,
		selectedTime:selectedTime.value,
		selectedDate:selectedDate.value
	}
	console.log("时间选择器",date);
	emit('sendDate',date);
	
</script>