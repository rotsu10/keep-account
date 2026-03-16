package com.example.mapper;

import ch.qos.logback.core.net.SMTPAppenderBase;
import com.example.entity.User;
import com.example.vo.UserLoginVO;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;

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

    //查询用户创建时间
    LocalDateTime queryCreateTime(Long id);

    //获取用户详细信息
    UserLoginVO getUserInfo(Long userId);

    //判断当前用户是否有效
    User isValidUser(Long userId, String userName, String phone);

}
