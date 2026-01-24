<template>
	<view>
		<!-- 金额：数字输入框，绑定初始值并添加货币后缀 -->
		<van-form @submit="onSubmit">
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
					placeholder="分类名"
					readonly
					is-link
					@click="openDialog"
				/>
				
			<van-dialog v-model:show="DialogShow" title="选择分类" show-cancel-button >
				
				<view class="category-list">
					<van-tag
						v-for="(item,index) in categoryList"
						:index = "item"
						:type="formData.categoryName === item.name ? 'success' : 'primary'"
						@click="selectCategory(item)"
						class="category-tag"
						round
						size="large"
						plain 
					>
					{{ item.name }}
					</van-tag>
				</view>
			</van-dialog>

			<!-- 日期 -->
		
				<van-field
				  v-model="formData.createTime"
				  is-link
				  readonly
				  name="create_time"
				  label="时间选择"
				  placeholder="点击选择时间"
				  @click="showPicker = true"
				/>
				<van-popup v-model:show="showPicker" position="bottom">
				  <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
				</van-popup>
	
			
			<!-- 备注 -->

				<van-field
					v-model="formData.remark"
					name="remark"
					label="备注"
					placeholder="请输入附加说明"
				/>
		
			
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
		
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'; 
import { onLoad } from '@dcloudio/uni-app'; 
import { http } from '../../utils/request';
import dayjs from 'dayjs';
const DialogShow = ref(false)
//查询到的分类
const categoryList = ref([]);
// 添加分类的名字
const openDialog = async()=>{
	await getCategory();
	DialogShow.value = true
}

// 选择分类：赋值给表单 + 关闭弹窗
const selectCategory = (item) => {
	formData.categoryName = item.name;
	DialogShow.value = false;
};
// 收支类型
const checked = ref('1');
// 表单数据对象
const formData = reactive({
	amount: '',        // 金额
	categoryName: '',  // 分类名称
	createTime: '',    // 格式化后的日期
	remark: '',        // 备注
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
	// console.log("账单详情金额：", billDetail.value.amount);
	// 金额
	formData.amount = billDetail.value.amount || '';
	// 分类名称
	formData.categoryName = billDetail.value.categoryName || '';
	// 日期
	formData.createTime = dayjs(billDetail.value.createTime).format('YYYY/MM/DD');
	// 备注
	formData.remark = billDetail.value.remark || '';
	// 收支类型
	checked.value = String(billDetail.value.type) || '';
	// 保留原始类型值
	formData.type = billDetail.value.type || '';
};
//更改提交
const onSubmit = (values) => {
    console.log('submit', values);
};

// 获取分类数据
const getCategory = async()=> {
	try{
		if (!formData.type) {
			console.warn('收支类型为空，无法获取分类');
			categoryList.value = [];
			return;
		}
		const res  =  await http.get(`/user/queryTypeCategory?type=${formData.type}`)
		categoryList.value = res||[];
		console.log("分类数据：", categoryList.value);
	}catch(error){
		console.error('获取分类失败：', err);
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
.category-tag {
	padding: 5px 12px;
	cursor: pointer;
}
</style>
