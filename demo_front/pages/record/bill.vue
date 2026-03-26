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


		<!-- 账本类型 -->
		<van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '16px 16px' }">账单类型</van-divider>
		<van-radio-group v-model="billType" direction="horizontal">
		  <van-radio name="single">单人账本 1</van-radio>
		  <van-radio name="multiple">多人账本 2</van-radio>
		</van-radio-group>
		
		<!-- 折叠面板 -->
		<van-collapse v-model="collapseNames" v-if="billType === 'multiple'">
		
			<!-- 账本参与人 -->
			<van-collapse-item title="账本参与人" name="participant">
				<!-- 参与人列表 -->
				<view class="participant-container">
					<view class="participant-title">
						<text class="title-text">账单参与人</text>
						<van-button size="small" type="primary" @click="plusParticipant()">添加参与者</van-button>
					</view>
					<!-- 参与人列表项 -->
					<view class="selected-participant-list">
						<van-tag v-for="(item,index) in selectedParticipants" :index="item"
							class="selected-participant--tag" round size="large" plain>
							{{ item.username}}
						</van-tag>
					</view>
				</view>
			</van-collapse-item>
		</van-collapse>
		
		
		<!-- 添加 -->
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
		
		<!-- 添加账单参与者弹窗 -->
		<van-dialog v-model:show="addParticipantShow" title="选择账单参与者" show-cancel-button
			@confirm="handleParticipantConfirm">
			<view class="participant-list">
				<van-tag v-for="(item, index) in ledgerUserList" :key="index"
					:class="['participant-tag', isSelected(item) ? 'selected-tag' : '']" round size="large"
					@click="toggleSelect(item)">
					{{ item.username }}
					<van-icon name="success" v-if="isSelected(item)" class="selected-icon" />
				</van-tag>
			</view>
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
	import { getAllLedgerUser } from '../../api/ledger';
	import { addParticipant } from '../../api/participant';
	import { addBill } from '../../api/bill';
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
	//账单类型
	const billType = ref('single');
	// 折叠面板
	const collapseNames = ref(['participant']);
	//添加分类弹窗
	const show = ref(false) 
	const CategoryName = ref(''); //分类名
	//添加账单参与者弹窗
	const addParticipantShow = ref(false);
	////全部账本参与者
	const ledgerUserList = ref([])
	//选中的账单参与者
	const selectedParticipants = ref([]);
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
			console.log('选中的参与者：', selectedParticipants.value);
			const selectedIds = selectedParticipants.value.map(p => p.id);
			console.log('选中的参与者ID：', selectedIds);
			console.log("billType",billType.value)
			const data = {
				amount: productPrice.value,
				remark: message.value,
				categoryId: categoryId.value,
				type: payType.value,
				billType:billType.value,
				participantIds:selectedIds,
				createTime: dayjs(createTime.value).format('YYYY-MM-DD HH:mm:ss')
			}
			
			console.log("添加账单",data)
			await billStore.addBill(data)
			console.log("data",data)
			const ledgerId = uni.getStorageSync("ledgerId");
			const result = await ledgerStore.queryLedgerDetailByID({
				ledgerId
			});
			uni.showToast({
				title: '添加成功',
				icon: 'success'
			});
			// 重新加载账本列表
			uni.$emit('addBill');

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

	//plusParticipant 添加账单参与者
	const plusParticipant = ()=>{
		addParticipantShow.value = true;
		getUserList();
	}
	//查询全部账单参与者
	const getUserList = async () => {
		try {
			const userList = await getAllLedgerUser();
			ledgerUserList.value = userList || [];
			console.log("userList", userList);
		} catch (error) {
			console.error("获取参与者列表失败", error);
			uni.showToast({
				title: '获取参与者列表失败',
				icon: 'error'
			});
		}
	}
	// 点击弹窗“确认”按钮的回调（获取选中列表）
	const handleParticipantConfirm = async() => {
		if (selectedParticipants.value.length === 0) {
			uni.showToast({
				title: '请至少选择一位参与者',
				icon: 'none'
			});
			return;
		}
		// 输出选中的参与者列表
		console.log('选中的参与者：', selectedParticipants.value);
		const selectedIds = selectedParticipants.value.map(p => p.id);
		console.log('选中的参与者ID：', selectedIds);
		// 关闭弹窗
		addParticipantShow.value = false;
		return selectedIds;
	};
	
	//切换选中/取消选中
	const toggleSelect = (item)=>{
		const isExist = selectedParticipants.value.some(p =>p.id === item.id)
		if(isExist){
			selectedParticipants.value = selectedParticipants.value.filter(p=> p.id !==item.id)
		}else{
			selectedParticipants.value.push(item);
		}
	}
	
	// 判断某一项是否选中
	const isSelected = (item) => {
		return selectedParticipants.value.some(p => p.id === item.id);
	};
	
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
	
	.participant-title .van-button {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.participant-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		padding: 10px 0;
		justify-content: center;
	}
	
	.participant-tag {
		cursor: pointer;
		transition: all 0.2s;
	}
	
	.selected-tag {
		background-color: #1989fa;
		color: #fff;
		border-color: #1989fa;
	}
	
	.selected-icon {
		margin-left: 5px;
		font-size: 12px;
	}
	.selected-participant-list {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		padding: 10px;
		justify-content: center;
	}
	
</style>