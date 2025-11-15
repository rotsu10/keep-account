package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserBillDTO {
    private Long id;
    private Long userId; //关联用户
    private Long categoryId; //关联分类
    private BigDecimal amount; //金额
    private int type; //类型 1.收入 2.支出
    private String remark; //备注
}
