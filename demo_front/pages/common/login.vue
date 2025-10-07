<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="login">
			<van-cell-group inset>
			  <van-field v-model="value" label="文本" placeholder="请输入用户名" />
			  <van-field v-model="password" type="password" label="密码" />
			</van-cell-group>
		</view>
		<view class="button_login">
			<van-button round type="primary" size="normal" to="/pages/home/home">登录</van-button>
		</view>
	</view>
	
</template>

<script>
	import { ref } from 'vue';
	export default {
		data() {
			return {
				title: 'Hello，欢迎使用'
			}
		},
		setup() {
		    const value = ref('');
			 const password = ref('');
		    return { value,password };
		},
		onLoad() {

		},
		methods: {

		}
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
</style>
