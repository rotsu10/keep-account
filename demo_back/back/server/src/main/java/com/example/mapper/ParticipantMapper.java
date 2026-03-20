package com.example.mapper;

import com.example.entity.Participant;
import com.example.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ParticipantMapper {

    //查询账本参与者
    List<Participant> queryBillParticipant(Long billId);
}
