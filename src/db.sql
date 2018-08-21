
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



insert into questions (title,A,B,C,D,answer) values ("传说平安夜圣诞老人乘坐的雪橇是什么动物拉的?","驯鹿","麋鹿","马鹿","驼鹿","A"),("用来庆祝胜利的香槟酒起源于哪个国家?","德国","法国","美国","英国","B"),("卡拉OK是哪国人发明的?","德国","日本","韩国","美国","B"),("以帆为造型的悉尼标志性建筑物是什么?","悉尼海港大桥","悉尼塔","悉尼歌剧院","悉尼塔邦迪海滩","C"),("游戏超级玛丽由日本哪家知名游戏制作公司出品?","任天堂","索尼","SEGA SAMMY","科纳米","A"),("十五个吊桶打水的下一句是什么?","上上下下","有上有下","忽上忽下","七上八下","D"),("鱼翅是哪种动物的鳍所制成的?","鲨鱼","鲸鱼","海豚","鳄鱼","A"),("挥一挥衣袖不带走一片云彩是哪位诗人的诗句?","李清照","徐志摩","郭沫若","舒婷","B"),("蓝色妖姬其实是什么花?","月季","百合","满天星","玫瑰","D"),("四大名茶之一的龙井茶产地是哪个城市?","杭州","苏州","扬州","武汉","A"),("中国和朝鲜两国的界河叫做什么江?","雅鲁藏布江","松花江","鸭绿江","长江","C"),("三国演义中蜀国被称为常胜将军的是谁?","关羽","孙权","曹操","赵子龙","D"),("金屋藏娇的故事与哪一位皇帝有关?","秦始皇","光武帝","汉高祖","汉武帝","D"),("三人行，必有我师，出自哪里?","大学","论语","中庸","孟子","B"),("麻婆豆腐是我国哪个菜系的传统名菜?","鲁菜","湘菜","川菜","粤菜","C");

insert into questions (title,A,B,C,D,answer) values ("下列我国哪个古迹被誉为“世界八大奇迹“","万里长城","乐山大佛","秦始皇兵马俑","敦煌","C"),
("下列名关哪一座被称为“天下第一关“","居庸关","娘子关","潼门关","山海关","D"),("下列我国名茶哪一种是产于福建安溪","龙井","碧螺春","武夷岩茶","铁观音","D"),("火车连续发出两声长鸣是什么意思","前进","停留","倒退","故障","C"),("隐形飞机是指什么飞机","肉眼看不见","飞行太高看不见","体积太小","雷达测不到","D"),("下列世界奇迹哪个位于伊拉克","金字塔","空中花园","宙斯神像","太阳神像","B"),("下列古都哪个被称为六朝古都","洛阳","西安","南京","北京","C"),("古代四大美女哪位是西汉时期的","西施","王昭君","貂禅","杨贵妃","B"),("世界环境日是在每年的哪一天","6月4日","6月5日","6月6日","6月7日","B"),("鲁迅作品中哪部不是杂文集","《热风》","《坟》","《呐喊》","《二心集》","B"),("我国最早的神话小说是","《山海经》","《古镜记》","《搜神记》","《世说新语》","C"),("世界哪个国家的斗牛活动首屈一指","印度","西班牙","意大利","美国","B"),("哪个数字西方人最忌讳","4","7","8","13","D"),("中国古代“双手保全举过头顶，鞠躬”，这是什么拜礼？","长揖","再拜","顿首","稽首","A");
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

insert into questions (title,A,B,C,D,answer) values 
("哪个不是狗眼中的颜色？","黑色","红色","白色","灰色","B"),
("世界上眼睛最多的昆虫？","蜻蜓","苍蝇","蚂蚁","蝴蝶","A"),
("吃人参的最佳时候？","早晨空腹","早晨饭后","中午饭后","晚上饭后","A"),
("“味精”是哪国人发明的？","中国","日本","韩国","朝鲜","B"),
("汉代姐妹花之一的“温柔乡”的古代美女是？","王昭君","赵合德","西施","陆小曼","B"),
("“我猜中了开头，却猜不到这结局。”是电影《大话西游》中哪个角色 的经典台词？","铁扇公主","蜘蛛精","白晶晶","紫霞仙子","D"),
("穿什么颜色的衣服的人更容易挨蚊子叮？","黑色","白色","红色","黄色","A"),
("水彩颜料黄色和蓝色组合会形成什么颜色？","绿色","粉色","紫色","白色","A"),
("国家在对外关系上的最高代表是?","国家元首","政府首脑","外交部长","大使","A"),
("轻于鸿毛”中的鸿毛是哪种动物的毛？","羊","大雁","鸡","鸭","B"),
("下列名称不属于二十四节气的是?","谷雨","芒种","大伏","大雪","D"),
("《阿里山的姑娘》是哪个少数民族的民歌？","苗族民歌","彝族民歌","高山族民歌","黎族民歌","C"),
("以偏甜、偏淡、偏酸的“三偏”为特色，以佛跳墙、炒西施舌等为名菜的是?","浙菜","闽菜","川菜","粤菜","B"),
("昆虫中是哪一个是世界上最长的昆虫？","蜻蜓","知了","蚂蚱","竹节虫","D"),
("阿尔卑斯山脉的最高的山峰是那一座？","勃朗峰","珠穆朗玛峰","华山","魏斯峰","A");
 
insert into questions (title,A,B,C,D,answer) values
("《汉书》是哪位史学家所著？","司马迁","司马光","左丘明","班固","D"),
("唯一两个皇帝合葬一起的是唐高宗和谁？","唐高祖","唐太宗","武则天","唐中宗","C"),
("五星红旗的设计者是谁？","顾仁兼","周恩来","曾联松","梁思成","C"),
("我国古代“十恶不赦”首赦是什么？","不义","不道","内乱","谋反","D"),
("“瓷都”景德镇位于哪个省？","河南","河北","广东","江西","D"),
("马拉松长跑源于马拉松战役爆发地，这是哪里？","古代罗马","古代希腊","中国","马其顿","B"),
("我国第一部词典是哪个？","《说文解字》","《尔雅》","《切韵》D","《史记》","B"),
("古代著名书院白鹿洞书院位于哪里？","江西庐山","湖南长沙","湖南衡阳","河南商丘","A"),
("我国收入的字最多的字典是哪一部？","方言","说文解字","康熙字典","新华字典","C"),
("“红娘”由来出自哪部古典名剧？","琵琶记","西厢记","长生殿","桃花扇","B"),
("我国第一个获得世界冠军的是谁？","吴传玉","郑国荣","容国团","陈镜开","C"),
("女子游泳衣称“比基尼”源于什么名？","设计师","运动员","模特","小岛","D");

