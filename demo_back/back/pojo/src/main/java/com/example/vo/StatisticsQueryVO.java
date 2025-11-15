package com.example.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatisticsQueryVO {
    private BigDecimal income; //收入
    private BigDecimal expense; //支出
    private BigDecimal transfer; //转账
}
