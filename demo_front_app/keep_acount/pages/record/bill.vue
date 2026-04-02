<!-- 添加账单页面 -->
<template>
	<view class="page-content">
		<!-- 导航栏 -->
		<view class="placeholder-nav">
			<up-navbar title="添加账本" leftText="返回" @leftClick="onClickLeft">
				<template #right>
					<view @click="showAddDialog" class="add-category-btn">
						<up-icon name="plus" size="18" color="#1989fa" />
						<text class="add-category-text">添加分类</text>
					</view>
				</template>
			</up-navbar>
		</view>
		
		<!-- 账单价格 -->
		<view class="form-item">
		  <up-input v-model="productPrice" type="number" label="商品价格" placeholder="限制9位整数2位小数" border-bottom />
		</view>
	
		<!-- 备注-->
		<view class="form-item">
			<up-input v-model="message" type="textarea" label="备注" placeholder="请输入备注" autosize border-bottom />
		</view>

		<!-- 分类 -->
		<up-divider text="分类" :color="'#1989fa'" :borderColor="'#1989fa'" :fontSize="16" />
		<up-radio-group v-model="categoryId" placement="column">
			<up-radio v-for="category in categoryList" :key="category.id" :name="category.id" shape="circle" :label="category.name">
			</up-radio>
		</up-radio-group>

		<!-- 支付类型 -->
		<up-divider text="支付类型" :color="'#1989fa'" :borderColor="'#1989fa'" :fontSize="16" />
		<up-radio-group v-model="payType" placement="row">
			<up-radio name="1" shape="circle" label="收入"></up-radio>
			<up-radio name="2" shape="circle" label="支出"></up-radio>
		</up-radio-group>

		<!-- 账本类型 -->
		<up-divider text="账单类型" :color="'#1989fa'" :borderColor="'#1989fa'" :fontSize="16" />
		<up-radio-group v-model="billType">
			<up-radio name="single" shape="circle" label="单人账本"></up-radio>
			<up-radio name="multiple" shape="circle" label="多人账本"></up-radio>
		</up-radio-group>
		
		<!-- 折叠面板 -->
		<up-collapse v-model="collapseNames" v-if="billType === 'multiple'">
			<!-- 账本参与人 -->
			<up-collapse-item title="账本参与人" name="participant">
				<view class="participant-container">
					<view class="participant-title">
						<text class="title-text">账单参与人</text>
						<up-button size="small" type="primary" @click="plusParticipant">添加参与者</up-button>
					</view>
					<view class="selected-participant-list">
						<up-tag v-for="(item, index) in selectedParticipants" :key="index" :text="item.username" 
							shape="round" size="large" plain />
					</view>
				</view>
			</up-collapse-item>
		</up-collapse>
		
		<!-- 添加按钮 -->
		<up-button type="primary" shape="circle" size="large" @click="handleSubmit" class="submit-btn">添加</up-button>
		
		<!-- 添加分类弹窗 -->
		<up-modal v-model:show="show" title="添加分类" showConfirmButton showCancelButton @confirm="addCategory">
			<up-input v-model="CategoryName" placeholder="请输入分类名" border-bottom />
		</up-modal>
		
		<!-- 添加账单参与者弹窗 -->
		<up-modal v-model:show="addParticipantShow" title="选择账单参与者" showConfirmButton showCancelButton @confirm="handleParticipantConfirm">
			<view class="participant-list">
				<up-tag v-for="(item, index) in ledgerUserList" :key="index"
					:class="['participant-tag', isSelected(item) ? 'selected-tag' : '']" 
					shape="round" size="large" :text="item.username"
					@click="toggleSelect(item)" />
			</view>
		</up-modal>
	</view>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue';
	import { storeToRefs } from 'pinia';
	import { onLoad } from '@dcloudio/uni-app';
	import dayjs from 'dayjs';
	
	import { useCategoryStore } from '../../stores/useCategoryStore';
	import { useBillStore } from '../../stores/useBillStore';
	import { useLedgerStore } from '../../stores/useLedgerStore';
	import { getAllLedgerUser } from '../../api/ledger';
	import { addBill } from '../../api/bill';
	
	const ledgerStore = useLedgerStore();
	const billStore = useBillStore();
	const categoryStore = useCategoryStore();
	
	// 定义页面数据
	const productPrice = ref(''); // 商品价格
	const message = ref(''); // 备注
	const payType = ref('2'); // 支付类型 1.收入  2.支出 默认支出
	const categoryId = ref(''); // 选中的分类ID
	const categoryList = ref([]); // 分类列表
	const createTime = ref(''); // 创建时间
	const billType = ref('single'); // 账单类型
	const collapseNames = ref(['participant']); // 折叠面板展开项
	
	// 添加分类弹窗
	const show = ref(false);
	const CategoryName = ref(''); // 分类名
	
	// 添加账单参与者弹窗
	const addParticipantShow = ref(false);
	const ledgerUserList = ref([]); // 全部账本参与者
	const selectedParticipants = ref([]); // 选中的账单参与者
	
	onLoad((options) => {
		createTime.value = options.time;
	});

	// 返回
	const onClickLeft = () => uni.navigateBack();
	
	// 添加分类
	const showAddDialog = () => {
		show.value = true;
		CategoryName.value = '';
	};
	
	const addCategory = async () => {
		const categoryData = {
			name: CategoryName.value,
			type: payType.value
		};
		try {
			await categoryStore.addCategory(categoryData);
			// 刷新分类列表
			const result = await categoryStore.queryCategoryType(payType.value);
			categoryList.value = result;
			uni.showToast({
				title: '添加成功',
				icon: 'success'
			});
		} catch (err) {
			console.error('添加失败：', err.message);
			uni.showToast({
				title: err.message,
				icon: 'error'
			});
		}
	};
	
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
			const selectedIds = selectedParticipants.value.map(p => p.id);
			const data = {
				amount: productPrice.value,
				remark: message.value,
				categoryId: categoryId.value,
				type: payType.value,
				billType: billType.value,
				participantIds: selectedIds,
				createTime: dayjs(createTime.value).format('YYYY-MM-DD HH:mm:ss')
			};
			
			await billStore.addBill(data);
			const ledgerId = uni.getStorageSync("ledgerId");
			await ledgerStore.queryLedgerDetailByID({ ledgerId });
			
			uni.showToast({
				title: '添加成功',
				icon: 'success'
			});
			
			// 重新加载账本列表
			uni.$emit('addBill');
			
			// 清空表单
			productPrice.value = '';
			message.value = '';
			
			// 延迟返回上一页
			setTimeout(() => {
				uni.navigateBack();
			}, 1500);
		} catch (error) {
			console.error('提交失败:', error);
			uni.showToast({
				title: error.message || '添加账单失败，请稍后重试',
				icon: 'none'
			});
		}
	};

	// 根据类型获取所有分类数据
	const getCategoryList = async () => {
		try {
			const res = await categoryStore.queryCategoryType(payType.value);
			categoryList.value = res;
		} catch (err) {
			console.log("根据类型获取所有分类数据err", err);
		}
	};

	// 添加账单参与者
	const plusParticipant = () => {
		addParticipantShow.value = true;
		getUserList();
	};
	
	// 查询全部账单参与者
	const getUserList = async () => {
		try {
			const userList = await getAllLedgerUser();
			ledgerUserList.value = userList || [];
		} catch (error) {
			console.error("获取参与者列表失败", error);
			uni.showToast({
				title: '获取参与者列表失败',
				icon: 'error'
			});
		}
	};
	
	// 点击弹窗"确认"按钮的回调
	const handleParticipantConfirm = async () => {
		if (selectedParticipants.value.length === 0) {
			uni.showToast({
				title: '请至少选择一位参与者',
				icon: 'none'
			});
			return;
		}
		addParticipantShow.value = false;
		return selectedParticipants.value.map(p => p.id);
	};
	
	// 切换选中/取消选中
	const toggleSelect = (item) => {
		const isExist = selectedParticipants.value.some(p => p.id === item.id);
		if (isExist) {
			selectedParticipants.value = selectedParticipants.value.filter(p => p.id !== item.id);
		} else {
			selectedParticipants.value.push(item);
		}
	};
	
	// 判断某一项是否选中
	const isSelected = (item) => {
		return selectedParticipants.value.some(p => p.id === item.id);
	};
	
	// 监测payType变化
	watch(payType, (newVal) => {
		getCategoryList();
		categoryId.value = '';
	});

	onMounted(() => {
		getCategoryList();
	});
</script>

<style scoped lang="scss">
	
	.submit-btn {
	  margin-top: 50rpx;   
	}
	
	.form-item {
	  margin-bottom: 20rpx;
	}
	
	.add-category-btn {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}
	
	.add-category-text {
		color: #1989fa;
		font-size: 28rpx;
	}
	
	.participant-container {
		padding: 20rpx;
	}
	
	.participant-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		position: relative;
	}
	
	.title-text {
		font-size: 28rpx;
		color: #333;
	}
	
	.participant-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		padding: 30rpx 20rpx;
		justify-content: center;
	}
	
	.participant-tag {
		cursor: pointer;
		transition: all 0.2s;
	}
	
	.selected-tag {
		background-color: #1989fa !important;
		color: #fff !important;
		border-color: #1989fa !important;
	}
	
	.selected-participant-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		padding: 20rpx;
		justify-content: center;
	}
	
	.selected-participant--tag {
		margin: 10rpx;
	}
	
	.placeholder-nav {
	  padding-top: var(--status-bar-height);
	  padding-top: 88rpx; /* 核心：这一行就能解决遮挡 */
	}
	
	.page-content {
	  padding: 0 30rpx;
	  box-sizing: border-box;
	}
</style>