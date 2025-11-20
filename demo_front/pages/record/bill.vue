<template>
	<van-cell-group inset>
		<van-field v-model="productPrice" type="number" number="9.2" label="商品价格" placeholder="限制9位整数2位小数" />
		<van-field v-model="message" rows="1" autosize label="备注" type="textarea" placeholder="请输入备注" />
	</van-cell-group>

	<van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '16px 16px' }">分类
	</van-divider>

	<van-radio-group v-model="categoryId" class="radio-group">
		<van-radio v-for="category in categoryList" :key="category.id" :name="category.id">
			{{category.name}}
		</van-radio>
	</van-radio-group>

	<van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '16px 16px' }">支付类型
	</van-divider>

	<van-radio-group v-model="payType" class="radio-group">
		<van-radio name="1">收入</van-radio>
		<van-radio name="2">支出</van-radio>
	</van-radio-group>
	<!-- <van-button type="primary" round size = 'large' @click = addCount>添加</van-button> -->
	<van-button type="primary" round size="large" @click='handleSubmit'>添加</van-button>
</template>


<script setup>
	import {
		ref
	} from 'vue';
	import {
		http
	} from '@/utils/request.js'; // 导入请求工具
	import {
		onMounted,
		watch
	} from 'vue';
	import { showToast } from 'vant';
	import {
		storeToRefs
	} from 'pinia';
	import { useBillStore } from '../../stores/useBillStore';
	
	const billStore = useBillStore();
	// 定义页面数据
	const productPrice = ref(''); // 商品价格
	const message = ref(''); // 备注
	const payType = ref('2'); // 支付类型 1.收入  2.支出 默认支出
	//查询所有分类
	const categoryId = ref(''); // 选中的单选框值
	const categoryList = ref([]);




	// 添加按钮点击事件
	const handleSubmit = async() => {
		if (!productPrice.value) {
			showToast({
				title: '请输入商品价格',
				icon: 'none'
			});
			return;
		}
		if (!categoryId.value) {
			showToast({
				title: '请选择分类',
				icon: 'none'
			});
			return;
		}
		if (!payType.value) {
			showToast({
				title: '请选择类型',
				icon: 'none'
			});
			return;
		}

		try {
			await billStore.addBill({
				amount: productPrice.value,
				remark: message.value,
				categoryId: categoryId.value,
				type: payType.value
			})
			showToast({
				title: '添加成功',
				icon: 'success'
			});
			productPrice.value = '';
			message.value = '';
			categoryId.value = '';
			payType.value = '2';
		} catch (error) {
			console.error('提交失败:', error);
			showToast({
				title: error.message || '添加账单失败，请稍后重试',
				icon: 'none'
			});
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
		categoryId.value = '';
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