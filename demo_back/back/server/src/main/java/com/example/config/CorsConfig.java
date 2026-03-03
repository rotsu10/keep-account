package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 所有接口
                .allowCredentials(true) // 允许携带 Cookie
                //.allowedOriginPatterns("http://localhost:5173") // 只允许前端地址访问
                .allowedOriginPatterns("http://121.40.101.180:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 支持的请求方法
                .allowedHeaders("*") // 允许所有请求头
                .exposedHeaders("*"); // 允许前端读取所有响应头
    }
}