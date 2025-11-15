<template>
	<view class="selected">
		<van-row gutter="20" justify="center">
			<van-col span="10">
				<van-field v-model="timeValue" is-link readonly label="时间范围"
					@click="openPicker('time')" />
			</van-col>
			<van-col span="10">
				<van-field v-model="typeValue" is-link readonly label="类型"
					@click="openPicker('type')" />
			</van-col>
			
			<van-popup v-model:show="showPicker" round position="bottom">
				<van-picker :columns="currentColumns" @cancel="showPicker = false" :default-index="0" @confirm="onConfirm" />
			</van-popup>
		</van-row>
	</view>
	<view>


	</view>
</template>

<script setup>
	import {
		computed,
		ref
	} from 'vue';

	const getCurDate = () => {
		const now = new Date();
		return [
			now.getFullYear().toString(),
			(now.getMonth() + 1).toString().padStart(2, '0'),
			(now.getDate().toString().padStart(2, '0'))
		];
	};

	const getCurDateArr = ref(getCurDate());
	const columnsTime = [{
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
	];
	const columnsType = [{
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
	];
	
	const showPicker = ref(false);
	const currentField = ref('');
	const timeValue = ref('');
	const typeValue = ref('');

	const currentColumns = computed(()=>{
		if(currentField.value === 'time'){
			return columnsTime;
		}else if(currentField.value === 'type'){
			return columnsType;
		}
		return [];
	})
	
	const openPicker = (field) => {
		currentField.value = field;
		showPicker.value = true;
	};
	
	const onConfirm = ({ selectedOptions }) => {
		showPicker.value = false;
		const selected = selectedOptions[0];

		if (currentField.value === 'time') {
			timeValue.value = selected.text;
			console.log("选择的时间范围:", selected.value);
		} else if (currentField.value === 'type') {
			typeValue.value = selected.text;
			console.log("选择的类型:", selected.value);
		}
	};
</script>

<style scoped>
	:deep(.van-field) {
	  margin-right: 0 !important;
	  padding-right: 0 !important;
	}

</style>