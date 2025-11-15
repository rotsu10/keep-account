<template>
	<view class="selected">
		<van-row gutter="20" justify="center">
			<van-field v-model="fieldValue" is-link readonly label="选择"  placeholder="选择时间和范围" @click="showPicker = true" />

			<van-popup v-model:show="showPicker" round position="bottom">
				<van-picker :columns="columns" @cancel="showPicker = false"
					@confirm="onConfirm" />
			</van-popup>
		</van-row>
	</view>
	<view>


	</view>
</template>

<script setup>
	import {computed,ref} from 'vue';
	
	const emit = defineEmits(['time-range']);
	
	const getCurDate = () => {
		const now = new Date();
		return [
			now.getFullYear().toString(),
			(now.getMonth() + 1).toString().padStart(2, '0'),
			(now.getDate().toString().padStart(2, '0'))
		];
	};

	const getCurDateArr = ref(getCurDate());
	const columns = [
		[{
				text: '本年',
				value: getCurDateArr.value[0]
			},
			{
				text: '本月',
				value: getCurDateArr.value[1]
			},
			{
				text: '本日',
				value: getCurDateArr.value[2]
			}
		],
		[{
				text: '收入',
				value: '1'
			},
			{
				text: '支出',
				value: '2'
			},
			{
				text: '转账',
				value: '3'
			}
		]
	]

	const showPicker = ref(false);
	const fieldValue = ref('');
	const onConfirm = ({
		selectedOptions
	}) => {
		console.log("选择数据为：",selectedOptions)
		sendToParent(selectedOptions);
		showPicker.value = false;
		fieldValue.value = `${selectedOptions[0].text} / ${selectedOptions[1].text}`;
	};
	
	const sendToParent = (selectedOptions) => {
	  emit('time-range', {
		  time: selectedOptions[0],
		  type: selectedOptions[1]
	  }); 
	};
</script>

<style scoped>
</style>