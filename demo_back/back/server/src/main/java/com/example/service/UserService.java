package com.example.service;


import com.example.dto.*;
import com.example.entity.Category;
import com.example.entity.User;
import com.example.entity.UserBill;
import com.example.result.PageResult;
import com.example.vo.CategoryVO;
import com.example.vo.UserBillVO;
import com.example.vo.UserLoginVO;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {

    //用户登录
    User login(UserLoginDTO userLoginDTO);

    //用户注册
    void register(UserRegisterDTO userRegisterDTO);

    //添加账单
    void addBill(UserBillDTO userBillDTO);

    //根据类型查询分类
    List<Category> queryTypeCategory(Integer type);

    //添加分类
    void addCategory(CategoryDTO categoryDTO);

    //根据分类名和类型查询分类
    Category queryCategory(CategoryDTO categoryDTO);

    //查询用户创建时间
    LocalDateTime queryCreateTime(Long id);

    //根据时间进行分页查询账单
    PageResult<UserBill> queryPageDate(RecordQueryDTO recordQueryDTO);

    //根据id和分类类型查询所有分类名
    List<CategoryVO> queryCategoryByType(Long id ,Integer type);
}
