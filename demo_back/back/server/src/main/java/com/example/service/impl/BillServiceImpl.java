package com.example.service.impl;

import com.example.annotation.CheckLedgerExist;
import com.example.constant.MessageConstant;
import com.example.context.BaseContext;
import com.example.dto.*;
import com.example.entity.*;
import com.example.exception.BillException;
import com.example.exception.UserNotFoundException;
import com.example.mapper.LedgerMapper;
import com.example.mapper.ParticipantMapper;
import com.example.mapper.UserBillMapper;
import com.example.mapper.UserMapper;
import com.example.result.PageResult;
import com.example.result.Result;
import com.example.service.BillService;
import com.example.service.ParticipantService;
import com.example.vo.*;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private UserBillMapper userBillMapper;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ParticipantMapper participantMapper;
    @Autowired
    private LedgerMapper ledgerMapper;
    @Autowired
    private ParticipantService participantService;


    @Override
    @CheckLedgerExist
    @Transactional(rollbackFor = Exception.class)
    public void addBill(UserBillDTO userBillDTO) {
        UserBill userBill = new UserBill();
        BeanUtils.copyProperties(userBillDTO, userBill);
        if(userBillDTO.getCreateTime()!=null){
            userBill.setCreateTime(userBillDTO.getCreateTime());
        }else{
            userBill.setCreateTime(LocalDateTime.now());
        }
        userBill.setUserId(BaseContext.getCurrentId());
        userBill.setLedgerId(BaseContext.getLedgerId());
        log.info("查询type的条件：userId={}, categoryId={}",
                userBill.getUserId(),
                userBill.getCategoryId());
        log.info("当前用户id: {}", userBill.getUserId());
        userBillMapper.insertBill(userBill);
        //添加多人账本
        log.info("billType:{}",userBill.getBillType());
        if (userBill.getBillType().equals("multiple")){
            Long id = userBill.getId();
            List<Long> participantIds = userBillDTO.getParticipantIds();
            int participantCount = participantIds.size();
            BigDecimal totalAmount = userBill.getAmount();
            //计算平均金额
            BigDecimal shareAmount = totalAmount.divide(
                    new BigDecimal(participantCount),
                    2,
                    RoundingMode.HALF_UP
            );
            //插入
            for(Long participantId : participantIds){
                Participant participant =Participant.builder()
                        .billId(id)
                        .participantId(participantId)
                        .shareAmount(shareAmount)
                        .build();
                participantMapper.add(participant);
            }
        }
    }

    @Override
    public PageResult<UserBill> queryPageDate(RecordQueryDTO recordQueryDTO) {
        //设置分页参数
        PageHelper.startPage(recordQueryDTO.getPage(),recordQueryDTO.getPageSize());
        //查询数据
        Long ledgerId = BaseContext.getLedgerId();
        Page<UserBill> page = userBillMapper.queryPageDate(recordQueryDTO,ledgerId);
        long total = page.getTotal();
        List<UserBill> records = page.getResult();
        return new PageResult<>(total,records);
    }

    @Override
    public UserBillVO queryBillDetail(Long billId) {
        Long id = BaseContext.getCurrentId();
        Long ledgerId = BaseContext.getLedgerId();
        UserBill userBill = userBillMapper.selectBillDetail(id,billId,ledgerId);
        log.info("UserBill:{}",userBill);
        UserBillVO userBillVO = new UserBillVO();
        BeanUtils.copyProperties(userBill,userBillVO);
        log.info("UserBillVO:{}",userBillVO);
        return userBillVO;
    }

    @Override
    public StatisticsQueryVO statisticsQuery(TimeDTO timeDTO) {
        String timeValue = timeDTO.getTimeValue();
        String timeType = timeDTO.getTimeType();
        Integer type = timeDTO.getType();
        Long userId = BaseContext.getCurrentId();
        Long ledgerId = BaseContext.getLedgerId();
        SumStatistics sum = userBillMapper.getSumAll(timeType, timeValue,type,userId,ledgerId);
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
    public List<DailyCost> queryDailyCosts() {
        Long id = BaseContext.getCurrentId();
        Long ledgerId = BaseContext.getLedgerId();
        List<DailyCost> DailyCost= userBillMapper.queryDailyCosts(id,ledgerId);
        return DailyCost;
    }

    @Override
    public List<CategoryStatisticsVO> categoryStatistics(Integer type, String timeValue, String timeType) {
        Long id = BaseContext.getCurrentId();
        Long ledgerId = BaseContext.getLedgerId();
        List<CategoryStatisticsVO> list = userBillMapper.categoryStatistics( id ,type,timeValue,timeType,ledgerId);
        return list;
    }

    @Override
    public void deleteBill(BillDeleteDTO billDeleteDTO) {
        Long userId = BaseContext.getCurrentId();
        Long ledgerId = BaseContext.getLedgerId();
        List<Long> billIds = billDeleteDTO.getBillIds();
        userBillMapper.deleteBill(billIds,userId,ledgerId);
    }

    @Override
    public List<UserBillDTO> getBillByCategoryIds(List<Long> categoryIds) {
        Long userId = BaseContext.getCurrentId();
        Long ledgerId = BaseContext.getLedgerId();
        List<UserBillDTO> list= userBillMapper.getBillByCategoryIds(categoryIds,userId,ledgerId);
        return list;
    }

    @Override
    @Transactional
    public UserBillVO updateBill(UserBillDTO userBillDTO) {
        //修改账单所属者
        //1.查询此人是否存在
        User byUsername = userMapper.getByUsername(userBillDTO.getUserName());
        if(byUsername==null){
            throw new UserNotFoundException(MessageConstant.USER_NOT_FOUND);
        }

        UserBill userBill = new UserBill();
        BeanUtils.copyProperties(userBillDTO,userBill);
        Long userId = byUsername.getId();
        userBill.setUserId(userId);
        Long ledgerId = BaseContext.getLedgerId();
        //如果由多人账本修改为单人账本，则将账本参与者的数据清空
        String billType = userBill.getBillType();
        if (billType.equals("single")){
            participantService.deleteParticipant(userBill.getId());
        }

        int row = userBillMapper.updateBill(userBill,ledgerId);
        if(row>0){
            Long billId = userBill.getId();
            UserBillVO userBillVO = new UserBillVO();
            BeanUtils.copyProperties(userBillMapper.selectBillDetail(userId,billId,ledgerId),userBillVO);
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
        Long ledgerId = BaseContext.getLedgerId();
        List<CategoryStatisticsVO> list = userBillMapper.categoryStatistics(id,type,timeValue,timeType,ledgerId);
        log.info("userBill:{}",list);
        return list;
    }

    @Override
    public List<BillStatisticsVO> getSumByDate(TimeDTO timeDTO) {

        Long userId = BaseContext.getCurrentId();
        Long ledgerId = BaseContext.getLedgerId();

        String timeValue = timeDTO.getTimeValue();
        String timeType = timeDTO.getTimeType();
        Integer type = timeDTO.getType();
        List<BillStatisticsVO> list = userBillMapper.getSumByDate(userId,type,timeValue,timeType,ledgerId);
        log.info("userBillMapper.getSumByDate(timeDTO,userId):{}",list);
        return list;
    }

    @Override
    public PageResult<UserBill> queryListChart(ListRecordPageDTO listRecordPageDTO) {
        Long userId = BaseContext.getCurrentId();
        Long ledgerId = BaseContext.getLedgerId();

        PageHelper.startPage(listRecordPageDTO.getPage(),listRecordPageDTO.getPageSize());
        Page<UserBill> page = userBillMapper.queryListChart(listRecordPageDTO,userId,ledgerId);
        long total = page.getTotal();
        List<UserBill> records = page.getResult();
        return new PageResult<>(total,records);
    }

    @Override
    public PageResult<UserBill> queryBillByLedger(QueryBillByLedgerDTO queryBillByLedgerDTO) {
        PageHelper.startPage(queryBillByLedgerDTO.getPage(),queryBillByLedgerDTO.getPageSize());

        Integer billType = queryBillByLedgerDTO.getBillType();      //账单类型
        Long ledgerId = queryBillByLedgerDTO.getLedgerId();         //账本id

        Page<UserBill> page = userBillMapper.queryBillByLedger(billType,ledgerId);
        long total = page.getTotal();
        List<UserBill> result = page.getResult();
        return new PageResult<>(total,result);
    }

}
