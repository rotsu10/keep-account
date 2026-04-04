<template>
	<view>
		<view>
		    <up-navbar title="每日账单" :autoBack="true">
		        <template #right>
		            <view class="navbar-right" @click="onClickRight">
		                <up-icon name="plus" size="20" color="#333"></up-icon>
		            </view>
		        </template>
		    </up-navbar>
		</view>
		
		<view class="page-box">
			<!-- 列表 + 滚动加载 -->
			<up-list v-model:loading="loading" :finished="finished" @load="handleLoad" :pagingEnabled="false"
				:scrollable="true" :lowerThreshold="50" :height="listHeight" @scroll-to-lower="handleLoad"
				@scroll="onScroll">
				<up-cell v-for="item in list" :key="item.id" :title="`${item.type === 1 ? '+' : '-'}${item.amount}`"
					:label="item.categoryName" :value="dayjs(item.createTime).format('YYYY/MM/DD')"
					@click="goToBillDetail(item.id)" @long-press="deleteByLongPress(item.id)" />
		
				<!-- 加载状态提示 -->
				<view v-if="loading" class="loading-tip">加载中...</view>
				<view v-if="finished && list.length > 0" class="finished-tip">没有更多数据了</view>
			</up-list>
		
			<!-- 删除账单弹窗 -->
			<up-modal v-model:show="DialogShow" title="删除账单" show-cancel-button confirm-text="确认删除" cancel-text="取消"
				@confirm="confirmDelete">
				<view class="delete-tip">删除该账单</view>
			</up-modal>
		</view>
	</view>
</template>

<script setup>
	import {
		useBillStore
	} from '../../stores/useBillStore';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		ref,
		computed,
		onMounted
	} from 'vue';
	import dayjs from 'dayjs';
	import {
		deleteBill,
		queryBillByDate
	} from '../../api/bill';
	const billStore = useBillStore();
	const currentDate = ref('');
	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false);
	const currentPage = ref(1);
	const pageSize = ref(12);
	const total = ref(0);
	const DialogShow = ref(false);
	const bill = ref('');
	const listHeight = ref('100vh'); // 列表高度

	// 存储当前页面的查询参数
	const currentQueryParams = ref({});

	// 计算是否还有更多数据
	const hasMore = computed(() => {
		return list.value.length < total.value;
	});

	// 滚动事件监听（用于调试）
	const onScroll = (e) => {
		console.log('滚动位置:', e.scrollTop);
	};

	// 删除账单
	const deleteByLongPress = (billId) => {
		console.log("删除账单item", billId);
		bill.value = billId;
		DialogShow.value = true;
	};

	const confirmDelete = async () => {
		try {
			const data = {
				billId: bill.value,
			};
			await deleteBill(data);
			uni.showToast({
				title: '删除成功',
				icon: 'success'
			});
			uni.$emit("deleteBill");
			refreshList();
			DialogShow.value = false;
		} catch (error) {
			console.error("删除账单失败error", error);
			uni.showToast({
				title: '删除失败',
				icon: 'error'
			});
		}
	};

	// 加载数据
	const loadData = async () => {
		// 防止重复加载
		if (loading.value || finished.value) {
			console.log('阻止重复加载', {
				loading: loading.value,
				finished: finished.value
			});
			return;
		}

		try {
			loading.value = true;
			console.log('开始加载第', currentPage.value, '页');

			const dateParts = currentDate.value.split('-');
			const dateObject = {
				year: parseInt(dateParts[0]),
				month: parseInt(dateParts[1]),
				day: parseInt(dateParts[2]),
				page: currentPage.value,
				pageSize: pageSize.value,
			};

			console.log("请求参数:", dateObject);
			const {
				records,
				total: totalCount
			} = await queryBillByDate(dateObject);

			console.log("返回数据:", {
				recordsLength: records?.length,
				totalCount
			});

			// 处理返回数据
			if (currentPage.value === 1) {
				list.value = records || [];
			} else {
				list.value = [...list.value, ...(records || [])];
			}

			total.value = totalCount || 0;

			// 判断是否加载完成
			if (list.value.length >= total.value) {
				finished.value = true;
				console.log('数据加载完成，没有更多数据了');
			} else {
				// 只有还有数据时才增加页码
				currentPage.value++;
				console.log('下一页页码:', currentPage.value);
			}

		} catch (error) {
			console.error('加载账单失败:', error);
			uni.showToast({
				title: '加载失败',
				icon: 'error'
			});
		} finally {
			loading.value = false;
		}
	};

	// up-list 触发的加载事件
	const handleLoad = () => {
		console.log('handleLoad 被触发', {
			loading: loading.value,
			finished: finished.value,
			currentPage: currentPage.value,
			listLength: list.value.length,
			total: total.value
		});

		if (finished.value) {
			console.log('已完成加载，不再触发');
			return;
		}

		if (loading.value) {
			console.log('正在加载中，跳过');
			return;
		}

		// 调用加载数据
		loadData();
	};

	// 重置分页状态
	const resetPagination = () => {
		console.log('重置分页状态');
		currentPage.value = 1;
		total.value = 0;
		list.value = [];
		finished.value = false;
		loading.value = false;
	};

	// 重新加载列表
	const refreshList = () => {
		resetPagination();
		// 延迟一下再加载，确保状态重置完成
		setTimeout(() => {
			loadData();
		}, 100);
	};

	// 账单详情
	const goToBillDetail = (billId) => {
		console.log("账单id:", billId);
		uni.navigateTo({
			url: `/pages/record/billDetail?id=${billId}`
		});
	};

	onLoad((options) => {
		console.log('页面加载参数:', options);
		currentQueryParams.value = {
			date: options.date || '',
		};

		if (currentQueryParams.value.date) {
			currentDate.value = currentQueryParams.value.date;
		}

		// 获取屏幕高度设置列表高度
		const systemInfo = uni.getSystemInfoSync();
		listHeight.value = systemInfo.windowHeight + 'px';
	});


	const onClickRight = () => {
	    console.log('点击了右侧图标',currentDate.value);
		const targetUrl = `/pages/record/bill?time=${currentDate.value}`;
	    uni.navigateTo({
	        url: targetUrl
	    });
	}
	onShow(() => {
		console.log('页面显示，刷新列表');
		refreshList();
	});

	// 组件挂载完成后的额外处理
	onMounted(() => {
		console.log('组件挂载完成');
	});
</script>

<style scoped>
	.page-box {
		padding-top: 80rpx;
		width: 100%;
		height: 100vh;
		background-color: #f5f5f5;
	}

	.loading-tip,
	.finished-tip {
		text-align: center;
		padding: 30rpx 0;
		font-size: 28rpx;
		color: #999;
		background-color: #f5f5f5;
	}

	.delete-tip {
		text-align: center;
		padding: 40rpx;
		font-size: 32rpx;
		color: #333;
	}

	/* 确保列表容器有明确高度 */
	:deep(.u-list) {
		height: 100%;
	}
</style>