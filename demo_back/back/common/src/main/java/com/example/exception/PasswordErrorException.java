package com.example.exception;

/**
 * 2.密码错误异常
 */
public class PasswordErrorException extends RuntimeException {

    public PasswordErrorException() {
    }

    public PasswordErrorException(String msg) {
        super(msg);
    }

}
