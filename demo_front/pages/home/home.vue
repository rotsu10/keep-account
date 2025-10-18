<template>
	<view>
		<!-- 页面内容 -->
		<view class="content">
			<van-button icon="plus" type="primary" round class="plus" @click="plusAccountPage"/>
		</view>
		
		<!-- 固定在底部的布局 -->
		<view class="fixed-bottom">
			<van-row justify="center" class="buttom_law">
			  <van-col span="6">首页</van-col>
			  <van-col span="6" @click="categoryPage">分类</van-col>
			  <van-col span="6">我的</van-col>
			</van-row>
		</view>

	</view>
</template>

<script setup>
	const plusAccountPage = ()=>{
		uni.navigateTo({
			url:'/pages/record/bill',
			success: () => {
				uni.showToast({
					title:'请填写相关信息',
					icon:'none'
				})
			},
			fail:(err)=>{
				console.log("跳转失败:",err)
			}
		})
	}
	const categoryPage = ()=>{
		uni.navigateTo({
			url:'/pages/record/category',
			success:()=>{
				console.log("跳转页面成功")
			},
			fail:(err)=>{
				uni.showToast({
					title: '跳转页面失败，请重试',
					icon:'none'
				});
			}
		})
	}
</script>

<style>
.fixed-bottom {
	position: fixed;
	bottom: 0;
	height: 80rpx;
	width: 100%;
	background-color: #ffffff;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	z-index: 999;
}

.van-col{
	height: 80rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
/* 确保页面内容不被底部栏遮挡 */
.content {
	padding-bottom: 60px; /* 根据底部栏高度调整 */
}

.plus{
	position: fixed;
	bottom: 20%;
	right: 0;
}
</style>
