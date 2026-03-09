<!-- 首页 -->
<template>
	<view>
		<!-- 页面内容 -->
		<view class="content">
			<van-button icon="plus" type="primary" round class="plus" @click="plusAccountPage"/>
		</view>
		<view class="calendar">
			<CalendarVue></CalendarVue>
		</view>
		<view>
			<LedgerShow 
			   @queryLedgerDetail="handleQueryLedgerDetail"
			>
			</LedgerShow>
		</view>
	</view>
</template>

<script setup>
	import ButtomBarVue from '../../components/ButtomBar.vue'
	import CalendarVue from '../../components/Calendar.vue'
	import LedgerShow from '../../components/Ledger/LedgerShow.vue'
	import { API_PATH } from '../../api/api'
	import { useLedgerStore } from '../../stores/useLedgerStore'
	const ledgerStore = useLedgerStore()
	
	const plusAccountPage = ()=>{
		uni.navigateTo({
			url:'/pages/record/bill',
			success: () => {
				uni.showToast({
					title:'请填写相关信息',
					icon:'none'
				})
			},
			fail:(err)=>{
				console.log("跳转失败:",err)
			}
		})
	}
	
	const handleQueryLedgerDetail = async(ledgerId) =>{
		try{
			console.log("当前账本ledgerId",ledgerId)
			const result = await ledgerStore.queryLedgerDetailByID({ledgerId})
		}catch(error){
			console.error("查询账本详情失败",error)
		}
	}
	
	
</script>

<style scoped>
.fixed-bottom {
	position: fixed;
	bottom: 0;
	height: 80rpx;
	width: 100%;
	background-color: #ffffff;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	z-index: 999;
}

.van-col{
	height: 80rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.plus{
	position: fixed;
	bottom: 20%;
	right: 0;
}

</style>
