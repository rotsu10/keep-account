package com.example.service;

import com.example.dto.*;
import com.example.entity.Category;
import com.example.entity.DailyCost;
import com.example.entity.UserBill;
import com.example.result.PageResult;
import com.example.vo.BillStatisticsVO;
import com.example.vo.CategoryStatisticsVO;
import com.example.vo.StatisticsQueryVO;
import com.example.vo.UserBillVO;

import java.util.List;

public interface BillService {

    //添加账单
    void addBill(UserBillDTO userBillDTO);

    //根据时间进行分页查询账单
    PageResult<UserBill> queryPageDate(RecordQueryDTO recordQueryDTO);

    //根据账单id查询账单详情
    UserBillVO queryBillDetail(Long billId);

    //根据年月查询账单统计收入和支出
    StatisticsQueryVO statisticsQuery(StatisticsQueryDTO statisticsQueryDTO);

    //查询每日花费
    List<DailyCost> queryDailyCosts(Long id);

    //根据时间范围和类型查询分类名和统计账单
    List<CategoryStatisticsVO> categoryStatistics(Integer type, String timeValue, String timeType);

    //删除账单
    void deleteBill(List<Long> billIds);

    //根据分类id查询账单
    List<UserBillDTO> getBillByCategoryIds(List<Long> categoryIds);

    //更新修改账单信息
    UserBillVO updateBill(UserBillDTO userBillDTO);

    //根据年月日查询统计查询每个分类账单和
    List<CategoryStatisticsVO> getCategorySum(TimeDTO timeDTO);

    //根据年月日统计所有账单
    List<BillStatisticsVO> getSumByDate(TimeDTO timeDTO);

    //根据日期类型查询账单分页列表
    PageResult<UserBill> queryListChart(ListRecordPageDTO listRecordPageDTO);
}
