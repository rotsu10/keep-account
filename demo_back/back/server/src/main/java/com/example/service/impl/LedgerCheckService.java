package com.example.service.impl;


import com.example.exception.BusinessException;
import com.example.mapper.LedgerMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LedgerCheckService {
    @Autowired
    private LedgerMapper ledgerMapper;

    /**
     * 核心校验逻辑：账本是否存在 + 是否属于当前用户
     * @param ledgerId 账本ID
     * @param userId 当前用户ID
     * @return 校验结果
     */
    public boolean checkLedgerValid(Long ledgerId, Long userId) {
        // 1. 基础判空
        if (ledgerId == null || userId == null) {
            return false;
        }
        // 2. 查数据库：账本是否存在且属于当前用户
        Integer count = ledgerMapper.countByLedgerIdAndUserId(ledgerId, userId);
        return count != null && count > 0;
    }

    /**
     * 校验失败的处理（可自定义：抛异常/返回false）
     * @param throwException 是否抛异常
     * @param message 提示语
     */
    public void handleCheckFail(boolean throwException, String message) {
        if (throwException) {
            throw new BusinessException(message); // 自定义业务异常
        }
        // 不抛异常的场景：可返回false，或记录日志
        log.warn("账本校验失败：{}", message);
    }
}