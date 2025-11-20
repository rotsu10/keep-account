// stores/useBillStore.js

import { defineStore } from 'pinia';
import { http } from '../utils/request'; // 确保导入了你的 http 工具

export const useBillStore = defineStore('bill', {
  state: () => ({
    dailyCosts: {}, // 存储每日花费数据（全局共享）
  }),

  actions: {
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
	
  },
});