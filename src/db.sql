
CREATE Database `wechat_app` DEFAULT CHARSET=utf8mb4;

use wechat_app;

DROP TABLE IF EXISTS user;

CREATE TABLE `user` (
`openid` varchar(64) NOT NULL DEFAULT ''  COMMENT 'openid',
`nick_name` varchar(128) NOT NULL  DEFAULT '' COMMENT '姓名',
`avatar_url` varchar(2048)  NOT NULL DEFAULT '' COMMENT '头像',
`city` varchar(128) NOT NULL DEFAULT '' COMMENT '城市',
`country` varchar(128) NOT NULL DEFAULT '' COMMENT '国家',
`gender` varchar(128) NOT NULL DEFAULT '' COMMENT '性别',
`province` varchar(128) NOT NULL DEFAULT '' COMMENT '省',
PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

DROP TABLE IF EXISTS questions;

CREATE TABLE `questions` (
`id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`title` varchar(500) NOT NULL  DEFAULT '' COMMENT '标题',
`A` varchar(2048)  NOT NULL DEFAULT '' COMMENT 'A选项',
`B` varchar(2048) NOT NULL DEFAULT '' COMMENT 'B选项',
`C` varchar(2048) NOT NULL DEFAULT '' COMMENT 'C选项',
`D` varchar(2048) NOT NULL DEFAULT '' COMMENT 'D选项',
`answer` varchar(128) NOT NULL DEFAULT '' COMMENT '答案',

PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='问题表';

alter table questions add column accuracy varchar(60) not null comment '正确率';
DROP TABLE IF EXISTS answer;

CREATE TABLE `answer` (
`id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`open_id` varchar(100)  NOT NULL  COMMENT '用户id',
`question_id` varchar(100) NOT NULL   COMMENT '问题id',
`answer` varchar(12) NOT NULL DEFAULT ''  COMMENT '答案',
`create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='答案表';

DROP TABLE IF EXISTS score;

CREATE TABLE `score` (
`openid` varchar(64) NOT NULL DEFAULT ''  COMMENT 'openid',
`score` bigint(11) NOT NULL DEFAULT 0 COMMENT '分数',
`total_score` bigint(11) NOT NULL DEFAULT 0 COMMENT '总分数',
PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='分数表';

DROP TABLE IF EXISTS feedback;

CREATE TABLE `feedback` (
`id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`openid` varchar(64) NOT NULL DEFAULT ''  COMMENT 'openid',
`content` varchar(2048) NOT NULL DEFAULT '' COMMENT '反馈内容',
`feedback_time` timestamp COMMENT '反馈时间',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='反馈表';

DROP TABLE IF EXISTS level;
CREATE TABLE `level`(
    `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
    `name` varchar(64) NOT NULL DEFAULT '' COMMENT '等级名称',
    `icon` varchar(64) NOT NULL DEFAULT '' COMMENT '图标类名',
    `lowest_score` bigint(11) NOT NULL DEFAULT 0 COMMENT '该等级需要达到的最低分数',
    `highest_score` bigint(11) NOT NULL DEFAULT 0 COMMENT '该等级需要达到的最高分数',
    `grade` bigint(11) NOT NULL DEFAULT 1 COMMENT '等级',
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='等级表';

INSERT INTO `level` SET name='初学乍到',icon='icon-level1',lowest_score=0,highest_score=99,grade=1;
INSERT INTO `level` SET name='游学四方',icon='icon-level2',lowest_score=100,highest_score=199,grade=2;
INSERT INTO `level` SET name='有学而至',icon='icon-level3',lowest_score=200,highest_score=299,grade=3;
INSERT INTO `level` SET name='青年才俊',icon='icon-level4',lowest_score=300,highest_score=399,grade=4;
INSERT INTO `level` SET name='学长师友',icon='icon-level5',lowest_score=400,highest_score=999,grade=5;



DROP TABLE IF EXISTS `background`;
CREATE TABLE `background` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(255) NOT NULL,
  `mark` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='背景图';

INSERT INTO `background` VALUES ('1', '/static/background1@2x.png', '1'), ('2', '/static/background2@2x.png', '0'), ('3', '/static/background3@2x.png', '0'), ('4', '/static/background4@2x.png', '0');
