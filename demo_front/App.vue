<template>
	<view id="app">
		<router-view v-if="$route" />
	</view>
</template>

<script setup>
	import {
		onLaunch,
		onShow,
		onHide
	} from '@dcloudio/uni-app';
	import {
		getStatusBarHeight
	} from './utils/navBar';

	// 应用启动时执行（全局只触发一次）
	onLaunch(() => {
		console.log('App Launch');
		// 获取状态栏高度
		const statusBarHeight = getStatusBarHeight();
		// 1. 存入本地缓存，供其他页面调用
		uni.setStorageSync('statusBarHeight', statusBarHeight);

		// 2. 注入CSS变量（严格区分环境）
		const systemInfo = uni.getSystemInfoSync();
		// H5端：使用document设置CSS变量
		if (systemInfo.platform === 'web') {
			if (document && document.documentElement) {
				document.documentElement.style.setProperty('--status-bar-height', `${statusBarHeight}px`);
			}
		}
		// 小程序端：使用uni.setCssVar（先判断方法是否存在）
		else if (typeof uni.setCssVar === 'function') {
			uni.setCssVar('--status-bar-height', `${statusBarHeight}px`);
		}
	});

	// 应用显示时执行
	onShow(() => {
		console.log('App Show');
	});

	// 应用隐藏时执行
	onHide(() => {
		console.log('App Hide');
	});
</script>

<style>
	/* 全局公共样式 */
	#app {
		width: 100%;
		height: 100%;
	}

	/* 全局页面顶部预留状态栏高度（兼容所有页面） */
	page {
		padding-top: var(--status-bar-height, 0px);
		/* 加默认值，避免变量未定义时出错 */
		box-sizing: border-box;
		min-height: 100vh;
	}

	/* 兜底：如果某些页面自定义导航栏，给容器预留高度 */
	.status-bar-padding {
		padding-top: var(--status-bar-height, 0px);
	}
</style>