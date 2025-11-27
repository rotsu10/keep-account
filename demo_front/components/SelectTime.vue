<template>
	<van-field
	  v-model="fieldValue"
	  is-link
	  readonly
	  label="日期"
	  @click="showPicker = true"
	/>
	<van-popup v-model:show="showPicker" round position="bottom">
	  <van-date-picker
	    v-model="curDateArr" 
	    title="选择日期" 
		:columns-type="columnsType"
		@cancel = "onCancel"
		@confirm = "onConfirm"
	  />
	</van-popup>
</template>

<script setup>
	import {ref} from 'vue';
	import { onMounted } from 'vue';
	import { http } from '../utils/request';
	import dayjsTool from '../utils/dayjsTool';
	console.log("当前时间",new Date());
	
	const columnsType = ['year', 'month'];
	// 控制弹出层显示状态
	const showPicker = ref(false);
	//格式后显示日期
	const fieldValue = ref('');
	const emit = defineEmits(['select-date']);
	
	//当前时间 数组
	const getArr = ()=>{
		const arr =  ref(dayjsTool.timeArr(new Date()));
		const curDateArr = ref([arr.value[0], arr.value[1]]);
		return curDateArr;
	} 
	const curDateArr = getArr();
	const confirmedDateArr = ref([...curDateArr.value]);
	
	//确认
	const onConfirm = (value) => {
	    showPicker.value = false;
		confirmedDateArr.value = [...curDateArr.value]; //备份最新的确认的值
	    fieldValue.value = formatDateText(curDateArr.value) ;
		//触发emit，传递时间数据
		emit('select-date',{
				year:  parseInt(curDateArr.value[0]),
				month: parseInt(curDateArr.value[1])
			}
		)
	};
	
	const onCancel = () => {
		showPicker.value = false;
		curDateArr.value = [...confirmedDateArr.value]; // 放弃临时选择，回滚
	};
	
	//格式化日期
	const formatDateText = (dateArr) =>{
		return `${dateArr[0]}-${dateArr[1]}`;
	}
	
	onMounted(async ()=>{
	//初始化字段显示
	fieldValue.value = formatDateText(curDateArr.value);
	confirmedDateArr.value = [...curDateArr.value];
	})
</script>