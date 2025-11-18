package com.example.mapper;
import com.example.dto.CategoryDTO;
import com.example.entity.Category;
import com.example.entity.UserBill;
import com.example.vo.CategoryVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserCategoryMapper {

    //根据类型查询分类
    List<Category> queryCategoryType(Integer type);

    //新增分类
    void insertCategory(Category category);

    //根据分类类型和分类名查询分类
    Category queryCategory(CategoryDTO categoryDTO);

    //根据分类类型和id查询所有分类
    List<CategoryVO> queryCategoryByType(Long userId, Integer type);

    //删除分类
    void deleteCategoriesBatch(List<Long> ids, Long userId);
}
