package com.example.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserBill {
    private Long id;
    private Long userId; //关联用户
    private Long categoryId; //关联分类
    private String categoryName; //关联分类名
    private Long amount; //金额
    private int type; //类型 1.收入 2.支出
    private LocalDateTime createTime; //记账时间
    private String remark; //备注
}