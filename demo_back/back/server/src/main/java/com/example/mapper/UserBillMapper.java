package com.example.mapper;
import com.example.dto.*;
import com.example.entity.DailyCost;
import com.example.entity.SumStatistics;
import com.example.entity.UserBill;
import com.example.vo.BillStatisticsVO;
import com.example.vo.CategoryStatisticsVO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserBillMapper {

    //插入账单
    void insertBill(UserBill userBill);

    //根据时间分页查询数据
    Page<UserBill> queryPageDate(@Param("queryDTO") RecordQueryDTO recordQueryDTO,@Param("ledgerId") Long ledgerId);

    //根据账单id查询账单详情
    UserBill selectBillDetail(Long userId, Long billId,Long ledgerId);

    //根据年月和类型统计账单和
//    SumStatistics getSumAll(Integer year, Integer month,Integer day, Long userId, Long ledgerId);
    SumStatistics getSumAll(String timeType, String timeValue, Integer type, Long userId, Long ledgerId);

    //查询每日花费
    List<DailyCost> queryDailyCosts(Long id,Long ledgerId);

    //根据时间范围和类型查询分类名和统计账单
    List<CategoryStatisticsVO> categoryStatistics(Long id, Integer type, String timeValue,String timeType,Long ledgerId);

    //删除账单
    void deleteBill( List<Long> billIds,Long userId,Long ledgerId);

    //删除该分类下所有账单
    void deleteBillByCategoryIds(List<Long> categoryIds,Long ledgerId);

    //修改账单分类
    void updateCategory(Long categoryId, List<Long> billIds,Long ledgerId);

    //根据分类id查询账单id
    List<Long> getBillIdsByCategoryIds(List<Long> categoryIds, Long userId,Long ledgerId);

    //根据分类id查询账单
    List<UserBillDTO> getBillByCategoryIds(List<Long> categoryIds, Long userId,Long ledgerId);

    //更新修改账单
    int updateBill(UserBill userBill,Long ledgerId);

    //根据年月日查询所有账单
    List<BillStatisticsVO> getSumByDate(Long userId, Integer type, String timeValue, String timeType,Long ledgerId);

    //根据日期类型查询账单分页列表
    Page<UserBill> queryListChart(@Param("dto") ListRecordPageDTO listRecordPageDTO,
                                  @Param("userId") Long userId,
                                  @Param("ledgerId") Long ledgerId);

}
