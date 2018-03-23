-- 创建数据库
CREATE DATABASE IF NOT EXISTS SMS_DB DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

-- 创建 用户表
CREATE TABLE user(
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL, -- 用户名
  `password` VARCHAR(30) NOT NULL, -- 密码
  PRIMARY KEY (id)
);


INSERT INTO user(username, `password`) 
VALUES ('oldLiu', 'root1234');