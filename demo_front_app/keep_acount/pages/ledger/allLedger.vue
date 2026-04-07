<template>
	<view class="content">
		<!-- 导航栏 -->
		<up-navbar class="nav" title="切换账本" left-text="返回" :autoBack="true" left-icon="arrow-left" :placeholder="true">
			<template #right>
				<up-icon name="plus" size="18" @click="showAddLedger" />
			</template>
		</up-navbar>

		<!-- 所有账本列表 -->
		<up-cell-group inset v-if="allLedger.length > 0">
		    <up-cell 
		        is-link 
		        size="large" 
		        v-for="item in allLedger" 
		        :key="item.id"
		        :value="item.ledgerId" 
		        @click="selectLedger(item.ledgerId)"
		        @long-press="deleteByLongPress(item.ledgerId)"
		    >
				<template #icon>
					<up-icon size="20" name="search"></up-icon>
				</template>
		        <template #title>
		            <view class="u-slot-title">
		                <span class="u-cell-text">{{ item.ledgerName || '未命名账本' }}</span>
		                <up-tag
		                    text="默认"
		                    size="mini"
		                    type="primary"
		                    style="margin-left: 8rpx;"
		                    v-if="item.default"
		                ></up-tag>
		            </view>
		        </template>
		    </up-cell>
		</up-cell-group>

		<!-- 空状态 -->
		<up-empty v-else text="暂无账本" description="点击右上角添加" />

		<!-- 添加账本弹出层 -->
		<up-modal 
			v-model:show="show" 
			title="添加账本" 
			show-cancel-button
			@confirm="addLedger"
		>
			<up-input v-model="LedgerName" placeholder="请输入账本名" />
		</up-modal>
		
		<!-- 删除账本弹窗 -->
		<up-modal 
			v-model:show="DialogShow" 
			title="删除账本" 
			show-cancel-button
			confirm-text="确认删除" 
			cancel-text="取消" 
			@confirm="confirmDelete()"
		>
			<view class="delete">删除该账本</view>
		</up-modal>
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

	const ledgerStore = useLedgerStore();
	const LedgerName = ref('');
	const show = ref(false);
	const allLedger = ref([]);
	
	//删除账本info
	const ledgerIdRef = ref('');
	const DialogShow = ref(false)

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