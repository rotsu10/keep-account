package com.example.enums;
import lombok.Getter;

@Getter
public enum InviteStatusEnum {
    //pending  accepted rejected
    PENDING(0, "待接受"),
    ACCEPTED(1, "已接受"),
    REJECTED(2, "已拒绝");

    private final Integer code;
    private final String desc;

    InviteStatusEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    // 根据code获取枚举
    public static InviteStatusEnum getByCode(Integer code) {
        for (InviteStatusEnum status : values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        return null;
    }
}
