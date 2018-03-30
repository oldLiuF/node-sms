-- 创建数据库
CREATE DATABASE IF NOT EXISTS SMS_DB DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

-- 创建 用户表
CREATE TABLE user(
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL, -- 用户名
  `password` VARCHAR(30) NOT NULL, -- 密码
  createDate DATETIME NOT NULL -- 创建日期
  lastLoginTime DATETIME -- 最后登录日期
  PRIMARY KEY (id)
);

-- 用户 添加 创建日期
ALTER TABLE user ADD createDate DATETIME NOT NULL
-- 最后登录时间
ALTER TABLE user ADD lastLoginTime DATETIME


INSERT INTO user(username, `password`) 
VALUES ('oldLiu', 'root1234');

insert into user (username, password, createDate, lastLoginTime) values ('test', '1', '2018-03-30 10:12:29', NULL)