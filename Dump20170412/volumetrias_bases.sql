-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: volumetrias
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bases`
--

DROP TABLE IF EXISTS `bases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) DEFAULT NULL,
  `unidad` varchar(100) DEFAULT NULL,
  `vigencia_descr` varchar(100) DEFAULT NULL,
  `estatus` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bases`
--

LOCK TABLES `bases` WRITE;
/*!40000 ALTER TABLE `bases` DISABLE KEYS */;
INSERT INTO `bases` VALUES (1,1000,'timbres','Mensuales',1),(2,2500,'timbres','Mensuales',1),(3,36000,'Timbres','Anuales',1),(4,10000,'timbres','Mensuales',1),(5,NULL,'timbres','Anuales',1),(6,12000,'Timbres','Anuales',1),(7,450,'Timbres','Mensuales',1),(8,NULL,'Timbres','Mensuales',1),(9,3000,'Validaciones','Mensuales',1),(10,700,'Validaciones','Mensuales',1),(11,700,'Validaciones','Mensuales',1),(12,500,'Validaciones','Mensuales',1),(13,10000,'Validaciones','Mensuales',1),(14,NULL,'Facturas','Mensuales',1),(15,2300,'Facturas','Mensuales',1),(16,NULL,'Facturas','Mensuales',1),(17,NULL,'Facturas','Mensuales',1),(18,1000,'Facturas','Mensuales',1),(19,700,'Facturas','Mensuales',1),(20,NULL,'Facturas','Mensuales',1),(21,700,'Facturas','Mensuales',1),(22,1500,'Validaciones','Mensuales',1),(23,40000,'Validaciones','Mensuales',1),(24,15000,'Recibos de nómina','Mensuales',1),(25,NULL,'Validaciones','Mensuales',1),(26,NULL,'Validaciones','mensuales',1),(27,NULL,'Validaciones','mensuales',1),(28,NULL,'Recibos de Nómina','mensuales',1),(29,NULL,'Facturas','mensuales',1),(30,15000,'Facturas','mensuales',1),(31,NULL,'Facturas','mensuales',1),(32,NULL,'Facturas','mensuales',1),(33,15000,'Facturas','mensuales',1),(34,NULL,'Facturas','mensuales',1),(35,NULL,'Facturas','anuales',1),(36,NULL,'Facturas','anuales',1),(37,20000,'Facturas','mensuales',1),(38,3500,'Facturas','mensuales',1),(39,NULL,'Facturas','anuales',1),(40,1500,'Facturas','mensuales',1),(41,NULL,'Facturas','anuales',1),(42,NULL,'Facturas','anuales',1),(43,NULL,'validaciones','anuales',1),(44,100,'usuarios','mensuales',1),(45,170,'usuarios','mensuales',1),(46,1000,'usuarios','mensuales',1),(47,2000,'usuarios','mensuales',1),(48,250,'usuarios','mensuales',1),(49,1000,'timbres','anuales',1),(50,50,'flujos','mensuales',1),(51,36000,'timbres','Anuales',1),(52,NULL,'facturas','Anuales',1),(53,1000000,'timbres','Mensuales',1),(54,NULL,'Facturas','Mensuales',1),(56,100,'validaciones','mensuales',1);
/*!40000 ALTER TABLE `bases` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-12 17:23:16
