package com.example.handler;


import com.example.exception.*;
import com.example.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.smartcardio.CardException;

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

    @ExceptionHandler(CategoryException.class)
    public Result<String> handleCategoryErrorException(CategoryException e){
        log.info("分类错误{}", e.getMessage());
        return Result.error(e.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public Result<String> handleUserErrorException(UserNotFoundException e){
        log.info("用户查询错误{}", e.getMessage());
        return Result.error(e.getMessage());
    }

    // 处理所有其他未捕获的异常
    @ExceptionHandler(Exception.class)
    public Result<String> handleAllException(Exception ex) {
        log.error("系统异常：{}", ex.getMessage(), ex);
        return Result.error("未知错误");
    }

    @ExceptionHandler(BusinessException.class)
    public Result<?> handleBusinessException(BusinessException e) {
        return Result.error(e.getMessage());
    }
}
