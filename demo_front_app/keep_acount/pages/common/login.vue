<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>

		<!-- uView Plus 表单区域 -->
		<view class="login">
			<up-form>
				<up-form-item>
					<up-input v-model="username" placeholder="请输入用户名" border="surround" label="用户名"></up-input>
				</up-form-item>
				<up-form-item>
					<up-input v-model="password" placeholder="请输入密码" border="surround" label="密码" password></up-input>
				</up-form-item>
			</up-form>
		</view>

		<!-- 按钮区域 -->
		<view class="button_login">
			<up-button round type="primary" size="normal" @click="login">登录</up-button>
			<up-button round type="primary" size="normal" @click="register">注册</up-button>
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
	const title = ref('Hello，欢迎使用');
	const username = ref('');
	const password = ref('');


	const login = async () => {
		// 非空校验
		if (!username.value.trim()) {
			uni.showToast({
				title: '请输入用户名',
				icon: 'none'
			});
			return;
		}
		if (!password.value.trim()) {
			uni.showToast({
				title: '请输入密码',
				icon: 'none'
			});
			return;
		}

		const data = {
			username: username.value.trim(),
			password: password.value.trim(),
		};

		try {
			const result = await http.post(API_PATH.USER.LOGIN, data);


			uni.showToast({
				title: "登录成功"
			});

			uni.setStorageSync('token', result.token);
			uni.setStorageSync('ledgerId', result.ledgerId);

			console.log("token是：", result.token);
			console.log("ledgerId是：", result.ledgerId);
			uni.reLaunch({
				url: '/pages/home/home'
			});

		} catch (error) {
			console.error('登录异常：', error);
		}
	};

	const register = () => {
		uni.navigateTo({
			url: "/pages/common/register",
			success: () => {
				uni.showToast({
					title: "请输入相关信息",
					icon: 'none'
				})
			},
			fail: (err) => {
				console.log("跳转失败", err)
			}
		})
	}
</script>


<style lang="scss" scoped>
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

	.van-button {
		flex: none;
	}
</style>