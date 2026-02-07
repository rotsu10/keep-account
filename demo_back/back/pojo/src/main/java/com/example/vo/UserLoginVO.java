package com.example.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginVO implements Serializable {

    private Long id; //主键值

    private String username; //用户名

    private String phone; //手机号

    private LocalDateTime createdTime; //创建时间

    private String token; //jwt令牌

    private Long ledgerId; //账单ID
}
