package com.example.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRegisterVO implements Serializable {
    private Long id;
    private String username;
    private String phone;
    private String token;
    private LocalDateTime createdTime;
}
