package com.example.exception;
//4
public class BillException extends RuntimeException {
    private String message;

    public BillException(String message) {
        super(message);
        this.message = message;
    }


    @Override
    public String getMessage() {
        return message;
    }
}
