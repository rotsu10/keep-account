import {defineStore} from 'pinia';
import {http} from '../utils/request'; // 确保导入了你的 http 工具


export const useCategoryStore = defineStore('category',{
	state:()=>({
		categoryList:[],
	}),
	
	actions:{
		//根据类型查询分类
		async queryCategoryType(type){
			try{
				const url = `/user/queryTypeCategory?type=${type}`;
				const result = await http.get(url,
				{loading:'加载中'},
				);
				console.log("后端返回数据result:",result);
				this.categoryList = result;
				console.log("store中categoryList",this.categoryList);
				return true;
			}catch(err){
				console.error('请求失败err：',err);
				uni.showToast({
					title:"加载失败",
					icon:'error'
				})
			}
		}
		

	}
})