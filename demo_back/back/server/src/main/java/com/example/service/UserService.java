package com.example.service;


import com.example.dto.UserBillDTO;
import com.example.dto.UserLoginDTO;
import com.example.dto.UserRegisterDTO;
import com.example.entity.User;
import com.example.vo.UserLoginVO;

public interface UserService {

    //用户登录
    User login(UserLoginDTO userLoginDTO);

    //用户注册
    void register(UserRegisterDTO userRegisterDTO);

    //添加账单
    void addBill(UserBillDTO userBillDTO);
}
