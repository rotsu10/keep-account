<template>
	<view>
		<view class="clascustom-nav">
			<!-- 导航栏 -->

			<van-nav-bar title="分类" left-text="返回" left-arrow @click-left="onClickLeft">
				<template #right>
					<van-icon name="search" size="18"/>
					<van-icon name="plus" size="18" @click="showAddDialog" />
				</template>
			</van-nav-bar>
		</view>

		<view class="button">
			<van-button type="default" round size="normal">支出</van-button>
			<van-button type="default" round size="normal">收入</van-button>
			<van-button type="default" round size="normal" disabled>禁用</van-button>
		</view>

		<view>
			<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<van-cell v-for="item in list" :key="item" :title="item" />
				<van-back-top />
			</van-list>
		</view>
		
		<!-- 弹出层 -->
		<van-dialog v-model:show="show" title="分类信息" show-cancel-button show-confirm-button @confirm = 'addCategory'>
			<van-field v-model="CategoryName" label="" placeholder="请输入分类名"/>
			<van-radio-group v-model="checked" direction="horizontal">
			  <van-radio name="1">收入</van-radio>
			  <van-radio name="2">支出</van-radio>
			  <van-radio name="3">转账</van-radio>
			</van-radio-group>
		</van-dialog>
		
		
	</view>

</template>

<script setup>
	import {ref} from 'vue';
import { http } from '../../utils/request';

	const onClickLeft = () => history.back(); //返回

	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false); //加载

	const show = ref(false) //弹出层
	const checked = ref('1');//分类类型
	const CategoryName = ref(''); //分类名

	const onLoad = () => {
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				list.value.push(list.value.length + 1);
			}
			loading.value = false;
			if (list.value.length >= 40) {
				finished.value = true;
			}
		}, 1000);
	}

	const showAddDialog = () => {
		show.value = true; // 显示弹窗
		checked.value = '1';
		CategoryName.value = '';
	};
	

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
</style>