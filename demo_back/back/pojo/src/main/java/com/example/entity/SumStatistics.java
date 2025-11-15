package com.example.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

// 统计结果POJO（用于接收一次查询的多维度总和）
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SumStatistics {
    private BigDecimal income;    // 收入总和
    private BigDecimal expense;   // 支出总和
    private BigDecimal transfer;  // 转账总和
}