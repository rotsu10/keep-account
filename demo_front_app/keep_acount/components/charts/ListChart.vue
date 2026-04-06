<template>
	<view>
		<!-- 关闭自动加载，仅做展示 -->
		<up-list
			v-model:loading="loading"
			:finished="true"  
			:immediate-check="false"
		>
			<up-cell
				v-for="item in list"
				:key="item.id"
				:label="`${item.categoryName}`"
				:title="`${item.type === 1 ? '+' : '-'}${item.amount}`"
				:value="dayjs(item.createTime).format('YYYY/MM/DD')"
				@click="goToBillDetail(item.id)"
			/>
		</up-list>

		<!-- 分页器 -->
		<view class="pagination-box">
			<up-pagination
				prevText="上一页"
				nextText="下一页"
				:current-page="currentPage"
				:page-size="pageSize"
				:total="total"
				layout="prev, total, next"
				@current-change="handleCurrentChange"
			/>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		watch,
		onMounted,
		onUnmounted
	} from 'vue';
	import dayjs from 'dayjs';
	import { http } from '../../utils/request.js'
	import { API_PATH } from '../../api/api.js';

	const props = defineProps(['type', 'timeType', 'timeValue']);

	const loading = ref(false);
	const list = ref([]);
	const currentPage = ref(1);
	const pageSize = ref(10);
	const total = ref(0);

	const handleCurrentChange = (page) => {
		console.log('切换页码:', page);
		currentPage.value = page;
		loadData(); // 切换后重新加载
	};

	const loadData = async () => {
		if (loading.value) return;

		try {
			loading.value = true;
			const params = {
				type: props.type,
				timeType: props.timeType,
				timeValue: props.timeValue,
				page: currentPage.value,
				pageSize: pageSize.value
			};

			const { records, total: totalCount } = await http.post(API_PATH.BILL.LIST_CHART, params);
			
			list.value = records || [];
			total.value = totalCount || 0;
			console.log("查询的结果",list.value)
			console.log("查询的结果",total.value)
		} catch (err) {
			console.error("加载失败", err);
		} finally {
			loading.value = false;
		}
	};

	// 跳转账单详情
	const goToBillDetail = (billId) => {
		uni.navigateTo({
			url: `/pages/record/billDetail?id=${billId}`
		});
	};

	// 重置
	const resetPagination = () => {
		currentPage.value = 1;
		total.value = 0;
		list.value = [];
		loading.value = false;
	};

	// 刷新
	const getNewList = () => {
		resetPagination();
		loadData();
	};

	// 监听筛选条件变化
	watch(
		() => [props.type, props.timeType, props.timeValue],
		() => {
			resetPagination();
			loadData();
		},
		{ deep: true, immediate: true }
	);

	onMounted(() => {
		uni.$on("deleteBill", getNewList);
		uni.$on("addBill", getNewList);
		uni.$on("updateBill", getNewList);
	});

	onUnmounted(() => {
		uni.$off('deleteBill', getNewList);
		uni.$off('addBill', getNewList);
		uni.$off('updateBill', getNewList);
	});

	defineExpose({ resetPagination });
</script>

<style scoped>
.pagination-box {
	padding: 20rpx;
	display: flex;
	justify-content: center;
}
</style>