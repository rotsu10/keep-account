// src/api/user.js
// 引入请求工具
import { http } from '@/utils/request';
// 引入接口路径常量
import { API_PATH } from './api';

/**
 * 用户模块接口集合
 */

// 1. 用户登录（POST 请求）
export const userLogin = () => {
  // data 是请求体：如 { username: 'zhangsan', password: '123456' }
  return http.post(API_PATH.USER.LOGIN);
};

export const logout = (data = {}) => {
  // data 是请求体：如 { username: 'zhangsan', password: '123456' }
  return http.post(API_PATH.USER.LOGOUT, data);
};

// 2. 用户注册（POST 请求）
export const userRegister = (data = {}) => {
  // data 是请求体：如 { username: 'lisi', password: '123456', phone: '13800138000' }
  return http.post(API_PATH.USER.REGISTER, data);
};

// 3. 查询用户注册时间（GET 请求）
export const queryUserCreateTime = (params = {}) => {
  // params 是查询参数（若有）：如 {}（该接口后端未要求传参，params 可空）
  return http.get(API_PATH.USER.QUERY_CREATETIME, params);
};

// 4. 获取用户信息（GET 请求）
export const getUserInfo = (params = {}) => {
  // params 是查询参数（若有）：如 {}（该接口后端从上下文获取用户ID，无需传参）
  return http.get(API_PATH.USER.INFO, params);
};