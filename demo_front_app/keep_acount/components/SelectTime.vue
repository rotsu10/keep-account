<template>
  <!-- 外层套一个“点击遮罩层”，全区域可点 -->
  <view class="time-box">
    <!-- 真正的输入框 -->
    <up-input 
      placeholder="请选择日期" 
      readonly
      suffixIcon="calendar"
      :modelValue="displayDate"
      inputAlign="center"
    />

    <!-- 这个 view 是“透明点击层”，覆盖在输入框上面，保证 100% 能点 -->
    <view 
      class="click-overlay" 
      @click="showTimeSelect"
    ></view>

    <!-- 时间选择器 -->
    <up-datetime-picker
      :show="show"
      mode="year-month"
      @confirm="onConfirm"
      @cancel="show = false"
      :modelValue="curDateArr"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const show = ref(false);
const emit = defineEmits(['select-date']);

const curDateArr = ref(dayjs().valueOf());
const displayDate = ref(dayjs().format('YYYY-MM'));

const showTimeSelect = () => {
  show.value = true;
};

const onConfirm = (value) => {
  const time = value.value;
  
  curDateArr.value = time;
  displayDate.value = dayjs(time).format('YYYY-MM');

  emit('select-date', {
    date: displayDate.value,
    year: dayjs(time).year(),
    month: dayjs(time).month() + 1
  });

  show.value = false;
};
</script>

<style scoped>
.time-box {
  width: 100%;
  position: relative;
}

.click-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>