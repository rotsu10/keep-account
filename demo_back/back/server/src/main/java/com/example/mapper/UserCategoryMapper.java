package com.example.mapper;
import com.example.entity.Category;
import com.example.entity.UserBill;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserCategoryMapper {

    //根据类型查询分类
    List<Category> queryCategoryType(Integer type);

    //新增分类
    void insertCategory(Category category);
}
