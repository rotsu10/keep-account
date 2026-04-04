<template>
	<view class="content">
		<up-button icon="plus" type="primary" shape="circle" class="plus" @click="plusAccountPage" />
	</view>
</template>

<script setup>
	const props = defineProps({
		time: {
			type: String,
			default: ''
		}
	});
	const plusAccountPage = () => {
		const targetUrl = `/pages/record/bill?time=${props.time}`;
		console.log("拼接后的跳转 URL：", targetUrl);
		uni.navigateTo({
			url: targetUrl,
			success: () => {
				uni.showToast({
					title: '请填写相关信息',
					icon: 'none'
				})
			},
			fail: (err) => {
				console.log("跳转失败:", err)
			}
		})
	}
</script>

<style>
	.plus{
		width: 50rpx;
		height: 50rpx;
		position: fixed;
		bottom: 20%;
		right: 0;
	}
</style>