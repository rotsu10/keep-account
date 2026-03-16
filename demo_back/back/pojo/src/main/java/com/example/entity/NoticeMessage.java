package com.example.entity;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
public class NoticeMessage implements Serializable {
    private static final long serialVersionUID = 1L;    //序列化id

    private Long receiverId;        // 接收用户ID
    private String content;         // 通知内容
    private String type;            // 通知类型LEDGER_INVITE、BILL_REMIND
    private Long bizId;             // 业务ID
    private Integer priority;       // 优先级 1-高 2-中 3-低
    private Map<String, Object> extraData;  // 额外数据
    private LocalDateTime createTime;
}