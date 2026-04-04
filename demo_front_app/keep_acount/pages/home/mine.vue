<!-- 我的 -->
<template>
	<view>
		<view class="user">
			<!-- <up-image class="photo" round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="头像" /> -->
			<view class="user_info">
				<view class="name">
					{{ userName }}
				</view>
				<view class="ID">
					ID:{{ id }}
				</view>
			</view>
		</view>


		<view>
			<view class="ledger" @click="goToLedgerDetail">
				<!-- <up-row justify="center" align="center" class="ledger-title-row">
					<up-col span="24" class="ledger_title">账本信息</up-col>
				
				</up-row>

				<up-row justify="space-around" align="left" class="ledger-data-row">
					<up-col span="12">账本名称:{{ ledgerStore.ledgerName }}</up-col>
				</up-row>
				<up-row justify="space-around" align="left" class="ledger-data-row">
					<up-col span="12">创建时间:{{ dayjs(ledgerStore.createTime).format('YYYY/MM/DD') }}</up-col>
				</up-row>
				<up-divider
				  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
				>
				</up-divider>
				<up-row justify="space-around" align="center" class="ledger-data-row">
					<up-col span="12">创建者:{{ ledgerStore.ownerName }}</up-col>
					<up-col span="12" @click="queryLedgerBill" >账单数量:{{ ledgerStore.billCount }}</up-col>
				</up-row>
				<up-row justify="space-around" align="center" class="ledger-data-row">
					<up-col span="12">总收入:{{ ledgerStore.totalIncomeAmount }}</up-col>
					<up-col span="12">总支出:{{ ledgerStore.totalOutcomeAmount }}</up-col>
				</up-row> -->
			</view>
		</view>
		
		

		<view class="settings">
			<up-cell-group inset>
				<!-- <up-cell title="分类" is-link size="large" /> -->
				<!-- <up-cell title="导入" is-link size="large" /> -->
				<up-cell title="分类统计" is-link @click="navigateTo('/pages/mine_list/categoryStatistics')"size="large" />
				<up-cell title="月度收支" is-link @click="navigateTo('/pages/mine_list/queryByDate')" size="large" />
				<up-cell title="邀请通知" is-link @click="navigateTo('/pages/ledger/ledgerInvite')"size="large" />
				<up-cell title="统计" is-link  @click="navigateTo('/pages/mine_list/allBillStastics')" size="large" />
				<up-cell title="所有人统计收支" is-link  @click="navigateTo('/pages/mine_list/allPerson')" size="large" />
			</up-cell-group>
			<up-cell-group inset>
				<up-cell title="设置" is-link size="large" />
				<up-cell title="意见" is-link size="large" />
			</up-cell-group>
		</view>
	</view>

</template>

<script setup>
	import dayjs from 'dayjs';
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		http
	} from '../../utils/request';
	import {
		API_PATH
	} from '../../api/api';
	import {
		useLedgerStore
	} from '../../stores/useLedgerStore';
	const ledgerStore = useLedgerStore();
	const userName = ref('');
	const id = ref('');

	const navigateTo = (url) => {
		if (url) {
			uni.navigateTo({
				url: url
			});
		}
	}

	const getUserInfo = async () => {
		try {
			// const res = await http.get("/user/getUserInfo", {}, {});
			const res = await http.get(API_PATH.USER.INFO)
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
	//查询账本详情
	const goToLedgerDetail = () =>{
		const url = `/pages/ledger/ledgerDetail`;
		uni.navigateTo({
			url:url,
		})
	}
	
	// 查询账本下所有账单
	const queryLedgerBill = ()=>{
		
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

	.up-cell-group {
		margin-top: 30rpx;
	}

	/* 账本样式 */
	.ledger {
		display: flex;
		flex-direction: column;
		/* 改为纵向排列，让行上下分布 */
		height: 350rpx;
		margin: 20rpx 60rpx;
		border-radius: 8rpx;
		background-color: #e0e2d9;
		padding: 20rpx;
		/* 加内边距，避免内容贴边 */
		box-sizing: border-box;
		/* 内边距不影响总高度 */
	}

	/* 账本标题行样式 */
	.ledger-title-row {
		flex: 0 0 auto;
		/* 标题行高度自适应内容 */
		margin-bottom: 20rpx;
		/* 和下方数据拉开距离 */
	}

	/* 账本信息标题样式 */
	.ledger_title {
		height: 50rpx;
		line-height: 50rpx;
		/* 垂直居中 */
		text-align: center;
		/* 水平居中 */
		font-size: 32rpx;
		/* 标题字号放大，更醒目 */
		font-weight: bold;
		/* 加粗 */
	}

	/* 账本数据行样式 */
	.ledger-data-row {
		flex: 0 0 auto;
		margin-bottom: 10rpx;
	}

	/* 数据列样式（可选，优化文字显示） */
	.ledger-data-row .up-col {
		text-align: center;
		/* 列内文字居中 */
		font-size: 26rpx;
		color: #333;
	}
</style>