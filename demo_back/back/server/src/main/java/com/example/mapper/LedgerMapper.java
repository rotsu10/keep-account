package com.example.mapper;

import com.example.entity.Ledger;
import com.example.entity.User;
import com.example.vo.LedgerVO;
import com.example.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LedgerMapper {
    //添加账本
    void addLedger(Ledger ledger);

    //添加账本与userId关系
    /// 不能修改
    int addUserLedgerRelation(@Param("userId") Long userId, @Param("ledgerId") Long ledgerId);

    //获取默认账本id
    Long selectDefaultLedgerIdByUserId(Long userId);

    //账本是否存在且属于当前用户
    Integer countByLedgerIdAndUserId(Long ledgerId, Long userId);

    //获取所有
    List<LedgerVO> getAllLedger(Long userId);

    //判断是否为账本所有者
    Integer isLedgerOwner(Long userId, Long ledgerId);

    //删除账本下账单
    void deleteBillByLedgerId(Long ledgerId);

    //删除账本下分类
    void deleteCategoryByLedgerId(Long ledgerId);

    //删除账本表中数据
    void deleteLedger(Long ledgerId);

    //根据账本id查询账本相关信息
    LedgerVO getLedgerDetail(Long ledgerId,Long userId);

    //切换默认账本
    int switchLedger(Long ledgerId,Long userId);

    //查询账本创建者信息
    User getLedgerOwner(Long ledgerId);

    //查询所有账本参与者
    List<UserVO> getAllLedgerUser(Long ledgerId);

    //删除用户-账本表中数据
}
