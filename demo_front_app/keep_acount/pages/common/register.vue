<template>
	<view class="content">
		<!-- uView Plus 表单 -->
		<view class="form-box">
			<up-form>
				<up-form-item>
					<up-input v-model="username" label="用户名" placeholder="请输入用户名" border="surround" required></up-input>
				</up-form-item>

				<up-form-item>
					<up-input v-model="phone" label="手机号" placeholder="请输入手机号" border="surround" required></up-input>
				</up-form-item>

				<up-form-item>
					<up-input v-model="password" label="密码" placeholder="请输入密码" border="surround" password
						required></up-input>
				</up-form-item>
			</up-form>
		</view>

		<!-- 注册按钮 -->
		<view class="register_button">
			<up-button round type="primary" size="normal" @click="userRegister">注册</up-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		http
	} from '../../utils/request';
	import {
		API_PATH
	} from '../../api/api';
	const username = ref('');
	const phone = ref('');
	const password = ref('');
	const userRegister = async () => {
		if (!username.value.trim() || !phone.value.trim() || !password.value.trim()) {
			uni.showToast({
				title: '请填写完整信息',
				icon: 'none',
			})
			return;
		}
		if (!/^1[3-9]\d{9}$/.test(phone.value.trim())) {
			uni.showToast({
				title: '手机号格式不正确',
				icon: 'none'
			});
			return;
		}
		try {
			const sendData = {
				username: username.value.trim(),
				phone: phone.value.trim(),
				password: password.value.trim()
			}
			// const result = await http.post('/user/register',sendData);
			const result = await http.post(API_PATH.USER.REGISTER, sendData);
			console.log("注册成功result:", result);
			uni.setStorageSync('token', result.token)
			uni.navigateTo({
				url: '/pages/common/login'
			});
		} catch (error) {
			console.error("注册失败，请重试:", error.message);
			uni.showToast({
				title: error.message,
				icon: 'error'
			})
		}
	}
</script>

<style scoped>
	.register_button {
		display: flex;
		justify-content: center;
		margin: 60rpx 0rpx;
	}
	
	.content{
		padding: 60rpx;
	}
</style>