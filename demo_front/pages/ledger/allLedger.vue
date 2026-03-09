<template>
	<view>
		<view class="clascustom-nav">
			<van-nav-bar title="账本">
				<template #right>
					<van-icon name="plus" size="18" @click="showAddLedger" />
				</template>
			</van-nav-bar>
		</view>
		
		
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
	const showAddLedger = () =>{
		show.value = true;
		LedgerName.value = '';
	}
	
	const addLedger = async ()=>{
		const ledgerName = LedgerName.value;
		await ledgerStore.addLedger(ledgerName);
	}
	
	onMounted(()=>{
		
	})

</script>

<style>
	       
</style>
