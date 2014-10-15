/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50525
Source Host           : localhost:3306
Source Database       : projects

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2014-10-15 17:57:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category_tasks
-- ----------------------------
DROP TABLE IF EXISTS `category_tasks`;
CREATE TABLE `category_tasks` (
  `id_category_tasks` int(11) NOT NULL AUTO_INCREMENT,
  `id_projects` int(11) NOT NULL,
  `id_parents` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `activate` varchar(1) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_category_tasks`),
  KEY `ix_category_tasks_id_projects` (`id_projects`),
  KEY `ix_category_tasks_id_parents` (`id_parents`),
  CONSTRAINT `category_tasks_ibfk_1` FOREIGN KEY (`id_projects`) REFERENCES `projects` (`id_projects`),
  CONSTRAINT `category_tasks_ibfk_2` FOREIGN KEY (`id_parents`) REFERENCES `category_tasks` (`id_category_tasks`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category_tasks
-- ----------------------------
INSERT INTO `category_tasks` VALUES ('1', '1', null, 'Create Register', '1', '2014-10-13 11:26:02', '2014-10-13 11:26:02');
INSERT INTO `category_tasks` VALUES ('2', '1', null, 'Applicant Profile', '1', '2014-10-13 11:27:14', '2014-10-13 11:27:14');

-- ----------------------------
-- Table structure for comment_tasks_projects
-- ----------------------------
DROP TABLE IF EXISTS `comment_tasks_projects`;
CREATE TABLE `comment_tasks_projects` (
  `id_comment_tasks_projects` int(11) NOT NULL AUTO_INCREMENT,
  `id_resource_projects` int(11) NOT NULL,
  `id_resource_tasks_projects` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `comment` text,
  `activate` varchar(1) NOT NULL,
  `created` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_comment_tasks_projects`),
  KEY `ix_comment_tasks_projects_id_resource_projects` (`id_resource_projects`),
  KEY `ix_comment_tasks_projects_id_resource_tasks_projects` (`id_resource_tasks_projects`),
  KEY `ix_comment_tasks_projects_id_user` (`id_user`),
  CONSTRAINT `comment_tasks_projects_ibfk_1` FOREIGN KEY (`id_resource_projects`) REFERENCES `resource_projects` (`id_resource_projects`),
  CONSTRAINT `comment_tasks_projects_ibfk_2` FOREIGN KEY (`id_resource_tasks_projects`) REFERENCES `resource_tasks_projects` (`id_resource_tasks_projects`),
  CONSTRAINT `comment_tasks_projects_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `tg_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment_tasks_projects
-- ----------------------------

-- ----------------------------
-- Table structure for files_tasks_projects
-- ----------------------------
DROP TABLE IF EXISTS `files_tasks_projects`;
CREATE TABLE `files_tasks_projects` (
  `id_comment_tasks_projects` int(11) NOT NULL AUTO_INCREMENT,
  `id_resource_projects` int(11) NOT NULL,
  `id_resource_tasks_projects` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_data` blob,
  `comment` text,
  `activate` varchar(1) NOT NULL,
  `created` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_comment_tasks_projects`),
  KEY `ix_files_tasks_projects_id_user` (`id_user`),
  KEY `ix_files_tasks_projects_id_resource_projects` (`id_resource_projects`),
  KEY `ix_files_tasks_projects_id_resource_tasks_projects` (`id_resource_tasks_projects`),
  CONSTRAINT `files_tasks_projects_ibfk_1` FOREIGN KEY (`id_resource_projects`) REFERENCES `resource_projects` (`id_resource_projects`),
  CONSTRAINT `files_tasks_projects_ibfk_2` FOREIGN KEY (`id_resource_tasks_projects`) REFERENCES `resource_tasks_projects` (`id_resource_tasks_projects`),
  CONSTRAINT `files_tasks_projects_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `tg_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of files_tasks_projects
-- ----------------------------

-- ----------------------------
-- Table structure for group_tasks
-- ----------------------------
DROP TABLE IF EXISTS `group_tasks`;
CREATE TABLE `group_tasks` (
  `id_group_tasks` int(11) NOT NULL AUTO_INCREMENT,
  `id_category_tasks` int(11) NOT NULL,
  `id_tasks_project` int(11) NOT NULL,
  `created` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_group_tasks`),
  KEY `ix_group_tasks_id_tasks_project` (`id_tasks_project`),
  KEY `ix_group_tasks_id_category_tasks` (`id_category_tasks`),
  CONSTRAINT `group_tasks_ibfk_1` FOREIGN KEY (`id_category_tasks`) REFERENCES `category_tasks` (`id_category_tasks`),
  CONSTRAINT `group_tasks_ibfk_2` FOREIGN KEY (`id_tasks_project`) REFERENCES `tasks_project` (`id_tasks_project`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_tasks
-- ----------------------------
INSERT INTO `group_tasks` VALUES ('1', '1', '1', '2014-10-13 11:29:11', '2014-10-13 11:29:11');
INSERT INTO `group_tasks` VALUES ('2', '1', '2', '2014-10-13 11:29:21', '2014-10-13 11:29:21');
INSERT INTO `group_tasks` VALUES ('3', '2', '3', '2014-10-13 11:29:29', '2014-10-13 11:29:29');
INSERT INTO `group_tasks` VALUES ('4', '2', '4', '2014-10-13 11:29:37', '2014-10-13 11:29:37');

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
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id_projects` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `active` varchar(1) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_projects`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO `projects` VALUES ('1', 'test project 1', '1', '2014-10-13 11:11:50', '2014-10-13 11:11:50');
INSERT INTO `projects` VALUES ('2', 'ทดสอบ', '1', '2014-10-13 16:53:56', '2014-10-13 16:53:59');
INSERT INTO `projects` VALUES ('3', '1234', '1', '2014-10-14 18:26:08', '2014-10-14 18:26:08');
INSERT INTO `projects` VALUES ('4', '5555', '1', '2014-10-14 18:28:32', '2014-10-14 18:28:32');
INSERT INTO `projects` VALUES ('5', '555', '1', '2014-10-14 18:31:43', '2014-10-14 18:31:43');
INSERT INTO `projects` VALUES ('21', 'tttttt', '1', '2014-10-15 10:24:42', '2014-10-15 10:24:42');
INSERT INTO `projects` VALUES ('22', '123', '1', '2014-10-15 10:50:54', '2014-10-15 10:50:54');
INSERT INTO `projects` VALUES ('23', '1235', '1', '2014-10-15 10:51:32', '2014-10-15 10:51:32');

-- ----------------------------
-- Table structure for resource_projects
-- ----------------------------
DROP TABLE IF EXISTS `resource_projects`;
CREATE TABLE `resource_projects` (
  `id_resource_projects` int(11) NOT NULL AUTO_INCREMENT,
  `id_projects` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `activate` varchar(1) NOT NULL,
  `created` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_resource_projects`),
  KEY `ix_resource_projects_id_user` (`id_user`),
  KEY `ix_resource_projects_id_projects` (`id_projects`),
  CONSTRAINT `resource_projects_ibfk_1` FOREIGN KEY (`id_projects`) REFERENCES `projects` (`id_projects`),
  CONSTRAINT `resource_projects_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `tg_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource_projects
-- ----------------------------
INSERT INTO `resource_projects` VALUES ('1', '1', '3', '1', '2014-10-13 11:17:43', '2014-10-13 11:17:46');
INSERT INTO `resource_projects` VALUES ('2', '1', '4', '1', '2014-10-13 11:25:28', '2014-10-13 11:25:28');
INSERT INTO `resource_projects` VALUES ('3', '1', '5', '1', '2014-10-13 11:25:38', '2014-10-13 11:25:38');

-- ----------------------------
-- Table structure for resource_tasks_projects
-- ----------------------------
DROP TABLE IF EXISTS `resource_tasks_projects`;
CREATE TABLE `resource_tasks_projects` (
  `id_resource_tasks_projects` int(11) NOT NULL AUTO_INCREMENT,
  `id_resource_projects` int(11) NOT NULL,
  `id_tasks_project` int(11) NOT NULL,
  `id_projects` int(11) NOT NULL,
  `id_task_status` int(11) NOT NULL,
  `id_task_type` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `activate` varchar(1) NOT NULL,
  `created` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `stop_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_resource_tasks_projects`),
  KEY `ix_resource_tasks_projects_id_tasks_project` (`id_tasks_project`),
  KEY `ix_resource_tasks_projects_id_task_type` (`id_task_type`),
  KEY `ix_resource_tasks_projects_id_projects` (`id_projects`),
  KEY `ix_resource_tasks_projects_id_resource_projects` (`id_resource_projects`),
  KEY `ix_resource_tasks_projects_id_task_status` (`id_task_status`),
  CONSTRAINT `resource_tasks_projects_ibfk_1` FOREIGN KEY (`id_resource_projects`) REFERENCES `resource_projects` (`id_resource_projects`),
  CONSTRAINT `resource_tasks_projects_ibfk_2` FOREIGN KEY (`id_tasks_project`) REFERENCES `tasks_project` (`id_tasks_project`),
  CONSTRAINT `resource_tasks_projects_ibfk_3` FOREIGN KEY (`id_projects`) REFERENCES `projects` (`id_projects`),
  CONSTRAINT `resource_tasks_projects_ibfk_4` FOREIGN KEY (`id_task_status`) REFERENCES `task_status` (`id_task_status`),
  CONSTRAINT `resource_tasks_projects_ibfk_5` FOREIGN KEY (`id_task_type`) REFERENCES `task_type` (`id_task_type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource_tasks_projects
-- ----------------------------
INSERT INTO `resource_tasks_projects` VALUES ('1', '1', '1', '1', '1', '4', '', '1', '2014-10-13 11:31:35', '2014-10-13 11:31:35', null, null);
INSERT INTO `resource_tasks_projects` VALUES ('2', '1', '2', '1', '1', '4', '', '1', '2014-10-13 11:31:55', '2014-10-13 11:31:55', null, null);

-- ----------------------------
-- Table structure for tasks_project
-- ----------------------------
DROP TABLE IF EXISTS `tasks_project`;
CREATE TABLE `tasks_project` (
  `id_tasks_project` int(11) NOT NULL AUTO_INCREMENT,
  `id_projects` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `activate` varchar(1) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_tasks_project`),
  KEY `ix_tasks_project_id_projects` (`id_projects`),
  CONSTRAINT `tasks_project_ibfk_1` FOREIGN KEY (`id_projects`) REFERENCES `projects` (`id_projects`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tasks_project
-- ----------------------------
INSERT INTO `tasks_project` VALUES ('1', '1', 'Page Register Applicant', '1', '2014-10-13 11:27:54', '2014-10-13 11:27:54');
INSERT INTO `tasks_project` VALUES ('2', '1', 'Page Register Corporate', '1', '2014-10-13 11:28:14', '2014-10-13 11:28:14');
INSERT INTO `tasks_project` VALUES ('3', '1', 'Page Manage Applicant', '1', '2014-10-13 11:28:24', '2014-10-13 11:28:24');
INSERT INTO `tasks_project` VALUES ('4', '1', 'Page Applicant Personal Info', '1', '2014-10-13 11:28:44', '2014-10-13 11:28:44');

-- ----------------------------
-- Table structure for task_status
-- ----------------------------
DROP TABLE IF EXISTS `task_status`;
CREATE TABLE `task_status` (
  `id_task_status` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `activate` varchar(1) NOT NULL,
  `created` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_task_status`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task_status
-- ----------------------------
INSERT INTO `task_status` VALUES ('1', 'hold', '1', '2014-10-13 09:46:21', '2014-10-13 09:46:21');
INSERT INTO `task_status` VALUES ('2', 'start', '1', '2014-10-13 09:46:21', '2014-10-13 09:46:21');
INSERT INTO `task_status` VALUES ('3', 'terminate', '1', '2014-10-13 09:46:21', '2014-10-13 09:46:21');
INSERT INTO `task_status` VALUES ('4', 'finish', '1', '2014-10-13 09:46:21', '2014-10-13 09:46:21');
INSERT INTO `task_status` VALUES ('5', 'revise', '1', '2014-10-13 09:46:21', '2014-10-13 09:46:21');

-- ----------------------------
-- Table structure for task_type
-- ----------------------------
DROP TABLE IF EXISTS `task_type`;
CREATE TABLE `task_type` (
  `id_task_type` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `activate` varchar(1) NOT NULL,
  `created` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_task_type`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task_type
-- ----------------------------
INSERT INTO `task_type` VALUES ('1', 'requirement', '1', '2014-10-13 09:46:21', '2014-10-13 09:46:21');
INSERT INTO `task_type` VALUES ('2', 'design database', '1', '2014-10-13 09:46:21', '2014-10-13 09:46:21');
INSERT INTO `task_type` VALUES ('3', 'design gui', '1', '2014-10-13 09:46:21', '2014-10-13 09:46:21');
INSERT INTO `task_type` VALUES ('4', 'develop', '1', '2014-10-13 09:46:21', '2014-10-13 09:46:21');
INSERT INTO `task_type` VALUES ('5', 'test', '1', '2014-10-13 09:46:21', '2014-10-13 09:46:21');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tg_group
-- ----------------------------
INSERT INTO `tg_group` VALUES ('1', 'managers', 'Managers Group', '2014-10-13 09:46:21');
INSERT INTO `tg_group` VALUES ('2', 'developer', null, '2014-10-13 11:12:42');
INSERT INTO `tg_group` VALUES ('3', 'System Analysis', null, '2014-10-13 11:12:57');

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
INSERT INTO `tg_group_permission` VALUES ('2', '2');
INSERT INTO `tg_group_permission` VALUES ('3', '2');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tg_permission
-- ----------------------------
INSERT INTO `tg_permission` VALUES ('1', 'manage', 'This permission give an administrative right to the bearer');
INSERT INTO `tg_permission` VALUES ('2', 'User', 'User');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tg_user
-- ----------------------------
INSERT INTO `tg_user` VALUES ('1', 'manager', 'manager@somedomain.com', 'Example manager', '936caf7d6ce9b98102d1ec36e7208248546a4d4437e5508c8270a3674c8f8309dff8b37e00ab4652d489a54fc74766339cf838f8c8275c762030217abb581e1e', '2014-10-13 09:46:21');
INSERT INTO `tg_user` VALUES ('2', 'editor', 'editor@somedomain.com', 'Example editor', '874eecf7ca79324ffa4b53141702afc5c29f28c329c3c2a50c371861f227301681bbbd207c1c3e1039a664190c123be2ce6c49f5c5f4ffd3eac49baa11145365', '2014-10-13 09:46:21');
INSERT INTO `tg_user` VALUES ('3', 'tong', 'tong_pa@hotmail.com', 'tong', null, '2014-10-13 11:12:32');
INSERT INTO `tg_user` VALUES ('4', 'develop1', 'develop1@test.com', 'develop1', null, '2014-10-13 11:14:01');
INSERT INTO `tg_user` VALUES ('5', 'develop2', 'develop2@test.com', 'develop2', null, '2014-10-13 11:14:18');

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
INSERT INTO `tg_user_group` VALUES ('3', '1');
INSERT INTO `tg_user_group` VALUES ('4', '2');
INSERT INTO `tg_user_group` VALUES ('5', '2');
