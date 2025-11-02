<template>
	<view>
		<view>
			<van-nav-bar title="我的" left-text="返回" left-arrow @click-left="onClickLeft">
			</van-nav-bar>
		</view>

		<view class="user">
			<van-image class="photo" round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="" />
			<view class="user_info">
				<view class="name">
					132123132
				</view>
				<view class="ID">
					ID:132132132
				</view>
			</view>
		</view>

		<view class="settings">
			<van-cell-group inset>
				<van-cell title="分类" is-link size="large" />
				<van-cell title="导入" is-link size="large" />
				<van-cell title="导出" is-link size="large" />
				<van-cell title="分类统计" is-link size="large" />
				<van-cell title="日趋" is-link size="large" />
				<van-cell title="月度收支" is-link @click="link" size="large" />
			</van-cell-group>
			<van-cell-group inset>
				<van-cell title="设置" is-link size="large" />
				<van-cell title="意见" is-link size="large" />
			</van-cell-group>
		</view>
		<view>
			<ButtomBarVue></ButtomBarVue>
		</view>
	</view>

</template>

<script setup>
	import {
		ref
	} from 'vue';
	import ButtomBarVue from '../../components/ButtomBar.vue';
	const onClickLeft = () => {
		history.back()
	}

	const link = () => {
		uni.navigateTo({
			url: '/pages/mine_list/queryByDate'
		});
	}
</script>

<style scoped>
	.user {
		display: flex;
		height: 200rpx;
		margin: 20rpx 60rpx;
		border-radius: 8rpx;
		background-color: aquamarine;
	}

	.photo {
		width: 5rem;
		height: 5rem;
		margin: 20rpx;
	}

	.user_info {
		display: flex;
		flex-direction: column;
		gap: 10rpx;
		padding: 50rpx 0;
	}

	.name {
		font-weight: bold;
	}

	.ID {
		color: grey;
	}

	.log {
		width: 100%;
		height: 100rpx;
		background-color: black;
	}

	.settings {
		/* background-color: black; */
		margin: 40rpx;
		border-radius: 40rpx;
		/* height: 800rpx; */
	}

	.van-cell-group {
		margin-top: 30rpx;
	}

	.van-cell {}
</style>