<!-- 添加账单页面 -->
<template>
	<view>
		<!-- 导航栏 -->
		<view class="nav">
			<van-nav-bar title="添加账本" left-arrow @click-left="onClickLeft">
				<!-- 添加分类 -->
				<template #right >
					<view @click="showAddDialog" class="add-category-btn">
						<van-icon name="plus" size="18"/>
						<view :style="{color:'#1989fa'}">添加分类</view>
					</view>
				</template>
			</van-nav-bar>
		</view>
		<!-- 账单价格,备注 -->
		<van-cell-group inset>
			<van-field v-model="productPrice" type="number" number="9.2" label="商品价格" placeholder="限制9位整数2位小数" />
			<van-field v-model="message" rows="1" autosize label="备注" type="textarea" placeholder="请输入备注" />
		</van-cell-group>

		<!-- 分类 -->
		<van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '16px 16px' }">分类
		</van-divider>
		<van-radio-group v-model="categoryId" class="radio-group">
			<van-radio v-for="category in categoryList" :key="category.id" :name="category.id">
				{{category.name}}
			</van-radio>

		</van-radio-group>

		<!-- 支付类型 -->
		<van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '16px 16px' }">支付类型
		</van-divider>
		<van-radio-group v-model="payType" class="radio-group">
			<van-radio name="1">收入</van-radio>
			<van-radio name="2">支出</van-radio>
		</van-radio-group>

		<!-- 添加 -->
		<!-- <van-button type="primary" round size = 'large' @click = addCount>添加</van-button> -->
		<van-button type="primary" round size="large" @click='handleSubmit'>添加</van-button>
		
		
		<!-- 添加分类弹窗 -->
		<van-dialog
		  v-model:show="show" 
		  title="添加分类" 
		  show-cancel-button 
		  show-confirm-button 
		  @confirm="addCategory"
		>
		  <van-field 
		    v-model="CategoryName" 
		    label="" 
		    placeholder="请输入分类名"
		  />
		</van-dialog>
	</view>
</template>


<script setup>
	// import {http} from '@/utils/request.js'; // 导入请求工具
	import { useCategoryStore } from '../../stores/useCategoryStore';
	import {
		ref,
		onMounted,
		watch
	} from 'vue';
	import {
		storeToRefs
	} from 'pinia';
	import {
		useBillStore
	} from '../../stores/useBillStore';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import dayjs from 'dayjs';
	import {
		API_PATH
	} from '../../api/api';
	import {
		http
	} from '../../utils/request';
	import {
		useLedgerStore
	} from '../../stores/useLedgerStore';
	const ledgerStore = useLedgerStore();
	const billStore = useBillStore();
	const categoryStore = useCategoryStore();
	// 定义页面数据
	const productPrice = ref(''); // 商品价格
	const message = ref(''); // 备注
	const payType = ref('2'); // 支付类型 1.收入  2.支出 默认支出
	//查询所有分类
	const categoryId = ref(''); // 选中的单选框值
	const categoryList = ref([]);
	const createTime = ref('')
	
	//添加分类弹窗
	const show = ref(false) 
	const CategoryName = ref(''); //分类名
	
	onLoad((options) => {
		createTime.value = options.time;
	});

	// 返回
	const onClickLeft = () => uni.navigateBack();
	
	//添加分类
	const showAddDialog = () => {
		show.value = true; // 显示plus弹窗
		CategoryName.value = '';
	};
	const addCategory= async()=>{
		const categoryData ={
			name : CategoryName.value, 
			type : payType.value	
		}
		try{
			await categoryStore.addCategory(categoryData);
			//刷新分类列表
			const result = await categoryStore.queryCategoryType(payType.value);
			categoryList.value = result;
		}catch(err){
			console.error('添加失败：', err.message);
			uni.showToast({
				title:err.message,
				icon:'error'
			})
		}
	}
	
	// 添加按钮点击事件
	const handleSubmit = async () => {
		if (!productPrice.value) {
			uni.showToast({
				title: '请输入商品价格',
				icon: 'none'
			});
			return;
		}
		if (!categoryId.value) {
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

		try {
			await billStore.addBill({
				amount: productPrice.value,
				remark: message.value,
				categoryId: categoryId.value,
				type: payType.value,
				createTime: dayjs(createTime.value).format('YYYY-MM-DD HH:mm:ss')
			})
			const ledgerId = uni.getStorageSync("ledgerId");
			const result = await ledgerStore.queryLedgerDetailByID({
				ledgerId
			});
			uni.showToast({
				title: '添加成功',
				icon: 'success'
			});
			// 重新加载账本列表
			uni.$emit('billAdded');

			productPrice.value = '';
			message.value = '';
			categoryId.value = '';
			payType.value = '2';
		} catch (error) {
			console.error('提交失败:', error);
			uni.showToast({
				title: error.message || '添加账单失败，请稍后重试',
				icon: 'none'
			});
		}
	}

	//根据类型获取所有分类数据
	const getCategoryList = async () => {
		try {
			// const res = await http.get(`/user/queryCategoryByType?type=${payType.value}`);
			const res = await http.get(
				API_PATH.CATEGORY.QUERY_BY_TYPE, {
					type: payType.value
				} // GET 参数会自动拼为 ?type=1
			);
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
	
	.add-category-btn{
		display: flex;
		align-items: center;
		justify-content: center; 
	}
</style>