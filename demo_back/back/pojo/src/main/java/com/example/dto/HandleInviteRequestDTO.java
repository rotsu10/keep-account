package com.example.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

// 处理邀请入参
@Data
public class HandleInviteRequestDTO {
    /** 邀请ID */
    @NotNull(message = "邀请ID不能为空")
    private Long inviteId;
    /** 处理结果：1-接受 2-拒绝 */
    @NotNull(message = "处理结果不能为空")
    private Integer status;
}
