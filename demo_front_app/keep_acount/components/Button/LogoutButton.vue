<template>
	<view>
		<up-button @click="handleClick()">退出登录</up-button>
		<up-modal 
			:show="show" 
			title="确定退出"
			showCancelButton
			@cancel="show=false"
			@confirm="userLogout()"
		></up-modal>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import {logout} from '../../api/user.js'
	
	const show = ref(false)
	const handleClick = ()=>{
		show.value = true
	}
	
	const userLogout = async()=>{
		try{
			await logout()
			uni.removeStorageSync("token");
			uni.removeStorageSync("ledgerId");
		}catch(error){
			console.error("退出登录失败", error)
		}finally{
			uni.reLaunch({
				url: "/pages/common/login"
			})
		}
	}
</script>

<style>
	       
</style>