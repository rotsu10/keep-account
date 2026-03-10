package com.example.controller.user;

import com.example.constant.JwtClaimsConstant;
import com.example.context.BaseContext;
import com.example.dto.*;
import com.example.entity.*;
import com.example.properties.JwtProperties;
import com.example.result.PageResult;
import com.example.service.LedgerService;
import com.example.service.UserService;
import com.example.vo.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.result.Result;
import com.example.utils.JwtUtil;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/user")
@Tag(name = "用户接口", description = "用户相关接口")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtProperties jwtProperties;

    @Autowired
    private LedgerService ledgerService;

    //用户登录
    @PostMapping("/login")
    @Operation(summary = "登录")
    public Result<UserLoginVO> login(@RequestBody UserLoginDTO userLoginDTO) {
        log.info("用户登录：{}", userLoginDTO);
        User user = userService.login(userLoginDTO);

        log.info("user={}", user);
        //TODO：Jwt令牌
        //登录成功后。生成jwt令牌
        Map<String, Object> clams = new HashMap<>();
        clams.put(JwtClaimsConstant.ID, user.getId());
        String token = JwtUtil.createJWT(
                jwtProperties.getUserSecretKey(),
                jwtProperties.getUserTtl(),
                clams);

        log.info("token:{}", token);

        Long userId = user.getId();
        Long ledgerId = ledgerService.getDefaultLedgerIdByUserId(userId);
        UserLoginVO userLoginVO = UserLoginVO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .phone(user.getPhone())
                .createdTime(user.getCreatedTime())
                .token(token)
                .ledgerId(ledgerId)
                .build();

        return Result.success(userLoginVO);
    }

    @PostMapping("/register")
    @Operation(summary = "注册")
    public Result<UserLoginVO> register(@RequestBody UserRegisterDTO userRegisterDTO) {
        UserRegisterVO registerVO = userService.register(userRegisterDTO);
        Map<String, Object> clams = new HashMap<>();
        clams.put(JwtClaimsConstant.ID, registerVO.getId());
        String token = JwtUtil.createJWT(
                jwtProperties.getUserSecretKey(),
                jwtProperties.getUserTtl(),
                clams);

        log.info("token:{}", token);

        UserLoginVO userLoginVO = UserLoginVO.builder()
                .id(registerVO .getId())
                .username(registerVO.getUsername())
                .ledgerId(registerVO.getLedgerId())
                .token(token)
                .build();

        return Result.success(userLoginVO);
    }

    @GetMapping("/queryCreateTime")
    @Operation(summary = "查询用户创建时间")
    public Result<LocalDateTime> queryCreateTime(){
        Long id = BaseContext.getCurrentId();
        log.info("查询用户创建时间:{}",id);
        LocalDateTime createTime = userService.queryCreateTime(id);
        log.info("createTime:",createTime);
        return Result.success(createTime);
    }

    //获取用户信息
    @GetMapping("/getUserInfo")
    @Operation(summary = "获取用户信息")
    public Result<UserLoginVO> getUserInfo(){
        UserLoginVO userLoginVO = userService.getUserInfo();
        return Result.success(userLoginVO);
    }
}