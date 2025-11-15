package com.example.vo;

import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryStatisticsVO {
    private String name;
    private BigDecimal value;
//    private Long countNumber;
}
