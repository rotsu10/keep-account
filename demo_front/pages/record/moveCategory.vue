<template>
    <view>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '16px 16px' }">选择分类
        </van-divider>
        
        <van-radio-group v-model="targetCategoryId" class="radio-group">
            <van-radio v-for="category in categoryList" :key="category.id" :name="category.id">
                {{ category.name }}
            </van-radio>
        </van-radio-group>
        
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '16px 16px' }">支付类型
        </van-divider>
        
        <van-radio-group v-model="payType" class="radio-group">
            <van-radio name="1">收入</van-radio>
            <van-radio name="2">支出</van-radio>
            <van-radio name="3">转账</van-radio>
        </van-radio-group>
        <van-button type="primary" round size="large" @click='handleSubmit'>添加</van-button>
    </view>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';
    import { useCategoryStore } from '../../stores/useCategoryStore';
    import { storeToRefs } from 'pinia';
    import { onLoad } from '@dcloudio/uni-app';

    const categoryStore = useCategoryStore();
    const { categoryList } = storeToRefs(categoryStore);

    // 定义页面数据
    const payType = ref('2'); // 默认支出
    const targetCategoryId = ref(''); // 目标分类
    const sourceCategoryId = ref(''); // 原分类

    // 页面加载时接收参数
    onLoad((option) => {
        const categoryId = option.categoryId;
        sourceCategoryId.value = categoryId;
    });

    // 监听 payType 变化，调用 store 的 action 获取新数据
    watch(payType, (newVal) => {
        if (newVal) {
            categoryStore.fetchCategoriesByType(newVal);
            targetCategoryId.value = ''; // 重置选择
        }
    });

    // 组件挂载时，根据默认的 payType 获取分类
    onMounted(() => {
        categoryStore.fetchCategoriesByType(payType.value);
    });

    // 添加按钮点击事件
    const handleSubmit = async () => {
        if (!targetCategoryId.value) {
            uni.showToast({ title: '请选择分类', icon: 'none' });
            return;
        }
        if (!payType.value) {
            uni.showToast({ title: '请选择类型', icon: 'none' });
            return;
        }
        const deleteCategoryData = {
            id: sourceCategoryId.value,
            strategy: 'move',
            targetCategoryId: targetCategoryId.value
        };
        try {
            await categoryStore.deleteCategory(deleteCategoryData);
            uni.showToast({ title: '操作成功' });
            uni.navigateBack();
        } catch (err) {
            console.error("转移数据错误:", err);
            uni.showToast({ title: err.message || '操作失败，请重试', icon: 'none' });
        }
    };
</script>

<style scoped>
    .radio-group {
        display: flex;
        flex-wrap: wrap;
        gap: 15rpx;
        padding: 0 16rpx;
    }

    .van-radio {
        flex: 0 0 calc(33.333% - 10rpx);
        margin: 0;
        box-sizing: border-box;
    }

    .van-button {
        margin: 30rpx 16rpx;
    }
</style>