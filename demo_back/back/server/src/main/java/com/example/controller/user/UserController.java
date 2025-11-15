package com.example.controller.user;

import com.example.constant.JwtClaimsConstant;
import com.example.context.BaseContext;
import com.example.dto.*;
import com.example.entity.*;
import com.example.properties.JwtProperties;
import com.example.result.PageResult;
import com.example.service.UserService;
import com.example.vo.*;
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

    //根据时间查询账单
    @PostMapping("/queryRecordByDate")
    public Result<PageResult<UserBill>> queryPageDate(@RequestBody RecordQueryDTO recordQueryDTO){
        log.info("查询{}账单", recordQueryDTO);
        recordQueryDTO.userId = BaseContext.getCurrentId();
        PageResult<UserBill> pageResult = userService.queryPageDate(recordQueryDTO);
        log.info("pageResult:{}", pageResult);
        return Result.success(pageResult);
    }

    //根据id和分类类型查询所有分类名
    @GetMapping("/queryCategoryByType")
    public Result<List<CategoryVO>> queryCategoryByType(@RequestParam("type") Integer type){
        Long userId = BaseContext.getCurrentId();
        log.info("id:{},type:{}",userId,type);
        List<CategoryVO> list= userService.queryCategoryByType(userId,type);
        log.info("查询所有的分类：{}",list);
        return Result.success(list);
    }

    //根据账单id查询账单详情
    @GetMapping("/queryBillDetail")
    public Result<UserBillVO> queryBillDetail(@RequestParam("billId") Long billId){
        log.info("账单为id:{}",billId);
        UserBillVO userBillVO = userService.queryBillDetail(billId);
        log.info("账单:{}",userBillVO);
        return Result.success(userBillVO);
    }

    //根据传递的月份日统计收入和支出
    @PostMapping("/statisticsQuery")
    public Result<StatisticsQueryVO> statisticsQuery(@RequestBody StatisticsQueryDTO statisticsQueryDTO){
        log.info("根据传递的月份和年份查询收入和支出：{}",statisticsQueryDTO);
        StatisticsQueryVO statisticsQueryVO  = userService.statisticsQuery(statisticsQueryDTO);
        log.info("查询收入和支出：{}",statisticsQueryVO);
        return Result.success(statisticsQueryVO);
    }

    //查询每天花费
    @GetMapping("/queryDailyCosts")
    public Result<List<DailyCost>> queryDailyCosts(){
        Long id = BaseContext.getCurrentId();
        List<DailyCost> dailyCostsList = userService.queryDailyCosts(id);
        return Result.success(dailyCostsList);
    }

    //获取用户信息
    @GetMapping("/getUserInfo")
    public Result<UserLoginVO> getUserInfo(){
        Long userId = BaseContext.getCurrentId();
        UserLoginVO userLoginVO = userService.getUserInfo(userId);
        return Result.success(userLoginVO);
    }

    //根据日期和类型统计账单
    @PostMapping("/categoryStatistics")
    public Result<List<CategoryStatisticsVO>> categoryStatistics(@RequestBody CategoryStatisticsDTO categoryStatisticsDTO){
        log.info("根据日期和类型统计账单：{}", categoryStatisticsDTO);
        List<CategoryStatisticsVO> list = userService.categoryStatistics(categoryStatisticsDTO.getType(),categoryStatisticsDTO.getTimeValue(),categoryStatisticsDTO.getTimeType());
        return Result.success(list);
    }
}