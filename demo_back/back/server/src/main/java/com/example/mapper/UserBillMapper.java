package com.example.mapper;
import com.example.dto.BillDeleteDTO;
import com.example.dto.RecordQueryDTO;
import com.example.dto.UserBillDTO;
import com.example.entity.DailyCost;
import com.example.entity.SumStatistics;
import com.example.entity.UserBill;
import com.example.vo.CategoryStatisticsVO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserBillMapper {

    //插入账单
    void insertBill(UserBill userBill);

    //根据时间分页查询数据
    Page<UserBill> queryPageDate(RecordQueryDTO recordQueryDTO);

    //根据账单id查询账单详情
    UserBill selectBillDetail(Long userId, Long billId);

    //根据年月查询账单统计
    SumStatistics getSumAll(Integer year, Integer month,Integer day, Long userId);

    //查询每日花费
    List<DailyCost> queryDailyCosts(Long id);

    //根据时间范围和类型查询分类名和统计账单
    List<CategoryStatisticsVO> categoryStatistics(Long id, Long type, String timeValue,String timeType);

    //删除账单
    void deleteBill( List<Long> billIds,Long userId);

    //删除该分类下所有账单
    void deleteBillByCategoryIds(List<Long> categoryIds);

    //修改账单分类
    void updateCategory(Long categoryId, List<Long> billIds);

    //根据分类id查询账单id
    List<Long> getBillIdsByCategoryIds(List<Long> categoryIds, Long userId);

    //根据分类id查询账单
    List<UserBillDTO> getBillByCategoryIds(List<Long> categoryIds, Long userId);

    //更新修改账单
    int updateBill(UserBill userBill);
}
