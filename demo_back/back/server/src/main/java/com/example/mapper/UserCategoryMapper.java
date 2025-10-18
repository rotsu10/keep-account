package com.example.mapper;
import com.example.entity.UserBill;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserCategoryMapper {

    //查询分类类型
    Integer queryCategoryType(UserBill userBill);
}
