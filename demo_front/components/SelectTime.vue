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
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { http } from '../utils/request';
import dayjsTool from '../utils/dayjsTool';
import dayjs from 'dayjs';

console.log("当前时间", new Date());

// 1. 年月选择器配置
const columnsType = ['year', 'month'];

// 2. 控制弹出层显示状态
const showPicker = ref(false);

// 3. 格式后显示日期
const fieldValue = ref('');

// 4. 定义自定义事件，传递选择的日期
const emit = defineEmits(['select-date']);

const getInitDateArr = () => {
	const dateArr = dayjs().toArray();
	dateArr[1] = dateArr[1] + 1;
	console.log("dateArr",dateArr)
  // const dateArr = dayjsTool.timeArr(new Date());
  return ref([dateArr[0], dateArr[1]]);
};
const curDateArr = getInitDateArr();

const confirmedDateArr = ref([...curDateArr.value]);

// 5. 确认选择
const onConfirm = (value) => {
  showPicker.value = false;
  confirmedDateArr.value = [...curDateArr.value]; // 备份最新的确认的值
  fieldValue.value = formatDateText(curDateArr.value);
  // 触发emit，传递时间数据
  emit('select-date', {
    year: parseInt(curDateArr.value[0]),
    month: parseInt(curDateArr.value[1])
  });
};

// 6. 取消选择（回滚日期）
const onCancel = () => {
  showPicker.value = false;
  curDateArr.value = [...confirmedDateArr.value]; // 放弃临时选择，回滚
};

// 7. 格式化日期显示
const formatDateText = (dateArr) => {
  return `${dateArr[0]}-${dateArr[1]}`;
};

onMounted(() => {
  console.log("curDateArr.value", curDateArr.value);
  // 初始化字段显示
  fieldValue.value = formatDateText(curDateArr.value);
  console.log("fieldValue", fieldValue.value);
});
</script>