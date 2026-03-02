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
public class RecordQueryDTO implements Serializable {
    public Integer year;
    public Integer month;
    public Integer day;

    public Long userId;
    //页码
    private int page;
    //每页显示记录数
    private int pageSize;
}
