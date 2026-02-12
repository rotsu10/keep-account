package com.example.exception;
//账本异常
public class LedgerException extends RuntimeException {
    public LedgerException() {
    }

    public LedgerException(String message) {
        super(message);
    }
}