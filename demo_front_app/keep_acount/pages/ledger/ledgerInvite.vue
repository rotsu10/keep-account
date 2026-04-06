<template>
	<view style="padding:5rpx 25rpx;">
		<!-- uview-plus 列表 -->
		<up-list
			v-model:loading="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			:immediate-check="false"
		>
			<!-- 邀请列表项 -->
			<up-cell
				v-for="item in list"
				:key="item.id"
				:title= "`账本名称:${item.ledgerName}`"
				:value="`账本ID:${item.id}`"
				:label="`邀请人:${item.inviterName || '未知'}`"
				arrow="right"
				style="margin-bottom: 8px;border-radius: 4px;"
			>
				<template #right-icon>
					<up-button
						type="primary"
						size="small"
						@click="handleInviteAction(item.id,1)"
					>
						接受
					</up-button>
					<up-button
						type="primary"
						size="small"
						@click="handleInviteAction(item.id,2)"
						style="margin: 0 20rpx"
					>
						拒绝
					</up-button>
				</template>
			</up-cell>
		</up-list>
		
		<view class="empty" v-if="list.length === 0 && finished">
			<up-empty text="暂无邀请消息" mode="list"></up-empty>
		</view>
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
	// 加载状态
	const loading = ref(false);
	// 是否加载完成
	const finished = ref(false);

	// 获取邀请列表核心方法
	const getPendingList = async () => {
		try {
			loading.value = true;
			const result = await pendingList();
			console.log("账本邀请列表result", result);
			list.value = result || [];
		} catch (error) {
			console.error("获取账本邀请列表失败：", error);
			uni.showToast({
				title: '获取邀请列表失败',
				icon: 'none'
			});
		} finally {
			loading.value = false;
			finished.value = true;
		}
	}

	const onLoad = () => {
		if (!finished.value) {
			getPendingList();
		}
	}
		
	const handleInviteAction = async(inviteId,status) => {
		console.log("处理邀请",inviteId,status)
		try{
			if(status == 1){
				await acceptInvite(inviteId);
			}
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
	.empty {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 28rpx;
	}
</style>