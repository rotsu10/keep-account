<template>
	<view>
		<a-space :size="12">
			<a-select v-model:value="type">
				<a-select-option value="date">Date</a-select-option>
				<a-select-option value="month">Month</a-select-option>
				<a-select-option value="year">Year</a-select-option>
			</a-select>
			<template v-if="type != ''" >
				<a-date-picker :picker="type" v-model:value="selectedDate" />
			</template>
		</a-space>
	</view>
</template>
<script setup>
	import {ref, watch} from 'vue';
	import dayjsTool from '../utils/dayjsTool';
	// 1. 绑定下拉选择的类型
	const type = ref('date');
	// 2. 绑定时间选择器的选中值 时分秒
	const selectedTime = ref('');
	// 3. 绑定日期选择器的选中值
	const selectedDate = ref('');
	const emit = defineEmits(['sendDate']);
	//监听type
	watch( type,(newType) =>{
			selectedDate.value = '';
		}
	);
	
	//监听有效数据
	watch(
		()=>selectedDate.value,
		(newValue) =>{
			if (!newValue) return;
			const data = {
				type: type.value,
				value: newValue.$d,
			};
			
			emit('sendDate', data);
		}
	)
</script>