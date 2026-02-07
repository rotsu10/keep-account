package com.example.service.impl;

import com.example.constant.MessageConstant;
import com.example.context.BaseContext;
import com.example.dto.CategoryDTO;
import com.example.dto.CategoryDeleteDTO;
import com.example.entity.Category;
import com.example.exception.CategoryException;
import com.example.mapper.CategoryMapper;
import com.example.mapper.UserBillMapper;
import com.example.service.CategoryService;
import com.example.vo.CategoryVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private UserBillMapper userBillMapper;

    @Override
    public List<Category> queryTypeCategory(Integer type) {
        return categoryMapper.queryCategoryType(type);
    }

    @Override
    public void addCategory(CategoryDTO categoryDTO) {
        //添加分类前，需检查该类型是否有该分类
        Category queryCategory = categoryMapper.queryCategory(categoryDTO);
        if(queryCategory != null){
            throw new CategoryException(MessageConstant.CATEGORY_EXISTS);
        }
        Category category = new Category();
        BeanUtils.copyProperties(categoryDTO, category);
        category.setUserId(BaseContext.getCurrentId());
        category.setCreateTime(LocalDateTime.now());
        categoryMapper.insertCategory(category);
    }

    @Override
    public Category queryCategory(CategoryDTO categoryDTO) {
        categoryDTO.setUserId(BaseContext.getCurrentId());
        Category category = categoryMapper.queryCategory(categoryDTO);
        if(category == null){
            throw new CategoryException(MessageConstant.CATEGORY_NOT_EXISTS);
        }else{
            return category;
        }
    }

    @Override
    public List<CategoryVO> queryCategoryByType(Long userId , Integer type) {
        List<CategoryVO> list = categoryMapper.queryCategoryByType(userId,type);
        return list;
    }

    @Override
    public void deleteCategory(CategoryDeleteDTO categoryDeleteDTO) {
        List<Long> categoryIds = categoryDeleteDTO.getCategoryIds();
        String strategy = categoryDeleteDTO.getStrategy();
        Long userId = BaseContext.getCurrentId();

        //根据策略处理账单
        if ("move".equals(strategy)) {
            //转移该分类下账单
            Long targetCategoryId = categoryDeleteDTO.getTargetCategoryId();
            log.info("转移该分类下账单:{}",targetCategoryId);
            List<Long> billIdsToMove = userBillMapper.getBillIdsByCategoryIds(categoryIds, userId);
            if(billIdsToMove == null || billIdsToMove.isEmpty()){
                throw new CategoryException(MessageConstant.MOVE_BILL_NOT_EXISTS);
            }
            log.info("转移账单列表:{}",billIdsToMove);
            updateCategory(targetCategoryId,billIdsToMove);
        } else if ("delete".equals(strategy)) {
            // 删除分类下的所有账单
            userBillMapper.deleteBillByCategoryIds(categoryIds);
        }else{
            throw new CategoryException(MessageConstant.STRATEGY_ERROR);
        }
        //删除分类
        categoryMapper.deleteCategoriesBatch(categoryIds,userId);
    }

    @Override
    public void updateCategory(Long categoryId, List<Long> billIds) {
        userBillMapper.updateCategory(categoryId,billIds);
    }
}
