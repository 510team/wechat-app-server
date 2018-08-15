
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
insert into questions (title,A,B,C,D,answer) values 
("'拱手而立'表示对长者的尊敬，一般来说，男子行拱手礼时应该怎么做？","左手在外","右手在外","双手合十","双手在外","A"),
("以下哪个岛屿是泰国的？","普吉岛","南沙群岛","金门群岛","济州岛","A"),
("是用来制造防弹衣的最好材料是什么？","金刚石","富勒烯","碳纳米管","石墨烯","C"),
("造成气候变暖的主要原因是人类生产活动中排放大量的什么气体？","二氧化硫","一氧化碳","二氧化碳","甲醛","C"),
("下面属于可再生能源的是？","天然气","煤炭","电力","太阳能","D"),
("是谁第一次将中国功夫引入好莱坞？","李连杰","甄子丹","李小龙","成龙","C"),
("请问下列哪个是张国荣的电影作品？","重庆森林","霸王别姬","东邪西毒","花样年华","B"),
("飞机上的黑匣子被安放在飞机上的哪个部位？","机头","机身中部","机翼内","机尾","D"),
("下列哪个不属于我国民间四大传说之一？","牛郎织女","嫦娥奔月","孟姜女寻夫","梁山伯与祝英台","B"),
("一个充满气的氢气球把它放了会怎样？","一直向上升","升到一定高度后停止上升","一直升，直至爆炸","先升高后下降","C"),
("下列哪个是真正的鱼？","海马","鲸鱼","章鱼","儒艮","A"),
("在电脑领域，“闪客”是指？","Disco高手","Flash高手","PS高手","绘画高手","B"),
("乒乓球瘪了用什么办法能使它鼓起来？","放到冰柜里","向里吹气","泡在开水里","用手捏回去","C"),
("彩虹的顶部是什么颜色？","蓝色","绿色","黄色","红色","D"),
("从抹香鲸体内提炼出的香料是？","百里香","沉水香","麝香","龙涎香","D");

 