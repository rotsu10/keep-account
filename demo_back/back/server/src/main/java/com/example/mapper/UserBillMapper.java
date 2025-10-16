package com.example.mapper;
import com.example.entity.UserBill;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserBillMapper {

    //插入账单
    void insertBill(UserBill userBill);

}
