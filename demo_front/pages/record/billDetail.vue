<template>
	<view style="padding: 10px;">
		<!-- 金额：数字输入框，绑定初始值并添加货币后缀 -->
		<van-form>
			<van-cell-group>
				<van-field
					v-model="formData.amount"
					name="amount"
					label="金额"
					placeholder="请输入交易金额"
					type="number"
					suffix="元"
				/>
			
			
			<!-- 分类：文本输入框，绑定初始值 -->
			
				<van-field
					v-model="formData.categoryName"
					name="categoryName"
					label="分类"
					placeholder="请输入消费分类"
				/>
			
			
			<!-- 日期：只读输入框（如需编辑可搭配日期选择器），绑定格式化后的初始值 -->
		
				<van-field
				  v-model="formData.createTime"
				  is-link
				  readonly
				  name="datePicker"
				  label="时间选择"
				  placeholder="点击选择时间"
				  @click="showPicker = true"
				/>
				<van-popup v-model:show="showPicker" position="bottom">
				  <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
				</van-popup>
	
			
			<!-- 备注：文本输入框，绑定初始值（无备注时显示空） -->

				<van-field
					v-model="formData.remark"
					name="remark"
					label="备注"
					placeholder="请输入附加说明"
				/>
		
			
			<!-- 收支类型：文本输入框（如需编辑可搭配选择器），绑定初始值 -->
	
				<van-field
					v-model="formData.typeText"
					name="type"
					label="类型"
					placeholder="请选择收支类型"
				/>
			</van-cell-group>
		</van-form>
		
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'; // 只导入vue原生的API
import { onLoad } from '@dcloudio/uni-app'; // 单独导入UniApp的onLoad
import { http } from '../../utils/request';
import dayjs from 'dayjs';
// 收支类型映射
const typeMap = {
	1: '收入',
	2: '支出',
	3: '转账'
};

// 表单数据对象，用于绑定 van-field 的 v-model
const formData = reactive({
	amount: '',        // 金额
	categoryName: '',  // 分类名称
	createTime: '',    // 格式化后的日期
	remark: '',        // 备注
	typeText: '',      // 收支类型文本（收入/支出/转账）
	type: ''           // 收支类型
});

//时间选择器
const showPicker =ref(false)
const onConfirm = ({ selectedValues }) => {
      // formData.createTime = selectedValues.join('/');
	  formData.createTime = dayjs(selectedValues).format('YYYY/MM/DD');
      showPicker.value = false;
    };
// 账单详情数据
const billDetail = ref({});

onLoad((options) => {
	console.log("页面入参：", options);
	if (options.id) {
		loadBillDetail(options.id);
	}
});

// 加载账单详情并初始化表单初始值
const loadBillDetail = async (id) => {
	try {
		const res = await http.get(`/user/queryBillDetail?billId=${id}`);
		billDetail.value = res;
		initFormData();
	} catch (err) {
		console.log('查询账单详情失败', err);
	}
};

// 初始化表单数据
const initFormData = () => {
	console.log("账单详情金额：", billDetail.value.amount);
	// 金额
	formData.amount = billDetail.value.amount || '';
	// 分类名称
	formData.categoryName = billDetail.value.categoryName || '';
	// 日期
	formData.createTime = dayjs(billDetail.value.createTime).format('YYYY/MM/DD');
	// 备注
	formData.remark = billDetail.value.remark || '';
	// 收支类型
	formData.typeText = typeMap[billDetail.value.type] || '';
	// 保留原始类型值
	formData.type = billDetail.value.type || '';
};
</script>