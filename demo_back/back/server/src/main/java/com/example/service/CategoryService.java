package com.example.service;

import com.example.dto.CategoryDTO;
import com.example.dto.CategoryDeleteDTO;
import com.example.entity.Category;
import com.example.vo.CategoryVO;

import java.util.List;

public interface CategoryService {

    //根据类型查询分类
    List<Category> queryTypeCategory(Integer type);

    //添加分类
    void addCategory(CategoryDTO categoryDTO);

    //根据分类名和类型查询分类
    Category queryCategory(CategoryDTO categoryDTO);

    //根据id和分类类型查询所有分类名
    List<CategoryVO> queryCategoryByType(Long userId , Integer type);

    //删除分类
    void deleteCategory(CategoryDeleteDTO categoryDeleteDTO);

    //修改账单分类
    void updateCategory(Long categoryId, List<Long> billIds);

}
