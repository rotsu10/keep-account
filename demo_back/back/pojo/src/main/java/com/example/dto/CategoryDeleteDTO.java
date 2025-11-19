package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDeleteDTO {
    //删除的分类的id
    private List<Long> categoryIds;
    //删除策略 move delete
    private String strategy;
    //转移账单的分类
    private Long targetCategoryId;
}
