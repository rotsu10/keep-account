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
			<van-cell 
				is-link
				size="large"
				icon="location-o"
				v-for="item in allLedger"
				:key="item.id"
				:title="item.ledgerName"
				@click="selectLedger(item.id)"
			></van-cell>
		</van-cell-group>
		
		
		<!-- 添加账本弹出层 -->
		<van-dialog
		  v-model:show="show" 
		  title="添加账本" 
		  show-cancel-button 
		  show-confirm-button 
		  @confirm="addLedger"
		>
		  <van-field 
		    v-model="LedgerName" 
		    label="" 
		    placeholder="请输入账本名"
		  />
		</van-dialog>
	</view>
</template>

<script setup>
	import { onMounted,ref } from 'vue';
	import { useLedgerStore } from '../../stores/useLedgerStore';
	const ledgerStore = useLedgerStore();
	const LedgerName = ref('')
	const show = ref(false)
	
	const allLedger = ref('')
	
	const onClickLeft = () => history.back();
	
	const showAddLedger = () =>{
		show.value = true;
		LedgerName.value = '';
	}
	
	const addLedger = async ()=>{
		const ledgerName = LedgerName.value;
		await ledgerStore.addLedger(ledgerName);
	}
	
	onMounted(async()=>{
		const result = await ledgerStore.getAllLedger();
		allLedger.value = result;
	})


	const selectLedger = (ledger) => {
		console.log("选中账本：", ledger);
		// 示例：切换到选中的账本
		ledgerStore.setCurrentLedgerId(ledger.id);
		// 示例：查询该账本详情
		// 示例：返回上一页/跳转到账本详情页
		uni.navigateBack();
	}
</script>

<style>
	       
</style>
