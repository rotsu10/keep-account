package com.example.service;

import com.example.dto.SendInviteRequestDTO;
import com.example.entity.LedgerInvite;
import com.example.vo.LedgerInviteVO;

public interface LedgerInviteService {

    //发送邀请
    LedgerInvite sendInvite(SendInviteRequestDTO sendInviteRequestDTO);
}
