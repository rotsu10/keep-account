package com.example.mapper;

import com.example.entity.LedgerInvite;
import org.apache.ibatis.annotations.Mapper;

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

}
