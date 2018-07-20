use wechat_app;

CREATE TABLE `user` (
`id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`nickName` varchar(128) NOT NULL  DEFAULT '' COMMENT '姓名',
`avatarUrl` varchar(2048)  NOT NULL DEFAULT '' COMMENT '头像',
`city` varchar(128) NOT NULL DEFAULT '' COMMENT '城市',
`country` varchar(128) NOT NULL DEFAULT '' COMMENT '国家',
`gender` varchar(128) NOT NULL DEFAULT '' COMMENT '性别',
`province` varchar(128) NOT NULL DEFAULT '' COMMENT '省',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';


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
