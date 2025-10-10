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
		<van-button round type="primary" size="normal" @click="register">提交</van-button>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const username = ref('');
	const phone = ref('');
	const password = ref('');
	
	const register = ()=>{
		//非空校验
		if(!username.value||!phone.value||!password.value){
			uni.showToast({
				title:'请将信息填写完整',
				icon:'none'
			})
		}
		
		//发送请求
		uni.request({
			url:'http://localhost:8080/user/register',
			method:'POST',
			header:{'Content-Type':'application/json'},
			data:{
				username:username.value,
				phone:phone.value,
				password:password.value
			},
			success:(res)=>{
				const{statusCode,data:result} = res;
				if(statusCode !== 200){
					uni.showToast({title:`请求失败，${statusCode}`,icon:'none'});
					return;
				}
				if (!result) {
					uni.showToast({ title: "接口返回空数据", icon: "none" });
					return;
				}
				
				if(result.code ===1){
					uni.showToast({title:'注册成功，欢迎使用',icon:'none'}),
					uni.setStorageSync('token', result.data.token); 
					uni.redirectTo({url:'/pages/home/home'})
				}else{
					uni.showToast({ title: result.message, icon: 'none' });
				}
			},
			fail:(error)=>{
				console.error('请求失败',error);
				uni.showToast({ title: '网络错误，请检查跨域和后端服务', icon: 'none' });
			}
		})
	}
</script>

<style>
	.register_button{
		display: flex;
		justify-content: center; 
	}
</style>
