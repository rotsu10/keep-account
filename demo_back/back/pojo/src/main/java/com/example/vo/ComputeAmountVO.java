package com.example.vo;

import com.example.entity.UserBill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComputeAmountVO implements Serializable {
    private Long userId;
    private BigDecimal amount;  //总金额
    private BigDecimal totalIncome;  //收入
    private BigDecimal totalExpend; //支出
    private BigDecimal totalBalance; //总结余
}
