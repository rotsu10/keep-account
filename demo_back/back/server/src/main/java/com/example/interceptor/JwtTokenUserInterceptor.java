package com.example.interceptor;


import com.example.context.BaseContext;
import com.example.properties.JwtProperties;
import com.example.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@Slf4j
public class JwtTokenUserInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtProperties jwtProperties;

    //校验jwt
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        System.out.println("当前线程是："+Thread.currentThread().getName());
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        //1.从请求头中获取令牌
        String token = request.getHeader(jwtProperties.getUserTokenName());

        //2.校验令牌
        try{
            log.info("jwt校验：{}",token);
            Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
            String id = claims.get("id").toString();
            log.info("当前用户id：{}", id);
            //将id存入ThreadLocal
            BaseContext.setCurrentId(Long.valueOf(id));
            return  true;
        }catch (Exception e){
            response.setStatus(401);
            return false;
        }
    }
}
