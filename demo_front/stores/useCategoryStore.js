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
			}catch(err){
				uni.showToast({
					title:err.message,
					icon:'error'
				})
				console.log('提交失败',err);
			}
		},
		
		// const handleLongPress = (item)=>{
		// 	console.log("handleLongPress参数",item);
		// 	currentCategory.value = item;
		// 	console.log("currentCategory参数",currentCategory.value.id);
		// 	DialogShow.value = true;
		// }
		// const deleteCategory = async(strategy) =>{
		// 	try{
		// 		const sendData = {
		// 			categoryIds:[currentCategory.value.id],
		// 			strategy:strategy,
		// 		}
		// 		console.log("sendData:",sendData)
		// 		await http.delete("/user/deleteCategory",sendData);
		// 		categoryStore.queryCategoryType(currentType.value);
		// 	}catch(err){
		// 		console.log("删除分类失败err",err);
		// 	}
		// 	DialogShow.value = false;
		// }
	}
})