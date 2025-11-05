package com.example.mapper;
import com.example.dto.RecordQueryDTO;
import com.example.entity.UserBill;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserBillMapper {

    //插入账单
    void insertBill(UserBill userBill);

    //根据时间分页查询数据
    Page<UserBill> queryPageDate(RecordQueryDTO recordQueryDTO);
}
