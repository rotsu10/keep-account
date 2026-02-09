package com.example.exception;


/**
 * 自定义业务异常（账本校验失败时抛出）
 */
public class BusinessException extends RuntimeException {
    private String message;

    public BusinessException(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}