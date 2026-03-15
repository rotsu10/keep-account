<!-- 账本参与者 -->
<template>
	<view>
		<!-- 添加参与者 -->
		<view class="clascustom-nav">
			<!-- 导航栏 -->
			<van-nav-bar title="参与者"  left-arrow @click-left="onClickLeft">
				<template #right>
					<van-icon name="plus" size="18" @click="showAddDialog" />
				</template>
			</van-nav-bar>
		</view>

		<!-- 参与者列表 -->
		<view>
			<van-list>
				<van-cell v-for="item in userList" :key="item.id" :title="`${item.username}`"
					:value="`id:${item.id}`" />
			</van-list>
		</view>

		<!-- 添加参与者弹窗 -->
		<van-dialog v-model:show="show" title="添加参与者" show-cancel-button show-confirm-button @confirm="addParticipant" confirmButtonText = "发送要求">
			<div style="padding: 10px 0;">
				<van-field v-model="participantValue" label="参与者信息" placeholder="请输入参与者名称或者id" type="text" 
					clearable />
			</div>
		</van-dialog>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		ref
	} from 'vue';
	import {
		getAllLedgerUser,addLedgerUser
	} from '../../api/ledger';

	const userList = ref([]);
	const show = ref(false);
	const participantValue = ref('');
	const ledgerId = ref('')
	
	const onClickLeft = () => uni.navigateBack();
	onLoad((options) => {
		console.log("页面入参：", options);
		ledgerId.value = options.ledgerId;
		if (options.ledgerId) {
			getUserList(options.ledgerId);
		}
	});

	// 查询所有账本参与者
	const getUserList = async (ledgerId) => {
		console.log("查询所有账本参与者", ledgerId)
		const result = await getAllLedgerUser(ledgerId);
		console.log("查询所有账本参与者", result)
		userList.value = result;
	}

	//展示弹窗
	const showAddDialog = () => {
		show.value = true;
	}

	//判断是使用的哪种数据查询
	const judgeInputType = (value) => {
		const trimValue = value.trim();
		// 1. 判断是否为数字ID（纯数字）
		if (/^\d+$/.test(trimValue)) {
			return { type: 'userId', value: Number(trimValue) };
		}
		// 2. 判断是否为手机号（11位数字，以1开头）
		if (/^1[3-9]\d{9}$/.test(trimValue)) {
			return { type: 'phone', value: trimValue };
		}
		// 3. 其余情况判定为用户名
		return { type: 'userName', value: trimValue };
	}
	
	//添加参与者
	const addParticipant = async() => {
		const trimValue = participantValue.value.trim();
		if (!trimValue) {
			uni.showToast({
				title: '请输入参与者信息',
				icon: 'none'
			});
			return;
		}
			
		console.log('要添加的参与者：', participantValue.value);
		const { type, value } = judgeInputType(trimValue)
		console.log('输入类型：', type, '值：', value);
		const params = {
			[type]: value,
			ledgerId:ledgerId.value
		};
		
		await addLedgerUser(params);
		
		 // 关闭弹窗 + 清空输入框
		show.value = false;
		participantValue.value = '';
	}
</script>

<style>

</style>