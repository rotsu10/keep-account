package com.example.aspect;

import com.example.annotation.CheckLedgerExist;

import com.example.context.BaseContext;
import com.example.service.impl.LedgerCheckService;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

/**
 * 账本校验切面：拦截所有加了@CheckLedgerExist的方法，执行前置校验
 */
@Slf4j
@Aspect // 标记为切面类
@Component // 交给Spring管理
@Order(1) // 执行顺序（优先于其他切面，比如日志切面）
public class LedgerCheckAspect {

    @Autowired
    private LedgerCheckService ledgerCheckService;

    // 定义切点：所有加了@CheckLedgerExist注解的方法
    @Pointcut("@annotation(com.example.annotation.CheckLedgerExist)")
    public void ledgerCheckPointcut() {}

    // 前置通知：方法执行前执行校验
    @Before("ledgerCheckPointcut()")
    public void beforeMethod(JoinPoint joinPoint) {
        log.info("ledgerCheckPointcut:{}",joinPoint);
        // 1. 获取注解信息
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        CheckLedgerExist annotation = method.getAnnotation(CheckLedgerExist.class);

        // 2. 获取账本ID（两种方式：ThreadLocal / 方法参数）
        Long ledgerId = null;
        int paramIndex = annotation.ledgerIdParamIndex();
        if (paramIndex >= 0) {
            // 方式1：从方法参数中取ledgerId
            Object[] args = joinPoint.getArgs();
            if (args.length > paramIndex && args[paramIndex] instanceof Long) {
                ledgerId = (Long) args[paramIndex];
            }
        } else {
            // 方式2：默认从ThreadLocal取（登录后接口的常规场景）
            ledgerId = BaseContext.getLedgerId();
        }

        // 3. 获取当前用户ID
        Long userId = BaseContext.getCurrentId();

        // 4. 执行校验
        boolean isValid = ledgerCheckService.checkLedgerValid(ledgerId, userId);
        log.info("该用户是否可访问此账本isValid {} ", isValid);
        if (!isValid) {
            // 5. 校验失败处理（可自定义：抛异常/日志）
            ledgerCheckService.handleCheckFail(annotation.throwException(), annotation.message());
        }
    }
}