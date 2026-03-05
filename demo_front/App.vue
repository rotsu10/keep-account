<template>
  <!-- 核心：必须有template标签，且包含uniapp的页面出口 -->
  <view id="app">
    <!-- uni-app 页面挂载容器，不可删除 -->
    <router-view v-if="$route"/>
  </view>
</template>

<script>
// Vue3兼容选项式API，uniapp的生命周期钩子（onLaunch/onShow）保持不变
export default {
  // uniapp 应用级生命周期（全局只触发一次）
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>
/* 每个页面公共css */
#app {
  width: 100%;
  height: 100%;
}
</style>