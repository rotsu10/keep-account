<!-- components/BillList.vue（包含接口调用） -->
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
      :title="`${item.type === 1 ? '-' : '+'}${item.amount}`"
      :value="dayjs(item.createTime).format('MM/DD')"
      @click="goToBillDetail(item.id)"
    />
  </van-list>
</template>

<script setup>
	import { ref, defineProps, watch } from 'vue';
	import dayjs from 'dayjs';
	import { http } from '../../utils/request';
	
	// 1. 定义接收的 props（从父组件传递查询条件：年月）
	const props = defineProps({
	// 选中的年份
	year: {
		type: Number,
		required: true
	},
	// 选中的月份
	month: {
		type: Number,
		required: true
	}
	});
	
	// 2. 维护组件内部的核心状态
	const loading = ref(false); // 加载中状态
	const finished = ref(false); // 是否加载完毕
	const list = ref([]); // 账单列表数据
	const currentPage = ref(1); // 当前页码
	const pageSize = ref(10); // 每页条数
	const total = ref(0); // 总条数
	
	// 3. 核心：加载账单数据（组件内部调用接口，无需父组件参与）
	const loadData = async () => {
	if (finished.value) return;
	loading.value = true;
	
	try {
		// 构造接口请求参数（查询条件 + 分页参数）
		const sendDate = {
		year: props.year,
		month: props.month,
		page: currentPage.value,
		pageSize: pageSize.value
		};
	
		// 调用接口查询账单列表
		const { records, total: totalCount } = await http.post("/user/queryRecordByDate", sendDate);
		console.log("账单列表返回数据：", records, totalCount);
	
		// 处理分页数据（第一页覆盖，后续页拼接）
		if (currentPage.value === 1) {
		list.value = records;
		} else {
		list.value = list.value.concat(records);
		}
	
		// 更新总条数和分页状态
		total.value = totalCount;
		currentPage.value++; // 页码自增，为下一页加载做准备
	
		// 判断是否加载完毕（列表长度 >= 总条数）
		if (list.value.length >= total.value || totalCount === 0) {
		finished.value = true;
		}
	} catch (err) {
		console.error("账单列表查询失败：", err.message);
	} finally {
		// 无论成功失败，都关闭加载状态
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
	
	// 5. 关键：监听 props 中的年月变化（切换日期时，重置分页并重新加载数据）
	watch(
	() => [props.year, props.month],
	() => {
		// 重置所有分页和数据状态
		resetPagination();
		// 重新加载第一页数据
		loadData();
	},
	{ deep: true } // 深度监听数组中的值变化
	);
	
	// 6. 重置分页和数据状态（切换日期、初始化时调用）
	const resetPagination = () => {
	currentPage.value = 1;
	total.value = 0;
	list.value = [];
	finished.value = false;
	loading.value = false;
	};
	
	// 7. 暴露重置方法（供父组件手动调用，可选）
	defineExpose({
	resetPagination
	});
</script>