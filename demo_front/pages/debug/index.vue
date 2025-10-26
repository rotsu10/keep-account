<template>
  <view>
    <!-- 引入并使用组件，传递 props 和事件 -->
    <CalendarVue 
      :title="title" 
      @click="handleClick"
    />
  </view>
</template>

<script setup>
// 导入组件（Vue3 中无需注册，导入即可使用）
import CalendarVue from '../../components/Calendar.vue'

// 定义 props 数据（使用 ref 或 reactive 管理响应式）
import { ref } from 'vue'
const title = ref('调试标题') // 响应式数据

// 定义事件处理函数
const handleClick = () => {
  console.log('点击了组件（Vue3 调试）')
}
</script>