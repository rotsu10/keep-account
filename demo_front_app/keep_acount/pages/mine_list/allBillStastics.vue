<template>
	<view>
		<!-- 筛选下拉菜单 -->
		<up-dropdown>
			<up-dropdown-item v-model="value1" title="付款人" :options="option1" />
			<up-dropdown-item v-model="value2" title="收支类型" :options="option2" />
			<up-dropdown-item v-model="value3" title="付款模式" :options="option3" />
		</up-dropdown>

		<!-- 实际收支统计 -->
		<up-row v-if="value3 === 'multiple' && value1 != 0">
			<up-col span="5">
				<up-cell-group>
					<up-cell title="实际收入" :label="String(income || 0)" />
				</up-cell-group>
			</up-col>
			<up-col span="5">
				<up-cell-group>
					<up-cell title="实际支出" :label="String(expense || 0)" />
				</up-cell-group>
			</up-col>
			<up-col span="5">
				<up-cell-group>
					<up-cell title="结余" :label="String(balance || 0)" />
				</up-cell-group>
			</up-col>
		</up-row>
		
		

		<!-- 参与收支统计 -->
		<up-row v-if="value3 === 'multiple' && value1 != 0">
			<up-col span="5">
				<up-cell-group>
					<up-cell title="参与收入" :label="String(participateIncome || 0)" />
				</up-cell-group>
			</up-col>
			<up-col span="5">
				<up-cell-group>
					<up-cell title="参与支出" :label="String(participateExpense || 0)" />
				</up-cell-group>
			</up-col>
			<up-col span="5">
				<up-cell-group>
					<up-cell title="结余" :label="String(participateBalance || 0)" />
				</up-cell-group>
			</up-col>
		</up-row>
		
		<view class="empty-center" v-if="!loading && list.length === 0">
			<up-empty text="暂无账单" mode="list" />
		</view>

		
		<!-- 列表 -->
		<up-list
			v-model:loading="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<up-cell
				v-for="item in list"
				:key="item.id"
				:title="item.categoryName"
				:label="item.billType"
				:value="item.type === 1 ? '+' + item.amount : '-' + item.amount"
				@click="goBillDetail(item.id)"
			/>
		</up-list>
		
		
	</view>
</template>

<script setup>
	import { onMounted, ref, watch } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	import { getAllLedgerUser } from '../../api/ledger';
	import { queryBillByUserType, computeAmount, computeParticipateAmount } from '../../api/bill';

	// 筛选
	const value1 = ref(0);
	const value2 = ref(0);
	const value3 = ref(null);
	const option1 = ref([]);
	const option2 = ref([
		{ label: '全部收支', value: 0 },
		{ label: '收入', value: 1 },
		{ label: '支出', value: 2 },
	]);
	const option3 = ref([
		{ label: '全部模式', value: null },
		{ label: '个人账单', value: 'single' },
		{ label: '多人账单', value: 'multiple' },
	]);

	// 统计
	const income = ref(0);
	const expense = ref(0);
	const balance = ref(0);
	const participateIncome = ref(0);
	const participateExpense = ref(0);
	const participateBalance = ref(0);

	// 列表
	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false);
	const pageNum = ref(1);
	const pageSize = ref(15);

	// 统计收入支出
	const getStasticsAmount = async () => {
		const userId = value1.value;
		if (userId === 0) {
			income.value = 0;
			expense.value = 0;
			balance.value = 0;
			participateIncome.value = 0;
			participateExpense.value = 0;
			participateBalance.value = 0;
			return;
		}
		try {
			const computeAmountResult = await computeAmount(userId);
			const myData = computeAmountResult.find(item => item.userId === userId) || {};
			income.value = myData.totalIncome || 0;
			expense.value = myData.totalExpend || 0;
			balance.value = myData.totalBalance || 0;

			const res = await computeParticipateAmount(userId);
			const partData = res.find(item => item.userId === userId) || {};
			participateIncome.value = partData.totalIncome || 0;
			participateExpense.value = partData.totalExpend || 0;
			participateBalance.value = partData.totalBalance || 0;
		} catch (error) {
			console.error('统计报错', error);
		}
	};

	// 获取用户列表
	const getAllUser = async () => {
		try {
			const userList = await getAllLedgerUser();
			const userOptions = userList.map(user => ({
				label: user.username,
				value: user.id,
			}));
			option1.value = [{ label: '全部人员', value: 0 }, ...userOptions];
		} catch (error) {
			console.error(error);
		}
	};

	// 获取账单列表
	const getbillList = async () => {
		loading.value = true;
		try {
			const data = {
				userId: value1.value,
				type: value2.value,
				billType: value3.value,
				page: pageNum.value,
				pageSize: 10,
			};
			const result = await queryBillByUserType(data);
			
			if (pageNum.value === 1) {
				list.value = result.records;
			} else {
				list.value.push(...result.records);
			}
			if (result.records.length < pageSize.value) {
				finished.value = true;
			}
			console.log("查询list",list.value)
			console.log("查询list",list.value.length)
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	};

	// 上拉加载
	const onLoad = async () => {
		if (finished.value) return;
		pageNum.value++;
		await getbillList();
	};

	// 重置刷新
	const resetAndRefresh = () => {
		list.value = [];
		pageNum.value = 1;
		finished.value = false;
		getbillList();
	};

	// 跳转详情
	const goBillDetail = (billId) => {
		uni.navigateTo({
			url: `/pages/record/billDetail?id=${billId}`,
		});
	};

	onShow(() => {
		resetAndRefresh();
	});

	onMounted(() => {
		getAllUser();
	});

	watch([value1, value2, value3], ([new1, new2, new3]) => {
		resetAndRefresh();
	}, { immediate: true });

	watch([value1], ([new1]) => {
		getStasticsAmount();
	});
</script>

<style scoped>
	.up-col {
		display: flex;
		justify-content: center;
	}
	.empty-center {
		display: flex;
		justify-content: center; 
		align-items: center;
		margin-top: 300rpx; 
	}
	
	
</style>