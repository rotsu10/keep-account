package com.example.service.impl;

import com.example.entity.*;
import com.example.result.Result;
import com.example.vo.*;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.example.constant.MessageConstant;
import com.example.context.BaseContext;
import com.example.dto.*;
import com.example.exception.AccountFoundException;
import com.example.exception.CategoryException;
import com.example.mapper.UserBillMapper;
import com.example.mapper.UserCategoryMapper;
import com.example.mapper.UserMapper;
import com.example.result.PageResult;
import com.example.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.exception.AccountNotFoundException;
import com.example.exception.PasswordErrorException;
import org.springframework.util.DigestUtils;

import javax.security.auth.login.AccountException;
import javax.smartcardio.CardException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserBillMapper userBillMapper;

    @Autowired
    private UserCategoryMapper userCategoryMapper;

    @Override
    public User login(UserLoginDTO userLoginDTO) {
        log.info("用户登录：{}", userLoginDTO);
        String username = userLoginDTO.getUsername();
        String password = userLoginDTO.getPassword();

        //1.根据用户名查询数据库中的数据
        User user = userMapper.getByUsername(username);

        if (user == null) {
            //账号不存在
            throw new AccountNotFoundException(MessageConstant.ACCOUNT_NOT_FOUND);
        }
        password = DigestUtils.md5DigestAsHex(password.getBytes());
        if (!password.equals(user.getPassword())){
            //密码错误
            throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);
        }
        return user;
    }

    @Override
    public void register(UserRegisterDTO userRegisterDTO) {
        log.info("用户注册{}", userRegisterDTO);
        // 1. 检查用户名是否存在
        User dbUserByUsername = userMapper.queryByUsername(userRegisterDTO.getUsername());
        if (dbUserByUsername != null) {
            throw new AccountFoundException(MessageConstant.ACCOUNT_FOUND);
        }

        // 2. 检查手机号是否存在
        User dbUserByPhone = userMapper.queryByPhone(userRegisterDTO.getPhone());
        if (dbUserByPhone != null) {
            throw new AccountFoundException(MessageConstant.PHONE_EXISTS);
        }

        // 3. 都不存在，才插入
        User user = new User();
        BeanUtils.copyProperties(userRegisterDTO, user);
        user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        user.setCreatedTime(LocalDateTime.now());
        int rows = userMapper.insert(user);

        if (rows > 0) {
            log.info("用户注册成功: {}", userRegisterDTO.getUsername());
        }
    }

    @Override
    public void addBill(UserBillDTO userBillDTO) {
        UserBill userBill = new UserBill();
        BeanUtils.copyProperties(userBillDTO, userBill);

        userBill.setCreateTime(LocalDateTime.now());
        userBill.setUserId(BaseContext.getCurrentId());
        log.info("查询type的条件：userId={}, categoryId={}",
                userBill.getUserId(),  // 应该是10（从BaseContext获取的）
                userBill.getCategoryId());
        log.info("当前用户id: {}", userBill.getUserId());
        userBillMapper.insertBill(userBill);
    }

    @Override
    public List<Category> queryTypeCategory(Integer type) {
        return userCategoryMapper.queryCategoryType(type);
    }

    @Override
    public void addCategory(CategoryDTO categoryDTO) {
        //添加分类前，需检查该类型是否有该分类
        Category queryCategory = userCategoryMapper.queryCategory(categoryDTO);
        if(queryCategory != null){
            throw new CategoryException(MessageConstant.CATEGORY_EXISTS);
        }

        Category category = new Category();
        BeanUtils.copyProperties(categoryDTO, category);
        category.setUserId(BaseContext.getCurrentId());
        category.setCreateTime(LocalDateTime.now());
        userCategoryMapper.insertCategory(category);
    }

    @Override
    public Category queryCategory(CategoryDTO categoryDTO) {
        categoryDTO.setUserId(BaseContext.getCurrentId());
        Category category = userCategoryMapper.queryCategory(categoryDTO);
        if(category == null){
            throw new CategoryException(MessageConstant.CATEGORY_NOT_EXISTS);
        }else{
            return category;
        }
    }

    @Override
    public LocalDateTime queryCreateTime(Long id) {
        return userMapper.queryCreateTime(id);
    }

    @Override
    public PageResult<UserBill> queryPageDate(RecordQueryDTO recordQueryDTO) {
        //设置分页参数
        PageHelper.startPage(recordQueryDTO.getPage(),recordQueryDTO.getPageSize());
        //查询数据
        Page<UserBill> page = userBillMapper.queryPageDate(recordQueryDTO);
        long total = page.getTotal();
        List<UserBill> records = page.getResult();
        return new PageResult<>(total,records);
    }

    @Override
    public List<CategoryVO> queryCategoryByType(Long userId ,Integer type) {
        List<CategoryVO> list = userCategoryMapper.queryCategoryByType(userId,type);
        return list;
    }

    @Override
    public UserBillVO queryBillDetail(Long billId) {
        Long id = BaseContext.getCurrentId();
        UserBill userBill = userBillMapper.selectBillDetail(id,billId);
        log.info("UserBill:{}",userBill);
        UserBillVO userBillVO = new UserBillVO();
        BeanUtils.copyProperties(userBill,userBillVO);
        log.info("UserBillVO:{}",userBillVO);
        return userBillVO;
    }

    @Override
    public StatisticsQueryVO statisticsQuery(StatisticsQueryDTO statisticsQueryDTO) {
        Integer year = statisticsQueryDTO.getYear();
        Integer month = statisticsQueryDTO.getMonth();
        Integer day = statisticsQueryDTO.getDay();
        Long userId = BaseContext.getCurrentId();
        log.info("year:{}  month:{} day:{} userId:{}",year,month,day,userId);
        SumStatistics sum = userBillMapper.getSumAll(year, month, day,userId);
        log.info("userBill:{}",sum);
        // 1. 初始化默认值
        BigDecimal income = BigDecimal.ZERO;
        BigDecimal expense = BigDecimal.ZERO;
        BigDecimal transfer = BigDecimal.ZERO;

        // 2. 如果 sum 不为 null，再从 sum 中获取值
        if (sum != null) {
            income = sum.getIncome();
            expense = sum.getExpense();
            transfer = sum.getTransfer();
        }

        // 3. 返回结果
        return new StatisticsQueryVO(income, expense, transfer);
    }

    @Override
    public List<DailyCost> queryDailyCosts(Long id) {
        List<DailyCost> DailyCost= userBillMapper.queryDailyCosts(id);
        return DailyCost;
    }

    @Override
    public UserLoginVO getUserInfo(Long userId) {
        return userMapper.getUserInfo(userId);
    }

    @Override
    public List<CategoryStatisticsVO> categoryStatistics(Long type, String timeValue,String timeType) {
        Long id = BaseContext.getCurrentId();
        List<CategoryStatisticsVO> list = userBillMapper.categoryStatistics( id ,type,timeValue,timeType);
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
            List<Long> billIdsToMove = userBillMapper.getBillIdsByCategoryIds(categoryIds, userId);
            updateBill(targetCategoryId,billIdsToMove);
        } else if ("delete".equals(strategy)) {
            // 删除分类下的所有账单
            userBillMapper.deleteBillByCategoryIds(categoryIds);
        }else{
            throw new CategoryException(MessageConstant.STRATEGY_ERROR);
        }
        //删除分类
        userCategoryMapper.deleteCategoriesBatch(categoryIds,userId);
    }

    @Override
    public void deleteBill(List<Long> billIds) {
        Long userId = BaseContext.getCurrentId();
        userBillMapper.deleteBill(billIds,userId);
    }

    @Override
    public void updateBill(Long categoryId, List<Long> billIds) {
        userBillMapper.updateBill(categoryId,billIds);
    }
}

