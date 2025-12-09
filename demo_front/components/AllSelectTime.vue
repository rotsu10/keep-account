<template>
	<view>
		<a-space :size="12">
			<a-select v-model:value="type">
				<a-select-option value="date">Date</a-select-option>
				<a-select-option value="month">Month</a-select-option>
				<a-select-option value="year">Year</a-select-option>
			</a-select>
			<template v-if="type != ''" >
				<a-date-picker :picker="type" 
				v-model:value="selectedDate"
				:format = "getFormat"
				value-format = "YYYY-MM-DD"
				 />
			</template>
		</a-space>
	</view>
</template>
<script setup>
	import {computed, ref, watch} from 'vue';
	import dayjsTool from '../utils/dayjsTool';
	// 1. 绑定下拉选择的类型
	const type = ref('date');
	// 2. 绑定日期选择器的选中值
	const selectedDate = ref('');
	const emit = defineEmits(['sendDate']);
	
	const getFormat = computed(()=>{
		switch(type.value){
			case 'year' :return 'YYYY';
			case 'month' :return 'YYYY-MM';
			case 'date' :return 'YYYY-MM-DD';
			default: return 'YYYY-MM-DD';
		}
	});
	
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
			let finalValue = newValue;
			if (type.value === 'year') {
				finalValue = newValue.split('-')[0];
			} 
			else if (type.value === 'month') {
				finalValue = newValue.split('-').slice(0, 2).join('-'); 
			}
			const data = {
				type: type.value,
				value: finalValue,
			};
			emit('sendDate', data);
		}
	)
</script>