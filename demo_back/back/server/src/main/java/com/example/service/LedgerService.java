package com.example.service;

import com.example.dto.LedgerDTO;
import com.example.vo.LedgerVO;

import java.util.List;

public interface LedgerService {

    //添加账本
    Long add(LedgerDTO ledgerDTO);

    //获取默认账本id
    Long getDefaultLedgerIdByUserId(Long userId);

    //获取所有账本
    List<LedgerVO> getAllLedger();

}
