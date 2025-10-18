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
	const username = ref('');
	const phone = ref('');
	const password = ref('');
	const userRegister = ()=>{
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
		uni.request({
			url:'http://localhost:8080/user/register',
			method:'POST',
			header: { 'Content-Type': 'application/json' },
			data:{
				username:username.value,
				phone:phone.value,
				password:password.value
			},
			success:(res)=>{
				const {statusCode,data:result} = res;
			
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
			},
			
		})
	}
</script>

<style scoped>
	.register_button{
		display: flex;
		justify-content: center; 
	}
</style>
