// stores/useBillStore.js

import {defineStore} from 'pinia';
import {http} from '../utils/request';

export const useBillStore = defineStore('bill', {
	state: () => ({
		dailyCosts: {}, // 存储每日花费
		billList:[],
		total:0
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
		},
		
		//根据分类id查询账单
		async queryBillByCategoryId(categoryId){
			console.log("查询账单categoryId",categoryId);
		    try{
				const params = {
				    categoryIds: [categoryId].join(',')
				};
		        const res = await http.get("/user/getBillByCategoryIds", params);
				console.log("查询账单res",res);
				if(res==null || res.length === 0){
					throw new Error("该分类下没有账单");
				}
				return res;
		    }catch(error){
		        console.error('根据分类id查询账单err:', error);
		        throw error;
		    }
		},
		
		//根据日期查询账单
		async queryBillList(selectedDate){
			const dateParams = selectedDate;
			console.log("param",dateParams);
			const sendData = {
				year:dateParams.year,
				month:dateParams.month,
				day:dateParams.day,
				page:1,
				pageSize:30
			};
			
			try{
				const res = await http.post("/user/queryRecordByDate",sendData);
				const data = res || {};
				const records = data.records || [];
				const total = data.total || 0;
				this.billList = data.records || [];
				this.total = data.total || 0;
				return { records, total };
				console.log("查询账单this.billList",this.billList);
				console.log("查询账单this.total",this.total);
			}catch(error){
				 console.error('根据日期查询账单err:', error);
			}
		}
	},
});