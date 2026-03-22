// src/config/api.js
// 接口域名已经在 request.js 中定义为 BASE_URL = "http://localhost:8080"，这里只管理路径
export const API_PATH = {
  // 用户模块
  USER: {
    LOGIN: '/user/login',        // 登录
    REGISTER:'/user/register',   // 注册
    QUERY_CREATETIME:'/user/queryCreateTime',  // 查询用户注册信息
    INFO: '/user/getUserInfo',   // 获取用户信息
  },
  // 分类模块
  CATEGORY: {
    ADD: '/category/addCategory',	    						// 新增分类
    QUERY_BY_NAME_AND_TYPE: '/category/queryCategory',	    	// 根据分类名和类型查询分类
    QUERY_BY_TYPE_BASIC: '/category/queryTypeCategory',		    // 根据类型查询分类（基础数据）
    QUERY_BY_TYPE: '/category/queryCategoryByType',			    // 根据类型查询分类（VO格式）
    DELETE: '/category/deleteCategory',							// 删除分类
    UPDATE_BILL_CATEGORY: '/category/updateCategory',			// 批量修改账单所属分类
  },
  // 账单模块
  BILL: {
    ADD: '/bill/addBill',                        // 添加账单
    QUERY_BY_DATE: '/bill/queryRecordByDate',    // 根据时间查询账单（分页）
    QUERY_DETAIL: '/bill/queryBillDetail',       // 根据账单id查询账单详情
    STATISTICS_QUERY: '/bill/statisticsQuery',   // 根据月份日统计收入和支出
    QUERY_DAILY_COSTS: '/bill/queryDailyCosts',  // 查询每天花费
    CATEGORY_STATISTICS: '/bill/categoryStatistics', // 根据日期和类型统计账单
    DELETE: '/bill/deleteBill',                  // 删除账单
    GET_BY_CATEGORY_IDS: '/bill/getBillByCategoryIds', // 根据分类id查询账单
    UPDATE: '/bill/updateBill',                  // 更新修改账单
    GET_CATEGORY_SUM: '/bill/getCategorySum',    // 根据年月日统计每个分类账单和
    UPDATE_DETAIL: '/bill/updateDetail',         // 更新账单详情
    GET_SUM_BY_DATE: '/bill/getSumByDate',       // 根据年月日统计所有账单（折线图）
    LIST_CHART: '/bill/ListChart',               // 根据日期类型查询账单分页列表
  },
  LEDGER: {
	  ADD:'/ledger/addLedger',						//添加账本
	  GET_ALL_LEDGER:'/ledger/getAllLedger',		//获取所有账本
	  DELETE:'ledger/deleteLedger',					//删除账本
	  ADD_LEDGERUSER:'/ledger/addLedgerUser',		//账本添加参与者 （添加用户-账本表中数据）
	  LEDGER_DETAIL_BY_ID:'/ledger/LedgerDetailById',	//根据账本id查询账本详情
	  SWITCH_LEDGER:'/ledger/switchLedger'				,//切换默认账本
	  GET_ALL_LEDGER_USER:'/ledger/getAllLedgerUser',	//获取所有账本参与者  
  },
  INVITE:{
	  SEND:'/invite/send',		//发送邀请
	  ACCEPT:"/invite/accept",			//接受邀请
	  REJECT:"/invite/reject",			//拒绝邀请
	  PEDNING:"/invite/pending",	//查询待处理的邀请
  },
  PARTICIPANT:{
	  ADD:'/participant/addParticipant',
	  QUERY_BILL_PARTICIPANT:'/participant/queryBillParticipant',
	  REMANENTUSER:'/participant/getRemanentUser',
  }
};