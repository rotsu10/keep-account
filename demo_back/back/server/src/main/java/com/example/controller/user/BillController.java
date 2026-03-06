package com.example.controller.user;


import com.example.annotation.CheckLedgerExist;
import com.example.context.BaseContext;
import com.example.dto.*;
import com.example.entity.DailyCost;
import com.example.entity.UserBill;
import com.example.result.PageResult;
import com.example.result.Result;
import com.example.service.BillService;
import com.example.vo.BillStatisticsVO;
import com.example.vo.CategoryStatisticsVO;
import com.example.vo.StatisticsQueryVO;
import com.example.vo.UserBillVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/bill")
@Tag(name="账单接口",description = "账单相关接口")
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping("/addBill")
    @Operation(summary = "添加账单")
    @CheckLedgerExist
    public Result addBill(@RequestBody UserBillDTO userBillDTO){
        log.info("添加账单：{}", userBillDTO);
        billService.addBill(userBillDTO);
        return Result.success();
    }

    //根据时间查询账单
    @Operation(summary = "根据时间查询账单")
    @CheckLedgerExist
    @PostMapping("/queryRecordByDate")
    public Result<PageResult<UserBill>> queryPageDate(@RequestBody RecordQueryDTO recordQueryDTO){
        log.info("查询{}账单", recordQueryDTO);
        recordQueryDTO.userId = BaseContext.getCurrentId();
        PageResult<UserBill> pageResult = billService.queryPageDate(recordQueryDTO);
        log.info("pageResult:{}", pageResult);
        return Result.success(pageResult);
    }

    //根据账单id查询账单详情
    @CheckLedgerExist
    @Operation(summary = "根据账单id查询账单详情")
    @GetMapping("/queryBillDetail")
    public Result<UserBillVO> queryBillDetail(@RequestParam("billId") Long billId){
        log.info("账单为id:{}",billId);
        UserBillVO userBillVO = billService.queryBillDetail(billId);
        log.info("账单:{}",userBillVO);
        return Result.success(userBillVO);
    }

    @CheckLedgerExist
    @Operation(summary = "根据日期和类型统计账单和")
    @PostMapping("/statisticsQuery")
    public Result<StatisticsQueryVO> statisticsQuery(@RequestBody TimeDTO timeDTO){
        log.info("根据日期和类型统计账单和：{}",timeDTO);
        StatisticsQueryVO statisticsQueryVO  = billService.statisticsQuery(timeDTO);
        log.info("查询收入和支出：{}",statisticsQueryVO);
        return Result.success(statisticsQueryVO);
    }

    //查询每天花费
    @CheckLedgerExist
    @Operation(summary = "查询每天花费")
    @GetMapping("/queryDailyCosts")
    public Result<List<DailyCost>> queryDailyCosts(){
        List<DailyCost> dailyCostsList = billService.queryDailyCosts();
        return Result.success(dailyCostsList);
    }

    //根据日期和类型统计账单
    @CheckLedgerExist
    @Operation(summary = "根据日期和类型统计账单")
    @PostMapping("/categoryStatistics")
    public Result<List<CategoryStatisticsVO>> categoryStatistics(@RequestBody TimeDTO timeDTO){
        log.info("根据日期和类型统计账单：{}", timeDTO);
        List<CategoryStatisticsVO> list = billService.categoryStatistics(timeDTO.getType(), timeDTO.getTimeValue(), timeDTO.getTimeType());
        log.info("list:{}", list);
        return Result.success(list);
    }

    //删除账单
    @CheckLedgerExist
    @Operation(summary = "删除账单")
    @DeleteMapping("/deleteBill")
    public Result deleteBill(@RequestBody BillDeleteDTO billDeleteDTO){
        log.info("删除账单{}",  billDeleteDTO);
        billService.deleteBill(billDeleteDTO);
        return Result.success();
    }

    //根据分类id查询账单
    @CheckLedgerExist
    @Operation(summary = "根据分类id查询账单")
    @GetMapping("getBillByCategoryIds")
    public Result<List<UserBillDTO>> getBillByCategoryIds(@RequestParam List<Long> categoryIds){
        List<UserBillDTO> list = billService.getBillByCategoryIds(categoryIds);
        return Result.success(list);
    }

    //更新修改账单
    @CheckLedgerExist
    @Operation(summary = "更新修改账单")
    @PostMapping("/updateBill")
    public Result<UserBillVO> updateBill(@RequestBody UserBillDTO userBillDTO){
        log.info("更新修改账单:{}",userBillDTO);
        UserBillVO vo = billService.updateBill(userBillDTO);
        return Result.success(vo);
    }

    //根据年月日查询统计查询每个分类账单和
    @CheckLedgerExist
    @Operation(summary = "根据年月日查询统计查询每个分类账单和")
    @PostMapping("/getCategorySum")
    public Result<List<CategoryStatisticsVO>> getCategorySum(@RequestBody TimeDTO timeDTO){
        log.info("根据年月日查询统计查询每个分类账单和:{}", timeDTO);
        List<CategoryStatisticsVO> list= billService.getCategorySum(timeDTO);
        log.info("list:{}", list);
        return Result.success(list);
    }

    //更新账单
    @CheckLedgerExist
    @PostMapping("/updateDetail")
    @Operation(summary = "更新账单")
    public Result updateDetail(@RequestBody UserBillDTO userBillDTO){
        log.info("userBillDTO:{}",userBillDTO);
        UserBillVO userBillVO = billService.updateBill(userBillDTO);
        log.info("userBillVO:{}",userBillVO);
        return Result.success(userBillVO);
    }

    //根据年月日统计所有账单  折线图 日期+sum
    @CheckLedgerExist
    @PostMapping("/getSumByDate")
    @Operation(summary = "根据年月日统计所有账单")
    public Result<List<BillStatisticsVO>> getSumByDate(@RequestBody TimeDTO timeDTO){
        log.info("根据年月日统计所有账单getSumByDate:{}", timeDTO);
        List<BillStatisticsVO> list = billService.getSumByDate(timeDTO);
        log.info("根据年月日统计所有账单list:{}", list);
        return Result.success(list);
    }

    //根据日期类型查询账单分页列表
    @CheckLedgerExist
    @PostMapping("/ListChart")
    @Operation(summary = "根据日期类型查询账单分页列表")
    public Result<PageResult<UserBill>> ListChart(@RequestBody ListRecordPageDTO listRecordPageDTO){
        log.info("根据日期类型查询账单分页列表:{}",listRecordPageDTO);
        PageResult<UserBill> userBillList =  billService.queryListChart(listRecordPageDTO);
        log.info("根据日期类型查询账单分页列表:{}",userBillList);
        return Result.success(userBillList);
    }
}
