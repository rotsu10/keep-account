<template>
	<view>		
		<!-- 固定在底部的布局 -->
		<view class="fixed-bottom">
			<van-row justify="center" class="buttom_law">
			  <van-col span="6" @click="goHome">首页</van-col>
			  <van-col span="6" @click="categoryPage">分类</van-col>
			  <van-col span="6" @click="goMine">我的</van-col>
			</van-row>
		</view>
	</view>
	
	
</template>

<script setup>
	const goHome = ()=>{
		uni.navigateTo({
			url:'/pages/home/home',
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
	
	const goMine = ()=>{
		uni.navigateTo({
			url:'/pages/home/mine',
			success:()=>{
				console.log("我的")
			},
			fail:(err)=>{
				uni.showToast({
					title:'跳转失败，请重试',
					icon:'none'
				})
			}
		})
	}
</script>

<style scoped>
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
</style>
