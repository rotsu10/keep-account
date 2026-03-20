package com.example.service.impl;

import com.example.constant.MessageConstant;
import com.example.context.BaseContext;
import com.example.entity.Participant;
import com.example.entity.UserBill;
import com.example.exception.BillException;
import com.example.mapper.LedgerMapper;
import com.example.mapper.ParticipantMapper;
import com.example.mapper.UserBillMapper;
import com.example.service.ParticipantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private ParticipantMapper participantMapper;
    @Autowired
    private UserBillMapper userBillMapper;
    @Autowired
    private LedgerMapper ledgerMapper;

    @Override
    public List<Participant> queryBillParticipant(Long billId) {
        UserBill bill =  userBillMapper.getBillById(billId);
        if(bill==null){
            throw new BillException(MessageConstant.BILL_NOT_EXISTS);
        }
        List<Participant> list = participantMapper.queryBillParticipant(billId);
        return list;
    }

    @Override
    public void addParticipant(Participant participant) {
        Long ledgerId = BaseContext.getLedgerId();
        Long participantId = participant.getParticipantId();
        Long billId = participant.getBillId();
        //查询已经加入bill_participant
        UserBill bill = userBillMapper.getBillById(billId);
        Integer count = participantMapper.countParticipant(billId,participantId);
        if (count > 0) {
            throw new BillException(MessageConstant.PARTICIPANT_EXISTS);
        }
        //shareAmount<Amount
        if(participant.getShareAmount()!=null){
            //分摊金额 ≥ 账单总金额
            if(participant.getShareAmount().compareTo(bill.getAmount()) >= 0){
                throw new BillException(MessageConstant.AMOUNT_ERROR);
            }
        }
        participantMapper.add(participant);
    }
}
