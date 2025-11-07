package com.example.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// 统计结果POJO（用于接收一次查询的多维度总和）
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SumStatistics {
    private Long income;    // 收入总和
    private Long expense;   // 支出总和
    private Long transfer;  // 转账总和
}