DROP DATABASE IF EXISTS `PARQ_POS`;

CREATE DATABASE `PARQ_POS` CHARACTER SET utf8mb4;

USE `PARQ_POS`;

SET time_zone = "+00:00";


CREATE TABLE `EMPLOYEE` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `admin` boolean NOT NULL DEFAULT '0',
  `days` SET('0', '1', '2', '3', '4', '5', '6') NOT NULL,
  `start_turn` time NOT NULL,
  `end_turn` time NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`email`)
) ENGINE=InnoDB COMMENT='EMPLOYEES TABLE';


CREATE TABLE `CONNECTION` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_employee` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_CONNECTION_EMPLOYEE` FOREIGN KEY (`id_employee`) REFERENCES `EMPLOYEE`(`id`)
) ENGINE=InnoDB COMMENT='CONNECTIONS TABLE';


CREATE TABLE `INVOICE` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` boolean NOT NULL DEFAULT '1',
  `id_employee` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `first_name_customer` varchar(50) NOT NULL,
  `last_name_customer` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `value_paid` varchar(20) NOT NULL,
  `full_value` varchar(20) NOT NULL,
  `superavit` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_INVOICE_EMPLOYEE` FOREIGN KEY (`id_employee`) REFERENCES `EMPLOYEE`(`id`)
) ENGINE=InnoDB COMMENT='INVOICES TABLE';


CREATE TABLE `PRODUCT` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cod` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `count` int(11) NOT NULL,
  `value` decimal NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`cod`)
) ENGINE=InnoDB COMMENT='PRODUCTS TABLE';


CREATE TABLE `PRODUCT_INVOICE` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_invoice` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `full_value` decimal NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_DETAIL_INVOICE` FOREIGN KEY (`id_invoice`) REFERENCES `INVOICE`(`id`),
  CONSTRAINT `FK_DETAIL_PRODUCT` FOREIGN KEY (`id_product`) REFERENCES `PRODUCT`(`id`)
) ENGINE=InnoDB COMMENT='DETAIL TABLE';



INSERT INTO `employee` (`first_name`, `last_name`, `email`, `password`, `admin`, `days`, `start_turn`, `end_turn`, `created_at`) VALUES 
('JUAN DAVID', 'CASTRO', 'juan.dv.castro02@gmail.com', '$2a$12$hN1HgS2yEk6E2avUhm7D2.et/MPOlYdbnqOIbPMIhWR20iQEpYVgO', '1', '1,2,3,4,5', '08:00:00', '18:00:00', current_timestamp());



INSERT INTO `product` (`cod`, `name`, `count`, `value`) VALUES 
('332524534','LECHE UNIDAD 900ML','37','3400'),
('32543564','HUEVO UNIDAD','50','800'),
('332524werwe4','HARINA UNIDAD 500MG','41','1600');