<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="login">
			<van-cell-group inset>
			  <van-field v-model="username"   label="用户名" placeholder="请输入用户名" />
			  <van-field v-model="password"   type="password" label="密码" />
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
import { http } from '../../utils/request';
import { API_PATH } from '../../api/api';
const title = ref('Hello，欢迎使用');
const username = ref('');
const password = ref('');


const login = async () => {
  // 非空校验
  if (!username.value.trim()) {
    uni.showToast({ title: '请输入用户名', icon: 'none' });
    return; 
  }
  if (!password.value.trim()) {
    uni.showToast({ title: '请输入密码', icon: 'none' });
    return;
  }

  const data = {
    username: username.value.trim(),
    password: password.value.trim(),
  };

  try {
    const result = await http.post(API_PATH.USER.LOGIN, data);
    

    uni.showToast({ title: "登录成功" });
    
    uni.setStorageSync('token', result.token);
    uni.setStorageSync('ledgerId', result.ledgerId);
    
    console.log("token是：", result.token);
    console.log("ledgerId是：", result.ledgerId);
    uni.reLaunch({ url: '/pages/home/home' });
    
  } catch (error) {
    console.error('登录异常：', error); 
  }
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

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center; 
		justify-content: center; 
		min-height: 100vh; 
		padding: 0 50rpx; 
		box-sizing: border-box;
	}

	.text-area {
		margin-bottom: 60rpx;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.login {
		width: 100%;
		max-width: 600rpx; 
		margin-bottom: 60rpx; 
	}
	
	.button_login {
		display: flex;
		justify-content: center; 
		align-items: center;
		gap: 40rpx; 
		width: 100%;
	}
	
	.van-button{
		flex: none; 
	}
</style>