package com.example.service;

import com.example.entity.Participant;

import java.util.List;

public interface ParticipantService {
    //查询账单参与者
    List<Participant> queryBillParticipant(Long billId);

    //添加账单参与者
    void addParticipant(Participant participant);
}
