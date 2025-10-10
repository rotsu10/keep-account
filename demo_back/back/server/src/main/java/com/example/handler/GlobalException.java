package com.example.handler;


import com.example.exception.AccountFoundException;
import com.example.exception.AccountNotFoundException;
import com.example.exception.PasswordErrorException;
import com.example.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//全局异常处理器
@RestControllerAdvice
@Slf4j
public class GlobalException {

    //用户名存在
    @ExceptionHandler(AccountFoundException.class)
    @ResponseBody
    public Result<String> handleAccountFoundException(AccountFoundException ex) {
        return Result.error(ex.getMessage());
    }

    // 2. “账号不存在”
    @ExceptionHandler(AccountNotFoundException.class)
    public Result<String> handleAccountNotFoundException(AccountNotFoundException ex) {
        log.error("账号不存在异常：{}", ex.getMessage()); // 可选：打印日志
        return Result.error(ex.getMessage());
    }

    @ExceptionHandler(PasswordErrorException.class)
    public Result<String> handlePasswordErrorException(PasswordErrorException ex) {
        log.error("密码错误异常：{}", ex.getMessage()); // 可选：打印日志
        return Result.error(ex.getMessage());
    }

    // 处理所有其他未捕获的异常
    @ExceptionHandler(Exception.class)
    public Result<String> handleAllException(Exception ex) {
        log.error("系统异常：{}", ex.getMessage(), ex); // 打印完整堆栈，方便排查
        return Result.error("未知错误"); // 返回友好提示，避免暴露敏感信息
    }
}
