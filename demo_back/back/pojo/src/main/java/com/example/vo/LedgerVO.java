package com.example.vo;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LedgerVO{
    //用户-账本ID
    private Long id;
    //账本ID
    private Long ledgerId;
    //账本名称
    private String ledgerName;
    //账本创建时间
    private LocalDateTime createTime;
    // 账本所有者名称（关联user表的用户名）
    private Long ownerId;
    private String ownerName;
    //是否为默认账本
    private boolean isDefault;
    //是否为创建者
    private boolean isOwner;
    //账本下的账单数量
    private Integer billCount;
    //账本收入金额
    private String totalIncomeAmount;
    //账本支出金额
    private String totalOutcomeAmount;
}