
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
      :value="dayjs(item.createTime).format('MM/DD')"
      @click="goToBillDetail(item.id)"
    />
  </van-list>
</template>

<script setup>
	import { ref, defineProps, watch,onMounted } from 'vue';
	import dayjs from 'dayjs';
	import {http} from '../utils/request.js'
	
	const props = defineProps({
	// 选中的年份
	year: {
		type: Number,
		required: false
	},
	// 选中的月份
	month: {
		type: Number,
		required: false
	},
	day:{
		type: Number,
		required: false
	}
	});
	console.log("props",props)
	const loading = ref(false); // 加载中状态
	const finished = ref(false); // 是否加载完毕
	const list = ref([]); // 账单列表数据
	const currentPage = ref(1); // 当前页码
	const pageSize = ref(2); // 每页条数
	const total = ref(0); // 总条数
	
	// 3. 加载账单数据
	const loadData = async () => {
	if (finished.value) return; 
	
	try {
		// 查询条件 + 分页参数
		const sendDate = {
		year: props.year,
		month: props.month,
		day:props.day,
		page: currentPage.value,
		pageSize: pageSize.value
		};
	
		// 调用接口查询账单列表
		const { records, total: totalCount } = await http.post("/user/queryRecordByDate", sendDate);
		console.log("账单列表返回数据：", records, totalCount);
	
		// 处理分页数据
		if (currentPage.value === 1) {
			list.value = records;
		} else {
			list.value = list.value.concat(records);
		}
	
		// 更新总条数和分页状态
		total.value = totalCount;
		currentPage.value++; // 页码自增
		console.log("currentPage.value++;",currentPage.value)
		// 判断是否加载完毕（列表长度 >= 总条数）
		if (list.value.length >= total.value || totalCount === 0) {
		finished.value = true;
		}
	} catch (err) {
		console.error("账单列表查询失败：", err.message);
	} finally {
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
	() => [props.year, props.month,props.day],
	() => {
		// 重置所有分页和数据状态
		resetPagination();
		// 重新加载第一页数据
		loadData();
	},
	{ deep: true } ,// 深度监听数组中的值变化
	{immediate: true}
	);
	
	// 6. 重置分页和数据状态
	const resetPagination = () => {
		currentPage.value = 1;
		total.value = 0;
		list.value = [];
		finished.value = false;
		loading.value = true;
	};
	
	
	onMounted(() => {
	  loadData();
	});
	
	defineExpose({
	resetPagination
	});
</script>