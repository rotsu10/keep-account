package com.example.mapper;

import com.example.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    //登录
    User getByUsername(String username);

    //根据用户姓名查找用户是否存在
    User queryByUsername(String username);

    //用户注册
    int insert(User user);

    //根据用户手机号是否使用过
    User queryByPhone(String phone);
}
