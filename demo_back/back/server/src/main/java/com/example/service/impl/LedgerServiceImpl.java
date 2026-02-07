package com.example.service.impl;

import com.example.context.BaseContext;
import com.example.dto.LedgerDTO;
import com.example.entity.Ledger;
import com.example.mapper.LedgerMapper;
import com.example.service.LedgerService;
import com.example.vo.LedgerVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
