import { http } from '@/utils/request';
// 引入接口路径常量
import { API_PATH } from './api';

// 发送邀请
export const sendInvite = (data = {}) => {
	return http.post(API_PATH.INVITE.SEND,data);
};

//接受邀请
export const acceptInvite = (params = {}) => {
	return http.post(API_PATH.INVITE.ACCEPT,params);
};

//拒绝邀请
export const rejecttInvite = (params = {}) => {
	return http.post(API_PATH.INVITE.REJECT,params);
};

// 查询待处理的邀请
export const pendingList = () => {
	return http.get(API_PATH.INVITE.PEDNDING);
};

