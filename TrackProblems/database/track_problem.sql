/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50525
Source Host           : localhost:3306
Source Database       : track_problem

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2015-01-06 19:06:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for migrate_version
-- ----------------------------
DROP TABLE IF EXISTS `migrate_version`;
CREATE TABLE `migrate_version` (
  `version_num` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of migrate_version
-- ----------------------------

-- ----------------------------
-- Table structure for problem_page
-- ----------------------------
DROP TABLE IF EXISTS `problem_page`;
CREATE TABLE `problem_page` (
  `id_problem_page` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_track_module` bigint(20) DEFAULT NULL,
  `page` varchar(255) DEFAULT NULL,
  `ref_page` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `active` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id_problem_page`),
  KEY `id_track_module` (`id_track_module`),
  CONSTRAINT `problem_page_ibfk_1` FOREIGN KEY (`id_track_module`) REFERENCES `track_module` (`id_track_module`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of problem_page
-- ----------------------------
INSERT INTO `problem_page` VALUES ('1', '1', 'all', 'all', '2015-01-06 18:40:53', '');
INSERT INTO `problem_page` VALUES ('2', '2', 'all', 'all', null, '');

-- ----------------------------
-- Table structure for problem_type
-- ----------------------------
DROP TABLE IF EXISTS `problem_type`;
CREATE TABLE `problem_type` (
  `id_problem_type` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_track_module` bigint(20) NOT NULL,
  `problem_name` varchar(255) DEFAULT NULL,
  `active` bit(1) NOT NULL DEFAULT b'1',
  `created` date DEFAULT NULL,
  PRIMARY KEY (`id_problem_type`),
  KEY `id_track_module` (`id_track_module`),
  CONSTRAINT `problem_type_ibfk_1` FOREIGN KEY (`id_track_module`) REFERENCES `track_module` (`id_track_module`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of problem_type
-- ----------------------------
INSERT INTO `problem_type` VALUES ('1', '1', 'problems of input data', '', null);
INSERT INTO `problem_type` VALUES ('2', '1', 'problems of show data  ', '', null);
INSERT INTO `problem_type` VALUES ('4', '1', 'Suggestion', '', null);
INSERT INTO `problem_type` VALUES ('5', '2', 'problems of input data', '', null);
INSERT INTO `problem_type` VALUES ('6', '2', 'problems of show data  ', '', null);
INSERT INTO `problem_type` VALUES ('7', '2', 'Suggestion', '', null);

-- ----------------------------
-- Table structure for tg_group
-- ----------------------------
DROP TABLE IF EXISTS `tg_group`;
CREATE TABLE `tg_group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(16) NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `group_name` (`group_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tg_group
-- ----------------------------
INSERT INTO `tg_group` VALUES ('1', 'managers', 'Managers Group', '2014-12-22 14:38:13');

-- ----------------------------
-- Table structure for tg_group_permission
-- ----------------------------
DROP TABLE IF EXISTS `tg_group_permission`;
CREATE TABLE `tg_group_permission` (
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`group_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `tg_group_permission_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `tg_group` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tg_group_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `tg_permission` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tg_group_permission
-- ----------------------------
INSERT INTO `tg_group_permission` VALUES ('1', '1');

-- ----------------------------
-- Table structure for tg_permission
-- ----------------------------
DROP TABLE IF EXISTS `tg_permission`;
CREATE TABLE `tg_permission` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(63) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`permission_id`),
  UNIQUE KEY `permission_name` (`permission_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tg_permission
-- ----------------------------
INSERT INTO `tg_permission` VALUES ('1', 'manage', 'This permission give an administrative right to the bearer');

-- ----------------------------
-- Table structure for tg_user
-- ----------------------------
DROP TABLE IF EXISTS `tg_user`;
CREATE TABLE `tg_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(16) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `email_address` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tg_user
-- ----------------------------
INSERT INTO `tg_user` VALUES ('1', 'manager', 'manager@somedomain.com', 'Example manager', '20462408a012c173f9e8fd826943722f1afa79bf1c52ca44bf4ec42c908e9d7cbeb06e9b3e00a4797be1774e1c5804b76dd1a83f52ed798425950bd662d15d60', '2014-12-22 14:38:13');
INSERT INTO `tg_user` VALUES ('2', 'editor', 'editor@somedomain.com', 'Example editor', 'c8dc9a2c2b4c718eceb39ad2d39ea92faeb3428f47c8952fb2f98e456905f3ca22658e90a62f2acdc246c479575cb8fa4d9289f4c16b24353fe55a5389ad7e0e', '2014-12-22 14:38:13');

-- ----------------------------
-- Table structure for tg_user_group
-- ----------------------------
DROP TABLE IF EXISTS `tg_user_group`;
CREATE TABLE `tg_user_group` (
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `tg_user_group_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tg_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tg_user_group_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `tg_group` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tg_user_group
-- ----------------------------
INSERT INTO `tg_user_group` VALUES ('1', '1');

-- ----------------------------
-- Table structure for track_image
-- ----------------------------
DROP TABLE IF EXISTS `track_image`;
CREATE TABLE `track_image` (
  `id_track_image` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_track_problem` bigint(20) NOT NULL,
  `path_image` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT b'1',
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id_track_image`),
  KEY `id_track_problem` (`id_track_problem`),
  CONSTRAINT `track_image_ibfk_1` FOREIGN KEY (`id_track_problem`) REFERENCES `track_problem` (`id_track_problem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of track_image
-- ----------------------------

-- ----------------------------
-- Table structure for track_module
-- ----------------------------
DROP TABLE IF EXISTS `track_module`;
CREATE TABLE `track_module` (
  `id_track_module` bigint(20) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(255) DEFAULT NULL,
  `secure_key` varchar(255) DEFAULT NULL,
  `domain_name` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT b'1',
  `bypass` bit(1) DEFAULT b'0',
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id_track_module`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of track_module
-- ----------------------------
INSERT INTO `track_module` VALUES ('1', 'JM Web', '123456789', 'tong.jobmatcher.poweredbyclear.com', '', '', '2015-01-05 11:56:38');
INSERT INTO `track_module` VALUES ('2', 'Import Email', '123456789', 'tong.jobmatcher.poweredbyclear.com', '', '', '2015-01-05 11:56:41');

-- ----------------------------
-- Table structure for track_problem
-- ----------------------------
DROP TABLE IF EXISTS `track_problem`;
CREATE TABLE `track_problem` (
  `id_track_problem` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_track_module` bigint(20) NOT NULL,
  `id_problem_page` bigint(20) NOT NULL,
  `feedback_url` text,
  `id_problem_type` bigint(20) NOT NULL,
  `description` text,
  `active` bit(1) DEFAULT b'1',
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id_track_problem`),
  KEY `id_track_module` (`id_track_module`),
  KEY `fk_track_problem_problem_page_1` (`id_problem_page`),
  KEY `fk_track_problem_problem_type_1` (`id_problem_type`),
  CONSTRAINT `fk_track_problem_problem_page_1` FOREIGN KEY (`id_problem_page`) REFERENCES `problem_page` (`id_problem_page`),
  CONSTRAINT `fk_track_problem_problem_type_1` FOREIGN KEY (`id_problem_type`) REFERENCES `problem_type` (`id_problem_type`),
  CONSTRAINT `track_problem_ibfk_1` FOREIGN KEY (`id_track_module`) REFERENCES `track_module` (`id_track_module`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of track_problem
-- ----------------------------
INSERT INTO `track_problem` VALUES ('1', '2', '2', 'http://localhost:8080/JMWeb/register/register-init.htm', '5', '55555', '', '2015-01-06 19:01:04');
INSERT INTO `track_problem` VALUES ('3', '2', '2', 'http://localhost:8080/JMWeb/register/register-init.htm', '5', '555', '', '2015-01-06 19:04:37');
