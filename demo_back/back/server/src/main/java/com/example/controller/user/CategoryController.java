package com.example.controller.user;


import com.example.context.BaseContext;
import com.example.dto.CategoryDTO;
import com.example.dto.CategoryDeleteDTO;
import com.example.entity.Category;
import com.example.result.Result;
import com.example.service.CategoryService;
import com.example.vo.CategoryVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/category")
@Tag(name="分类接口",description = "分类相关接口")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/addCategory")
    @Operation(summary = "添加分类")
    public Result addCategory(@RequestBody CategoryDTO categoryDTO){
        log.info("添加分类：{}", categoryDTO);
        categoryService.addCategory(categoryDTO);
        return Result.success();
    }

    @PostMapping("/queryCategory")
    @Operation(summary = "根据分类名和类型查询分类")
    public Result<CategoryVO> queryCategory(@RequestBody CategoryDTO categoryDTO){
        log.info("根据分类名和类型查询分类{}", categoryDTO);
        Category category = categoryService.queryCategory(categoryDTO);
        CategoryVO categoryVO = new CategoryVO();
        BeanUtils.copyProperties(category,categoryVO);
        return Result.success(categoryVO);
    }

    @Operation(summary = "根据类型查询分类")
    @GetMapping("/queryTypeCategory")
    public Result<List<Category>> queryTypeCategory(Integer type){
        log.info("根据类型查询分类：{}", type);
        List<Category> categoryList = categoryService.queryTypeCategory(type);
        log.info("categoryList:{}",categoryList);
        return Result.success(categoryList);
    }

    //根据id和分类类型查询所有分类名
    @Operation(summary = "根据id和分类类型查询所有分类名")
    @GetMapping("/queryCategoryByType")
    public Result<List<CategoryVO>> queryCategoryByType(@RequestParam("type") Integer type){
        Long userId = BaseContext.getCurrentId();
        log.info("id:{},type:{}",userId,type);
        List<CategoryVO> list= categoryService.queryCategoryByType(userId,type);
        log.info("查询所有的分类：{}",list);
        return Result.success(list);
    }

    //删除分类
    @Operation(summary = "删除分类")
    @DeleteMapping("/deleteCategory")
    public Result deleteCategory(@RequestBody CategoryDeleteDTO categoryDeleteDTO){
        log.info("删除分类：{}", categoryDeleteDTO);
        categoryService.deleteCategory(categoryDeleteDTO);
        return Result.success();
    }

    //改变账单分类
    @Operation(summary = "改变账单分类")
    @PatchMapping("updateCategory/{billIds}")
    public Result updateCategory(@RequestParam Long categoryId,@PathVariable List<Long> billIds){
        log.info("改变账单分类：{},{}",categoryId,billIds);
        categoryService.updateCategory(categoryId,billIds);
        return Result.success();
    }
}
