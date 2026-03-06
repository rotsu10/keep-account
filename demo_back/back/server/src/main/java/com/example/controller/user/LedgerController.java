package com.example.controller.user;

import com.example.annotation.CheckLedgerExist;
import com.example.constant.JwtClaimsConstant;
import com.example.context.BaseContext;
import com.example.dto.AddLedgerUserDTO;
import com.example.dto.LedgerDTO;
import com.example.entity.User;
import com.example.mapper.LedgerMapper;
import com.example.result.Result;
import com.example.service.LedgerService;
import com.example.vo.LedgerVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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


    //获取账本相关信息
//    @GetMapping("getLedgerInfo")
//    @Operation(summary = "获取账本")
//    public Result<LedgerVO> getDefaultLedgerID(){
//
//    }
    //获取所有账本
    @GetMapping("getAllLedger")
    @Operation(summary = "获取所有账本")
    public Result<List<LedgerVO>> getAllLedger() {
        List<LedgerVO> list= ledgerService.getAllLedger();
        return Result.success(list);
    }

    //删除账本
    @DeleteMapping("deleteLedger")
    @Operation(summary = "删除账本")
    public Result deleteLedger(@RequestParam Long ledgerId){
        ledgerService.deleteLedger(ledgerId);
        return Result.success();
    }

    //账本添加参与者 （添加用户-账本表中数据）
    @PostMapping("addLedgerUser")
    @Operation(summary = "添加账本参与者")
    public Result<User> addLedgerUser(@RequestBody AddLedgerUserDTO addLedgerUserDTO) {
        log.info("addLedgerUser:{}", addLedgerUserDTO);
        User user = ledgerService.addLedgerUser(addLedgerUserDTO);
        return Result.success(user);
    }

    //根据账本id查询账本详情
    @PostMapping("LedgerDetailById")
    @Operation(summary = "账本id查询账本详情")
    @CheckLedgerExist(message = "根据账本id查询账本详情")
    public Result<LedgerVO> ledgerDetailById(Long ledgerId){
        log.info("ledgerDetailById:{}", ledgerId);
        LedgerVO ledgerVO = ledgerService.getLedgerDetail(ledgerId);
        return Result.success(ledgerVO);
    }
}
