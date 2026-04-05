<template>
  <!-- 用 up-grid 一行排列：时间选择器 + 两个下拉框 -->
  <view>
  	<up-grid column-num="3" gap="10rpx" class="selcet-time">
  	  <!-- 1. 时间选择器 -->
  	  <up-grid-item @click="calendarShow = true">
  	    <view class="time-box">
  	      {{ showText }}
  	      <up-icon name="calendar" size="24"></up-icon>
  	    </view>
  	  </up-grid-item>
  			
  	  <!-- 2. 日期类型下拉 -->
  	  <up-grid-item>
  	    <up-dropdown>
  	      <up-dropdown-item
  	        v-model="type"
  	        :title="dateLabel"
  	        :options="options1"
  	      />
  	    </up-dropdown>
  	  </up-grid-item>
  	
  	  <!-- 3. 收支类型下拉 -->
  	  <up-grid-item>
  	    <up-dropdown>
  	      <up-dropdown-item
  	        v-model="value2"
  	        :options="options2"
  	        :title="dateLabe2"
  	      />
  	    </up-dropdown>
  	  </up-grid-item>
  	</up-grid>
	<view class="">
		<up-datetime-picker
			v-model="selectedDate"
			:mode="getFormat"
			v-model:show="calendarShow"
			@close="calendarShow = false"
			@confirm="calendarShow = false"
			@cancel="calendarShow = false"
		/>
	</view>
  </view>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';
// 选项直接定义，不需要响应式
const calendarShow = ref(false)
const options1 = [
	{ label: '每年', value: 'year' },
	{ label: '每月', value: 'year-month' },
	{ label: '每日', value: 'date' }
];
const options2 = [
	{label: '全部', value: 0},
	{ label: '收入', value: 1 },
	{ label: '支出', value: 2 }
];

// 直接绑定 value，默认选中【每年 + 收入】
const type = ref('year');
const value2 = ref(0);

// 时间选择器
const selectedDate = ref(dayjs().format('YYYY')); // 默认当前年
const emit = defineEmits(['sendDate']);

// 计算属性自动获取当前选中的label
const dateLabel = computed(() => {
	return options1.find(item => item.value === type.value)?.label || '日期类型';
});
const dateLabe2 = computed(() => {
	return options2.find(item => item.value === value2.value)?.label || '收支类型';
});

const showText = computed(() => {
  const date = dayjs(selectedDate.value);
  if (type.value === 'year') return date.format('YYYY');
  if (type.value === 'year-month') return date.format('YYYY-MM');
  return date.format('YYYY-MM-DD');
});

// 格式化
const getFormat = computed(() => {
	switch (type.value) {
		case 'year':
		case 'year-month':
			return 'year-month';
		case 'date':
			return 'date';
		default:
			return 'YYYY-MM-DD';
	}
});

// 统一发送数据
const triggerEmit = () => {
	if (!selectedDate.value) return;
	let finalValue = selectedDate.value;
	const dateObj = dayjs(selectedDate.value);

	if (dateObj.isValid()) {
		switch (type.value) {
			case 'year':
				finalValue = dateObj.format('YYYY');
				break;
			case 'year-month':
				finalValue = dateObj.format('YYYY-MM');
				break;
			case 'date':
				finalValue = dateObj.format('YYYY-MM-DD');
				break;
		}
	}

	emit('sendDate', {
		type: type.value,
		value: finalValue,
		categoryType: value2.value
	});
};

//修改显示时间
watch(type, (newVal) => {
	const now = dayjs();
	if (newVal === 'year') {
		selectedDate.value = now.format('YYYY');
	} else if (newVal === 'year-month') {
		selectedDate.value = now.format('YYYY-MM');
	} else if (newVal === 'date') {
		selectedDate.value = now.format('YYYY-MM-DD');
	}
});

// 监听变化
watch([type, value2, selectedDate], triggerEmit);
</script>

<style scoped>
	.selcet-time{
		padding-bottom:200rpx;
	}
	.time-box{
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
	
	:deep(.u-dropdown__content__mask) {
		display: none !important;
	}
	
</style>