<template>
	<view>
		<view class="clascustom-nav">
			<!-- 导航栏 -->
			<van-nav-bar title="分类">
				<template #right>
					<van-icon name="search" size="18"  @click="showSearchDialog"/>
					<van-icon name="plus" size="18" @click="showAddDialog" />
				</template>
			</van-nav-bar>
		</view>

		<view class="button">
			<van-button type="default" round size="normal" @click="handleTypeClick(1)" :class="{ 'button-active': activeType === 1 }">支出</van-button>
			<van-button type="default" round size="normal" @click="handleTypeClick(2)" :class="{ 'button-active': activeType === 2 }">收入</van-button>
			<van-button type="default" round size="normal" @click="handleTypeClick(3)" :class="{ 'button-active': activeType === 3 }">转账</van-button>
		</view>

		<view>
			<van-list :finished="true" finished-text="没有更多了">
				<van-cell v-for="(item,index) in list" :key="item.id" :title="item.name"  @longpress="handleLongPress(item)"/>
				<van-back-top />
			</van-list>
		</view>
		
		<!-- plus弹出层 -->
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

		
		<!-- search弹出层 -->
		<van-dialog v-model:show="CategoryShow" title="搜索分类" show-cancel-button show-confirm-button @confirm ='searchCategory'>
			<van-field v-model="searchCategoryName" label="" placeholder="请输入分类名"/>
		</van-dialog>
		
		<!-- 删除分类弹出层 -->
		<van-dialog v-model:show="DialogShow" title="删除分类"  show-cancel-button
		confirm-button-text="确认删除" cancel-button-text="转移数据" @confirm="confirmDelete()" @cancel="moveCategory()">
			<van-row  justify="center">
				<view class="delete">删除分类会同时删除该分类下的所有账单</view>
			</van-row>
		</van-dialog>
		
		<view>
			<ButtomBar></ButtomBar>
		</view>
		
	</view>

</template>

<script setup>
	import {ref ,onMounted} from 'vue';
	import { http } from '../../utils/request';
	import ButtomBar from '../../components/ButtomBar.vue';
	import { showConfirmDialog } from 'vant';
	import {useCategoryStore} from '../../stores/useCategoryStore';
	import { useBillStore } from '../../stores/useBillStore';
	import { storeToRefs } from 'pinia';
	
	const categoryStore = useCategoryStore();
	const billStore = useBillStore();
	
	const {categoryList:list} = storeToRefs(categoryStore);
	console.log("list",list.value);
	
	const onClickLeft = () => history.back(); //返回
	const currentType = ref(1); // 当前选中的类型（1-支出，2-收入，3-转账）

	const DialogShow = ref(false) //删除分类弹出层
	const show = ref(false) //plus弹出层
	const CategoryShow = ref(false) //search弹出层
	const searchCategoryName = ref('') //搜索分类名称
	const CategoryName = ref(''); //分类名
	const currentCategory = ref('') //所选分类
	
	const activeType = ref(1);  //按钮样式
	const showAddDialog = () => {
		show.value = true; // 显示plus弹窗
		CategoryName.value = '';
	};
	
	const showSearchDialog = () => {
		CategoryShow.value = true; // 显示search弹窗
	};
	
	
	//添加分类
	const addCategory= async()=>{
		const categoryData ={
			name : CategoryName.value, 
			type : currentType.value	
		}
		try{
			await categoryStore.addCategory(categoryData);
			categoryStore.queryCategoryType(currentType.value);
		}catch(err){
			console.error('添加失败：', err.message);
			uni.showToast({
				title:err.message,
				icon:'error'
			})
		}
	}
	
	//搜索分类
	const searchCategory = async()=>{
		const searchCategoryData = {
			name : searchCategoryName.value,
			type : currentType.value
		}
		try{
			await categoryStore.searchCategory(searchCategoryData);
			uni.showToast({title:'提交成功',icon:'success'});
			show.value = false;
		}catch(err){
			console.error('搜索失败:', err.message);
			uni.showToast({
				title:err.message,
				icon:'error'
			})
		}finally{
			searchCategoryName.value = '';
		}
	}
	
	//切换分类类型
	const handleTypeClick = (type)=>{
		if(currentType.value === type) return;
		currentType.value = type;
		categoryStore.queryCategoryType(type);
		activeType.value = type;
	}
	
	onMounted(() => {
	  categoryStore.queryCategoryType(1); 
	});
	
	//删除分类
	const handleLongPress = (item)=>{
		console.log("handleLongPress参数",item);
		currentCategory.value = item;
		console.log("item参数",item);
		DialogShow.value = true;
	}
	const confirmDelete = async () => {
		const deleteCategoryData = {
			id: currentCategory.value.id, 
			type: currentCategory.value.type, 
			strategy: 'delete',
		}
		try{
			console.log("deleteCategoryData:",deleteCategoryData)
			await categoryStore.deleteCategory(deleteCategoryData);
			categoryStore.queryCategoryType(currentType.value);
		}catch(err){
			console.log("删除分类失败err",err);
		}finally {
			DialogShow.value = false;
			currentCategory.value = null; 
		}
	};
	
	//转移数据
	const moveCategory = async ()=>{
		try{
			const res = await billStore.queryBillByCategoryId(currentCategory.value.id);
			if(res){
				uni.navigateTo({
				    url: `/pages/record/moveCategory?categoryId=${currentCategory.value.id}`
				});
			}
		}catch(error){
			console.error("转移数据",error);
			uni.showToast({
				title:error.message,
				icon:'error'
			})
		}
	}
</script>

<style scoped>
	.van-icon {
		padding: 20rpx;
	}

	.button {
		display: flex;
		justify-content: space-between;
		padding: 15rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.van-button {
		margin: 0rpx 20rpx;
		flex: 1;
	}
	
	.van-field{
		margin:10rpx 20rpx;
	}
	
	.van-radio-group{
		display: flex;
		margin: 30rpx 20rpx;
	}
	.van-radio{
		flex: 1;
		display: flex; /* 使内部元素对齐 */
		align-items: center;
		justify-content: center; 
	}
	
	.button-active {
	  background-color: #1989fa !important; /* 激活态背景色（匹配vant主题色） */
	  color: #ffffff !important; /* 激活态文字色（白色更醒目） */
	  border-color: #1989fa !important; /* 激活态边框色（与背景色一致） */
	}
	
	.delete{
		margin: 20rpx 0;
		font-size: 25rpx;
		color: gray;
	}
</style>