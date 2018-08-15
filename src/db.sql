
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



insert into questions (title,A,B,C,D,answer) values ("传说平安夜圣诞老人乘坐的雪橇是什么动物拉的?","驯鹿","麋鹿","马鹿","驼鹿","A"),("用来庆祝胜利的香槟酒起源于哪个国家?","德国","法国","美国","英国","B"),("卡拉OK是哪国人发明的?","德国","日本","韩国","美国","B"),("以帆为造型的悉尼标志性建筑物是什么?","悉尼海港大桥","悉尼塔","悉尼歌剧院","悉尼塔邦迪海滩","C"),("游戏超级玛丽由日本哪家知名游戏制作公司出品?","任天堂","索尼","SEGA SAMMY","科纳米","A"),("十五个吊桶打水的下一句是什么?","上上下下","有上有下","忽上忽下","七上八下","D"),("鱼翅是哪种动物的鳍所制成的?","鲨鱼","鲸鱼","海豚","鳄鱼","A"),("挥一挥衣袖不带走一片云彩是哪位诗人的诗句?","李清照","徐志摩","郭沫若","舒婷","B"),("蓝色妖姬其实是什么花?","月季","百合","满天星","玫瑰","D"),("四大名茶之一的龙井茶产地是哪个城市?","杭州","苏州","扬州","武汉","A"),("中国和朝鲜两国的界河叫做什么江?","雅鲁藏布江","松花江","鸭绿江","长江","C"),("三国演义中蜀国被称为常胜将军的是谁?","关羽","孙权","曹操","赵子龙","D"),("金屋藏娇的故事与哪一位皇帝有关?","秦始皇","光武帝","汉高祖","汉武帝","D"),("三人行，必有我师，出自哪里?","大学","论语","中庸","孟子","B"),("麻婆豆腐是我国哪个菜系的传统名菜?","鲁菜","湘菜","川菜","粤菜","C");

insert into questions (title,A,B,C,D,answer) values ("下列我国哪个古迹被誉为“世界八大奇迹“","万里长城","乐山大佛","秦始皇兵马俑","敦煌","C"),
("下列名关哪一座被称为“天下第一关“","居庸关","娘子关","潼门关","山海关","D"),("下列我国名茶哪一种是产于福建安溪","龙井","碧螺春","武夷岩茶","铁观音","D"),("火车连续发出两声长鸣是什么意思","前进","停留","倒退","故障","C"),("隐形飞机是指什么飞机","肉眼看不见","飞行太高看不见","体积太小","雷达测不到","D"),("下列世界奇迹哪个位于伊拉克","金字塔","空中花园","宙斯神像","太阳神像","B"),("下列古都哪个被称为六朝古都","洛阳","西安","南京","北京","C"),("古代四大美女哪位是西汉时期的","西施","王昭君","貂禅","杨贵妃","B"),("世界环境日是在每年的哪一天","6月4日","6月5日","6月6日","6月7日","B"),("鲁迅作品中哪部不是杂文集","《热风》","《坟》","《呐喊》","《二心集》","B"),("我国最早的神话小说是","《山海经》","《古镜记》","《搜神记》","《世说新语》","C"),("世界哪个国家的斗牛活动首屈一指","印度","西班牙","意大利","美国","B"),("哪个数字西方人最忌讳","4","7","8","13","D"),("中国古代“双手保全举过头顶，鞠躬”，这是什么拜礼？","长揖","再拜","顿首","稽首","A");