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
				return true;
			}catch(err){
				console.error('请求失败err：',err);
				uni.showToast({
					title:"加载失败",
					icon:'error'
				})
			}
		},
		
		async addCategory(categoryData){
			try{
				const sendData = {
					name : categoryData.name, //分类名
					type : categoryData.type//分类类型
				};
				console.log("：store中addCategory：",sendData);
				const result  = await http.post('/user/addCategory',sendData,{
					loadingText:'正在提交中'
				});
				
				uni.showToast({title:'提交成功',icon:'success'});
				console.log('提交分类：',result);
				this.queryCategoryType(categoryData.type);
				return true;
			}catch(err){
				uni.showToast({
					title:err.message,
					icon:'error'
				})
				console.log('提交失败',err);
			}
		},
		
		async searchCategory(searchCategoryData){
			console.log("store中searchCategoryName",searchCategoryData.name);
			console.log("store中currentType",searchCategoryData.type);
			try{
				const sendData = {
					name : searchCategoryData.name,
					type : searchCategoryData.type
				}
				console.log("queryCategory的sendData:",sendData);
				const result = await http.post('/user/queryCategory',sendData,{loadingText:'加载中'});
				this.categoryList = [result] || [];
				console.log("this.categoryList:",this.categoryList);
			}catch(err){
				console.error('搜索失败:', err);
				uni.showToast({
				    title: err.message,
				    icon: 'error'
				});
				seachCategoryName.value = ''; // 清空搜索框
			}
		}
	}
})