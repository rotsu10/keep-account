<template>
	<view>
		<a-space :size="12">
			<a-select v-model:value="type">
				<a-select-option value="date">Date</a-select-option>
				<a-select-option value="month">Month</a-select-option>
				<a-select-option value="year">Year</a-select-option>
			</a-select>
			<template v-if="type != ''">
				<a-date-picker :picker="type" v-model:value="selectedDate" :format="getFormat"
					value-format="YYYY-MM-DD" />
			</template>

			<a-select ref="select" v-model:value="categoryType" style="width: 120px">
				<a-select-option value="">全部</a-select-option>
				<a-select-option value="1">收入</a-select-option>
				<a-select-option value="2">支出</a-select-option>
				<a-select-option value="3">转账</a-select-option>
			</a-select>
		</a-space>
	</view>
</template>

<script setup>
	import {
		computed,
		ref,
		watch
	} from 'vue';
	import dayjs from 'dayjs';

	const type = ref('year');
	const selectedDate = ref('');
	const categoryType = ref('');
	const emit = defineEmits(['sendDate']);

	const getFormat = computed(() => {
		switch (type.value) {
			case 'year':
				return 'YYYY';
			case 'month':
				return 'YYYY-MM';
			case 'date':
				return 'YYYY-MM-DD';
			default:
				return 'YYYY-MM-DD';
		}
	});

	// 监听type变化
	// watch(type, () => {
	// 	selectedDate.value = '';
	// });

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
	
	watch([selectedDate, categoryType], () => {
		console.log("categoryType",categoryType);
		triggerEmit();
	});
</script>