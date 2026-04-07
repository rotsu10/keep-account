<template>
  <view class="bill-list-container">
    <scroll-view 
      scroll-y
      class="bill-scroll-view"
      :scroll-top="scrollTop"
      :lower-threshold="50"
      @scrolltolower="loadData"
    >
      <up-cell
        v-for="item in list" 
        :key="item.id"
        :label="`${item.categoryName}`"
        :title="`${item.type === 1 ? '+' : '-'}${item.amount}`"
        :value="dayjs(item.createTime).format('MM/DD')"
        @click="goToBillDetail(item.id)"
        class="cell"
      />
      
      <!-- 空状态 -->
      <view v-if="!loading && list.length === 0" class="empty-text">
        暂无账单记录
      </view>
      
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-text">加载中...</view>
      <view v-if="finished && list.length > 0" class="finished-text">没有更多了</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import dayjs from 'dayjs';
import { http } from '../utils/request.js';
import { API_PATH } from '../api/api.js';

const props = defineProps({
    year: { type: Number, required: false },
    month: { type: Number, required: false },
    day: { type: Number, required: false }
});

const loading = ref(false);
const finished = ref(false);
const list = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const scrollTop = ref(0);
const isMounted = ref(true);

// 加载账单数据
const loadData = async () => {
    if (finished.value) return;
    if (loading.value) return;
    
    loading.value = true;
    try {
        const sendDate = {
            year: props.year,
            month: props.month,
            day: props.day,
            page: currentPage.value,
            pageSize: pageSize.value
        };
        
        const { records, total: totalCount } = await http.post(API_PATH.BILL.QUERY_BY_DATE, sendDate);
        total.value = totalCount;
        
        if (currentPage.value === 1) {
            list.value = records;
        } else {
            list.value = [...list.value, ...records];
        }
        
        if (list.value.length >= total.value || records.length === 0) {
            finished.value = true;
        } else {
            currentPage.value++;
        }
    } catch (err) {
        console.error("账单列表查询失败：", err.message);
        uni.showToast({
            title: '加载失败',
            icon: 'none'
        });
    } finally {
        if (isMounted.value) {
            loading.value = false;
        }
    }
};

// 重置分页并刷新
const resetAndRefresh = () => {
    if (!isMounted.value) return;
    resetPagination();
    loadData();
};

// 重置分页状态
const resetPagination = () => {
    currentPage.value = 1;
    total.value = 0;
    list.value = [];
    finished.value = false;
    loading.value = false;
};

// 跳转账单详情
const goToBillDetail = (billId) => {
    uni.navigateTo({
        url: `/pages/record/billDetail?id=${billId}`
    });
};

// 监听筛选条件变化
watch(
    () => [props.year, props.month, props.day],
    () => {
        resetAndRefresh();
    },
    { deep: true }
);

// 组件挂载
onMounted(() => {
    resetAndRefresh();
    
    // 监听账单变更事件
    uni.$on('deleteBill', resetAndRefresh);
    uni.$on('addBill', resetAndRefresh);
    uni.$on('updateBill', resetAndRefresh);
});

// 组件卸载
onUnmounted(() => {
    isMounted.value = false;
    uni.$off('deleteBill', resetAndRefresh);
    uni.$off('addBill', resetAndRefresh);
    uni.$off('updateBill', resetAndRefresh);
});

defineExpose({
    resetPagination,
    refresh: resetAndRefresh
});
</script>

<style scoped>
.bill-list-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 300px;
}

.bill-scroll-view {
    flex: 1;
    height: 100%;
}

.loading-text, 
.finished-text,
.empty-text {
    text-align: center;
    padding: 60rpx;
    color: #999;
    font-size: 28rpx;
}

.empty-text {
    color: #ccc;
}
</style>