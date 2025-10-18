package com.example.service;


import com.example.dto.CategoryDTO;
import com.example.dto.UserBillDTO;
import com.example.dto.UserLoginDTO;
import com.example.dto.UserRegisterDTO;
import com.example.entity.Category;
import com.example.entity.User;
import com.example.vo.UserLoginVO;

import java.util.List;

public interface UserService {

    //用户登录
    User login(UserLoginDTO userLoginDTO);

    //用户注册
    void register(UserRegisterDTO userRegisterDTO);

    //添加账单
    void addBill(UserBillDTO userBillDTO);

    //根据类型查询分类
    List<Category> queryCategory(Integer type);

    //添加分类
    void addCategory(CategoryDTO categoryDTO);
}
