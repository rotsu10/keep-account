package com.example.entity;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserLegerRelation implements Serializable {
    private Long id;
    private Long ledgerId;
    private Long userId;
    private LocalDateTime createTime;
    private int isOwner;
    private int isDefault;
}
