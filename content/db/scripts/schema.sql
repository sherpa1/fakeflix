SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `identifier` varchar(36) NOT NULL,
  `name` varchar(32) NOT NULL,
  `description` tinytext NOT NULL,
  `slug` varchar(128) NOT NULL,
  PRIMARY KEY (`identifier`),
  UNIQUE KEY `identifier` (`identifier`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `categories_medias`;
CREATE TABLE `categories_medias` (
  `category_identifier` varchar(36) NOT NULL,
  `media_identifier` varchar(36) NOT NULL,
  KEY `category_identifier` (`category_identifier`),
  KEY `media_identifier` (`media_identifier`),
  CONSTRAINT `categories_medias_ibfk_1` FOREIGN KEY (`category_identifier`) REFERENCES `categories` (`identifier`),
  CONSTRAINT `categories_medias_ibfk_2` FOREIGN KEY (`media_identifier`) REFERENCES `medias` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `medias`;
CREATE TABLE `medias` (
  `identifier` varchar(36) NOT NULL,
  `name` varchar(64) NOT NULL,
  `slug` varchar(128) NOT NULL,
  `director` varchar(64) NOT NULL,
  `duration` int(11) NOT NULL,
  `trailer` varchar(128) NOT NULL,
  `about` tinytext NOT NULL,
  `aggregateRating` int(11) NOT NULL,
  `alternativeHeadline` varchar(64) NOT NULL,
  `author` varchar(64) NOT NULL,
  `publication` date NOT NULL,
  `countryOfOrigin` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `image` varchar(128) NOT NULL,
  `type` int(1) NOT NULL COMMENT '1 = movie, 2 = show, 3 = documentary, 4 = cartoon',
  PRIMARY KEY (`identifier`),
  UNIQUE KEY `identifier` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `medias_tags`;
CREATE TABLE `medias_tags` (
  `media_identifier` varchar(36) NOT NULL,
  `tag_identifier` varchar(36) NOT NULL,
  KEY `media_identifier` (`media_identifier`),
  KEY `tag_identifier` (`tag_identifier`),
  CONSTRAINT `medias_tags_ibfk_1` FOREIGN KEY (`media_identifier`) REFERENCES `medias` (`identifier`),
  CONSTRAINT `medias_tags_ibfk_2` FOREIGN KEY (`tag_identifier`) REFERENCES `tags` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `identifier` varchar(36) NOT NULL,
  `name` varchar(24) NOT NULL,
  `slug` varchar(32) NOT NULL,
  PRIMARY KEY (`identifier`),
  UNIQUE KEY `identifier` (`identifier`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
