// stores/useBillStore.js

import {
	defineStore
} from 'pinia';
import {
	http
} from '../utils/request'; // 确保导入了你的 http 工具

export const useBillStore = defineStore('bill', {
	state: () => ({
		dailyCosts: {}, // 存储每日花费数据（全局共享）
	}),

	actions: {
		//获取每日花费
		async fetchDailyCosts() {
			try {
				const result = await http.get("/user/queryDailyCosts", {}, {
					loadingText: '加载花费数据...'
				});

				const costMap = {};
				result.forEach(item => {
					costMap[item.date] = item;
				});

				this.dailyCosts = costMap;

			} catch (err) {
				console.error("获取当日花费失败：", err);
				this.dailyCosts = {};
			}
		},
		
		//添加账单
		async addBill(billData) {
			if (!billData.amount || !billData.categoryId || !billData.type) {
				throw new Error('请填写完整的账单信息');
			}
			try {
				const sendData = {
					amount: billData.amount,
					remark: billData.remark || '',
					categoryId: billData.categoryId,
					type: billData.type,
				}
				const result = await http.post('/user/addBill', sendData, {
					loadingText: '正在提交...',
				});
				uni.showToast({
					title: '添加成功',
					icon: 'success'
				});
				console.log('后端返回数据：', result);
				this.fetchDailyCosts();
				return true;
			} catch (error) {
				console.error('添加失败：', error);
				throw error;
			}
		}
	},
});