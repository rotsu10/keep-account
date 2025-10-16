import {http} from '../utils/request.js'

export const userApi = {
	addCount:(data)=>{
		return http.post('/api/user/add', data, {
		loadingText: '添加中...'
		})
	}
}