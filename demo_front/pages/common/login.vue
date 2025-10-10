<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="login">
			<van-cell-group inset>
			  <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
			  <van-field v-model="password" type="password" label="密码" />
			</van-cell-group>
		</view>
		<view class="button_login">
			<van-button round type="primary" size="normal" @click="login">登录</van-button>
			<van-button round type="default" size="normal" @click="register">注册</van-button>
		</view>
	</view>
	
</template>

<script setup>
import { ref } from 'vue';
const title = ref('Hello，欢迎使用');
const username = ref('');
const password = ref('');
//登录
const login = () => {
// 非空校验
if (!username.value) {
  uni.showToast({ title: '请输入用户名', icon: 'none' });
  return; 
}
if (!password.value) {
  uni.showToast({ title: '请输入密码', icon: 'none' });
  return;
}

uni.request({
  url: 'http://localhost:8080/user/login', 
  method: 'POST',
  header: { 'Content-Type': 'application/json' },
  data: {
    username: username.value,
    password: password.value,
  },
  success: (res) => {
    const { statusCode, data: result } = res;
    
    if (statusCode !== 200) {
      uni.showToast({ title: `请求失败, ${statusCode}`, icon: 'none' });
      return;
    }

    if (!result) {
      uni.showToast({ title: "接口返回空数据", icon: "none" });
      return;
    }

    if (result.code === 1) {
        uni.showToast({ title: "登录成功" });
        uni.setStorageSync('token', result.data.token); 
        uni.redirectTo({ url: '/pages/home/home' });
      } else {
        uni.showToast({ title: result.message, icon: 'none' });
      }
	  
    },
    fail: (error) => {
      console.error('请求失败:', error);
      uni.showToast({ title: '网络错误，请检查跨域和后端服务', icon: 'none' });
    }
  });
};

	const register = ()=>{
		uni.navigateTo({
			url:"/pages/common/register",
			success:()=>{uni.showToast({
				title:"请输入相关信息",
				icon:'none'
			})},
			fail:(err)=>{console.log("跳转失败",err)}
		})
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}



	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.van-button{
		margin-right:100rpx ;
	}
</style>
