package com.example.service.impl;

import com.example.constant.MessageConstant;
import com.example.context.BaseContext;
import com.example.dto.LedgerDTO;
import com.example.entity.Ledger;
import com.example.entity.User;
import com.example.exception.LedgerException;
import com.example.mapper.LedgerMapper;
import com.example.mapper.ParticipantMapper;
import com.example.mapper.UserMapper;
import com.example.service.LedgerInviteService;
import com.example.service.LedgerService;
import com.example.vo.LedgerVO;
import com.example.vo.UserVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class LedgerServiceImpl implements LedgerService {

    @Autowired
    private LedgerMapper ledgerMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private ParticipantMapper participantMapper;
    @Autowired
    private LedgerInviteService ledgerInviteService;

    @Override
    public Long add(LedgerDTO ledgerDTO) {
        String ledgerName = ledgerDTO.getLedgerName();
        Long userId = BaseContext.getCurrentId();

        // 1. 创建实体类对象，设置账本名
        Ledger ledger = new Ledger();
        ledger.setLedgerName(ledgerName);
        // 2. 执行插入：MyBatis自动将自增ID回写到ledger的id属性中（Long类型）
        ledgerMapper.addLedger(ledger);

        // 3. 直接获取Long类型的自增ID，无需任何转换！
        Long ledgerId = ledger.getId();

        // 4. 插入关联关系
        ledgerMapper.addUserLedgerRelation(userId, ledgerId);
        return ledgerId;
    }

    @Override
    public Long getDefaultLedgerIdByUserId(Long userId) {
        if (userId == null) {
            return null;
        }
        // 查用户第一个创建的账本ID
//        Long defaultLedgerId = ledgerMapper.selectFirstLedgerIdByUserId(userId);
        Long defaultLedgerId = ledgerMapper.selectDefaultLedgerIdByUserId(userId);
        log.info("用户{}的默认账本ID（第一个创建）：{}", userId, defaultLedgerId);
        return defaultLedgerId;
    }

    @Override
    public List<LedgerVO> getAllLedger() {
        Long userId = BaseContext.getCurrentId();
        List<LedgerVO> list= ledgerMapper.getAllLedger(userId);
        return list;
    }

    @Override
    public void deleteLedger(Long ledgerId) {
        // 1. 获取当前用户ID
        Long userId = BaseContext.getCurrentId();

        // 2. 判断是否是账本创建者
        Integer isOwner  = ledgerMapper.isLedgerOwner(userId,ledgerId);
        if(isOwner==null){
            throw new LedgerException("不允许访问该账本");
        } else if (isOwner == 0) {
            throw new LedgerException("非账本创建者，不允许删除");
        }

        // 3. 判断是否是【默认账本】，禁止删除默认账本
        Integer isDefault = ledgerMapper.isDefaultLedger(userId,ledgerId);
        if (isDefault != null && isDefault == 1) {
            throw new LedgerException("默认账本不能删除，请先将其他账本设为默认");
        }

        //判断自己创建账本个数，如果只有一个不允许删除
        Integer ownCount = ledgerMapper.countOwner(userId);
        if (ownCount == null || ownCount <= 1) {
            throw new LedgerException("最后一个你创建的账本不允许删除");
        }
        // 4. 先删除关联数据
        ledgerMapper.deleteBillByLedgerId(ledgerId);        //相关账单
        ledgerMapper.deleteCategoryByLedgerId(ledgerId);    //分类
        ledgerInviteService.deleteInviteByLedgerId(ledgerId);//账本邀请记录

        // 5. 最后删除账本
        ledgerMapper.deleteLedger(ledgerId);
    }

    @Override
    public void addLedgerUser(UserVO userVO) {
        Long ledgerId = userVO.getLedgerId();
        Long userId = userVO.getId();
        //检查该用户是否已经在该账本中
        Integer count =  ledgerMapper.countByUserIdAndLedgerId(userId,ledgerId);
        if (count > 0 && count != null) {
            throw  new LedgerException(MessageConstant.ALREADY_EXISTS_PARTICIPANT);
        }
        int rows = ledgerMapper.addUserLedgerRelation2(userId,ledgerId);
        if(rows==0){
            throw new LedgerException(MessageConstant.ADD_LEDGER_PARTICIPANT_ERROR);
        }
    }

    @Override
    public LedgerVO getLedgerDetail(Long ledgerId) {
        Long userId = BaseContext.getCurrentId();
        //查询账本信息
        LedgerVO ledgerVO = ledgerMapper.getLedgerDetail(ledgerId,userId);
        //查询账本owner信息
        User user = ledgerMapper.getLedgerCreator(ledgerId);
        ledgerVO.setOwnerId(user.getId());
        ledgerVO.setOwnerName(user.getUsername());
        return ledgerVO;
    }

    @Override
    public void switchLedger(Long ledgerId) {
        Long userId = BaseContext.getCurrentId();
        int row = ledgerMapper.switchLedger(ledgerId,userId);
        if (row == 0) {
            throw new LedgerException(MessageConstant.LEDGER_NOT_EXISTS);
        }else {
            BaseContext.setLedgerId(ledgerId);
        }
    }

    @Override
    public List<UserVO> getAllLedgerUser() {
        Long ledgerId = BaseContext.getLedgerId();
        List<UserVO> list = ledgerMapper.getAllLedgerUser(ledgerId);
        return list;
    }

}
