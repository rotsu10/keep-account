package com.example.service.impl;

import com.example.constant.MessageConstant;
import com.example.context.BaseContext;
import com.example.dto.*;
import com.example.entity.DailyCost;
import com.example.entity.SumStatistics;
import com.example.entity.UserBill;
import com.example.exception.BillException;
import com.example.mapper.UserBillMapper;
import com.example.result.PageResult;
import com.example.service.BillService;
import com.example.vo.BillStatisticsVO;
import com.example.vo.CategoryStatisticsVO;
import com.example.vo.StatisticsQueryVO;
import com.example.vo.UserBillVO;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private UserBillMapper userBillMapper;
    @Override
    public void addBill(UserBillDTO userBillDTO) {
        UserBill userBill = new UserBill();
        BeanUtils.copyProperties(userBillDTO, userBill);
        if(userBillDTO.getCreateTime()!=null){
            userBill.setCreateTime(userBillDTO.getCreateTime());
        }else{
            userBill.setCreateTime(LocalDateTime.now());
        }
        userBill.setUserId(BaseContext.getCurrentId());
        log.info("查询type的条件：userId={}, categoryId={}",
                userBill.getUserId(),  // 应该是10（从BaseContext获取的）
                userBill.getCategoryId());
        log.info("当前用户id: {}", userBill.getUserId());
        userBillMapper.insertBill(userBill);
    }

    @Override
    public PageResult<UserBill> queryPageDate(RecordQueryDTO recordQueryDTO) {
        //设置分页参数
        PageHelper.startPage(recordQueryDTO.getPage(),recordQueryDTO.getPageSize());
        //查询数据
        Page<UserBill> page = userBillMapper.queryPageDate(recordQueryDTO);
        long total = page.getTotal();
        List<UserBill> records = page.getResult();
        return new PageResult<>(total,records);
    }

    @Override
    public UserBillVO queryBillDetail(Long billId) {
        Long id = BaseContext.getCurrentId();
        UserBill userBill = userBillMapper.selectBillDetail(id,billId);
        log.info("UserBill:{}",userBill);
        UserBillVO userBillVO = new UserBillVO();
        BeanUtils.copyProperties(userBill,userBillVO);
        log.info("UserBillVO:{}",userBillVO);
        return userBillVO;
    }

    @Override
    public StatisticsQueryVO statisticsQuery(StatisticsQueryDTO statisticsQueryDTO) {
        Integer year = statisticsQueryDTO.getYear();
        Integer month = statisticsQueryDTO.getMonth();
        Integer day = statisticsQueryDTO.getDay();
        Long userId = BaseContext.getCurrentId();
        log.info("year:{}  month:{} day:{} userId:{}",year,month,day,userId);
        SumStatistics sum = userBillMapper.getSumAll(year, month, day,userId);
        log.info("userBill:{}",sum);
        // 1. 初始化默认值
        BigDecimal income = BigDecimal.ZERO;
        BigDecimal expense = BigDecimal.ZERO;
        BigDecimal transfer = BigDecimal.ZERO;

        // 2. 如果 sum 不为 null，再从 sum 中获取值
        if (sum != null) {
            income = sum.getIncome();
            expense = sum.getExpense();
            transfer = sum.getTransfer();
        }

        // 3. 返回结果
        return new StatisticsQueryVO(income, expense, transfer);
    }

    @Override
    public List<DailyCost> queryDailyCosts(Long id) {
        List<DailyCost> DailyCost= userBillMapper.queryDailyCosts(id);
        return DailyCost;
    }

    @Override
    public List<CategoryStatisticsVO> categoryStatistics(Integer type, String timeValue, String timeType) {
        Long id = BaseContext.getCurrentId();
        List<CategoryStatisticsVO> list = userBillMapper.categoryStatistics( id ,type,timeValue,timeType);
        return list;
    }

    @Override
    public void deleteBill(List<Long> billIds) {
        Long userId = BaseContext.getCurrentId();
        userBillMapper.deleteBill(billIds,userId);
    }

    @Override
    public List<UserBillDTO> getBillByCategoryIds(List<Long> categoryIds) {
        Long userId = BaseContext.getCurrentId();
        List<UserBillDTO> list= userBillMapper.getBillByCategoryIds(categoryIds,userId);
        return list;
    }

    @Override
    public UserBillVO updateBill(UserBillDTO userBillDTO) {
        UserBill userBill = new UserBill();
        BeanUtils.copyProperties(userBillDTO,userBill);

        Long userId = BaseContext.getCurrentId();
        userBill.setUserId(userId);
        int row = userBillMapper.updateBill(userBill);
        if(row>0){
            Long billId = userBill.getId();
            UserBillVO userBillVO = new UserBillVO();
            BeanUtils.copyProperties(userBillMapper.selectBillDetail(userId,billId),userBillVO);
            return userBillVO;
        }else {
            throw new BillException(MessageConstant.BILL_NOT_EXISTS);
        }
    }

    @Override
    public List<CategoryStatisticsVO> getCategorySum(TimeDTO timeDTO) {
        String timeType = timeDTO.getTimeType();//时间类型
        String timeValue = timeDTO.getTimeValue();//具体时间
        Integer type = timeDTO.getType();//具体时间
        Long id = BaseContext.getCurrentId();
        List<CategoryStatisticsVO> list = userBillMapper.categoryStatistics(id,type,timeValue,timeType);
        log.info("userBill:{}",list);
        return list;
    }

    @Override
    public List<BillStatisticsVO> getSumByDate(TimeDTO timeDTO) {

        Long userId = BaseContext.getCurrentId();
        String timeValue = timeDTO.getTimeValue();
        String timeType = timeDTO.getTimeType();
        Integer type = timeDTO.getType();
        List<BillStatisticsVO> list = userBillMapper.getSumByDate(userId,type,timeValue,timeType);
        log.info("userBillMapper.getSumByDate(timeDTO,userId):{}",list);
        return list;
    }

    @Override
    public PageResult<UserBill> queryListChart(ListRecordPageDTO listRecordPageDTO) {
        Long userId = BaseContext.getCurrentId();
        PageHelper.startPage(listRecordPageDTO.getPage(),listRecordPageDTO.getPageSize());
        Page<UserBill> page = userBillMapper.queryListChart(listRecordPageDTO,userId);
        long total = page.getTotal();
        List<UserBill> records = page.getResult();
        return new PageResult<>(total,records);
    }
}
