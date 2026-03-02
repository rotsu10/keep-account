package com.example.service;

import com.example.dto.AddLedgerUserDTO;
import com.example.dto.LedgerDTO;
import com.example.entity.User;
import com.example.vo.LedgerVO;

import java.util.List;

public interface LedgerService {

    //添加账本
    Long add(LedgerDTO ledgerDTO);

    //获取默认账本id
    Long getDefaultLedgerIdByUserId(Long userId);

    //获取所有账本
    List<LedgerVO> getAllLedger();

    //删除账本
    void deleteLedger(Long ledgerId);

    //账本添加参与者 （添加用户-账本表中数据）
    User addLedgerUser(AddLedgerUserDTO addLedgerUserDTO);
}
