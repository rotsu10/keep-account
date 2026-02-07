package com.example.mapper;

import com.example.entity.Ledger;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LedgerMapper {
    //添加账本
    void addLedger(Ledger ledger);

    //添加账本与userId关系
    void addUserLedgerRelation(@Param("userId") Long userId, @Param("ledgerId") Long ledgerId);

    //获取默认账本id
    Long selectFirstLedgerIdByUserId(Long userId);
}
