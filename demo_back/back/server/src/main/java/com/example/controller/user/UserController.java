package com.example.controller.user;

import com.example.constant.JwtClaimsConstant;
import com.example.constant.MessageConstant;
import com.example.dto.UserRegisterDTO;
import com.example.entity.User;
import com.example.exception.AccountNotFoundException;
import com.example.properties.JwtProperties;
import com.example.service.UserService;
import com.example.vo.UserRegisterVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vo.UserLoginVO;
import com.example.dto.UserLoginDTO;
import com.example.result.Result;
import com.example.utils.JwtUtil;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtProperties jwtProperties;

    //用户登录
    @PostMapping("/login")
    public Result<UserLoginVO> login(@RequestBody UserLoginDTO userLoginDTO) {
        log.info("用户登录：{}", userLoginDTO);
        User user = userService.login(userLoginDTO);

        //TODO：Jwt令牌
        //登录成功后。生成jwt令牌
        Map<String, Object> clams = new HashMap<>();
        clams.put(JwtClaimsConstant.ID, user.getId());
        String token = JwtUtil.createJWT(
                jwtProperties.getUserSecretKey(),
                jwtProperties.getUserTtl(),
                clams);

        log.info("token:{}", token);

        UserLoginVO userLoginVO = UserLoginVO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .token(token)
                .build();

        return Result.success(userLoginVO);
    }
}
