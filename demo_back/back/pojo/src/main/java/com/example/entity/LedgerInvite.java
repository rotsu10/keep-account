package com.example.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LedgerInvite {
    /** 邀请ID */
    private Long id;
    /** 账本ID */
    private Long ledgerId;
    /** 邀请人ID */
    private Long inviterId;
    /** 被邀请人ID */
    private Long inviteeId;
    /** 邀请状态：0-待接受 1-已接受 2-已拒绝 */
    private Integer status;
    /** 邀请时间 */
    private LocalDateTime createTime;
    /** 更新时间 */
    private LocalDateTime updateTime;
}
