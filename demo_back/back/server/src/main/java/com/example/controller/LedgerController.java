package com.example.controller;

import com.example.annotation.CheckLedgerExist;
import com.example.constant.MessageConstant;
import com.example.dto.AddLedgerUserDTO;
import com.example.dto.LedgerDTO;
import com.example.exception.UserNotFoundException;
import com.example.result.Result;
import com.example.service.LedgerService;
import com.example.service.UserService;
import com.example.vo.LedgerVO;
import com.example.vo.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
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
    @Autowired
    private UserService userService;

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
    @GetMapping("/getAllLedger")
    @Operation(summary = "获取所有账本")
    public Result<List<LedgerVO>> getAllLedger() {
        List<LedgerVO> list= ledgerService.getAllLedger();
        return Result.success(list);
    }

    //删除账本
    @DeleteMapping("/deleteLedger")
    @Operation(summary = "删除账本")
    public Result deleteLedger(@RequestParam Long ledgerId){
        ledgerService.deleteLedger(ledgerId);
        return Result.success();
    }

    //账本添加参与者 （添加用户-账本表中数据）
    @PostMapping("/addLedgerUser")
    @Operation(summary = "添加账本参与者")
    public Result addLedgerUser(@RequestBody AddLedgerUserDTO addLedgerUserDTO) {
        log.info("addLedgerUser:{}", addLedgerUserDTO);
        if(addLedgerUserDTO.getLedgerId()==null && addLedgerUserDTO.getUserId()==null){
            throw new UserNotFoundException(MessageConstant.USER_NOT_FOUND);
        }
        UserVO userVO = userService.isValidUser(
                addLedgerUserDTO.getUserId(),
                addLedgerUserDTO.getUserName(),
                addLedgerUserDTO.getPhone()
        );
        userVO.setLedgerId(addLedgerUserDTO.getLedgerId());
        ledgerService.addLedgerUser(userVO);
        return Result.success();
    }

    //根据账本id查询账本详情
    @GetMapping("/LedgerDetailById")
    @Operation(summary = "账本id查询账本详情")
    @CheckLedgerExist(message = "根据账本id查询账本详情")
    public Result<LedgerVO> ledgerDetailById(@RequestParam Long ledgerId){
        log.info("ledgerDetailById:{}", ledgerId);
        LedgerVO ledgerVO = ledgerService.getLedgerDetail(ledgerId);
        return Result.success(ledgerVO);
    }

    //切换默认账本
    @PostMapping("/switchLedger")
    @Operation(summary = "切换默认账本")
    public Result switchLedger(Long ledgerId){
        log.info("switchLedger:{}", ledgerId);
        ledgerService.switchLedger(ledgerId);
        return Result.success();
    }

    //查询所有账本参与者
    @GetMapping("/getAllLedgerUser")
    @Operation(summary = "查询所有账本参与者")
    public Result<List<UserVO>> getAllLedgerUser(@RequestParam Long ledgerId){
        log.info("getAllLedgerUser:{}", ledgerId);
        List<UserVO> list = ledgerService.getAllLedgerUser(ledgerId);
        return Result.success(list);
    }
}
