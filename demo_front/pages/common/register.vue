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
		<van-button round type="primary" size="normal" @click="userRegister">注册</van-button>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import { http } from '../../utils/request';
	const username = ref('');
	const phone = ref('');
	const password = ref('');
	const userRegister =async ()=>{
		if(!username.value || !phone.value || !password.value ){
			uni.showToast({
				title:'请填写完整信息',
				icon:'none',
			})
			return;
		}
		if (!/^1[3-9]\d{9}$/.test(phone.value)) {
		    uni.showToast({ title: '手机号格式不正确', icon: 'none' });
		    return;
		}
		try{
			const sendData = {
				username:username.value,
				phone:phone.value,
				password:password.value
			}
			const result = await http.post('/user/register',sendData);
			console.log("注册成功result:",result);
			uni.setStorageSync('token', result.token)
			uni.navigateTo({ url: '/pages/common/login' });
		}catch(error){
			console.error("注册失败，请重试:",error.message);
			uni.showToast({
				title:error.message,
				icon:'error'
			})
		}
	}
</script>

<style scoped>
	.register_button{
		display: flex;
		justify-content: center; 
	}
</style>
