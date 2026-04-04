<template>
	<view>
		<view class="nav">
			<up-navbar :auto-back="true" title="账单详情"></up-navbar>
		</view>
		<view class="container">
			<up-form :model="formData" ref="formRef">
				<!-- 金额输入框 -->
				<up-form-item label="金额" prop="amount" required>
					<up-input 
						v-model="formData.amount" 
						placeholder="请输入交易金额" 
						type="number"
						clearable
					>
						<template #suffix>
							<text class="suffix-text">元</text>
						</template>
					</up-input>
				</up-form-item>
		
				<!-- 分类选择 -->
				<up-form-item label="分类" prop="categoryName" required>
					<up-input 
						v-model="formData.categoryName" 
						placeholder="请选择分类" 
						readonly
						@click="openDialog"
						suffixIcon="arrow-right"
					/>
				</up-form-item>
		
				<!-- 账单付款人 -->
				<up-form-item label="付款人" prop="belongName" required>
					<up-input v-model="formData.belongName" placeholder="请输入付款人" clearable />
				</up-form-item>
		
				<!-- 账本类型 -->
				<up-form-item label="账单类型" prop="billType">
					<up-radio-group v-model="formData.billType" placement="row">
						<up-radio label="single" name="single">单人账本</up-radio>
						<up-radio label="multiple" name="multiple">多人账本</up-radio>
					</up-radio-group>
				</up-form-item>
		
				<!-- 多人账本扩展信息 -->
				<up-collapse v-if="formData.billType === 'multiple'" :value="collapseNames">
					<!-- 付款人信息 -->
					<up-collapse-item title="付款人信息" name="payer">
						<up-form-item label="实际付款人">
							<up-input v-model="formData.belongName" disabled />
						</up-form-item>
						<up-form-item label="付款人ID">
							<up-input v-model="formData.userId" disabled />
						</up-form-item>
					</up-collapse-item>
		
					<!-- 账本参与人 -->
					<up-collapse-item title="账本参与人" name="participant">
						<view class="participant-container">
							<view class="participant-header">
								<text class="participant-title">账单参与人</text>
								<up-button 
									shape="circle"
									type="primary" 
									size="small" 
									@click="plusParticipant"
									plain
									class="add-button"
								>
									添加
								</up-button>
							</view>
							
							<!-- 参与人列表 -->
							<view class="participant-list">
								<up-tag 
									v-for="(item, index) in participants" 
									:key="index"
									:text="item.participantName"
									plain
									shape="circle"
									class="participant-tag"
								/>
							</view>
							
							<!-- 金额提示 -->
							<view class="total-tip">
								每人分摊：{{eachPersonAmount}} 元（需等于账单总金额 {{ formData.amount }} 元）
							</view>
						</view>
					</up-collapse-item>
				</up-collapse>
		
				<!-- 日期选择 -->
				<up-form-item label="时间选择" prop="createTime" required>
					<up-input
						v-model="formData.createTime" 
						placeholder="请选择时间" 
						readonly
						@click="showPicker = true"
						suffixIcon="calendar"
					/>
				</up-form-item>
		
				<!-- 备注 -->
				<up-form-item label="备注">
					<up-input 
						v-model="formData.remark" 
						placeholder="请输入附加说明" 
						type="textarea"
						:autoHeight="true"
						clearable
					/>
				</up-form-item>
		
				<!-- 收支类型 -->
				<up-form-item label="收支类型" prop="type">
					<up-radio-group v-model="checked" placement="row" disabled>
						<up-radio label="1" name="1">收入</up-radio>
						<up-radio label="2" name="2">支出</up-radio>
					</up-radio-group>
				</up-form-item>
		
				<!-- 提交按钮 -->
				<view class="submit-btn">
					<up-button type="primary" shape="circle" @click="onSubmit">
						提交
					</up-button>
				</view>
			</up-form>
		
			<!-- 分类选择弹窗 -->
			<up-modal 
				:show="DialogShow" 
				title="选择分类"
				:showCancelButton="true"
				@confirm="handleCategoryConfirm"
				@cancel="DialogShow = false"
			>
				<view class="category-list">
					<up-tag 
						v-for="(item, index) in categoryList" 
						:key="index"
						:text="item.name"
						:type="formData.categoryName === item.name ? 'success' : 'primary'"
						shape="circle"
						size="medium"
						:plain="formData.categoryName !== item.name"
						@click="selectCategory(item)"
						class="category-tag"
					/>
				</view>
			</up-modal>
		
			<!-- 日期选择器 -->
			<up-datetime-picker
				:show="showPicker"
				v-model="pickerValue"
				mode="date"
				@confirm="onConfirm"
				@cancel="showPicker = false"
			/>
		
			<!-- 添加账单参与人弹窗 -->
			<up-modal 
				:show="addParticipantShow"
				title="选择账单参与者"
				:showCancelButton="true"
				confirmText="确定"
				cancelText="取消"
				@confirm="handleParticipantConfirm"
				@cancel="addParticipantShow = false"
			>
				<view class="participant-select-list">
					<up-tag 
						v-for="(item, index) in ledgerUserList" 
						:key="index"
						:text="item.username"
						shape="circle"
						size="medium"
						:plain="!isSelected(item)"
						@click="toggleSelect(item)"
						class="participant-select-tag"
					>
					</up-tag>
				</view>
			</up-modal>
		</view>
	</view>
</template>

<script setup>
	import {ref, reactive, computed } from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	import {http} from '../../utils/request';
	import {API_PATH} from '../../api/api';
	import {getAllLedgerUser} from "../../api/ledger.js"
	import {queryBillParticipant,updateParticipant} from '../../api/participant.js'
	import dayjs from 'dayjs';
	
	// 账单id
	const billId = ref('')
	// 折叠面板
	const collapseNames = ref(['payer', 'participant']);
	const addParticipantShow = ref(false)
	const DialogShow = ref(false)
	//查询到的分类
	const categoryList = ref([]);
	//全部账本参与者
	const ledgerUserList = ref([])
	// 参与者列表
	const participants = ref([])
	// 存储选中的参与者（核心：用数组管理多选状态）
	const selectedParticipants = ref([]);
	// 收支类型
	const checked = ref('1');
	//时间选择器
	const showPicker = ref(false)
	const pickerValue = ref(Date.now())
	// 账单详情数据
	const billDetail = ref({});
	
	// 表单数据对象
	const formData = reactive({
		amount: '', // 金额
		categoryName: '', // 分类名
		categoryId: '', // 分类id
		belongName: '', //账单所属
		userId: '', //账单所属ID
		createTime: '', // 格式化后的日期
		remark: '', // 备注
		type: '', // 收支类型
		billType: '' // 账单类型，默认为单人账本
	});
	
	// 计算每人花费金额
	const eachPersonAmount = computed(() => {
		// 如果是单人账本，返回总金额
		if (formData.billType === 'single') {
			return formData.amount;
		}
		
		console.log("participants",participants.value)
		// const participantCount = selectedParticipants.value.length;
		const participantCount = participants.value.length
		if (participantCount === 0) {
			return 0; 
		}
		
		// 计算每人花费，确保是数值类型
		const amount = Number(formData.amount) / participantCount;
		return Number(amount.toFixed(2));
	});
	
	// 查询账单参与者
	const queryParticipant = async (billId) => {
		if (!billId) return;
		try {
			const participantList = await queryBillParticipant(billId);
			console.log("participantList", participantList);
			participants.value = participantList || [];
			return participantList;
		} catch (error) {
			console.error("查询参与者失败", error);
			participants.value = [];
		}
	}
	
	// 添加分类的名字
	const openDialog = async () => {
		await getCategory();
		DialogShow.value = true
	}
	
	// 切换选中/取消选中
	const toggleSelect = (item) => {
		// 判断当前项是否已选中
		const isExist = selectedParticipants.value.some(p => p.id === item.id);
		if (isExist) {
			// 已选中：移除
			selectedParticipants.value = selectedParticipants.value.filter(p => p.id !== item.id);
		} else {
			// 未选中：添加
			selectedParticipants.value.push(item);
		}
	};
	
	// 判断某一项是否选中
	const isSelected = (item) => {
		return selectedParticipants.value.some(p => p.id === item.id);
	};
	
	// 处理分类选择确认
	const handleCategoryConfirm = () => {
		DialogShow.value = false;
	};
	
	// 点击弹窗"确认"按钮的回调
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
		const data = {
			billId: billId.value,
			participantIds: selectedIds,
			shareAmount: eachPersonAmount.value
		}
		try {
			await updateParticipant(data);
			uni.showToast({
				title: '添加成功',
				icon: 'success'
			});
			// 刷新参与者列表
			await queryParticipant(billId.value);
			// 清空选中的参与者
			// selectedParticipants.value = [];
		} catch(error) {
			console.error("error", error);
		}
		
		// 关闭弹窗
		addParticipantShow.value = false;
	};
	
	// 选择分类
	const selectCategory = (item) => {
		formData.categoryName = item.name;
		formData.categoryId = item.id
		DialogShow.value = false;
	};
	
	// 时间选择确认
	const onConfirm = (e) => {
		const timestamp = e.value;
		formData.createTime = dayjs(timestamp).format('YYYY-MM-DD');
		showPicker.value = false;
	};
	
	// 页面加载
	onLoad((options) => {
		console.log("页面入参：", options);
		
		if (options.id) {
			billId.value = options.id;
			console.log("billId",billId.value)
			loadBillDetail(options.id);
			queryParticipant(options.id);
		}
	});
	
	// 添加账单参与者
	const plusParticipant = async() => {
		await getUserList();
		//将已有participants加入selectedParticipants
		selectedParticipants.value = [];
		participants.value.forEach(p=>{
			const matchUser = ledgerUserList.value.find(u => u.id === p.participantId);
			if (matchUser) {
				selectedParticipants.value.push(matchUser);
			}
		})
		addParticipantShow.value = true;
	}
	
	// 查询所有账本参与者
	const getUserList = async () => {
		try {
			const userList = await getAllLedgerUser();
			console.log("ledgerUserList",ledgerUserList)
			ledgerUserList.value = userList || [];
		} catch (error) {
			console.error("获取参与者列表失败", error);
			uni.showToast({
				title: '获取参与者列表失败',
				icon: 'error'
			});
		}
	}
	
	// 加载账单详情并初始化表单初始值
	const loadBillDetail = async (id) => {
		try {
			const res = await http.get(
				API_PATH.BILL.QUERY_DETAIL, {
					billId: id
				},
			)
			billDetail.value = res;
			console.log("账本详情res", res);
			initFormData();
		} catch (err) {
			console.log('查询账单详情失败', err);
			uni.showToast({
				title: '查询账单详情失败',
				icon: 'error'
			});
		}
	};
	
	// 初始化表单数据
	const initFormData = () => {
		// 金额
		formData.amount = billDetail.value.amount || '';
		// 分类名称
		formData.categoryName = billDetail.value.categoryName || '';
		// 分类id
		formData.categoryId = billDetail.value.categoryId || '';
		// 日期
		formData.createTime = billDetail.value.createTime ? dayjs(billDetail.value.createTime).format('YYYY-MM-DD') : '';
		// 账单所属
		formData.belongName = billDetail.value.belongName || '';
		// 账单所属ID
		formData.userId = billDetail.value.userId || '';
		// 账单类型
		formData.billType = billDetail.value.billType || 'single';
		// 备注
		formData.remark = billDetail.value.remark || '';
		// 收支类型
		const typeValue = billDetail.value.type || '';
		checked.value = String(typeValue);
		formData.type = typeValue;
	};
	
	// 提交表单
	const onSubmit = async (values) => {
		console.log("提交数据",values)
		// 表单验证
		if (!formData.amount) {
			uni.showToast({
				title: '请输入金额',
				icon: 'none'
			});
			return;
		}
		if (!formData.categoryId) {
			uni.showToast({
				title: '请选择分类',
				icon: 'none'
			});
			return;
		}
		if (!formData.belongName) {
			uni.showToast({
				title: '请输入付款人',
				icon: 'none'
			});
			return;
		}
		if (!formData.createTime) {
			uni.showToast({
				title: '请选择时间',
				icon: 'none'
			});
			return;
		}
		
		try {
			const submitData = {
				id: billDetail.value.id || '',
				amount: Number(formData.amount),
				categoryId: formData.categoryId,
				userName: formData.belongName,
				createTime: dayjs(formData.createTime).format('YYYY-MM-DD HH:mm:ss'),
				remark: formData.remark,
				type: Number(formData.type),
				billType: formData.billType,
			};
			
			console.log("提交数据", submitData);
			const result = await http.post(API_PATH.BILL.UPDATE_DETAIL, submitData)
			uni.$emit('billUpdated');
			// uni.navigateBack();
			// 提交成功反馈
			uni.showToast({
				title: '修改成功',
				icon: 'success'
			});
			uni.$emit('updateBill')
			
		} catch (err) {
			console.error('提交失败：', err);
			uni.showToast({
				title: err.message || '提交失败，请重试',
				icon: 'error'
			});
		}
	};
	
	// 获取分类数据
	const getCategory = async () => {
		try {
			if (!formData.type) {
				console.warn('收支类型为空，无法获取分类');
				categoryList.value = [];
				return;
			}
			const res = await http.get(`/category/queryTypeCategory?type=${formData.type}`)
			categoryList.value = res || [];
		} catch (error) {
			console.error('获取分类失败：', error);
			categoryList.value = [];
		}
	}
</script>

<style scoped>
	.container {
		margin: 40rpx;
		padding-top: 88rpx;
		min-height: 100vh;
	}

	.suffix-text {
		color: #999;
		font-size: 28rpx;
		margin-left: 10rpx;
	}

	.category-list,
	.participant-select-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		padding: 30rpx;
		justify-content: center;
		
	}

	.category-tag,
	.participant-select-tag {
		padding: 10rpx 24rpx;
		cursor: pointer;
	}

	.participant-container {
		padding: 30rpx 0;
	}

	.participant-header {
		display: flex;
		/* align-items: center; */
		justify-content: space-between;
		margin-bottom: 20rpx;
		width: 100%;
	}
	.add-button{
		width: 10%;
		flex-shrink: 0; 
	}
	.participant-title {
		font-size: 28rpx;
		font-weight: 500;
		color: #333;
		flex: 1;
	}

	.participant-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin: 20rpx 0;
		justify-content: center;
	}

	.participant-tag {
		margin-bottom: 10rpx;	
	}

	.total-tip {
		margin-top: 20rpx;
		padding: 12px;
		background-color: #f7f8fa;
		border-radius: 8px;
		text-align: center;
		color: #1989fa;
		font-size: 14px;
	}

	.submit-btn {
		padding: 40rpx 20rpx;
	}
</style>