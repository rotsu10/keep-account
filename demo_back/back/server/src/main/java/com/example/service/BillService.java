package com.example.service;

import com.example.dto.*;
import com.example.entity.Category;
import com.example.entity.DailyCost;
import com.example.entity.Participant;
import com.example.entity.UserBill;
import com.example.result.PageResult;
import com.example.result.Result;
import com.example.vo.*;

import java.util.List;

public interface BillService {

    //添加账单
    void addBill(UserBillDTO userBillDTO);

    //根据时间进行分页查询账单
    PageResult<UserBill> queryPageDate(RecordQueryDTO recordQueryDTO);

    //根据账单id查询账单详情
    UserBillVO queryBillDetail(Long billId);

    //根据年月和类型统计账单和
//    StatisticsQueryVO statisticsQuery(StatisticsQueryDTO statisticsQueryDTO);
    StatisticsQueryVO statisticsQuery(TimeDTO timeDTO);

    //查询每日花费
    List<DailyCost> queryDailyCosts();

    //根据时间范围和类型查询分类名和统计账单
    List<CategoryStatisticsVO> categoryStatistics(Integer type, String timeValue, String timeType);

    //删除账单
    void deleteBill(BillDeleteDTO billDeleteDTO);

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

    //查询账本下所有账单 billType账单类型
    PageResult<UserBill> queryBillByLedger(QueryBillByLedgerDTO queryBillByLedgerDTO);

    //根据类型和用户查询账单信息
    PageResult<UserBillVO> queryBillsByUserAndType(QueryBillByUserAndBillTypeDTO dto);

    //统计每个人的收入和支出
    List<ComputeAmountVO> computeAmount(Long userId);

    //统计用户参与账收入和支出
    List<ComputeAmountVO> computeParticipateAmount(Long userId);

    //统计结余
    List<BalanceVO> computeBalance(Long userId);

    //删除账本参与者
    void deleteUlrInfo(Long ledgerId, Long userId);
}
