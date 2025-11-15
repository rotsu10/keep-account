package com.example.vo;

import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryStatisticsVO {
    private String categoryName;
    private BigDecimal totalAmount;
    private Long countNumber;
}
