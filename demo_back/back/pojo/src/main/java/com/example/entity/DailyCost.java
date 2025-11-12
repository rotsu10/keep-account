package com.example.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DailyCost {
    //日期
    private String date;
    //每日花费
    private Double cost;
    //每日收入
    private Double income;
}
