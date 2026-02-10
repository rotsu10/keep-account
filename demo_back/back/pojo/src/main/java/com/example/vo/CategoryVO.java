package com.example.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryVO {

    //分类id
    private Long id;
    //用户id
    private Long userId;
    //账本id
    private Long ledgerId;
    //分类名
    private String name;
    //类型
    private Integer type;
    //创建时间
    private LocalDateTime createTime;
}