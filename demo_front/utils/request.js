<script>
import { userApi } from '@/api/user';

export default {
  setup() {
    const login = async () => {
      uni.showLoading({ title: '登录中...' });
      
      try {
        const userData = await userApi.login({
          username: username.value,
          password: password.value
        });
        
        uni.showToast({ title: "登录成功" });
        uni.setStorageSync('token', userData.token);
        uni.redirectTo({ url: '/pages/home/home' });
        
      } catch (error) {
        uni.showToast({ title: error.message, icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    };
  }
}
</script>