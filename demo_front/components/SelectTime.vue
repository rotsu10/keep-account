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
	    :max-date="maxDate"
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
	
	const maxDate = ref(new Date());
	const columnsType = ['year', 'month'];
	// 控制弹出层显示状态
	const showPicker = ref(false);
	//格式后显示日期
	const fieldValue = ref('');
	
	const emit = defineEmits(['select-date']);
	
	//当前时间 数组
	const curDateArr  = ref(dayjsTool.timeArr(new Date()));
	
	//const confirmedDateArr = ref([...curDateArr.value]);
	
	//确认
	const onConfirm = (value) => {
	    showPicker.value = false;
		//confirmedDateArr.value = [...curDateArr.value]; //备份最新的确认的值
	    fieldValue.value = dayjsTool.timeFormat(curDateArr.value);
		//触发emit，传递时间数据
		emit('select-date',{
				year:  parseInt(curDateArr.value[0]),
				month: parseInt(curDateArr.value[1])
			}
		)
	};
	
	const onCancel = () => {
		showPicker.value = false;
		//curDateArr.value = [...confirmedDateArr.value]; // 放弃临时选择，回滚
	};
	
	//获取当前时间 对象
	const getCurTime = async()=>{
	        try{
	            const result = await http.get("/user/queryCreateTime",{},{loadingText:'加载中'});
	            const date = ref(dayjsTool.timeObj(result));
				console.log("date对象等于：",date);
	            return date;
	        }catch(err){
	            console.error('获取时间失败', err);
	            return null;
	        }
	    };
	
	
	
	//格式化日期
	const formatDateText = (dateArr) =>{
		return `${dateArr[0]}-${dateArr[1]}`;
	}
	
	onMounted(async ()=>{
	    const date = await getCurTime();
	
	//初始化字段显示
	fieldValue.value = formatDateText(curDateArr.value);
	//confirmedDateArr.value = [...curDateArr.value];
	})
</script>