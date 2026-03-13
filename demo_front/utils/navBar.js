// utils/navBar.js
/**
 * 获取系统状态栏高度（适配多端）
 * @returns {number} 状态栏高度（px）
 */
export const getStatusBarHeight = () => {
  // uni-app 环境下通过 getSystemInfo 获取
  const systemInfo = uni.getSystemInfoSync();
  // 小程序/APP 端的状态栏高度字段
  return systemInfo.statusBarHeight || 0;
};

/**
 * 计算导航栏总高度（状态栏 + 自定义导航栏）
 * @param {number} navBarHeight 自定义导航栏高度（默认44px，可根据设计调整）
 * @returns {number} 总高度
 */
export const getNavBarTotalHeight = (navBarHeight = 44) => {
  return getStatusBarHeight() + navBarHeight;
};

export default {
  getStatusBarHeight,
  getNavBarTotalHeight
};
