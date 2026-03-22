package com.example.service.impl;

import com.example.constant.MessageConstant;
import com.example.context.BaseContext;
import com.example.dto.AddParticipantsDTO;
import com.example.entity.Participant;
import com.example.entity.UserBill;
import com.example.exception.BillException;
import com.example.mapper.LedgerMapper;
import com.example.mapper.ParticipantMapper;
import com.example.mapper.UserBillMapper;
import com.example.mapper.UserMapper;
import com.example.result.Result;
import com.example.service.ParticipantService;
import com.example.vo.ParticipantVO;
import com.example.vo.UserVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private ParticipantMapper participantMapper;

    @Autowired
    private UserBillMapper userBillMapper;
    @Autowired
    private LedgerMapper ledgerMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public List<ParticipantVO> queryBillParticipant(Long billId) {
        // 1. 校验账单存在性
        UserBill bill = userBillMapper.getBillById(billId);
        if (bill == null) {
            throw new BillException(MessageConstant.BILL_NOT_EXISTS);
        }

        // 2. 查询参与者列表
        List<Participant> participantList = participantMapper.queryBillParticipant(billId);

        // 3. 简化转换：使用 Stream + 泛型，避免手动循环和原始类型
        return participantList.stream()
                .map(participant -> {
                    ParticipantVO vo = new ParticipantVO();
                    vo.setParticipantName(userMapper.getUserInfo(participant.getParticipantId()).getUsername());
                    BeanUtils.copyProperties(participant, vo);
                    return vo;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void addParticipant(AddParticipantsDTO participant) {
        Long ledgerId = BaseContext.getLedgerId();
        List<Long> participantIds = participant.getParticipantIds();
        Long billId = participant.getBillId();

        // 先查询一次账单，避免循环内重复查询（性能优化+减少数据库交互）
        UserBill bill = userBillMapper.getBillById(billId);
        if (bill == null) {
            throw new BillException(MessageConstant.BILL_NOT_EXISTS);
        }

        for (Long participantId : participantIds) {
            // 1. 校验参与者是否已存在
            Integer count = participantMapper.countParticipant(billId, participantId);
            if (count > 0) {
                throw new BillException(MessageConstant.PARTICIPANT_EXISTS);
            }

            // 2. 校验分摊金额
            if (participant.getShareAmount() != null) {
                if (participant.getShareAmount().compareTo(bill.getAmount()) >= 0) {
                    throw new BillException(MessageConstant.AMOUNT_ERROR);
                }
            }

            // 3. 为当前参与者创建新对象并赋值（核心修复）
            Participant newParticipant = new Participant();
            newParticipant.setBillId(billId);
            newParticipant.setParticipantId(participantId); // 绑定当前循环的参与者ID
            newParticipant.setShareAmount(participant.getShareAmount());
            // 4. 插入当前参与者数据
            participantMapper.add(newParticipant);
        }
    }

    @Override
    public Result<List<UserVO>> getRemanentUser(Long billId) {

        Long ledgerId = BaseContext.getLedgerId();

        // 所有账本用户
        List<UserVO> allLedgerUser = ledgerMapper.getAllLedgerUser(ledgerId);
        allLedgerUser = allLedgerUser == null ? new ArrayList<>() : allLedgerUser;
        // 该账单已选参与者
        List<Participant> participants = participantMapper.queryBillParticipant(billId);
        participants = participants == null ? new ArrayList<>() : participants;

        // 3. 提取已选参与者的ID集合（便于快速判断）
        List<Long> selectedParticipantIds = participants.stream()
                .map(Participant::getParticipantId) // 取参与者ID
                .filter(Objects::nonNull) // 过滤 null ID
                .collect(Collectors.toList());

        // 4. 筛选：账本用户中不在已选参与者列表中的用户（差集逻辑）
        List<UserVO> remanentUserList = allLedgerUser.stream()
                .filter(userVO -> {
                    // 排除 null 的 UserVO 和 null 的用户ID
                    if (userVO == null || userVO.getId() == null) {
                        return false;
                    }
                    // 核心：用户ID不在已选参与者ID列表中
                    return !selectedParticipantIds.contains(userVO.getId());
                })
                .collect(Collectors.toList());

        // 5. 返回结果（成功响应）
        return Result.success(remanentUserList);
    }
}
