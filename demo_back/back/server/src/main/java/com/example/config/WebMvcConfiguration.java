package com.example.config;

import com.example.interceptor.JwtTokenUserInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
@Slf4j
public class WebMvcConfiguration extends WebMvcConfigurationSupport {

    @Autowired
    private JwtTokenUserInterceptor jwtTokenUserInterceptor;

    //自定义拦截器
    public void addInterceptors(InterceptorRegistry registry) {
        log.info("自定义拦截器");
        registry.addInterceptor(jwtTokenUserInterceptor).
                addPathPatterns("/user/**")
                .excludePathPatterns("/user/login");
    }
}
