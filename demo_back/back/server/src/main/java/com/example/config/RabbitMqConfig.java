package com.example.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.example.constant.RabbitMqConstant.*;

@Configuration
public class RabbitMqConfig {

    //声明交换机
    @Bean
    public Exchange noticeExchange() {
        return ExchangeBuilder.topicExchange(NOTICE_EXCHANGE)
                .durable(true)
                .build();
    }


    //声明账本邀请队列
    @Bean
    public Queue ledgerInviteQueue() {
        return QueueBuilder.durable(LEDGER_INVITE_QUEUE)
                .deadLetterExchange("notice.dlx.exchange") // 死信交换机（用于失败重试）
                .deadLetterRoutingKey("notice.dlx.routing.key")
                .ttl(60000) // 消息过期时间60秒（重试间隔）
                .build();
    }

    //绑定交换机和队列
    @Bean
    public Binding ledgerInviteBinding(){
        return BindingBuilder.bind(ledgerInviteQueue())
                .to(noticeExchange())
                .with(LEDGER_INVITE_ROUTING_KEY)
                .noargs();
    }

    //死信队列配置（用于消息重试）
    @Bean
    public Exchange dlxExchange() {
        return ExchangeBuilder.topicExchange("notice.dlx.exchange").durable(true).build();
    }

    @Bean
    public Queue dlxQueue() {
        return QueueBuilder.durable("notice.dlx.queue").build();
    }

    @Bean
    public Binding dlxBinding(){
        return BindingBuilder.bind(dlxQueue())
                .to(dlxExchange())
                .with("notice.dlx.routing.key")
                .noargs();
    }
}
