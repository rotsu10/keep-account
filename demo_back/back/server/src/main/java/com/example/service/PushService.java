package com.example.service;

public interface PushService {

    //站内发送消息
    void sendInnerMessage(Long receiverId, String content);

    //APP内发送消息
    void sendAppPush(Long receiverId, String title, String content);
}
