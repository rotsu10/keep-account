<template>
	<view>
		  <van-cell-group inset>
		    <van-field
		      v-model="username"
		      required
		      important
		      label="用户名"
		    />
		    <van-field
		      v-model="phone"
		      required
		      important
		      label="手机号"
		    />
			<van-field
			v-model="password" 
			required 
			important 
			type="password" 
			label="密码"
			/>
		  </van-cell-group>
	</view>
	<view class="register_button">
		<van-button round type="primary" size="normal">注册</van-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		setup() {
			const username = ref('');
			const phone = ref('');
			const password = ref('');
			return {username,phone,password};
		}
	}
</script>

<style>
	.register_button{
		display: flex;
		justify-content: center; 
	}
</style>
