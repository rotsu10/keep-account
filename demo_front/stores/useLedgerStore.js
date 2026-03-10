import {
	defineStore
} from "pinia";
import {
	http
} from "../utils/request";
import {
	API_PATH
} from "../api/api";
import {
	ledgerDetailById,
	addLedger,getAllLedger,switchLedger
} from "../api/ledger";
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

		// 2. 根据账本ID查询详情
		async queryLedgerDetailByID(ledgerId = this.ledgerId) {
			if (!ledgerId) {
				uni.showToast({
					title: '账本ID不能为空',
					icon: 'none'
				});
				return;
			}
			try {
				// const result = await http.get(API_PATH.LEDGER.LEDGER_DETAIL_BY_ID, ledgerId );
				const result = await ledgerDetailById(ledgerId)
				console.log("当前账本详情store", result)
				this.ledgerName = result.ledgerName || '';
				this.createTime = result.createTime || '';
				this.ownerId = result.ownerId || '';
				this.billCount = result.billCount || 0;
				this.totalIncomeAmount = result.totalIncomeAmount || 0;
				this.totalOutcomeAmount = result.totalOutcomeAmount || 0;
				return result;
			} catch (error) {
				console.error("查询账本详情失败", error);
				uni.showToast({
					title: '查询账本详情失败',
					icon: 'none'
				});
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
				await http.delete(API_PATH.LEDGER.DELETE, {
					ledgerId
				});
				uni.showToast({
					title: '删除账本成功',
					icon: 'success'
				});
				// 删除后清空当前账本ID（如果删除的是当前选中的账本）
				if (ledgerId === this.ledgerId) {
					this.setCurrentLedgerId('');
					this.clearLedgerDetail();
				}
			} catch (error) {
				console.error("删除账本失败", error);
				uni.showToast({
					title: '删除账本失败',
					icon: 'none'
				});
			}
		},
		// 5.添加账本
		async addLedger(ledgerName) {
			if(!ledgerName){
				uni.showToast({
					icon:"error",
					title:"填写完整信息"
				});
				return;
			}
			try{
				console.log("ledgerName",ledgerName)
				await addLedger({ledgerName});
			}catch(error){
				console.error("添加账本失败",error);
			}
		},
		// 6.查询所有账本
		async getAllLedger(){
			try{
				const result = await getAllLedger();
				return result;
			}catch(error){
				console.error("查询所有账本失败",error)
			}
		},
		//7.切换账本
		async switchLedger(ledgerId){
			try{
				console.log("切换账本type",typeof ledgerId)
				const result =await switchLedger(ledgerId);
			}catch(error){
				console.log("切换账本失败error",error)
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