package com.example.service;


import com.example.dto.*;
import com.example.entity.*;
import com.example.result.PageResult;
import com.example.result.Result;
import com.example.vo.*;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {

    //用户登录
    User login(UserLoginDTO userLoginDTO);

    //用户注册
    User register(UserRegisterDTO userRegisterDTO);

    //添加账单
    void addBill(UserBillDTO userBillDTO);

    //根据类型查询分类
    List<Category> queryTypeCategory(Integer type);

    //添加分类
    void addCategory(CategoryDTO categoryDTO);

    //根据分类名和类型查询分类
    Category queryCategory(CategoryDTO categoryDTO);

    //查询用户创建时间
    LocalDateTime queryCreateTime(Long id);

    //根据时间进行分页查询账单
    PageResult<UserBill> queryPageDate(RecordQueryDTO recordQueryDTO);

    //根据id和分类类型查询所有分类名
    List<CategoryVO> queryCategoryByType(Long userId ,Integer type);

    //根据账单id查询账单详情
    UserBillVO queryBillDetail(Long billId);

    //根据年月查询账单统计收入和支出
    StatisticsQueryVO statisticsQuery(StatisticsQueryDTO statisticsQueryDTO);

    //查询每日花费
    List<DailyCost> queryDailyCosts(Long id);

    //获取用户详细信息
    UserLoginVO getUserInfo(Long userId);

    //根据时间范围和类型查询分类名和统计账单
    List<CategoryStatisticsVO> categoryStatistics(Long type, String timeValue,String timeType);

    //删除分类
    void deleteCategory(CategoryDeleteDTO categoryDeleteDTO);

    //删除账单
    void deleteBill(List<Long> billIds);

    //修改账单分类
    void updateCategory(Long categoryId, List<Long> billIds);

    // //根据分类id查询账单
    List<UserBillDTO> getBillByCategoryIds(List<Long> categoryIds);

    //更新修改账单信息
    UserBillVO updateBill(UserBillDTO userBillDTO);

    //根据年月日查询统计查询每个分类账单和
    List<CategoryStatisticsVO> getCategorySum(CategoryStatisticsDTO categoryStatisticsDTO);
}
