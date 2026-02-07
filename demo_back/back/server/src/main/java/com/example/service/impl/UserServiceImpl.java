package com.example.service.impl;

import com.example.entity.*;
import com.example.exception.*;
import com.example.vo.*;
import com.example.constant.MessageConstant;
import com.example.dto.*;

import com.example.mapper.CategoryMapper;
import com.example.mapper.UserMapper;
import com.example.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.time.LocalDateTime;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User login(UserLoginDTO userLoginDTO) {
        log.info("用户登录：{}", userLoginDTO);
        String username = userLoginDTO.getUsername();
        String password = userLoginDTO.getPassword();

        //1.根据用户名查询数据库中的数据
        User user = userMapper.getByUsername(username);

        if (user == null) {
            //账号不存在
            throw new AccountNotFoundException(MessageConstant.ACCOUNT_NOT_FOUND);
        }
        password = DigestUtils.md5DigestAsHex(password.getBytes());
        if (!password.equals(user.getPassword())){
            //密码错误
            throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);
        }
        return user;
    }

    @Override
    public User register(UserRegisterDTO userRegisterDTO) {
        log.info("用户注册{}", userRegisterDTO);
        // 1. 检查用户名是否存在
        User dbUserByUsername = userMapper.queryByUsername(userRegisterDTO.getUsername());
        if (dbUserByUsername != null) {
            throw new AccountFoundException(MessageConstant.ACCOUNT_FOUND);
        }

        // 2. 检查手机号是否存在
        User dbUserByPhone = userMapper.queryByPhone(userRegisterDTO.getPhone());
        if (dbUserByPhone != null) {
            throw new AccountFoundException(MessageConstant.PHONE_EXISTS);
        }

        // 3. 都不存在，才插入
        User user = new User();
        BeanUtils.copyProperties(userRegisterDTO, user);
        user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        user.setCreatedTime(LocalDateTime.now());
        int rows = userMapper.insert(user);

        if (rows > 0) {
            log.info("用户注册成功: {}", userRegisterDTO.getUsername());
        }
        return user;
    }

    @Override
    public LocalDateTime queryCreateTime(Long id) {
        return userMapper.queryCreateTime(id);
    }

    @Override
    public UserLoginVO getUserInfo(Long userId) {
        return userMapper.getUserInfo(userId);
    }
}

