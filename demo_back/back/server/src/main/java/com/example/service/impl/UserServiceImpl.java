package com.example.service.impl;

import com.example.constant.JwtClaimsConstant;
import com.example.constant.MessageConstant;
import com.example.dto.UserLoginDTO;
import com.example.dto.UserRegisterDTO;
import com.example.mapper.UserMapper;
import com.example.result.Result;
import com.example.service.UserService;
import com.example.utils.JwtUtil;
import com.example.vo.UserRegisterVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entity.User;
import com.example.exception.AccountNotFoundException;
import com.example.exception.PasswordErrorException;
import org.springframework.util.DigestUtils;

import java.util.HashMap;
import java.util.Map;

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
            throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);
        }
        return user;
    }
}

