/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100408 (10.4.8-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : cashpad_db

 Target Server Type    : MySQL
 Target Server Version : 100408 (10.4.8-MariaDB)
 File Encoding         : 65001

 Date: 25/12/2022 09:45:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for base_tokens
-- ----------------------------
DROP TABLE IF EXISTS `base_tokens`;
CREATE TABLE `base_tokens`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `base_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for listing_info
-- ----------------------------
DROP TABLE IF EXISTS `listing_info`;
CREATE TABLE `listing_info`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `token_id` int NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `hardcap` int NULL DEFAULT NULL,
  `currency_accept` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `down` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UNIQUE_DEX`(`token_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of listing_info
-- ----------------------------
INSERT INTO `listing_info` VALUES (2, 3, 1.00, 500000, 'BUSD', 25555);

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `token_id` int NULL DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UNIQYE`(`token_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO `projects` VALUES (13, 4, '652', 1);
INSERT INTO `projects` VALUES (15, 3, '652', 2);

-- ----------------------------
-- Table structure for tokenomics
-- ----------------------------
DROP TABLE IF EXISTS `tokenomics`;
CREATE TABLE `tokenomics`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `network` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `symbol` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `decimal` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `bio` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `social` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `website` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `brief` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tokenomics
-- ----------------------------
INSERT INTO `tokenomics` VALUES (3, 'BSC', 'capos', '&&&', '432', '0xd55FeF46EdabbC58CeCcfA3b00B13e030a8fb009', 'GHG', 'New founder', 'http://www.atentoken', 'http://www.alrentoken.support', NULL);
INSERT INTO `tokenomics` VALUES (4, 'BSC', 'corown', 'mol', '43', '0xd55FeF46EdabbC58CeCcfA3b00B13e030a8fb009', 'GHG', 'new Founter', 'http://www.atentoken', 'http://www.alrentoken.support', NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT NULL,
  `amount` float NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'test', 'test@gmail.com', '0xd55FeF46EdabbC58CeCcfA3b00B13e030a8fb009', '123', 1, 1, NULL);
INSERT INTO `users` VALUES (11, 'Neymar John', NULL, '0xd55FeF46EdabbC58CeCcfA3b00B13e030a8fb009', NULL, 2, 2, 0);

SET FOREIGN_KEY_CHECKS = 1;
