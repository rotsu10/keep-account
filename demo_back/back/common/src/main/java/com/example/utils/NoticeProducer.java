package com.example.utils;
import com.example.entity.NoticeMessage;
import com.example.exception.BusinessException;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.amqp.core.Queue;

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

    // 消息队列名称（可配置在yml中）
    private static final String LEDGER_INVITE_QUEUE = "ledger.invite.queue";

    @Bean
    public Queue ledgerInviteQueue() {
        return new Queue(LEDGER_INVITE_QUEUE, true); // 第二个参数为是否持久化
    }

    /**
     * 发送通知消息
     */
    public void sendNotice(NoticeMessage noticeMessage) {
        try {
            Long bizId = noticeMessage.getBizId();
            Long receiverId = noticeMessage.getReceiverId();
            String type = noticeMessage.getType();
            rabbitTemplate.convertAndSend(LEDGER_INVITE_QUEUE, noticeMessage);
            log.info("通知发送成功，bizId：{}，inviteeId:{},status：{}",bizId ,receiverId, type);
        } catch (Exception e) {
            log.error("RabbitMQ消息发送失败，bizId：{}，receiverId：{}，异常信息：",
                    noticeMessage.getBizId(), noticeMessage.getReceiverId(), e);
            // 消息发送失败处理（如记录日志、重试）
            throw new BusinessException("邀请通知发送失败，请稍后重试");
        }
    }
}