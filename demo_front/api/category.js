// src/api/category.js
// 引入请求工具
import { http } from '@/utils/request';
// 引入接口路径常量
// import { API_PATH } from '@/config/api';

/**
 * 分类模块接口集合
 */

// 1. 新增分类（POST 请求）
export const addCategory = (data = {}) => {
  // data 是请求体：如 { name: '餐饮', type: 1, userId: 1, ledgerId: 1 }
  return http.post(API_PATH.CATEGORY.ADD, data);
};

// 2. 根据分类名和类型查询分类（POST 请求）
export const queryCategoryByNameAndType = (data = {}) => {
  // data 是请求体：如 { name: '餐饮', type: 1 }
  return http.post(API_PATH.CATEGORY.QUERY_BY_NAME_AND_TYPE, data);
};

// 3. 根据类型查询分类（基础数据，GET 请求）
export const queryCategoryByTypeBasic = (params = {}) => {
  // params 是查询参数：如 { type: 1 }
  return http.get(API_PATH.CATEGORY.QUERY_BY_TYPE_BASIC, params);
};

// 4. 根据类型查询分类（VO格式，GET 请求）
export const queryCategoryByType = (params = {}) => {
  // params 是查询参数：如 { type: 1 }
  return http.get(API_PATH.CATEGORY.QUERY_BY_TYPE, params);
};

// 5. 删除分类（DELETE 请求）
export const deleteCategory = (data = {}) => {
  // data 是请求体：如 { id: 1, type: 1 }（对应 CategoryDeleteDTO）
  return http.delete(API_PATH.CATEGORY.DELETE, { data });
};

// 6. 批量修改账单所属分类（PATCH 请求）
export const updateBillCategory = (billIds, params = {}) => {
  // billIds：路径参数，如 [1,2,3]
  // params：查询参数，如 { categoryId: 1 }
  // 拼接路径参数（数组转逗号分隔字符串）
  const billIdsStr = billIds.join(',');
  const url = `${API_PATH.CATEGORY.UPDATE_BILL_CATEGORY}/${billIdsStr}`;
  return http.patch(url, {}, { params });
};