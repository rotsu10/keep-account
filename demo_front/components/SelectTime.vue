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
	    :min-date="minDate" 
	    :max-date="maxDate"
		@cancel = "onCancel"
		@confirm = "onConfirm"
	  />
	</van-popup>
</template>

<script setup>
	import {ref} from 'vue';
	import { onMounted } from 'vue';
	import { http } from '../utils/request';
	console.log("当前时间",new Date());
	
	const minDate = ref(new Date());
	const maxDate = ref(new Date());

	// 控制弹出层显示状态
	const showPicker = ref(false);
	//格式后显示日期
	const fieldValue = ref('');
	//备份，存储上一次确认的curDateArr值
	

	//获取当前日期，数组
	const getCurDateArr = ()=>{
		const now = new Date();
		return [
				now.getFullYear().toString(),
				(now.getMonth() + 1).toString().padStart(2, '0'),
				now.getDate().toString().padStart(2, '0')
		];
	};
	
	const curDateArr = ref(getCurDateArr());
	const confirmedDateArr = ref([...curDateArr.value]);
	
	//确认
	const onConfirm = (value) => {
	    showPicker.value = false;
		confirmedDateArr.value = [...curDateArr.value]; //备份最新的确认的值
	    fieldValue.value = formatDateText(curDateArr.value);
	};
	
	const onCancel = () => {
		showPicker.value = false;
		curDateArr.value = [...confirmedDateArr.value]; // 放弃临时选择，回滚
	};
	
	//获取当前时间 对象
	const getCurTime = async()=>{
	        try{
	            const result = await http.get("/user/queryCreateTime",{},{loadingText:'加载中'});
	            const [year, month, day, hour, minute, second] = result; 
	            const date = new Date(year, month - 1, day, hour, minute, second);
				console.log("date等于：",date);
	            return date;
	        }catch(err){
	            console.error('获取时间失败', err);
	            return null;
	        }
	    };
	
	
	
	//格式化日期
	const formatDateText = (dateArr) =>{
		return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
	}
	
	onMounted(async ()=>{
	    const date = await getCurTime();
	    if(date){
	        minDate.value = date;
	    }
	//初始化字段显示
	fieldValue.value = formatDateText(curDateArr.value);
	confirmedDateArr.value = [...curDateArr.value];
	})
</script>