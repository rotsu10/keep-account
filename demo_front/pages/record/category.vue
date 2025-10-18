<template>
	<view>
		<view class="clascustom-nav">
			<!-- 导航栏 -->

			<van-nav-bar title="分类" left-text="返回" left-arrow @click-left="onClickLeft">
				<template #right>
					<van-icon name="search" size="18"/>
					<van-icon name="plus" size="18" @click="addCategory" />
				</template>
			</van-nav-bar>
		</view>

		<view class="button">
			<van-button type="default" round size="normal">支出</van-button>
			<van-button type="default" round size="normal">收入</van-button>
			<van-button type="default" round size="normal" disabled>禁用</van-button>
		</view>

		<view>
			<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<van-cell v-for="item in list" :key="item" :title="item" />
				<van-back-top />
			</van-list>
		</view>
		
		<!-- 弹出层 -->
		<van-dialog v-model:show="show" title="分类信息" show-cancel-button>
			<van-field v-model="value" label="" placeholder="请输入分类名"/>
			<van-radio-group v-model="checked" direction="horizontal">
			  <van-radio name="1">收入</van-radio>
			  <van-radio name="2">支出</van-radio>
			  <van-radio name="3">转账</van-radio>
			</van-radio-group>
		</van-dialog>
	</view>

</template>

<script setup>
	import {ref} from 'vue';

	const onClickLeft = () => history.back(); //返回

	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false); //加载

	const show = ref(false) //弹出层
	const checked = ref('1');//type

	const onLoad = () => {
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				list.value.push(list.value.length + 1);
			}
			loading.value = false;
			if (list.value.length >= 40) {
				finished.value = true;
			}
		}, 1000);
	}

	const addCategory = () => {
		show.value = true;
		console.log('弹窗应显示，当前show值：', show.value);
	}
</script>

<style scoped>
	.van-icon {
		padding: 20rpx;
	}

	.button {
		display: flex;
		justify-content: space-between;
		padding: 15rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.van-button {
		margin: 0rpx 20rpx;
		flex: 1;
	}
	
	.van-field{
		margin:10rpx 20rpx;
	}
	
	.van-radio-group{
		display: flex;
		margin: 30rpx 20rpx;
	}
	.van-radio{
		flex: 1;
		display: flex; /* 使内部元素对齐 */
		align-items: center;
		justify-content: center; 
	}
</style>