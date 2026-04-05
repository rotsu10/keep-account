<template>
	<view class="chart-wrapper">
		<!-- 空数据时显示提示 -->
		<view class="empty" v-if="chartData.series.length === 0">
			暂无数据
		</view>

		<!-- 有数据时渲染饼图 -->
		<qiun-data-charts
			v-else
			type="pie"
			:chartData="chartData"
			:opts="opts"
			enablePie="true"
			:key="JSON.stringify(chartData)"
		/>
	</view>
</template>

<script setup>
	import { nextTick } from 'vue'
	import { ref, watch, onMounted, onUnmounted } from 'vue'
	import { http } from '../../utils/request.js'
	import { API_PATH } from '../../api/api.js'

	// 接收父组件参数
	const props = defineProps(['type', 'timeType', 'timeValue'])

	// 饼图数据
	const chartData = ref({
		series: []
	})

	// 饼图配置
	const opts = ref({
		legend: {
			show: true,
			fontSize: 11
		},
		tooltip: {
			show: true
		},
		extra: {
			pie: {
				radius: ["35%", "55%"],
				borderWidth: 1,
				borderColor: '#fff',
				label: {
					fontSize: 10,
					formatter: '{b}: {d}%'
				}
			}
		}
	})

	// 请求接口数据
	const getCategorySum = async () => {
		await nextTick()
		try {
			const params = {
				type: props.type,
				timeType: props.timeType,
				timeValue: props.timeValue
			}
			const res = await http.post(API_PATH.BILL.GET_CATEGORY_SUM, params)
			const list = Array.isArray(res) ? res : [];
			console.log("饼状图result",res)
			console.log("饼状图list",list)
			// ✅ 关键修复：空数组时手动清空，强制结束加载
			if (list.length === 0) {
				chartData.value = { series: [] };
				return;
			}

			chartData.value = {
				series: list.map(item => ({
					name: item.name,
					data: item.value
				}))
			}
		} catch (e) {
			console.error('获取饼图数据失败', e)
			chartData.value = { series: [] }; // ✅ 失败也清空
		}
	}

	// 监听参数变化
	watch(
		[() => props.type, () => props.timeType, () => props.timeValue],
		() => {
			getCategorySum()
		}, {
			immediate: true
		}
	)

	// 事件刷新
	const getNewList = () => {
		getCategorySum()
	}

	onMounted(() => {
		uni.$on('deleteBill', getNewList)
		uni.$on('addBill', getNewList)
		uni.$on('updateBill', getNewList)
	})

	onUnmounted(() => {
		uni.$off('deleteBill', getNewList)
		uni.$off('addBill', getNewList)
		uni.$off('updateBill', getNewList)
	})
</script>

<style scoped>
	.chart-wrapper {
		width: 100%;
		height: 400rpx;
		padding: 15rpx;
		box-sizing: border-box;
		min-height: 200rpx;
		position: relative;
	}

	/* 空数据样式 */
	.empty {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 28rpx;
	}
</style>