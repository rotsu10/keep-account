package com.example.mapper;

import com.example.entity.Participant;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ParticipantMapper {

    //查询账单参与者
    List<Participant> queryBillParticipant(Long billId);

    //查询账单参与者是否存在
    Integer countParticipant(Long billId, Long participantId);

    //添加账单参与者
    void add(Participant participant);
}
