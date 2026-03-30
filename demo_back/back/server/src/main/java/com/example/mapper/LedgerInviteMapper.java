package com.example.mapper;

import com.example.entity.LedgerInvite;
import com.example.vo.LedgerInviteVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LedgerInviteMapper {



    // 5. 检查是否已有待处理的邀请
    LedgerInvite findByLedgerAndUsers(Long ledgerId, Long inviteeId);

    //添加邀请记录
    void insert(LedgerInvite invite);

    //获取邀请记录详情
    LedgerInvite getInviteDetail(Long inviteId);

    //更新状态
    void updateStatus(Long inviteId, int status);

    //获取等待处理的邀请
    List<LedgerInvite> getPendingInvites(Long userId);

    //删除邀请记录
    void deleteByLedgerId(Long ledgerId);

}
