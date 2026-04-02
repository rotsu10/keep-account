<!-- 首页 -->
<template>
	<view>
		<!-- uview-plus 导航栏 -->
		<u-navbar title="日历" :is-back="false">
			<view class="navbar-right" slot="right" >
				<LedgerShow 
					@queryLedgerDetail="handleQueryLedgerDetail"
					style="width: 100%;"
				></LedgerShow>
			</view>
		</u-navbar>
		
		<view class="content">
			<!-- uview-plus 按钮 -->
			<u-button 
				icon="plus" 
				type="primary" 
				shape="circle" 
				class="plus"
				@click="plusAccountPage"
			></u-button>
		</view>
		
		<view class="calendar">
			<CalendarVue></CalendarVue>
		</view>
	</view>
</template>

<script setup>
	import CalendarVue from '../../components/Calendar.vue'
	import LedgerShow from '../../components/Ledger/LedgerShow.vue'
	import { API_PATH } from '../../api/api'
	import { useLedgerStore } from '../../stores/useLedgerStore'
	const ledgerStore = useLedgerStore()
	
	// 跳转到记账页面
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
				console.error("跳转失败:",err)
			}
		})
	}
	
	// 查询账本详情
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

.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 靠右 */
  width: 300rpx; /* 必须给固定宽度！！ */
  height: 100%;
}

.plus{
	width: 100rpx;
	height: 100rpx;
	position: fixed;
	bottom: 20%;
	right: 0;
}

/* 导航栏右侧内容对齐 */
.navbar-right {
	display: flex;
	align-items: center;
	height: 100%;
}


</style>