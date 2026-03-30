<template>
	<view>
		<view class="clascustom-nav">
			<van-nav-bar title="切换账本" left-arrow @click-left="onClickLeft">
				<template #right>
					<van-icon name="plus" size="18" @click="showAddLedger" />
				</template>
			</van-nav-bar>
		</view>

		<!-- 所有账本 -->
		<van-cell-group inset v-if="allLedger.length > 0">
			<van-cell is-link size="large" icon="location-o" v-for="item in allLedger" :key="item.id"
				:value="item.ledgerId" @click="selectLedger(item.ledgerId)" 
				@longpress="deleteByLongPress(item.ledgerId)">
				<template #title>
					<span>{{ item.ledgerName || '未命名账本' }}</span>
					<van-tag type="primary" size="mini" style="margin-left: 8rpx;" v-if="item.default">
						默认
					</van-tag>
				</template>
			</van-cell>
		</van-cell-group>


		<!-- 添加账本弹出层 -->
		<van-dialog v-model:show="show" title="添加账本" show-cancel-button show-confirm-button @confirm="addLedger">
			<van-field v-model="LedgerName" label="" placeholder="请输入账本名" />
		</van-dialog>
		
		<!-- 删除账本弹窗 -->
		<van-dialog v-model:show="DialogShow" title="删除账本"  show-cancel-button
		confirm-button-text="确认删除" cancel-button-text="取消" @confirm="confirmDelete()">
			<van-row  justify="center">
				<view class="delete">删除该账本</view>
			</van-row>
		</van-dialog>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import { deleteLedger } from '../../api/ledger';
	import {
		useLedgerStore
	} from '../../stores/useLedgerStore';
import { Dialog } from 'vant';

	const ledgerStore = useLedgerStore();
	const LedgerName = ref('');
	const show = ref(false);
	const allLedger = ref([]);
	
	//删除账本info
	const ledgerIdRef = ref('');
	const DialogShow = ref(false)
	const onClickLeft = () => {
		uni.navigateBack({
			delta: 1 // 返回上一级页面
		});
	};

	const showAddLedger = () => {
		show.value = true;
		LedgerName.value = '';
	};

	const addLedger = async () => {
		const ledgerName = LedgerName.value.trim();
		if (!ledgerName) {
			uni.showToast({
				title: '账本名称不能为空',
				icon: 'none'
			});
			return;
		}

		try {
			await ledgerStore.addLedger(ledgerName);
			uni.showToast({
				title: '添加账本成功',
				icon: 'success'
			});
			show.value = false; // 关闭弹窗
			getAllLedger();
			
		} catch (error) {
			console.error("添加账本失败：", error);
			uni.showToast({
				title: '添加账本失败',
				icon: 'none'
			});
		}
	};
	
	//获取所有账本
	const getAllLedger =async ()=>{
		// 添加成功后刷新账本列表
		const result = await ledgerStore.getAllLedger();
		allLedger.value = result || [];
	}
		
	//删除账单
	const deleteByLongPress = (ledgerId) =>{
		ledgerIdRef.value = ledgerId;
		DialogShow.value = true;
	}
	
	const confirmDelete = async()=>{
		try{
			const ledgerId = ledgerIdRef.value
			await deleteLedger(ledgerId);
			uni.showToast({
				title:"删除账本成功"
			})
			await getAllLedger();
			DialogShow.value = false;
		}catch(error){
			console.error("删除账本失败error",error)
		}
	}

	onMounted(async () => {
		try {
			const result = await ledgerStore.getAllLedger();
			console.log("result", result)
			allLedger.value = result || [];
		} catch (error) {
			console.error("查询账本列表失败：", error);
			uni.showToast({
				title: '加载账本失败',
				icon: 'none'
			});
		}
	});


	const selectLedger = async (ledgerId) => {
		console.log("开始切换账本，ID：", ledgerId);


		if (!ledgerId || ledgerId <= 0) {
			uni.showToast({
				title: '账本ID异常',
				icon: 'none'
			});
			return;
		}

		try {
			await ledgerStore.switchLedger(ledgerId);
			uni.showToast({
				title: '切换账本成功',
				icon: 'success'
			});

			uni.navigateBack({
				delta: 1
			});
		} catch (error) {
			console.error("切换账本失败：", error);
			uni.showToast({
				title: '切换账本失败',
				icon: 'none'
			});
		}
	};
</script>

<style scoped>
	.empty-tip {
		padding: 50rpx;
		text-align: center;
	}


</style>