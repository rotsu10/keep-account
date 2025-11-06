<template>
	<view>
		<van-cell-group>
		  <!-- 金额：绑定 amount 字段，可加货币符号优化显示 -->
		  <van-cell title="金额" :value="`${billDetail?.amount || 0}`" label="交易金额" />
		</van-cell-group>
		<van-cell-group>
		  <!-- 分类：绑定 categoryName 字段（来自关联的category表） -->
		  <van-cell title="分类" :value="billDetail?.categoryName || '未分类'" label="消费分类" />
		</van-cell-group>
		<van-cell-group>
		  <!-- 日期：绑定 billDate 字段 -->
		  <van-cell title="日期" :value="billDetail?.createTime || '未知日期'" label="交易日期" />
		</van-cell-group>
		<van-cell-group>
		  <van-cell title="备注" :value="billDetail?.remark || '无备注'" label="附加说明" />
		</van-cell-group>
		<van-cell-group>
		  <van-cell title="类型" :value="billDetail?.type || '未知类型'" label="收支类型" />
		</van-cell-group>
	</view>
</template>

<script setup>
	import{ref} from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { http } from '../../utils/request';
	const billId = ref('');
	const billDetail = ref({})
	onLoad((options)=>{
		console.log("接收的账单id:",options);
		if(options.id){
			billId.value = options.id;
			loadBillDetail(options.id);
		}
	})
	
	const loadBillDetail = async(id)=>{
		try{
			const res = await http.get(`/user/queryBillDetail?billId=${id}`)
			console.log('账单详情:',res);
			billDetail.value = res;
		}catch(err){
			console.log('查询账单详情失败err',err);
		}
	}
</script>

<style>

</style>
