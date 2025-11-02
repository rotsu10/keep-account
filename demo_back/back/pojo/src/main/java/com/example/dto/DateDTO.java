package com.example.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DateDTO {
    public Integer year;
    public Integer month;
    public Integer day = 1 ; //默认值为每月1号
}
