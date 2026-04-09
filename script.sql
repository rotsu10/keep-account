create table ledger
(
    id          bigint auto_increment comment '账本ID（自增主键）'
        primary key,
    ledger_name varchar(100)                       not null comment '账本名称（如“家庭账本”“个人账本”）',
    create_time datetime default CURRENT_TIMESTAMP not null comment '账本创建时间'
)
    comment '账本表（存储账本基础信息）';

create index idx_ledger_name
    on ledger (ledger_name);

create table user
(
    id           bigint auto_increment comment '主键'
        primary key,
    username     varchar(32)                        not null comment '用户名',
    password     varchar(64)                        not null comment '密码',
    phone        varchar(11)                        not null comment '手机号',
    created_time datetime default CURRENT_TIMESTAMP null,
    constraint uk_phone
        unique (phone),
    constraint uk_username
        unique (username)
)
    comment '用户表' collate = utf8mb3_bin;

create table category
(
    id          bigint auto_increment comment '分类ID（自增主键）'
        primary key,
    user_id     bigint                             not null comment '关联用户ID（外键，每个用户可自定义自己的分类）',
    ledger_id   bigint                             not null comment '账本ID（归属账本）',
    name        varchar(100)                       not null comment '分类名称（如“餐饮”“工资”）',
    type        tinyint(1)                         not null comment '分类类型（1=收入分类，2=支出分类，3=转账分类）',
    create_time datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    constraint uk_user_type_name
        unique (user_id, type, name, ledger_id),
    constraint fk_category_ledger_id
        foreign key (ledger_id) references ledger (id)
            on delete cascade,
    constraint fk_category_user
        foreign key (user_id) references user (id)
            on delete cascade,
    check (`type` in (1, 2, 3))
)
    comment '收支分类表（支持用户自定义，区分收入/支出分类）';

create index idx_user_id
    on category (user_id);

create index idx_user_type
    on category (user_id, type)
    comment '联合索引：按用户+类型筛选分类';

create table ledger_invite
(
    id          bigint auto_increment comment '邀请ID'
        primary key,
    ledger_id   bigint                             not null comment '账本ID',
    inviter_id  bigint                             not null comment '邀请人ID（A）',
    invitee_id  bigint                             not null comment '被邀请人ID（B）',
    status      tinyint  default 0                 not null comment '邀请状态：0-待接受 1-已接受 2-已拒绝',
    create_time datetime default CURRENT_TIMESTAMP not null comment '邀请时间',
    update_time datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    constraint uk_ledger_inviter_invitee
        unique (ledger_id, inviter_id, invitee_id),
    constraint fk_invite_invitee
        foreign key (invitee_id) references user (id),
    constraint fk_invite_inviter
        foreign key (inviter_id) references user (id),
    constraint fk_invite_ledger
        foreign key (ledger_id) references ledger (id)
)
    comment '账本邀请表';

create table user_bill
(
    id          bigint auto_increment comment '记录ID（对应VO的id）'
        primary key,
    user_id     bigint                          not null comment '关联用户ID（对应VO的user_id，外键关联user表）',
    ledger_id   bigint                          not null comment '账本ID（关联ledger表id）',
    category_id bigint                          not null comment '关联分类ID（对应VO的category_id，外键关联category表）',
    amount      decimal(10, 2) default 0.00     not null comment '账单金额（元）',
    type        tinyint(1)                      not null comment '收支类型（对应VO的type，1=收入，2=支出）',
    bill_type   varchar(20)    default 'single' null comment '账单类型：single-单人账本，multiple-多人账本',
    create_time datetime                        not null comment '记账时间（对应VO的create_time，精确到时分秒）',
    remark      varchar(255)                    null comment '备注（对应VO的remark，如“午餐外卖”）',
    constraint fk_ub_ledger
        foreign key (ledger_id) references ledger (id),
    constraint fk_user_bill_category
        foreign key (category_id) references category (id),
    constraint fk_user_bill_user
        foreign key (user_id) references user (id),
    check (`type` in (1, 2))
)
    comment '用户账单表（对应UserBillVO，存储每笔收支明细）';

create table bill_participant
(
    id             bigint auto_increment comment '账单参与者ID（自增主键）'
        primary key,
    bill_id        bigint                                   not null comment '账单ID（关联user_bill表id，注意：你之前的账单表是user_bill不是bill）',
    participant_id bigint                                   not null comment '参与者用户ID（关联user表id）',
    create_time    datetime       default CURRENT_TIMESTAMP not null comment '关联创建时间',
    share_amount   decimal(10, 2) default 0.00              not null comment '参与者分摊金额（元，正数）',
    constraint fk_bp_bill
        foreign key (bill_id) references user_bill (id)
            on delete cascade,
    constraint fk_bp_participant
        foreign key (participant_id) references user (id)
)
    comment '账单参与者表（记录多人账单的参与者及分摊金额）';

create index idx_bill_id
    on bill_participant (bill_id);

create index idx_participant_id
    on bill_participant (participant_id);

create index idx_category_id
    on user_bill (category_id);

create index idx_create_time
    on user_bill (create_time);

create index idx_ledger_id
    on user_bill (ledger_id);

create index idx_user_id
    on user_bill (user_id);

create table user_group
(
    id          bigint auto_increment comment '用户分组ID（自增主键）'
        primary key,
    group_name  varchar(100)                       not null comment '分组名称（如“家人”“同事”）',
    creator_id  bigint                             not null comment '创建者ID（关联user表id，修正：原varchar改为bigint，和user.id类型一致）',
    create_time datetime default CURRENT_TIMESTAMP not null comment '分组创建时间',
    constraint fk_ug_creator
        foreign key (creator_id) references user (id)
)
    comment '用户分组表（存储用户自定义的联系人分组）';

create index idx_creator_id
    on user_group (creator_id);

create index idx_group_name
    on user_group (group_name);

create table user_ledger_relation
(
    id          bigint auto_increment comment '账本-用户关联ID（自增主键）'
        primary key,
    user_id     bigint                               not null comment '用户ID（关联user表id）',
    ledger_id   bigint                               not null comment '账本ID（关联ledger表id）',
    create_time datetime   default CURRENT_TIMESTAMP not null comment '关联创建时间',
    is_owner    tinyint(1) default 0                 not null comment '是否为账本所有者（0=否，1=是）',
    is_default  tinyint(1) default 0                 not null comment '是否默认账本（0=否，1=是）',
    constraint uk_user_ledger
        unique (user_id, ledger_id),
    constraint fk_ulr_ledger
        foreign key (ledger_id) references ledger (id)
            on delete cascade,
    constraint fk_ulr_user
        foreign key (user_id) references user (id)
)
    comment '账本-用户关联表（记录用户与账本的归属/关联关系）';

create index idx_ledger_id
    on user_ledger_relation (ledger_id);

create index idx_user_id
    on user_ledger_relation (user_id);


