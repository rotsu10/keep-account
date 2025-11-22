package com.example.exception;

/**
 * 3.分类异常
 */
public class CategoryException extends RuntimeException {

    public CategoryException() {
    }

    public CategoryException(String msg) {
        super(msg);
    }

}
