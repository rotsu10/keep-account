import { defineStore } from "pinia";
import { http } from "../utils/request";
import { API_PATH } from "../api/api";

export const useLedgerStore = defineStore('ledger', {
  state: () => ({
    // 核心全局状态：当前选中的账本ID（从本地存储初始化）
    ledgerId: uni.getStorageSync('ledgerId') || '',
    // 账本详情
    ledgerName: '',
    createTime: '',
    ownerId: '',
    billCount: 0,
    totalIncomeAmount: 0, // 总收入
    totalOutcomeAmount: 0, // 总支出
  }),

  actions: {
    // 1. 设置当前账本ID（同步到本地存储）
    setCurrentLedgerId(ledgerId) {
      this.ledgerId = ledgerId;
      uni.setStorageSync('ledgerId', ledgerId);
    },

    // 2. 根据账本ID查询详情（更新state）
    async queryLedgerDetailByID(ledgerId = this.ledgerId) {
      if (!ledgerId) {
        uni.showToast({ title: '账本ID不能为空', icon: 'none' });
        return;
      }
      try {
        const result = await http.post(API_PATH.LEGER.LEGER_DETAIL_BY_ID, { ledgerId });
        this.ledgerName = result.ledgerName || '';
        this.createTime = result.createTime || '';
        this.ownerId = result.ownerId || '';
        this.billCount = result.billCount || 0;
        this.totalIncomeAmount = result.totalIncomeAmount || 0;
        this.totalOutcomeAmount = result.totalOutcomeAmount || 0;
      } catch (error) {
        console.error("查询账本详情失败", error);
        uni.showToast({ title: '查询账本详情失败', icon: 'none' });
      }
    },

    // 3. 清空账本详情
    clearLedgerDetail() {
      this.ledgerName = '';
      this.createTime = '';
      this.ownerId = '';
      this.billCount = 0;
      this.totalIncomeAmount = 0;
      this.totalOutcomeAmount = 0;
    },

    // 4. 删除账本
    async deleteLedger(ledgerId) {
      if (!ledgerId) return;
      try {
        await http.delete(API_PATH.LEGER.DELETE,  { ledgerId });
        uni.showToast({ title: '删除账本成功', icon: 'success' });
        // 删除后清空当前账本ID（如果删除的是当前选中的账本）
        if (ledgerId === this.ledgerId) {
          this.setCurrentLedgerId('');
          this.clearLedgerDetail();
        }
      } catch (error) {
        console.error("删除账本失败", error);
        uni.showToast({ title: '删除账本失败', icon: 'none' });
      }
    }
  },

  getters: {
	// 收支差额
    balance: (state) => {
      return state.totalIncomeAmount - state.totalOutcomeAmount;
    }
  }
});