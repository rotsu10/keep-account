package com.example.service.impl;

import com.example.constant.MessageConstant;
import com.example.dto.UserLoginDTO;
import com.example.dto.UserRegisterDTO;
import com.example.exception.AccountFoundException;
import com.example.mapper.UserMapper;
import com.example.service.UserService;
import com.example.vo.UserLoginVO;
import com.example.vo.UserRegisterVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entity.User;
import com.example.exception.AccountNotFoundException;
import com.example.exception.PasswordErrorException;
import org.springframework.util.DigestUtils;

import javax.security.auth.login.AccountException;

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
    public void register(UserRegisterDTO userRegisterDTO) {
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
        int rows = userMapper.insert(user);

        if (rows > 0) {
            log.info("用户注册成功: {}", userRegisterDTO.getUsername());
        }
    }
}

