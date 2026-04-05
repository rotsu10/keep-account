<template>
	<view>
		{{type}}{{value2}}
		<view class="dropdown-row">
			<up-dropdown class="dropdown-item">
				<up-dropdown-item 
					:title="dateTypeTitle" 
					:options="options1"
					@change="onDateTypeChange">
				</up-dropdown-item>
			</up-dropdown>
			
			<up-dropdown class="dropdown-item">
				<up-dropdown-item 
					:title="incomeTypeTitle" 
					:options="options2"
					@change="onIncomeTypeChange">
				</up-dropdown-item>
			</up-dropdown>
		</view>
		
		<view>
		   <up-datetime-picker
		   	hasInput
		   	v-model="selectedDate"
		   	:format="getFormat"
		   	:mode="pickerMode"
		   	class="select-time"
		   />
		</view>
	</view>
	
	
</template>

<script setup>
	import {
		computed,
		ref,
		watch
	} from 'vue';
	import dayjs from 'dayjs';
	
	const dateTypeTitle = ref('日期类型')
	const incomeTypeTitle = ref('收支类型')
	const type = ref('year')
	const value2 = ref(1)
	const options1  = ref([
		{label: '每年',value: 'year',},
		{label: '每月',value: 'year-month',},
		{label: '每日',value: 'date',}
	])
	const options2 = ref([
		{label: '收入',value: 1,},
		{label: '支出',value: 2,},
	]);
	
	const onDateTypeChange = (value) => {
		const selected = options1.value.find(item => item.value === value)
		dateTypeTitle.value = selected ? selected.label : '日期类型'
		console.log("type",value);
		type.value=value;
	}
		
	const onIncomeTypeChange = (value) => {
		const selected = options2.value.find(item => item.value === value)
		incomeTypeTitle.value = selected ? selected.label : '收支类型'
		console.log("value2",value);
		value2.value=value;
	}
	
	const categoryType = ref('');
	const selectedDate = ref('year');
	const emit = defineEmits(['sendDate']);
	
	const pickerMode = computed(() => {
		switch (type.value) {
			case 'year':
				return 'date'   // 用 date + format 控制
			case 'month':
				return 'year-month'
			case 'date':
				return 'date'
			default:
				return 'date'
		}
	})
	
	
	const getFormat = computed(() => {
		switch (type.value) {
			case 'year':
				return 'YYYY'
			case 'month':
				return 'YYYY-MM'
			case 'date':
				return 'YYYY-MM-DD'
			default:
				return 'YYYY-MM-DD'
		}
	})

	// 发送数据的函数
	const triggerEmit = () => {
		if (!selectedDate.value) return;

		let finalValue = selectedDate.value;
		const dateObj = dayjs(selectedDate.value);

		if (dateObj.isValid()) {
			switch (type.value) {
				case 'year':
					finalValue = dateObj.format('YYYY');
					break;
				case 'month':
					finalValue = dateObj.format('YYYY-MM');
					break;
				case 'date':
					finalValue = dateObj.format('YYYY-MM-DD');
					break;
			}
		}

		const data = {
			type: type.value,
			value: finalValue,
			categoryType: categoryType.value
		};
		emit('sendDate', data);
	};
	
	watch([selectedDate, categoryType],
	 () => {
		triggerEmit();
	});
</script>



<style scoped>
.dropdown-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx; /* 元素之间的间距 */
}

.dropdown-item {
	flex: 1; /* 平均分配宽度 */
}

.datetime-item {
	flex: 1;
}

.select-time{
	width: 50%;
}
</style>