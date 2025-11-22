package com.example.exception;

/**
 * 1.账号不存在异常
 */
public class AccountFoundException extends RuntimeException {

    public AccountFoundException() {
    }

    public AccountFoundException(String msg) {
        super(msg);
    }

}
