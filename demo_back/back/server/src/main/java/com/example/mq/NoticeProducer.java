package com.example.mq;
import com.example.entity.NoticeMessage;
import com.example.exception.BusinessException;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import static com.example.constant.RabbitMqConstant.LEDGER_INVITE_ROUTING_KEY;
import static com.example.constant.RabbitMqConstant.NOTICE_EXCHANGE;

/**
 * 通知消息生产者
 */
@Component
@RequiredArgsConstructor
@Slf4j
@Builder
public class NoticeProducer {

    // RabbitMQ模板
    private final RabbitTemplate rabbitTemplate;

    /**
     * 发送通知消息
     */
    public void sendNotice(NoticeMessage noticeMessage) {
        try {
            Long bizId = noticeMessage.getBizId();
            Long receiverId = noticeMessage.getReceiverId();
            String type = noticeMessage.getType();
            rabbitTemplate.convertAndSend(
                    NOTICE_EXCHANGE,
                    LEDGER_INVITE_ROUTING_KEY,
                    noticeMessage);
            log.info("通知发送成功，bizId：{}，inviteeId:{},status：{}",bizId ,receiverId, type);
        } catch (Exception e) {
            log.error("RabbitMQ消息发送失败，bizId：{}，receiverId：{}，异常信息：",
                    noticeMessage.getBizId(), noticeMessage.getReceiverId(), e);
            // 消息发送失败处理（如记录日志、重试）
            throw new BusinessException("邀请通知发送失败，请稍后重试");
        }
    }
}