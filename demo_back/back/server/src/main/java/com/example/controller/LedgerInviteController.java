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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/invite")
@Tag(name="邀请接口",description = "邀请接口")
public class LedgerInviteController {
    @Autowired
    private LedgerInviteService ledgerInviteService;

    @PostMapping
    @Operation(summary = "发送邀请")
    public Result<LedgerInvite> sendInvite(@RequestBody SendInviteRequestDTO sendInviteRequestDTO){
        log.info("sendInvite:{}", sendInviteRequestDTO);
        LedgerInvite vo = ledgerInviteService.sendInvite(sendInviteRequestDTO);
        return Result.success(vo);
    }
}
