package com.example.service;

import com.example.dto.SendInviteRequestDTO;
import com.example.entity.LedgerInvite;

public interface LedgerInviteService {

    //发送邀请
    LedgerInvite sendInvite(SendInviteRequestDTO sendInviteRequestDTO);

    //接收邀请
    void acceptInvite(Long inviteId);
}
