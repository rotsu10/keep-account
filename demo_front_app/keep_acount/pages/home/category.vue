<template>
	<view class="nav">
		<!-- 导航栏 -->
		<up-navbar class="nav" title="分类" :is-back="false" :placeholder="true">
			<template #right>
				<view class="nav-right">
					<up-icon name="search" size="18" @click="showSearchDialog" style="margin-right: 20rpx;"></up-icon>
					<up-icon name="plus" size="18" @click="showAddDialog"></up-icon>
				</view>
			</template>
		</up-navbar>

		<view class="page-content">
			<!-- 切换按钮 -->
			<view class="button-box">
				<up-button 
					shape="circle"
					type="default" 
					@click="handleTypeClick(1)" 
					:custom-style="activeType === 1 ? activeBtnStyle : ''"
				>
					收入
				</up-button>
				<up-button 
					shape="circle"
					type="default" 
					@click="handleTypeClick(2)" 
					:custom-style="activeType === 2 ? activeBtnStyle : ''"
				>
					支出
				</up-button>
			</view>
			
			<!-- 列表 -->
			<view class="list-box">
				<up-list :finished="true">
					<up-cell 
						v-for="(item,index) in list" 
						:key="item.id" 
						:title="item.name"
						@longpress="handleLongPress(item)"
					></up-cell>
				</up-list>
				<up-back-top></up-back-top>
			</view>
		</view>
		
		<!-- 添加分类弹窗 - 修复后 -->
			<up-modal
				:show="show"
				title="添加分类"
				show-cancel-button
				@confirm="addCategory"
				@close="show = false"
				@cancel="show = false"
			>
				<view class="modal-content">
					<up-input v-model="CategoryName" placeholder="请输入分类名" />
				</view>
			</up-modal>
		
			<!-- 搜索弹窗 - 修复后 -->
			<up-modal
				:show="CategoryShow"
				title="搜索分类"
				show-cancel-button
				@confirm="searchCategory"
				@cancel="CategoryShow = false"
			>
				<view class="modal-content">
					<up-input v-model="searchCategoryName" placeholder="请输入分类名" />
				</view>
			</up-modal>
			
			<!-- 删除弹窗 - 修复后 -->
			<up-modal
				:show="DialogShow"
				title="删除分类"
				show-cancel-button
				confirm-text="确认删除"
				cancel-text="转移数据"
				:closeOnClickOverlay="true"
				@confirm="confirmDelete"
				@cancel="moveCategory"
				@close="DialogShow = false"
			>
				<view class="delete-tip">
					删除分类会同时删除该分类下的所有账单
				</view>
			</up-modal>
	</view>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue';
	import { useCategoryStore } from '../../stores/useCategoryStore';
	import { useBillStore } from '../../stores/useBillStore';
	import { storeToRefs } from 'pinia';
	import { useLedgerStore } from '../../stores/useLedgerStore';

	const categoryStore = useCategoryStore();
	const billStore = useBillStore();
	const ledgerStore = useLedgerStore();
	
	const { ledgerId } = storeToRefs(ledgerStore);
	const { categoryList: list } = storeToRefs(categoryStore);

	// 弹窗控制
	const DialogShow = ref(false);
	const show = ref(false);
	const CategoryShow = ref(false);
	
	// 数据
	const searchCategoryName = ref('');
	const CategoryName = ref('');
	const currentCategory = ref(null);
	const activeType = ref(1);
	const currentType = ref(1);

	// 激活按钮样式
	const activeBtnStyle = "background-color:#1989fa;color:#fff;border-color:#1989fa;";

	// 打开添加弹窗
	const showAddDialog = () => {
		console.log("点击弹窗")
		show.value = true;
		CategoryName.value = '';
	};

	// 打开搜索弹窗
	const showSearchDialog = () => {
		CategoryShow.value = true;
	};

	// 添加分类
	const addCategory = async () => {
		const categoryData = {
			name: CategoryName.value,
			type: currentType.value
		};
		try {
			await categoryStore.addCategory(categoryData);
			categoryStore.queryCategoryType(currentType.value);
			show.value = false;
		} catch (err) {
			console.error('添加失败：', err.message);
			uni.showToast({ title: err.message, icon: 'error' });
		}
	};

	// 搜索分类
	const searchCategory = async () => {
		const searchCategoryData = {
			name: searchCategoryName.value,
			type: currentType.value
		};
		try {
			await categoryStore.searchCategory(searchCategoryData);
			uni.showToast({ title: '提交成功', icon: 'success' });
		} catch (err) {
			uni.showToast({ title: err.message, icon: 'error' });
		} finally {
			searchCategoryName.value = '';
		}
	};

	// 切换类型
	const handleTypeClick = (type) => {
		if (currentType.value === type) return;
		currentType.value = type;
		categoryStore.queryCategoryType(type);
		activeType.value = type;
	};

	// 长按删除
	const handleLongPress = (item) => {
		console.log("长按触发", item);
		if (!item || !item.id) {  
			console.error("无效的分类数据", item);
			return;
		}
		currentCategory.value = item;
		DialogShow.value = true;
		console.log("弹窗状态", DialogShow.value); 
	};

	// 确认删除
	const confirmDelete = async () => {
		if (!currentCategory.value) {  
				console.error("没有选中的分类");
				DialogShow.value = false;
				return;
			}
		const deleteCategoryData = {
			id: currentCategory.value.id,
			type: currentCategory.value.type,
			strategy: 'delete'
		};
		try {
			await categoryStore.deleteCategory(deleteCategoryData);
			await categoryStore.queryCategoryType(currentType.value);
			const lid = uni.getStorageSync("ledgerId");
			await ledgerStore.queryLedgerDetailByID({ ledgerId: lid });
		} catch (err) {
			console.log("删除失败", err);
		} finally {
			DialogShow.value = false;
			currentCategory.value = null;
		}
	};

	// 转移数据
	const moveCategory = async () => {
		if (!currentCategory.value) { 
				console.error("没有选中的分类");
				DialogShow.value = false;
				return;
			}
		try {
			const res = await billStore.queryBillByCategoryId(currentCategory.value.id);
			if (res) {
				uni.navigateTo({
					url: `/pages/record/moveCategory?categoryId=${currentCategory.value.id}`
				});
			}
			DialogShow.value = false;
		} catch (error) {
			uni.showToast({ title: error.message||"shibai" ,icon:'none'});
		}
	};

	onMounted(() => {
		categoryStore.queryCategoryType(1);
	});

	watch(ledgerId, (newId) => {
		if (newId) categoryStore.queryCategoryType(currentType.value);
	}, { immediate: true });
</script>

<style scoped>
	.nav-right {
		display: flex;
		align-items: center;
		padding-right: 10rpx;
	}

	.button-box {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.button-box .up-button {
		flex: 1;
		margin: 0 10rpx;
	}

	.list-box {
		padding: 0 20rpx;
	}

	.modal-content {
		padding: 20rpx;
	}

	.delete-tip {
		padding: 20rpx;
		font-size: 26rpx;
		color: #999;
		text-align: center;
	}
</style>