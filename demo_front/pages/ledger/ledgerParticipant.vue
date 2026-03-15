<!-- 账本参与者 -->
<template>
	<view>
		<!-- 添加参与者 -->
		<view class="clascustom-nav">
			<!-- 导航栏 -->
			<van-nav-bar title="参与者">
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
		<van-dialog v-model:show="show" title="添加参与者" show-cancel-button show-confirm-button @confirm="addParticipant">
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
		getAllLedgerUser
	} from '../../api/ledger';

	const userList = ref([]);
	const show = ref(false);
	const participantValue = ref('');
	onLoad((options) => {
		console.log("页面入参：", options);
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

	//添加参与者
	const addParticipant = async() => {
		if (!participantValue.value.trim()) {
			uni.showToast({
				title: '请输入参与者信息',
				icon: 'none'
			});
			return;
		}
		console.log('要添加的参与者：', participantValue.value);
		
		
		 // 关闭弹窗 + 清空输入框
		show.value = false;
		participantValue.value = '';
	}
</script>

<style>

</style>