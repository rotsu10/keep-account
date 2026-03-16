package com.example.vo;

import lombok.Data;

import java.time.LocalDateTime;

// 邀请列表出参
@Data
public class LedgerInviteVO {
    private Long id;
    private Long ledgerId;     //账本id
    private String ledgerName; // 账本名称（关联查询）

    private Long inviterId;     //邀请人id
    private String inviterName; // 邀请人昵称（关联查询）

    private Integer status;     //邀请状态
    private String statusDesc; // 状态描述

    private LocalDateTime createTime; //邀请时间
    private LocalDateTime updateTime;  //更新时间
}
