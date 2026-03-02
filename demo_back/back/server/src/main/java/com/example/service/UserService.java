package com.example.service;


import com.example.dto.*;
import com.example.entity.*;
import com.example.result.PageResult;
import com.example.vo.*;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {

    //用户登录
    User login(UserLoginDTO userLoginDTO);

    //用户注册
    UserRegisterVO register(UserRegisterDTO userRegisterDTO);

    //查询用户创建时间
    LocalDateTime queryCreateTime(Long id);

    //获取用户详细信息
    UserLoginVO getUserInfo();
}
