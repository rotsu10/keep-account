<template>
	<view style="padding: 10px;">
		<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
			:immediate-check="false">
			

			<!-- 邀请列表项 -->
			<van-cell v-for="item in list" :key="item.id" :title="`账本邀请 ${item.id}`"
				:label="`邀请人ID：${item.inviterId || '未知'}`" arrow="right">
				<van-button type="primary" size="small" @click="handleInviteAction(item.id,1)">
					接受
				</van-button>
				<van-button type="primary" size="small" @click="handleInviteAction(item.id,2)" :style="{ margin: '0 20rpx' }">
					拒绝
				</van-button>
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
		acceptInvite,
		pendingList,
		rejecttInvite
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


	const onLoad = () => {
		if (!finished.value) {
			getPendingList();
		}
	}
		
	const handleInviteAction = async(inviteId,status) => {
		console.log("处理邀请",inviteId,status)
		// 接受
		try{
			if(status == 1){
				await acceptInvite(inviteId);
			}
			//拒绝
			if(status == 2){
				await rejecttInvite(inviteId);
			}
		}catch(error){
			console.error("处理邀请失败error",error);
		}finally{
			getPendingList();
		}
	}
	
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