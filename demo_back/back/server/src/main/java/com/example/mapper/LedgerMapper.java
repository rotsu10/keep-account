package com.example.mapper;

import com.example.entity.Ledger;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LedgerMapper {

    void addLedger(Ledger ledger);

    void addUserLedgerRelation(@Param("userId") Long userId, @Param("ledgerId") Long ledgerId);

}
