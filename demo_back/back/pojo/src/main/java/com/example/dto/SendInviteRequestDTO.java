// 发送邀请入参
package com.example.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SendInviteRequestDTO {
    /** 账本ID */
    @NotNull(message = "账本ID不能为空")
    private Long ledgerId;
    /** 被邀请人ID */
    private Long inviteeId;
    //被邀请人姓名
    private String inviteeName;
    //被邀请人手机号
    private String phone;
}

