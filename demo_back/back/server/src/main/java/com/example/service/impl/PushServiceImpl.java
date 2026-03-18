package com.example.service.impl;

import com.example.service.PushService;
import org.springframework.stereotype.Service;


//推送服务实现类
@Service
public class PushServiceImpl implements PushService {

    @Override
    public void sendInnerMessage(Long receiverId, String content) {
    }

    @Override
    public void sendAppPush(Long receiverId, String title, String content) {
    }
}
