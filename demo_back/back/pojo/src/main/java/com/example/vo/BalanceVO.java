package com.example.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BalanceVO implements Serializable {
    private Long userId;
    private String userName;
    private BigDecimal participateBalance;   //participants结余
    private BigDecimal billBalance;             //bill结余
    private BigDecimal total;               //统计
}
