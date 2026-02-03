// utils/request.js

// const BASE_URL = '/api'
const BASE_URL = "http://localhost:8080";

/**
 * 请求拦截器
 */
const requestInterceptor = (config) => {
	// 添加 token
	const token = uni.getStorageSync('token')
	console.log('从存储获取的 token:', token)
	if (token) {
		config.header = {
			...config.header,
			'authentication': token
		}
		console.log('✅ 已添加 Authorization 头')
	} else {
		console.log('❌ 未找到 token，请求将无认证信息')
	}
	console.log('最终请求头:', config.header)

	// 显示 loading
	// if (config.loading !== false) {
	// 	uni.showLoading({
	// 		title: config.loadingText || '加载中...',
	// 		mask: true
	// 	})
	// }

	return config
}

/**
 * 响应拦截器
 */
const responseInterceptor = (response, config) => {
	console.log('响应状态码:', response.statusCode)
	console.log('响应数据:', response.data)


	// 隐藏 loading
	// if (config.loading !== false) {
	// 	uni.hideLoading()
	// }

	const {
		statusCode,
		data
	} = response

	if (statusCode === 200) {
		// 根据后端数据结构调整
		if (data.code === 1 || data.code === 200) {
			return data.data || data
		} else {
			uni.showToast({
				title: data.message || '请求失败',
				icon: 'none'
			})
			return Promise.reject(data)
		}
	} else {
		uni.showToast({
			title: `请求失败: ${statusCode}`,
			icon: 'none'
		})
		return Promise.reject(response)
	}
}

/**
 * 错误处理
 */
const errorHandler = (error, config) => {
	if (config.loading !== false) {
		uni.hideLoading()
	}

	let errorMessage = '网络错误，请重试'
	if (error.errMsg && error.errMsg.includes('timeout')) {
		errorMessage = '请求超时'
	} else if (error.errMsg && error.errMsg.includes('fail')) {
		errorMessage = '网络连接失败'
	}

	uni.showToast({
		title: errorMessage,
		icon: 'none'
	})

	return Promise.reject(error)
}

/**
 * 核心请求方法
 */
const request = (config) => {
	console.log("原始 config 对象：", config);
	const mergedConfig = {
		// url: config.url.startsWith('http') ? config.url : `${BASE_URL}${config.url}`,
		url: (() => {
			const finalUrl = config.url.startsWith('http') ? config.url : `${BASE_URL}${config.url}`;
			console.log("最终请求 url：", finalUrl); // 目标结果：http://localhost:8080/user/addCount
			return finalUrl;
		})(),
		method: config.method || 'GET',
		data: config.data || {},
		header: {
			'Content-Type': 'application/json',
			...config.header
		},
		timeout: config.timeout || 10000,
	}

	const finalConfig = requestInterceptor(mergedConfig)
	
	return new Promise((resolve, reject) => {
		uni.request({
			...finalConfig,
			success: (response) => {
				try {
					const result = responseInterceptor(response, finalConfig)
					console.log("拦截器返回数据：",result);
					resolve(result)
				} catch (error) {
					reject(error)
				}
			},
			fail: (error) => {
				const handledError = errorHandler(error, finalConfig)
				reject(handledError)
				console.log("失败原因：",error)
			}
		})
	})
}

// 快捷方法
export const http = {
	get: (url, data = {}, config = {}) => {
		return request({
			url,
			data,
			method: 'GET',
			...config
		})
	},

	post: (url, data = {}, config = {}) => {
		return request({
			url,
			data,
			method: 'POST',
			...config
		})
	},

	put: (url, data = {}, config = {}) => {
		return request({
			url,
			data,
			method: 'PUT',
			...config
		})
	},

	delete: (url, data = {}, config = {}) => {
		return request({
			url,
			data,
			method: 'DELETE',
			...config
		})
	},

	upload: (url, filePath, formData = {}, config = {}) => {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: `${BASE_URL}${url}`,
				filePath,
				name: 'file',
				formData,
				header: {
					'Authorization': `Bearer ${uni.getStorageSync('token')}`
				},
				success: (response) => {
					try {
						const data = JSON.parse(response.data)
						resolve(data)
					} catch (error) {
						reject(error)
					}
				},
				fail: reject
			})
		})
	}
}

export default request