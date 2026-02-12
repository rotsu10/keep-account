import {defineStore} from 'pinia';
import {http} from '../utils/request'; // 确保导入了你的 http 工具
import { API_PATH } from '../api/api';

export const useCategoryStore = defineStore('category',{
	state:()=>({
		categoryList:[],
		currentType: null,
	}),
	
	actions:{
		//根据类型查询分类
		async queryCategoryType(type){
			try{
				// const url = `/user/queryTypeCategory?type=${type}`;
				// const result = await http.get(url,
				// {loading:'加载中'},
				// );
				const result = await http.get(
					API_PATH.CATEGORY.QUERY_BY_TYPE_BASIC,
					{type:type}
				)
				console.log("后端返回数据result:",result);
				this.categoryList = result;
				this.currentType = type;
				return true;
			}catch(err){
				console.error('请求失败err：',err);
				uni.showToast({
					title:"加载失败",
					icon:'error'
				})
				throw err;
			}
		},
		
		//添加分类
		async addCategory(categoryData){
			if(!categoryData.name?.trim()){
				throw new Error("分类名不能为空");
			}
			try{
				const sendData = {
					name : categoryData.name.trim(), //分类名
					type : categoryData.type//分类类型
				};
				console.log("：store中addCategory：",sendData);
				const result  = await http.post('/user/addCategory',sendData,{
					loadingText:'正在提交中'
				});
				console.log('提交分类：',result);
				return true;
			}catch(err){
				console.log('提交失败',err);
				throw err;
			}
		},
		
		//查找分类
		async searchCategory(searchCategoryData){
			if(!searchCategoryData.name?.trim()){
				throw new Error("请输入分类名");
			}
			try{
				const sendData = {
					name : searchCategoryData.name,
					type : searchCategoryData.type
				}
				console.log("queryCategory的sendData:",sendData);
				// const result = await http.post('/user/queryCategory',sendData,{loadingText:'加载中'});
				const result = await http.post(API_PATH.CATEGORY.QUERY_BY_NAME_AND_TYPE,sendData,{loadingText:'加载中'});
				this.categoryList = [result] || [];
				console.log("this.categoryList:",this.categoryList);
			}catch(err){
				throw err;
				seachCategoryName.value = ''; // 清空搜索框
			}
		},
		
		//删除分类
		async deleteCategory(deleteCategoryData){
			console.log("store中的deleteCategoryData:",deleteCategoryData)
			try{
				const sendData = {
					categoryIds:[deleteCategoryData.id],
					strategy:deleteCategoryData.strategy,
					targetCategoryId:deleteCategoryData.targetCategoryId
				}
				console.log("sendData:",sendData)
				// await http.delete("/user/deleteCategory",sendData);
				await http.delete(API_PATH.CATEGORY.DELETE,sendData);
				if (this.currentType) {
				    await this.queryCategoryType(this.currentType);
				} else {
				    console.warn("删除后无法确定要重新加载的分类类型");
				}
			}catch(err){
				console.log("删除分类失败err",err);
			}
		}
	}
})