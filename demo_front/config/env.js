// config/env.js
// 开发环境（本地调试）
const devEnv = {
  BASE_URL: "http://localhost:8080",
  // BASE_URL: "http://121.40.101.180:8080", 
};

// 生产环境（云服务器）
const prodEnv = {
  BASE_URL: "http://121.40.101.180:8080" // 服务器公网IP+后端端口
};

// 判断当前环境（UniApp内置环境变量）
export const env = process.env.NODE_ENV === 'production' ? prodEnv : devEnv;
// export const env =prodEnv;


console.log('当前运行环境：', process.env.NODE_ENV);
console.log('当前接口地址：', env.BASE_URL);