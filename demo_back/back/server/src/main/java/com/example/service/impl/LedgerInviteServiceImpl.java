package com.example.service.impl;

import com.example.constant.MessageConstant;
import com.example.context.BaseContext;
import com.example.dto.SendInviteRequestDTO;
import com.example.entity.LedgerInvite;
import com.example.entity.Member;
import com.example.entity.NoticeMessage;
import com.example.entity.User;
import com.example.enums.InviteStatusEnum;
import com.example.exception.InviteException;
import com.example.exception.LedgerException;
import com.example.exception.UserNotFoundException;
import com.example.mapper.LedgerInviteMapper;
import com.example.mapper.LedgerMapper;
import com.example.mapper.UserMapper;
import com.example.service.LedgerInviteService;
import com.example.utils.NoticeProducer;
import com.example.vo.LedgerVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
public class LedgerInviteServiceImpl implements LedgerInviteService {

    @Autowired
    private LedgerInviteMapper ledgerInviteMapper;
    @Autowired
    private LedgerMapper ledgerMapper;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private NoticeProducer noticeProducer;

    @Override
    @Transactional(rollbackFor = {InviteException.class, UserNotFoundException.class, LedgerException.class})
    public LedgerInvite sendInvite(SendInviteRequestDTO dto) {
        Long inviterId = BaseContext.getCurrentId();
        Long ledgerId = dto.getLedgerId();
        Long inviteeId = dto.getInviteeId();

        // 1. 检查账本是否存在
        LedgerVO ledgervo = ledgerMapper.getLedgerDetail(ledgerId,inviterId);
        if(ledgervo==null){
            throw new InviteException(MessageConstant.LEDGER_NOT_EXISTS);
        }
        //2. 检查是否为账本创建者
        Long creatorId = ledgerMapper.getLedgerCreatorId(ledgerId);
        if (!creatorId.equals(inviterId)){
            throw new InviteException(MessageConstant.NOT_PERMISSION);
        }
        // 3. 检查被邀请人是否存在
        User validUser = userMapper.isValidUser(inviteeId,dto.getInviteeName(),dto.getPhone());
        if(validUser==null){
            throw new UserNotFoundException(MessageConstant.USER_NOT_FOUND);
        }
        inviteeId = validUser.getId();
        // 4. 检查是否已经是账本成员
        Integer i = ledgerMapper.countByLedgerIdAndUserId(ledgerId, inviteeId);
        if(i >0 ){
            throw new LedgerException(MessageConstant.ALREADY_EXISTS_PARTICIPANT);
        }

        // 5. 检查是否已有待处理的邀请
        LedgerInvite existingInvite = ledgerInviteMapper.findByLedgerAndUsers(ledgerId,inviteeId);
        if(existingInvite != null){
            throw new InviteException(MessageConstant.ALREADY_SEND);
        }
        //6.创建邀请记录
        LedgerInvite invite = LedgerInvite.builder()
                .inviterId(inviterId)
                .inviteeId(inviteeId)
                .ledgerId(ledgerId)
                .status(0)
                .build();

        ledgerInviteMapper.insert(invite);
        Long id = invite.getId();
        //7.发送邀请
        try {
            NoticeMessage noticeMessage = NoticeMessage.builder()
                    .receiverId(inviteeId)
                    .type(InviteStatusEnum.getByCode(0).getDesc())
                    .bizId(id)
                    .build();
            noticeMessage.setContent(String.format("用户 %s 邀请您加入账本《%s》", inviterId, ledgervo.getLedgerName()));
            noticeProducer.sendNotice(noticeMessage);
        } catch (Exception e) {
            log.error("发送邀请通知失败", e);
            // 通知发送失败不影响邀请记录的创建
            throw new InviteException(e.getMessage());
        }
        return invite;
    }

    @Override
    public void acceptInvite(Long inviteId) {
        Long userId = BaseContext.getCurrentId();
        LedgerInvite invite = ledgerInviteMapper.getInviteDetail(inviteId);

        //账本不存在
        if (invite == null) {
            throw new InviteException(MessageConstant.LEDGER_NOT_EXISTS);
        }

        //权限校验 本人操作
        if (!invite.getInviteeId().equals(userId)) {
            throw new InviteException(MessageConstant.NOT_PERMISSION);
        }

        //已经处理
        if (invite.getStatus() != 0) {
            throw new InviteException(MessageConstant.ALREADY_HANDLE);
        }

        //检查是否为成员
        Integer i = ledgerMapper.countByLedgerIdAndUserId(invite.getLedgerId(), userId);
        if (i != null) {
            // 如果已经是成员，直接更新邀请状态
            ledgerInviteMapper.updateStatus(inviteId,1);
            return;
        }

        //4.添加成员
        Member member = Member.builder()
                .userId(userId)
                .ledgerId(invite.getLedgerId())
                .createTime(LocalDateTime.now())
                .isDefault(0)
                .isOwner(0)
                .build();

        ledgerMapper.insert(member);
        //更新invite表status
        ledgerInviteMapper.updateStatus(inviteId,1);
        try {
            String username = userMapper.getUserInfo(userId).getUsername();
            NoticeMessage noticeMessage = NoticeMessage.builder()
                    .receiverId(userId)
                    .content(String.format("用户 %s 已接受您的账本邀请", username))
                    .type(InviteStatusEnum.getByCode(1).getDesc())
                    .bizId(inviteId)
                    .build();
            noticeProducer.sendNotice(noticeMessage);
        } catch (Exception e) {
            log.error("发送接受邀请通知失败", e);
        }
    }
}
