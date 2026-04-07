<script setup>
import { onLaunch} from '@dcloudio/uni-app'
onLaunch(() => {
  const token = uni.getStorageSync('token')

  if (token) {
    // 已登录 → 跳首页（tab页）
    uni.switchTab({
      url: '/pages/home/home'
    })
  } else {
    // 未登录 → 跳登录页
    uni.reLaunch({
      url: '/pages/login/login'
    })
  }
})
</script>

<style lang="scss">
/* 样式区：只写样式和导入样式，不要写任何 JS！ */
@import "uview-plus/index.scss";

/* 全局公共样式 */
page {
  background-color: #f5f5f5;
}
</style>