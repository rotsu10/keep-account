package com.example.service.impl;

import com.example.context.BaseContext;
import com.example.dto.LedgerDTO;
import com.example.mapper.LedgerMapper;
import com.example.service.LedgerService;
import com.example.vo.LedgerVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
public class LedgerServiceImpl implements LedgerService {

    @Autowired
    private LedgerMapper ledgerMapper;

    @Override
    public LedgerVO addLedger(LedgerDTO ledgerDTO) {
        String ledgerName = ledgerDTO.getLedgerName();
        Long userId = BaseContext.getCurrentId();
        LocalDateTime createTime = LocalDateTime.now();
        return ledgerMapper.addLedger(ledgerName,userId,createTime);
    }
}
