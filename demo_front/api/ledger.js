// 引入封装的 http 请求和 API 路径常量
import { http } from '../utils/request'; // 请确保路径与你的项目一致
import { API_PATH } from './api'; // 假设 API_PATH 定义在 api.js 中

// 账本相关 API 封装
export const ledgerApi = {
  /**
   * 1. 添加账本（POST 请求）
   */
  addLedger: (data = {}) => {
    return http.post(API_PATH.LEGER.ADD, data);
  },

  /**
   * 2. 获取所有账本（GET 请求）
   * @returns {Promise<Result<List<LedgerVO>>>} 账本列表
   */
  getAllLedger: () => {
    return http.get(API_PATH.LEGER.GET_ALL_LEDGER);
  },

  /**
   * 3. 删除账本（DELETE 请求）
   * @param {number} ledgerId - 账本ID
   * @returns {Promise<Result>} 响应结果
   */
  deleteLedger: (params = {}) => {
    return http.delete(`${API_PATH.LEGER.DELETE}`,params);
  },

  /**
   * 4. 账本添加参与者（POST 请求）
   * @param {Object} data - 请求体参数（AddLedgerUserDTO）
   * @param {number} data.ledgerId - 账本ID
   * @param {number} data.userId - 参与者用户ID
   * @returns {Promise<Result<User>>} 添加的用户信息
   */
  addLedgerUser: (data = {}) => {
    return http.post(API_PATH.LEGER.ADD_LEDGERUSER, data);
  },

  /**
   * 5. 根据账本id查询账本详情（POST 请求）
   * @param {number} ledgerId - 账本ID
   * @returns {Promise<Result<LedgerVO>>} 账本详情
   */
  ledgerDetailById: (data = {}) => {
    return http.post(API_PATH.LEGER.LEGER_DETAIL_BY_ID, data);
  }
};

// 按需导出单个方法（可选，方便单独引入）
export const addLedger = ledgerApi.addLedger;
export const getAllLedger = ledgerApi.getAllLedger;
export const deleteLedger = ledgerApi.deleteLedger;
export const addLedgerUser = ledgerApi.addLedgerUser;
export const ledgerDetailById = ledgerApi.ledgerDetailById;