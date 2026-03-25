package com.example.annotation;

import java.lang.annotation.*;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CheckLedgerExist {
    //校验失败是否抛出异常
    boolean throwException() default true;

    String message() default "无权限访问";

    /**
     * 账本ID的参数位置（默认从ThreadLocal取，若方法参数传ledgerId，指定参数索引）
     * 比如方法参数是(Long userId, Long ledgerId)，则index=1
     */
    int ledgerIdParamIndex() default -1;
}
