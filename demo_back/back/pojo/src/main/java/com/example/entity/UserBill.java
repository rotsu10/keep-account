package com.example.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserBill {
    private Long id;
    private Long userId; //关联用户
    private Long ledgerId; //关联账本id
    private Long categoryId; //关联分类
    private String categoryName; //关联分类名
    private BigDecimal amount; //金额
    private int type; //类型 1.收入 2.支出
    private LocalDateTime createTime; //记账时间
    private String remark; //备注
}