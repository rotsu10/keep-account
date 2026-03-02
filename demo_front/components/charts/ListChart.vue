
<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="loadData"
  >
    <van-cell 
      v-for="item in list" 
      :key="item.id"
      :label="`${item.categoryName}`"
      :title="`${item.type === 1 ? '+' : '-'}${item.amount}`"
      :value="dayjs(item.createTime).format('YYYY/MM/DD')"
      @click="goToBillDetail(item.id)"
    />
  </van-list>
</template>

<script setup>
	import { ref, defineProps, watch,onMounted } from 'vue';
	import dayjs from 'dayjs';
	import {http} from '../../utils/request.js'
	import { API_PATH } from '../../api/api.js';
	
	const props = defineProps(['type', 'timeType', 'timeValue']);
	console.log("props",props)
	const loading = ref(false); // 加载中状态
	const finished = ref(false); // 是否加载完毕
	const list = ref([]); // 账单列表数据
	const currentPage = ref(1); // 当前页码
	const pageSize = ref(10); // 每页条数
	const total = ref(0); // 总条数
	
	console.log("loading",loading.value)
	// 3. 加载账单数据
	const loadData = async () => {
	if (finished.value) return; 
		
	try {
		// 查询条件 + 分页参数
		const sendDate = {
			type:props.type,
			timeType:props.timeType,
			timeValue:props.timeValue,
			page: currentPage.value,
			pageSize: pageSize.value
		};
	
		console.log("根据日期类型查询账单分页列表sendDate：", sendDate);
		// 根据日期类型查询账单分页列表
		// const { records, total: totalCount } = await http.post("/user/ListChart", sendDate);
		const { records, total: totalCount } = await http.post(API_PATH.BILL.LIST_CHART, sendDate);
		console.log("根据日期类型查询账单分页列表：", records);
	
		// 处理分页数据
		if (currentPage.value === 1) {
			list.value = records;
		} else {
			list.value = list.value.concat(records);
		}
	
		// 更新总条数和分页状态
		total.value = totalCount;
		currentPage.value++; // 页码自增
		// debugger
		console.log("currentPage.value++;",currentPage.value)
		
		// 判断是否加载完毕（列表长度 >= 总条数）
		if (list.value.length >= total.value || totalCount === 0) {
			finished.value = true;
		}
	} catch (err) {
		console.error("账单列表查询失败：", err.message);
		}finally{
			loading.value = false;
		}
	};
	
	// 4. 跳转账单详情
	const goToBillDetail = (billId) => {
	console.log("账单id:", billId);
	uni.navigateTo({
		url: `/pages/record/billDetail?id=${billId}`
	});
	};
	
	// 5. 监听 props 中的年月变化
	watch(
	() => [props.type, props.timeType,props.timeValue],
	() => {
		// 重置所有分页和数据状态
		resetPagination();
		// 重新加载第一页数据
		loadData();
	},
	{ deep: true } ,// 深度监听数组中的值变化
	{ immediate: true }
	);
	
	// 6. 重置分页和数据状态
	const resetPagination = () => {
		currentPage.value = 1;
		total.value = 0;
		list.value = [];
		finished.value = false;
		loading.value = true;
	};
	
	
	// onMounted(() => {
	//   loadData();
	// });
	
	defineExpose({
	resetPagination
	});
</script>