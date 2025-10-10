package com.example.exception;

/**
 * 账号不存在异常
 */
public class AccountFoundException extends BaseException {

    public AccountFoundException() {
    }

    public AccountFoundException(String msg) {
        super(msg);
    }

}
