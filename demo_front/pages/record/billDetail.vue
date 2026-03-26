<template>
	<view>
		<!-- 金额：数字输入框，绑定初始值并添加货币后缀 -->
		<van-form @submit="onSubmit">
			<van-cell-group>
				<van-field v-model="formData.amount" name="amount" label="金额" placeholder="请输入交易金额" type="number"
					suffix="元" />


				<!-- 分类：文本输入框，绑定初始值 -->
				<van-field v-model="formData.categoryName" name="categoryName" label="分类" placeholder="分类名" readonly
					is-link @click="openDialog" />

				<van-dialog v-model:show="DialogShow" title="选择分类" show-cancel-button>
					<view class="category-list">
						<van-tag v-for="(item,index) in categoryList" :index="item"
							:type="formData.categoryName === item.name ? 'success' : 'primary'"
							@click="selectCategory(item)" class="category-tag" round size="large" plain>
							{{ item.name }}
						</van-tag>
					</view>
				</van-dialog>

				<!-- 账单付款人 -->
				<van-field v-model="formData.belongName" name="belongName" label="账单付款人"></van-field>

				<!-- 账本类型 -->
				<van-field name="billType" label="账单类型">
					<template #input>
						<van-radio-group v-model="formData.billType" direction="horizontal">
							<van-radio name="single">单人账本</van-radio>
							<van-radio name="multiple">多人账本</van-radio>
						</van-radio-group>
					</template>
				</van-field>

				<!-- 折叠面板 -->
				<van-collapse v-model="collapseNames" v-if="formData.billType === 'multiple'">

					<!-- 付款人  -->
					<van-collapse-item title="付款人信息" name="payer" is-link>
						<van-field v-model="formData.belongName" name="belongName" label="实际付款人" disabled />
						<van-field v-model="formData.userId" name="userId" label="付款人ID" disabled />
					</van-collapse-item>

					<!-- 账本参与人 -->
					<van-collapse-item title="账本参与人" name="participant">
						<!-- 参与人列表 -->
						<view class="participant-container">
							<view class="participant-title">
								<text class="title-text">账单参与人</text>
								<van-button size="small" type="primary" @click="plusParticipant">添加</van-button>
							</view>
							<!-- 参与人列表项 -->
							<view class="selected-participant-list">
								<van-tag v-for="(item,index) in participants" :index="item"
									class="selected-participant--tag" round size="large" plain>
									{{ item.participantName}}
								</van-tag>
							</view>
							<!-- 合计金额提示 -->
							<view class="total-tip">
								每人分摊：{{eachPersonAmount}} 元（需等于账单总金额 {{ formData.amount }} 元）
							</view>
						</view>
					</van-collapse-item>
				</van-collapse>



				<!-- 日期 -->
				<van-field v-model="formData.createTime" is-link readonly name="create_time" label="时间选择"
					placeholder="点击选择时间" @click="showPicker = true" />
				<van-popup v-model:show="showPicker" position="bottom">
					<van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
				</van-popup>


				<!-- 备注 -->
				<van-field v-model="formData.remark" name="remark" label="备注" placeholder="请输入附加说明" />


				<!-- 收支类型 -->
				<van-field name="type" label="收支类型">
					<template #input>
						<van-radio-group v-model="checked" direction="horizontal" disabled>
							<van-radio name="1">收入</van-radio>
							<van-radio name="2">支出</van-radio>
						</van-radio-group>
					</template>
				</van-field>

			</van-cell-group>
			<div style="margin: 16px;">
				<van-button round block type="primary" native-type="submit">
					提交
				</van-button>
			</div>
		</van-form>

		<!-- 添加账单参与人 -->
		<van-dialog v-model:show="addParticipantShow" title="选择账单参与者" show-cancel-button
			@confirm="handleParticipantConfirm">
			<view class="category-list">
				<van-tag v-for="(item, index) in ledgerUserList" :key="index"
					:class="['category-tag', isSelected(item) ? 'selected-tag' : '']" round size="large"
					@click="toggleSelect(item)">
					{{ item.username }}
					<van-icon name="success" v-if="isSelected(item)" class="selected-icon" />
				</van-tag>
			</view>
		</van-dialog>
	</view>
</template>

<script setup>
	import {ref,reactive,computed } from 'vue';
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
	
	// 点击弹窗“确认”按钮的回调
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
	const onConfirm = ({
		selectedValues
	}) => {
		formData.createTime = dayjs(selectedValues).format('YYYY-MM-DD');
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
			// uni.$emit('billUpdated');
			uni.navigateBack();
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
	.category-list {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		padding: 10px;
		justify-content: center;
	}
	
	.selected-participant-list {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		padding: 10px;
		justify-content: center;
	}

	.category-tag {
		padding: 5px 12px;
		cursor: pointer;
	}
	
	.selected-participant--tag {
		padding: 5px 12px;
	}

	.participant-container {
		padding: 16px;
	}

	.participant-title {
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 16px;
		font-weight: 500;
	}

	/* 添加按钮：靠右显示 */
	.participant-title .van-button {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.total-tip {
		margin-top: 16px;
		padding: 12px;
		background-color: #f7f8fa;
		border-radius: 8px;
		text-align: center;
		color: #1989fa;
		font-size: 14px;
	}

	.category-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		padding: 10px 0;
	}

	.category-tag {
		cursor: pointer;
		transition: all 0.2s;
	}

	/* 选中状态的样式 */
	.selected-tag {
		background-color: #1989fa;
		color: #fff;
		border-color: #1989fa;
	}

	.selected-icon {
		margin-left: 5px;
		font-size: 12px;
	}
</style>