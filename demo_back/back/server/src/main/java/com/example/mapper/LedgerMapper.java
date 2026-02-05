package com.example.mapper;

import com.example.vo.LedgerVO;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;

@Mapper
public interface LedgerMapper {
    public LedgerVO addLedger(String ledgerName, Long userId, LocalDateTime createTime);
}
