// src/api/bill.js
// 引入请求工具
import { http } from '@/utils/request';
// 引入接口路径常量
// import { API_PATH } from '@/api';
import { API_PATH } from './api';

/**
 * 账单模块接口集合
 */

// 1. 添加账单（POST 请求）
export const addBill = (data = {}) => {
  // data 是请求体：如 { amount: 100, type: 1, categoryId: 1, ledgerId: 1, remark: '午餐' }
  return http.post(API_PATH.BILL.ADD, data);
};

// 2. 根据时间查询账单（分页，POST 请求）
export const queryBillByDate = (data = {}) => {
  // data 是请求体：如 { startTime: '2026-02-01', endTime: '2026-02-11', pageNum: 1, pageSize: 10 }
  return http.post(API_PATH.BILL.QUERY_BY_DATE, data);
};

// 3. 根据账单id查询账单详情（GET 请求）
export const queryBillDetail = (params = {}) => {
  // params 是查询参数：如 { billId: 1 }
  return http.get(API_PATH.BILL.QUERY_DETAIL, params);
};

// 4. 根据月份日统计收入和支出（POST 请求）
export const statisticsQuery = (data = {}) => {
  // data 是请求体：如 { year: 2026, month: 2, day: 11 }
  return http.post(API_PATH.BILL.STATISTICS_QUERY, data);
};

// 5. 查询每天花费（GET 请求）
export const queryDailyCosts = (params = {}) => {
  // 该接口无参数，params 预留扩展
  return http.get(API_PATH.BILL.QUERY_DAILY_COSTS, params);
};

// 6. 根据日期和类型统计账单（POST 请求）
export const categoryStatistics = (data = {}) => {
  // data 是请求体：如 { type: 1, timeValue: '2026-02', timeType: 'month' }
  return http.post(API_PATH.BILL.CATEGORY_STATISTICS, data);
};

// 7. 删除账单（DELETE 请求）
export const deleteBill = (data = {}) => {
  // data 是请求体：如 { billId: 1 }（对应 BillDeleteDTO）
  console.log("删除账本data",data)
  return http.delete(API_PATH.BILL.DELETE, data);
};

// 8. 根据分类id查询账单（GET 请求）
export const getBillByCategoryIds = (params = {}) => {
  // params 是查询参数：如 { categoryIds: [1,2,3] }
  return http.get(API_PATH.BILL.GET_BY_CATEGORY_IDS, params);
};

// 9. 更新修改账单（POST 请求）
export const updateBill = (data = {}) => {
  // data 是请求体：如 { billId: 1, amount: 200, categoryId: 2 }
  return http.post(API_PATH.BILL.UPDATE, data);
};

// 10. 根据年月日统计每个分类账单和（POST 请求）
export const getCategorySum = (data = {}) => {
  // data 是请求体：如 { type: 1, timeValue: '2026-02', timeType: 'month' }
  return http.post(API_PATH.BILL.GET_CATEGORY_SUM, data);
};

// 11. 更新账单详情（POST 请求）
export const updateBillDetail = (data = {}) => {
  // data 是请求体：与 updateBill 一致，如 { billId: 1, remark: '晚餐' }
  return http.post(API_PATH.BILL.UPDATE_DETAIL, data);
};

// 12. 根据年月日统计所有账单（折线图，POST 请求）
export const getSumByDate = (data = {}) => {
  // data 是请求体：如 { timeValue: '2026-02', timeType: 'month' }
  return http.post(API_PATH.BILL.GET_SUM_BY_DATE, data);
};

// 13. 根据日期类型查询账单分页列表（POST 请求）
export const queryBillListChart = (data = {}) => {
  // data 是请求体：如 { timeType: 'month', timeValue: '2026-02', pageNum: 1, pageSize: 10 }
  return http.post(API_PATH.BILL.LIST_CHART, data);
};