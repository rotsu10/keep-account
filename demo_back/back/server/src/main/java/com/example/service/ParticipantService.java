package com.example.service;

import com.example.dto.AddParticipantsDTO;
import com.example.entity.Participant;
import com.example.result.Result;
import com.example.vo.ParticipantVO;
import com.example.vo.UserVO;

import java.util.List;

public interface ParticipantService {
    //查询账单参与者
    List<ParticipantVO> queryBillParticipant(Long billId);

    //添加账单参与者
    void addParticipant(AddParticipantsDTO participant);

    //查询剩余的账单参与者
    Result<List<UserVO>> getRemanentUser(Long billId);
}
