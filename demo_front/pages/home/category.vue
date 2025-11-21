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
			<!-- <van-list v-model:loading="loading" :finished="true" finished-text="没有更多了">
				<van-cell v-for="(item,index) in list" :key="item.id" :title="item.name"  @longpress="handleLongPress(item)"/>
				<van-back-top />
			</van-list> -->
			<van-list :finished="true" finished-text="没有更多了">
				<van-cell v-for="(item,index) in list" :key="item.id" :title="item.name"  @longpress="handleLongPress(item)"/>
				<van-back-top />
			</van-list>
		</view>
		
		<!-- plus弹出层 -->
		<van-dialog 
		  v-model:show="show" 
		  title="分类信息" 
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
		<van-dialog v-model:show="CategoryShow" title="分类信息" show-cancel-button show-confirm-button @confirm ='seachCategory'>
			<van-field v-model="seachCategoryName" label="" placeholder="请输入分类名"/>
		</van-dialog>
		
		<!-- 删除分类弹出层 -->
		<van-dialog v-model:show="DialogShow" title="删除分类"  show-cancel-button
		confirm-button-text="确认删除" cancel-button-text="转移数据" @confirm="deleteCategory('delete')" @cancel="moveCategory()">
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
import { storeToRefs } from 'pinia';
	
	const categoryStore = useCategoryStore();
	const {categoryList:list} = storeToRefs(categoryStore);
	console.log("list",list.value);
	
	const onClickLeft = () => history.back(); //返回
	const currentType = ref(0); // 当前选中的类型（1-支出，2-收入，3-转账）
	
	const loading = ref(false);

	const DialogShow = ref(false) //删除分类弹出层
	const show = ref(false) //plus弹出层
	const CategoryShow = ref(false) //search弹出层
	const moveCategoryDialog = ref(false) //转移数据弹出层
	const seachCategoryName = ref('') //搜索分类名称
	const CategoryName = ref(''); //分类名
	const currentCategory = ref('') 
	
	
	
	const activeType = ref(1);  //按钮样式
	const showAddDialog = () => {
		show.value = true; // 显示plus弹窗
		CategoryName.value = '';
	};
	
	const showSearchDialog = () => {
		CategoryShow.value = true; // 显示search弹窗
	};
	
	//添加分类
	const addCategory = async() => {
		
		if(!CategoryName.value){
			uni.showToast({
				title:'请输入分类名',
				icon:'none'
			})
			return;
		}
		
		console.log('弹窗应显示，当前show值：', show.value);
		try{
			const sendData = {
				name : CategoryName.value, //分类名
				type : currentType.value	//分类类型
			};
			
			const result  = await http.post('/user/addCategory',sendData,{
				loadingText:'正在提交中'
			});
			
			uni.showToast({title:'提交成功',icon:'success'});
			console.log('提交分类：',result);
			queryCategoryType(currentType.value);
			show.value = false;
		}catch(err){
			uni.showToast({
				title:err.message,
				icon:'error'
			})
			console.log('提交失败',err);
		}		
	}
	
	//切换分类类型
	const handleTypeClick = (type)=>{
		console.log("type:",type);
		if(currentType.value === type) return;
		currentType.value = type;
		categoryStore.queryCategoryType(type);
		//queryCategoryType(type); 
	}
	
	//根据类型查询分类
	// const queryCategoryType = async(type)=>{
	// 	activeType.value = type;
	// 	console.log("传入type",type);
	// 	currentType.value = type; // 记录当前选中类型
	// 	loading.value = true; // 开始加载
		
	// 	try{
	// 		const url = `/user/queryTypeCategory?type=${type}`;
	// 		const result = await http.get(url,
	// 		{loading:'加载中'},
	// 		);
	// 		console.log("后端返回数据result:",result);
	// 		list.value = result || [];
	// 		console.log("list",list.value);
	// 	}catch(err){
	// 		console.error('请求失败err：',err);
	// 		uni.showToast({
	// 			title:"加载失败",
	// 			icon:'error'
	// 		})
	// 	}finally{
	// 		loading.value = false;
	// 	}
	// }
	
	onMounted(() => {
	  categoryStore.queryCategoryType(1); 
	});
	
	

	
	//搜索分类
	const seachCategory = async()=>{
		console.log("searchCategory中searchCategoryName",seachCategoryName);
		console.log("searchCategory中currentType",currentType);
		
		if(!seachCategoryName.value.trim()){
			uni.showToast({
				title:'请输入分类名',
				icon:'error'
			})
			return ;
		}
		try{
			const sendData = {
				name : seachCategoryName.value,
				type : currentType.value
			}
			console.log("queryCategory的sendData:",sendData);
			const result = await http.post('/user/queryCategory',sendData,{loadingText:'加载中'});
			console.log("queryCategory的result:",result);
			list.value = [result] || [];
			CategoryShow.value = false; // 关闭弹窗
			seachCategoryName.value = ''; // 清空搜索框
			
		}catch(err){
			console.error('搜索失败:', err);
			uni.showToast({
			    title: err.message,
			    icon: 'error'
			});
			seachCategoryName.value = ''; // 清空搜索框
		}
	}
	
	//删除分类
	const handleLongPress = (item)=>{
		console.log("handleLongPress参数",item);
		currentCategory.value = item;
		console.log("currentCategory参数",currentCategory.value.id);
		DialogShow.value = true;
	}
	const deleteCategory = async(strategy) =>{
		try{
			const sendData = {
				categoryIds:[currentCategory.value.id],
				strategy:strategy,
			}
			console.log("sendData:",sendData)
			await http.delete("/user/deleteCategory",sendData);
			categoryStore.queryCategoryType(currentType.value);
		}catch(err){
			console.log("删除分类失败err",err);
		}
		DialogShow.value = false;
	}
	
	//转移数据
	const moveCategory = ()=>{
		console.log("转移数据弹出层被调用");
		moveCategoryDialog.value = true;
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