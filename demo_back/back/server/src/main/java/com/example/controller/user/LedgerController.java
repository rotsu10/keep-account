package com.example.controller.user;

import com.example.constant.JwtClaimsConstant;
import com.example.context.BaseContext;
import com.example.dto.LedgerDTO;
import com.example.result.Result;
import com.example.service.LedgerService;
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
@RequestMapping("/ledger")
@Tag(name="账本接口",description = "账本相关接口")
public class LedgerController {

    @Autowired
    private LedgerService ledgerService;

    //添加账本
    @PostMapping("/addLedger")
    @Operation(summary = "添加账本")
    public Result addLedger(@RequestBody LedgerDTO ledgerDTO) {
        log.info("ledgerDTO:{}", ledgerDTO);
        ledgerService.add(ledgerDTO);
        return Result.success();
    }
}
