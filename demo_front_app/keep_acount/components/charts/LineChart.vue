<template>
	<view class="chart-wrapper">
		<qiun-data-charts type="line"
		 :chartData="chartData" 
		 :opts="opts"
		 />
	</view>
</template>

<script setup>
	import {
		ref,
		watch,
		onMounted,
		onUnmounted
	} from 'vue'
	import {
		http
	} from '../../utils/request.js'
	import {
		API_PATH
	} from '../../api/api.js'

	const props = defineProps(['type', 'timeType', 'timeValue'])
	
	// 图表数据
	const chartData = ref({
		categories: [],
		series: []
	})

	// 配置项
	const opts = ref({
		legend: {
			show: true
		},
		xAxis: {
			rotateLabel: true,
			marginTop:10,
			fontSize:11
		},
		yAxis: {
		},
		extra: {
			line: {
				type: 'straight', // 曲线
				width: 2,
			}
		}
	})

	// 请求数据
	const getSumByDate = async () => {
		try {
			const params = {
				type: props.type,
				timeType: props.timeType,
				timeValue: props.timeValue
			}
			const res = await http.post(API_PATH.BILL.GET_SUM_BY_DATE, params)
			const list = Array.isArray(res) ? res : []
			chartData.value = {
				categories: list.map(i => i.timeValue),
				series: [{
					name: '收支总金额',
					data: list.map(i => i.total)
				}]
			}
			
		} catch (e) {
			console.error('获取数据失败', e)
			chartData.value = {
				categories: [],
				series: []
			}
		}
	}

	// 监听 props
	watch(
		[() => props.type, () => props.timeType, () => props.timeValue],
		() => {
			getSumByDate()
		}, {
			immediate: true
		}
	)

	// 事件刷新
	const getNewList = () => {
		getSumByDate()
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
	}

	.chart {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>