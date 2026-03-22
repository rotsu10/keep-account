package com.example.controller;

                                                                                                                                                                   import com.example.dto.AddParticipantsDTO;
import com.example.entity.Participant;
import com.example.result.Result;
import com.example.service.ParticipantService;
                                                                                                                                                                   import com.example.vo.ParticipantVO;
                                                                                                                                                                   import com.example.vo.UserVO;
                                                                                                                                                                   import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/participant")
@Tag(name="账单参与者",description = "账单参与者")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @GetMapping("/queryBillParticipant/{billId}")
    @Operation(summary = "查询账单参与者")
    public Result<List<ParticipantVO>> queryBillParticipant(@PathVariable Long billId){
        log.info("queryBillParticipant:{}",billId);
        List<ParticipantVO> vo = participantService.queryBillParticipant(billId);
        return Result.success(vo);
    }

    @PostMapping("/addParticipant")
    @Operation(summary = "添加账单参与者")
    public Result<Void> addParticipant(@RequestBody AddParticipantsDTO participant){
        log.info("addParticipant:{}",participant);
        participantService.addParticipant(participant);
        return Result.success();
    }

    //查询剩余账本参与者
    @GetMapping("/getRemanentUser")
    @Operation(summary = "查询剩余账单参与者")
    public Result<List<UserVO>> getRemanentUser(@RequestParam Long billId){
        log.info("getRemanentUser:{}", billId);
        return participantService.getRemanentUser(billId);
    }
}
