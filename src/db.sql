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