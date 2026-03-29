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
public class QueryBillByUserAndBillTypeDTO implements Serializable {
    //用户id
    private Long userId;
    //账单id
    private int type;
    //标识---查询user_bill还是participants表
    //private Integer source;
    private String billType;
    //分页
    private int page;
    private int pageSize;
}
