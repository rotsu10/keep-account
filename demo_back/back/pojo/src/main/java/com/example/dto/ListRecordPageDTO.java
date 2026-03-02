package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListRecordPageDTO implements Serializable {
    //分类类型
    Integer type;
    //时间
    String timeValue;
    //时间类型
    String timeType;
    //页码
    private int page;
    //每页显示记录数
    private int pageSize;
}
