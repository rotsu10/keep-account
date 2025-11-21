<template>
	<view>
		<van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '16px 16px' }">选择分类
		</van-divider>
		
		<van-radio-group v-model="targetCategoryId" class="radio-group">
			<van-radio v-for="category in categoryList" :key="category.id" :name="category.id">
				{{category.name}}
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
	import {ref} from 'vue';
	import {http} from '@/utils/request.js'; // 导入请求工具
	import {onMounted,watch} from 'vue';
	import { showToast } from 'vant';
	import { useCategoryStore } from '../../stores/useCategoryStore';
	import { defineProps } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	const categoryStore = useCategoryStore();

	// 定义页面数据
	const payType = ref('2'); // 支付类型 1.收入  2.支出 默认支出
	//查询所有分类
	const targetCategoryId = ref(''); // 目标分类
	const sourceCategoryId = ref(''); //原分类
	const categoryList = ref([]);
	
	onLoad((option) => {
		const categoryId = option.categoryId;
		console.log('接收来自上一页的分类ID：', categoryId);		
		sourceCategoryId.value = categoryId;
	});
	

	// 添加按钮点击事件
	const handleSubmit = async() => {
		if (!targetCategoryId.value) {
			uni.showToast({
				title: '请选择分类',
				icon: 'none'
			});
			return;
		}
		if (!payType.value) {
			uni.showToast({
				title: '请选择类型',
				icon: 'none'
			});
			return;
		}
		const deleteCategoryData={
			id:sourceCategoryId.value,
			strategy:'move',
			targetCategoryId:targetCategoryId.value
		}
		try{
			await categoryStore.deleteCategory(deleteCategoryData);
		}catch(err){
			console.log("转移数据错误",err);
		}
	}

	//根据类型获取所有分类数据
	const getCategoryList = async () => {
		try {
			const res = await http.get(`/user/queryCategoryByType?type=${payType.value}`);
			console.log("根据类型获取所有分类数据res:", res);
			categoryList.value = res;
		} catch (err) {
			console.log("根据类型获取所有分类数据err", err)
		}
	}

	//监测payType
	watch(payType, (newVal) => {
		getCategoryList();
		targetCategoryId.value = '';
	});

	onMounted(() => {
		getCategoryList();
	});
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