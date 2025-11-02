package com.example.controller.user;

import com.example.constant.JwtClaimsConstant;
import com.example.context.BaseContext;
import com.example.dto.*;
import com.example.entity.Category;
import com.example.entity.User;
import com.example.entity.UserBill;
import com.example.properties.JwtProperties;
import com.example.service.UserService;
import com.example.vo.CategoryVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.vo.UserLoginVO;
import com.example.result.Result;
import com.example.utils.JwtUtil;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
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

    @PostMapping("/register")
    public Result register(@RequestBody UserRegisterDTO userRegisterDTO) {
        userService.register(userRegisterDTO);
        return Result.success();
    }


    @PostMapping("/addBill")
    public Result addBill(@RequestBody UserBillDTO userBillDTO){
        log.info("添加账单：{}", userBillDTO);
        userService.addBill(userBillDTO);
        return Result.success();
    }

    @PostMapping("/addCategory")
    public Result addCategory(@RequestBody CategoryDTO categoryDTO){
        log.info("添加分类：{}", categoryDTO);
        userService.addCategory(categoryDTO);
        return Result.success();
    }

    @PostMapping("/queryCategory")
    public Result<CategoryVO> queryCategory(@RequestBody CategoryDTO categoryDTO){
        log.info("根据分类名和类型查询分类{}", categoryDTO);
        Category category = userService.queryCategory(categoryDTO);
        CategoryVO categoryVO = new CategoryVO();
        BeanUtils.copyProperties(category,categoryVO);
        return Result.success(categoryVO);
    }


    @GetMapping("/queryTypeCategory")
    public Result<List<Category>> queryTypeCategory(Integer type){
        log.info("根据类型查询分类：{}", type);
        List<Category> categoryList = userService.queryTypeCategory(type);
        return Result.success(categoryList);
    }

    @GetMapping("/queryCreateTime")
    public Result<LocalDateTime> queryCreateTime(){
        Long id = BaseContext.getCurrentId();
        log.info("查询用户创建时间:{}",id);
        LocalDateTime createTime = userService.queryCreateTime(id);
        return Result.success(createTime);
    }

    //TODO根据前端传来的时间，查询账单
    @PostMapping("/queryByDate")
    public Result<List<UserBill>> queryByDate(@RequestBody DateDTO dateDTO){
        log.info("查询{}账单", dateDTO);

    }
}
