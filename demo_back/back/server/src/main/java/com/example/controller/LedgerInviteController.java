package com.example.controller;

import com.example.dto.SendInviteRequestDTO;
import com.example.entity.LedgerInvite;
import com.example.result.Result;
import com.example.service.LedgerInviteService;
import com.example.vo.LedgerInviteVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/invite")
@Tag(name="邀请接口",description = "邀请接口")
public class LedgerInviteController {

    @Autowired
    private LedgerInviteService ledgerInviteService;

    @PostMapping("/send")
    @Operation(summary = "发送邀请")
    public Result<LedgerInvite> sendInvite(@RequestBody SendInviteRequestDTO sendInviteRequestDTO){
        log.info("sendInvite:{}", sendInviteRequestDTO);
        LedgerInvite vo = ledgerInviteService.sendInvite(sendInviteRequestDTO);
        return Result.success(vo,"发送邀请成功");
    }

    @Operation(summary = "接受邀请")
    @PostMapping("/accept/{inviteId}")
    public Result<Void> acceptInvite(@PathVariable Long inviteId) {
        ledgerInviteService.acceptInvite(inviteId);
        return Result.success();
    }

    @Operation(summary = "拒绝邀请")
    @PostMapping("/reject/{inviteId}")
    public Result<Void> rejectInvite(@PathVariable Long inviteId){
        ledgerInviteService.rejectInvite(inviteId);
        return Result.success();
    }

    @Operation(summary = "查询待处理的邀请")
    @GetMapping("/pending")
    public Result<List<LedgerInvite>> pending(){
        List<LedgerInvite> list = ledgerInviteService.getPendingInvites();
        return Result.success(list);
    }

}
