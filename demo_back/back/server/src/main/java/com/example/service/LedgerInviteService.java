package com.example.service;

import com.example.dto.SendInviteRequestDTO;
import com.example.entity.LedgerInvite;
import com.example.vo.LedgerInviteVO;

import java.util.List;

public interface LedgerInviteService {

    //发送邀请
    LedgerInvite sendInvite(SendInviteRequestDTO sendInviteRequestDTO);

    //接收邀请
    void acceptInvite(Long inviteId);

    //拒绝邀请
    void rejectInvite(Long inviteId);

    //获取待处理的邀请
    List<LedgerInvite> getPendingInvites();

    //删除邀请记录
    void deleteInviteByLedgerId(Long ledgerId);

}
