package com.example.controller.user;

import com.example.constant.JwtClaimsConstant;
import com.example.context.BaseContext;
import com.example.dto.LedgerDTO;
import com.example.dto.UserLoginDTO;
import com.example.entity.User;
import com.example.result.Result;
import com.example.service.LedgerService;
import com.example.utils.JwtUtil;
import com.example.vo.LedgerVO;
import com.example.vo.UserLoginVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/ledger")
public class LedgerController {

    @Autowired
    private LedgerService ledgerService;


    //添加账本
    @PostMapping("/addLedger")
    public Result addLedger(@RequestBody LedgerDTO ledgerDTO) {
        log.info("ledgerDTO:{}", ledgerDTO);
        ledgerService.add(ledgerDTO);
        return Result.success();
    }
}
