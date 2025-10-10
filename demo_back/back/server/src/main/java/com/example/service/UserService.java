package com.example.service;


import com.example.dto.UserLoginDTO;
import com.example.dto.UserRegisterDTO;
import com.example.entity.User;
import com.example.vo.UserRegisterVO;

public interface UserService {

    //用户登录
    User login(UserLoginDTO userLoginDTO);

}
