// src/api/ledger.js
// 引入请求工具
import { http } from '@/utils/request';
// 引入接口路径常量
import { API_PATH } from './api';

/**
 * 账本模块接口集合
 */

// 1. 添加账本（POST 请求）
export const addLedger = (data = {}) => {
  // data 是请求体：如 { ledgerName: '家庭账本', userId: 1 }
  return http.post(API_PATH.LEDGER.ADD, data);
};

// 2. 获取所有账本（GET 请求）
export const getAllLedger = (params = {}) => {
  // params 是查询参数：如 { userId: 1 }（若需要）
  return http.get(API_PATH.LEDGER.GET_ALL_LEDGER, params);
};

// 3. 删除账本（DELETE 请求）
export const deleteLedger = (params = {}) => {
  // params 是查询参数：如 { ledgerId: 1 }
  return http.delete(`${API_PATH.LEDGER.DELETE}`, params);
};

// 4. 账本添加参与者（POST 请求）
export const addLedgerUser = (data = {}) => {
  // data 是请求体：如 { ledgerId: 1, userId: 2 }
  return http.post(API_PATH.LEDGER.ADD_LEDGERUSER, data);
};

// 5. 根据账本id查询账本详情（GET 请求）
export const ledgerDetailById = (params = {}) => {
  return http.get(API_PATH.LEDGER.LEDGER_DETAIL_BY_ID,params);
};