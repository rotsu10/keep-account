package com.example.context;

public class BaseContext {
    // 存储当前请求的用户ID
    private static final ThreadLocal<Long> USER_ID_THREAD_LOCAL = new ThreadLocal<>();
    // 存储当前请求的账本ID
    private static final ThreadLocal<String> LEDGER_ID_THREAD_LOCAL = new ThreadLocal<>();

    // ========== 用户ID相关方法 ==========
    public static void setCurrentId(Long id) {
        USER_ID_THREAD_LOCAL.set(id);
    }

    public static Long getCurrentId() {
        return USER_ID_THREAD_LOCAL.get();
    }

    public static void removeCurrentId() {
        USER_ID_THREAD_LOCAL.remove();
    }

    // ========== 账本ID相关方法 ==========
    public static void setLedgerId(String ledgerId) {
        LEDGER_ID_THREAD_LOCAL.set(ledgerId);
    }

    public static String getLedgerId() {
        return LEDGER_ID_THREAD_LOCAL.get();
    }

    public static void removeLedgerId() {
        LEDGER_ID_THREAD_LOCAL.remove();
    }

    // 新增：统一清除所有ThreadLocal（简化调用）
    public static void clearAll() {
        removeCurrentId();
        removeLedgerId();
    }
}