package com.example.mapper;

import com.example.entity.Ledger;
import com.example.vo.LedgerVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LedgerMapper {
    //添加账本
    void addLedger(Ledger ledger);

    //添加账本与userId关系
    void addUserLedgerRelation(@Param("userId") Long userId, @Param("ledgerId") Long ledgerId);

    //获取默认账本id
    Long selectFirstLedgerIdByUserId(Long userId);

    //账本是否存在且属于当前用户
    Integer countByLedgerIdAndUserId(Long ledgerId, Long userId);

    //获取所有
    List<LedgerVO> getAllLedger(Long userId);
}
