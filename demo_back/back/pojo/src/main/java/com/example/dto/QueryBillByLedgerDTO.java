package com.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QueryBillByLedgerDTO implements Serializable {

    //账单类型
    @JsonProperty(required = false)
    private Integer billType;
    //账本id
    private Long ledgerId;

    //页码
    private int page;

    //每页数量
    private int pageSize;
}