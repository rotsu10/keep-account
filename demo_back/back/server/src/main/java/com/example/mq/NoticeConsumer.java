//package com.example.mq;
//
//
//import com.example.entity.NoticeMessage;
//import com.example.service.PushService;
//import com.rabbitmq.client.Channel;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.amqp.core.Message;
//import org.springframework.amqp.rabbit.annotation.RabbitListener;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
////通知消息消费者
//@Slf4j
//@Component
//public class NoticeConsumer {
//
//    @Autowired
//    private PushService pushService;
//
//    //concurrency消费线程数
//    @RabbitListener(queues = "ledger.invite.queue", concurrency = "1-5")
//    public void consume(NoticeMessage noticeMessage, Message message, Channel channel) throws IOException {
//        log.info("noticeMessage={},message:{},channel:{}", noticeMessage,message,channel);
//        //获取发送消息的deliverTag,用于手动ack
//        long deliveryTag = message.getMessageProperties().getDeliveryTag();
//        try {
//            log.info("开始处理通知消息，bizId:{}, 接收人:{}, 类型:{}",
//                    noticeMessage.getBizId(), noticeMessage.getReceiverId(), noticeMessage.getType());
//            switch (noticeMessage.getType()) {
//                case "待接受":
//                    pushService.sendAppPush(
//                            noticeMessage.getReceiverId(), // 接收人ID
//                            "账本邀请通知", // 推送标题
//                            noticeMessage.getContent());
//                    pushService.sendInnerMessage(noticeMessage.getReceiverId(), noticeMessage.getContent());
//                case "已接受":
//                    pushService.sendInnerMessage(noticeMessage.getReceiverId(), noticeMessage.getContent());
//                case "已拒绝":
//                    pushService.sendInnerMessage(noticeMessage.getReceiverId(), noticeMessage.getContent());
//                default:
//                    log.warn("未知的通知类型，bizId:{}", noticeMessage.getBizId());
//            }
//            pushService.sendInnerMessage(noticeMessage.getReceiverId(), noticeMessage.getContent());
//            channel.basicAck(deliveryTag, false);
//        }catch (Exception e){
//            log.error("通知消息处理失败，bizId:{}", noticeMessage.getBizId(), e);
//            if (isRetryableException(e)){
//                channel.basicNack(deliveryTag,false,true);
//                log.info("通知消息将重试，bizId:{}", noticeMessage.getBizId());
//            }else {
//                channel.basicNack(deliveryTag, false, false);
//                log.warn("通知消息无法重试，已拒绝，bizId:{}", noticeMessage.getBizId());
//            }
//        }
//    }
//
//    private boolean isRetryableException(Exception e) {
//        String exceptionMsg = e.getMessage().toLowerCase();
//        return exceptionMsg.contains("timeout") ||
//                exceptionMsg.contains("connection") ||
//                exceptionMsg.contains("service unavailable");
//
//    }
//}
