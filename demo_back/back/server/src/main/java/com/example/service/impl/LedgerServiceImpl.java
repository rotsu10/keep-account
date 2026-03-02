package com.example.service.impl;

import com.example.context.BaseContext;
import com.example.dto.AddLedgerUserDTO;
import com.example.dto.LedgerDTO;
import com.example.entity.Ledger;
import com.example.entity.User;
import com.example.exception.LedgerException;
import com.example.mapper.LedgerMapper;
import com.example.service.LedgerService;
import com.example.vo.LedgerVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class LedgerServiceImpl implements LedgerService {

    @Autowired
    private LedgerMapper ledgerMapper;

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
        //判断该用户是否有权限删除
        Long userId = BaseContext.getCurrentId();
        Integer isOwner  = ledgerMapper.isLedgerOwner(userId,ledgerId);
        if(isOwner==null){
            throw new LedgerException("不允许访问该账本");
        } else if (isOwner == 0) {
            throw new LedgerException("非账本创建者，不允许删除");
        }else {
            //先删除该账本下账单，分类
            ledgerMapper.deleteBillByLedgerId(ledgerId);
            ledgerMapper.deleteCategoryByLedgerId(ledgerId);
            //删除账本
            ledgerMapper.deleteLedger(ledgerId);
        }
    }

    @Override
    public User addLedgerUser(AddLedgerUserDTO addLedgerUserDTO) {
        Long ledgerId = addLedgerUserDTO.getLedgerId();
        List<Long> userIds = addLedgerUserDTO.getUserIds();
        User user = ledgerMapper.addUserLedgerRelation(ledgerId,userIds);
        return user;
    }

}
