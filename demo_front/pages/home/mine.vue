<template>
	<view>
		<view>
			<van-nav-bar title="我的">
			</van-nav-bar>
		</view>

		<view class="user">
			<van-image class="photo" round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="" />
			<view class="user_info">
				<view class="name">
					{{ userName }}
				</view>
				<view class="ID">
					ID:{{ id }}
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
	import {onMounted,ref} from 'vue';
	import ButtomBarVue from '../../components/ButtomBar.vue';
	import {http} from '../../utils/request';
	const userName = ref('');
	const id = ref('');
	const link = () => {
		uni.navigateTo({
			url: '/pages/mine_list/queryByDate'
		});
	}

	const getUserInfo = async () => {
		try {
			const res = await http.get("/user/getUserInfo", {}, {});
			console.log("用户详细信息res:", res);
			userName.value = res.username;
			id.value = res.id;
		} catch (err) {
			console.log("获取用户信息失败");
			showToast({
				message: '网络异常，请稍后重试',
				type: 'error'
			});
		}
	}

	onMounted(() => {
		getUserInfo();
	});
</script>

<style scoped>
	.user {
		display: flex;
		height: 200rpx;
		margin: 20rpx 60rpx;
		border-radius: 8rpx;
		background-color: #e0e2d9;
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