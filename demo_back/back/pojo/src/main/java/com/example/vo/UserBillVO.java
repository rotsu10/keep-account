package com.example.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserBillVO {
    private Long id;
    private Long userId; //关联用户
    private Long ledgerId; //账本id
    private String ledgerName; //账本名
    private Long categoryId; //关联分类
    private String categoryName; //关联分类名
    private String belongName;  //账单归属name
    private BigDecimal amount; //金额
    private int type; //类型 1.收入 2.支出
    private LocalDateTime createTime; //记账时间
    private String remark; //备注
}
