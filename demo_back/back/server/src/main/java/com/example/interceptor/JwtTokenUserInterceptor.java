package com.example.interceptor;

import com.example.constant.JwtClaimsConstant;
import com.example.context.BaseContext;
import com.example.properties.JwtProperties;
import com.example.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.PrintWriter;

/**
 * jwt令牌校验的拦截器
 */
@Component
@Slf4j
public class JwtTokenUserInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtProperties jwtProperties;

    // 和前端约定的账本ID请求头名称（建议大写+横线分隔，符合HTTP规范）
    private static final String LEDGER_ID_HEADER = "X-LEDGER-ID";

    /**
     * 校验jwt + 解析并校验账本ID
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("当前线程" + Thread.currentThread().getId());

        // 1. 非Controller方法直接放行（如静态资源）
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        // 2. 原有JWT令牌校验逻辑
        String token = request.getHeader(jwtProperties.getUserTokenName());
        try {
            log.info("JWT校验，token：{}", token);
            Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
            Long userId = Long.valueOf(claims.get(JwtClaimsConstant.ID).toString());
            log.info("当前登录用户ID：{}", userId);
            BaseContext.setCurrentId(userId);
        } catch (Exception ex) {
            // JWT校验失败，返回401未授权
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            PrintWriter writer = response.getWriter();
            writer.write("{\"code\":401,\"msg\":\"登录状态失效，请重新登录\"}");
            writer.flush();
            writer.close();
            return false;
        }

        // 3. 解析并校验账本ID（改造为Long类型）
        String ledgerIdStr = request.getHeader(LEDGER_ID_HEADER); // 先获取字符串
        Long ledgerId = null;
        // 校验1：非空
        if (ledgerIdStr == null || ledgerIdStr.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("application/json;charset=UTF-8");
            PrintWriter writer = response.getWriter();
            writer.write("{\"code\":400,\"msg\":\"账本ID不能为空，请选择账本后重试\"}");
            writer.flush();
            writer.close();
            return false;
        }
        // 校验2：能解析为Long（防止前端传非数字）
        try {
            ledgerId = Long.parseLong(ledgerIdStr.trim());
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("application/json;charset=UTF-8");
            PrintWriter writer = response.getWriter();
            writer.write("{\"code\":400,\"msg\":\"账本ID必须是数字，请检查后重试\"}");
            writer.flush();
            writer.close();
            return false;
        }

        // 存入ThreadLocal（Long类型）
        BaseContext.setLedgerId(ledgerId);
        log.info("当前选中账本ID：{}", ledgerId);

        return true;
    }

    /**
     * 新增：请求处理完成后清除ThreadLocal，避免内存泄漏
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        BaseContext.clearAll(); // 统一清除用户ID和账本ID
        log.info("ThreadLocal已清空，线程{}资源释放", Thread.currentThread().getId());
    }
}