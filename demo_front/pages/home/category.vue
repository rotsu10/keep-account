<template>
	<view>
		<view class="clascustom-nav">
			<!-- 导航栏 -->
			<van-nav-bar title="分类" left-text="返回" left-arrow @click-left="onClickLeft">
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
			<van-list v-model:loading="loading" :finished="true" finished-text="没有更多了">
				<van-cell v-for="item in list" :key="item.id" :title="item.name" />
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
		  <!-- 正确嵌套radio-group和radio -->
		  <van-radio-group v-model="checked" direction="horizontal">
		    <van-radio name="1">收入</van-radio>
		    <van-radio name="2">支出</van-radio>
		    <van-radio name="3">转账</van-radio>
		  </van-radio-group>
		</van-dialog>

		
		<!-- search弹出层 -->
		<van-dialog v-model:show="CategoryShow" title="分类信息" show-cancel-button show-confirm-button @confirm = 'seachCategory'>
			<van-field v-model="seachCategoryName" label="" placeholder="请输入分类名"/>
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
	
	const onClickLeft = () => history.back(); //返回

	const currentType = ref(0); // 当前选中的类型（1-支出，2-收入，3-转账）
	const list = ref([]);
	const loading = ref(false);

	const show = ref(false) //plus弹出层
	const CategoryShow = ref(false) //search弹出层
	const seachCategoryName = ref('') //搜索分类名称
	const checked = ref('1');//分类类型
	const CategoryName = ref(''); //分类名

	const activeType = ref(1);  //按钮样式
	const showAddDialog = () => {
		show.value = true; // 显示plus弹窗
		checked.value = '1';
		CategoryName.value = '';
	};
	
	const showSearchDialog = () => {
		CategoryShow.value = true; // 显示search弹窗
	};
	
	//添加分类
	const addCategory = async() => {
		//非空校验
		if(!checked.value.trim()){
			uni.showToast({title:'请输入分类类型',icon:'none'})
			return;
		}
		
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
				type : checked.value	//分类类型
			};
			
			const result  = await http.post('/user/addCategory',sendData,{
				loadingText:'正在提交中'
			});
			
			uni.showToast({title:'提交成功',icon:'success'});
			console.log('提交分类：',result);
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
		queryCategoryType(type); 
	}
	
	//根据类型查询分类
	const queryCategoryType = async(type)=>{
		activeType.value = type;
		console.log("传入type",type);
		currentType.value = type; // 记录当前选中类型
		loading.value = true; // 开始加载
		
		try{
			const url = `/user/queryTypeCategory?type=${type}`;
			const result = await http.get(url,
			{loading:'加载中'},
			);
			console.log("后端返回数据result:",result);
			list.value = result || [];
			console.log("list",list.value);
		}catch(err){
			console.error('请求失败err：',err);
			uni.showToast({
				title:"加载失败",
				icon:'error'
			})
		}finally{
			loading.value = false;
		}
	}
	
	// 页面加载完成后，自动查询支出分类（type=1）
	onMounted(() => {
	  queryCategoryType(1); 
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
</style>