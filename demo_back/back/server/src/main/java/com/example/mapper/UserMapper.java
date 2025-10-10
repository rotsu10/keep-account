package com.example.mapper;

import com.example.dto.UserRegisterDTO;
import com.example.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    //根据用户名登录
    User getByUsername(String username);

}
