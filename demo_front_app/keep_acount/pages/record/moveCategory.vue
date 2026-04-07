<template>
  <view>
	  <up-navbar
	      title="转移分类"
	      :autoBack="true"
	  	class="nav"
	  	:placeholder="true"
	  >
	  </up-navbar>
    <!-- 分割线 -->
    <u-divider
      :color="'#1989fa'"
      :border-color="'#1989fa'"
      padding="16px"
    >
      选择分类
    </u-divider>

    <!-- 分类单选组 -->
    <u-radio-group v-model="targetCategoryId" class="radio-group">
      <u-radio
        v-for="category in categoryList"
        :key="category.id"
        :name="category.id"
        shape="circle"
		:label="category.name"
      >
      </u-radio>
    </u-radio-group>

    <!-- 分割线 -->
    <u-divider
      :color="'#1989fa'"
      :border-color="'#1989fa'"
      padding="16px"
    >
      支付类型
    </u-divider>

    <!-- 支付类型单选组 -->
    <u-radio-group v-model="payType" class="radio-group">
      <u-radio name="1" shape="circle" label="收入"></u-radio>
      <u-radio name="2" shape="circle" label="支出"></u-radio>
    </u-radio-group>

    <!-- 按钮 -->
    <u-button
      type="primary"
      round
      size="large"
      @click="handleSubmit"
      custom-style="margin: 30rpx 16rpx"
    >
      添加
    </u-button>
  </view>
</template>
<script setup>
    import { ref, watch, onMounted } from 'vue';
    import { useCategoryStore } from '../../stores/useCategoryStore';
    import { storeToRefs } from 'pinia';
    import { onLoad } from '@dcloudio/uni-app';
	import { queryCategoryByTypeBasic } from '../../api/category';
    const categoryStore = useCategoryStore();
    // const { categoryList } = storeToRefs(categoryStore);

    // 定义页面数据
    const payType = ref('2'); // 默认支出
    const targetCategoryId = ref(''); // 目标分类
    const sourceCategoryId = ref(''); // 原分类
	const categoryList=ref([])
    // 页面加载时接收参数
    onLoad((option) => {
        const categoryId = option.categoryId;
        sourceCategoryId.value = categoryId;
    });

    // 监听 payType 变化，调用 store 的 action 获取新数据
    watch(payType,async (newVal) => {
        if (newVal) {
			await getCategoryList(newVal);
			targetCategoryId.value = ''; // 重置选择
        }
    });

    // 组件挂载时，根据默认的 payType 获取分类
    onMounted(async() => {
		 await getCategoryList(payType.value);
    });
	
	const getCategoryList = async (type) => {
	  try {
	    // 异步接口必须 await
	    const res = await queryCategoryByTypeBasic({ type });
	    console.log('获取分类成功:', res);
	    categoryList.value = res; // 赋值给列表
	  } catch (err) {
	    console.error('获取分类失败:', err);
	    categoryList.value = [];
	  }
	};

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
  /*  .radio-group {
        display: flex;
        flex-wrap: wrap;
        gap: 15rpx;
        padding: 0 16rpx;
    }

    .u-radio {
        flex: 0 0 calc(33.333% - 10rpx);
        margin: 0;
        box-sizing: border-box;
    }

    .u-button {
        margin: 30rpx 16rpx;
    } */
</style>