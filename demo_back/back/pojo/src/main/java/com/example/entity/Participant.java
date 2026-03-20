package com.example.entity;

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
public class Participant implements Serializable {
    private Long id;
    private Long billId;
    private Long participantId;
    private LocalDateTime createTime;
    private BigDecimal shareAmount;
}
