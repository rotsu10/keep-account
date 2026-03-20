package com.example.controller;

import com.example.entity.Participant;
import com.example.result.Result;
import com.example.service.ParticipantService;
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
    public Result<List<Participant>> queryBillParticipant(@PathVariable Long billId){
        log.info("queryBillParticipant:{}",billId);
        List<Participant> vo = participantService.queryBillParticipant(billId);
        return Result.success(vo);
    }

    @PostMapping("/addParticipant")
    @Operation(summary = "添加账单参与者")
    public Result<Void> addParticipant(@RequestBody Participant participant){
        log.info("addParticipant:{}",participant);
        participantService.addParticipant(participant);
        return Result.success();
    }
}
