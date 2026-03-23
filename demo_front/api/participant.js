import { http } from "../utils/request";
import { API_PATH } from "./api";

//添加账单参与者
export const addParticipant = (data = {})=>{
	return http.post(API_PATH.PARTICIPANT.ADD,data);
}

//查询账单参与者
export const queryBillParticipant = (params = {})=>{
	const url = `${API_PATH.PARTICIPANT.QUERY_BILL_PARTICIPANT}/${params}`;
	return http.get(url);
}


export const updateParticipant = (data = {}) =>{
	return http.post(API_PATH.PARTICIPANT.UPDATE_PARTICIPANT,data)
}