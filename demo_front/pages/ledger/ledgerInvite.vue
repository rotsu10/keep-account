<template>
	<view style="padding: 10px;">
		<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
			:immediate-check="false">
			<!-- 空数据提示 -->
			<view v-if="!loading && list.length === 0" style="text-align: center; padding: 30px 0;">
				暂无待处理的账本邀请
			</view>

			<!-- 邀请列表项 -->
			<van-cell v-for="item in list" :key="item.id" :title="`账本邀请 ${item.id}`"
				:label="`邀请人ID：${item.inviterId || '未知'}`" arrow="right">
			</van-cell>
		</van-list>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		pendingList
	} from '../../api/invite';

	// 邀请列表
	const list = ref([]);
	// 加载状态（van-list 绑定）
	const loading = ref(false);
	// 是否加载完成（标记无更多数据）
	const finished = ref(false);

	// 获取邀请列表核心方法
	const getPendingList = async () => {
		try {
			loading.value = true; // 开始加载，显示加载中状态
			const result = await pendingList();
			console.log("账本邀请列表result", result);
			list.value = result || []; // 兜底，防止返回 null/undefined
			console.log("账本邀请列表list", list.value);
		} catch (error) {
			console.error("获取账本邀请列表失败：", error);
			uni.showToast({
				title: '获取邀请列表失败',
				icon: 'none'
			});
		} finally {
			loading.value = false; // 结束加载，隐藏加载中状态
			finished.value = true; // 标记加载完成，显示“没有更多了”（无需分页）
		}
	}

	// van-list 的 load 事件（适配组件触发逻辑，无需额外处理）
	const onLoad = () => {
		// 因为不需要分页，仅在首次触发时调用加载方法（防止重复调用）
		if (!finished.value) {
			getPendingList();
		}
	}

	// 组件挂载时触发首次加载
	onMounted(() => {
		getPendingList();
	});
</script>

<style>
	/* 可选：调整列表样式，提升体验 */
	.van-cell {
		margin-bottom: 8px;
		border-radius: 4px;
	}
</style>