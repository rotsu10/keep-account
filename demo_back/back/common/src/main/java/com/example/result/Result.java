package com.example.result;


import lombok.Data;

import java.io.Serializable;

//后端统一返回处理结果
@Data
public class Result<T> implements Serializable {

    private Integer code; //编码：1成功，0失败
    private String message;
    private T data;

    public static <T> Result<T> success(){
        Result<T> result = new Result<>();
        result.setCode(1);
        return result;
    }

    public static <T> Result<T> success(T object) {
        Result<T> result = new Result<T>();
        result.data = object;
        result.code = 1;
        return result;
    }

    public static <T> Result<T> error(String message) {
        Result result = new Result();
        result.message = message;
        result.code = 0;
        return result;
    }
}
