package com.example.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipantVO implements Serializable {
    private Long id;
    private Long billId;
    private Long participantId;
    private String participantName;
    private LocalDateTime createTime;
    private BigDecimal shareAmount;
}
