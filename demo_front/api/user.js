import {request} from '@/utils/request.js'

export const userApi = {
	async login(data) {
		const response = await request({
			url: '/user/login',
			method: 'POST',
			data
		})
		
		const {data:result} = response;
		
		if(result.code ==1){
			return result.data;
		}else{
			throw new Error(result.message || '登录失败');
		}
	}
}