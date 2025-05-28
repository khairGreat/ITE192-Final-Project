-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: db1
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `astronauts`
--

DROP TABLE IF EXISTS `astronauts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `astronauts` (
  `astronaut_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `missions_completed` int(11) DEFAULT 0,
  `birth_date` date DEFAULT NULL,
  `special_skills` text DEFAULT NULL,
  PRIMARY KEY (`astronaut_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `astronauts`
--

LOCK TABLES `astronauts` WRITE;
/*!40000 ALTER TABLE `astronauts` DISABLE KEYS */;
INSERT INTO `astronauts` VALUES (1,'Al-khair ','Pama','pipino',1,'2025-05-21','Being Great at everything');
/*!40000 ALTER TABLE `astronauts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `celestial_bodies`
--

DROP TABLE IF EXISTS `celestial_bodies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `celestial_bodies` (
  `body_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `type` enum('star','planet','moon','asteroid','comet') NOT NULL,
  `diameter_km` decimal(12,2) DEFAULT NULL,
  `discovery_date` date DEFAULT NULL,
  `is_habitable` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`body_id`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `celestial_bodies`
--

LOCK TABLES `celestial_bodies` WRITE;
/*!40000 ALTER TABLE `celestial_bodies` DISABLE KEYS */;
INSERT INTO `celestial_bodies` VALUES (1,'Proxima Centauri b','planet',12000.50,'2016-08-24',1),(2,'Europa','moon',3121.60,'1610-01-08',0),(3,'Ceres','asteroid',939.40,'1801-01-01',0),(4,'Halley\'s Comet','comet',11.00,'1758-12-25',0),(5,'Kepler-22b','planet',24000.00,'2011-12-05',1),(6,'Titan','moon',5150.00,'1655-03-25',0),(7,'Betelgeuse','star',887000000.00,NULL,0),(8,'Makemake','planet',1430.00,'2005-03-31',0),(9,'TRAPPIST-1d','planet',7160.00,'2017-02-22',1),(10,'Haumea','planet',1960.00,'2004-12-28',0),(11,'Enceladus','moon',504.20,'1789-08-28',0),(12,'Ganymede','moon',5268.20,'1610-01-07',0),(13,'Venus','planet',12104.00,NULL,0),(14,'Apophis','asteroid',375.00,'2004-06-19',0),(15,'Eros','asteroid',16.84,'1898-08-13',0),(16,'TRAPPIST-1e','planet',5810.00,'2017-02-22',1),(17,'Callisto','moon',4821.60,'1610-01-07',0),(18,'Vega','star',2430000000.00,NULL,0),(19,'Orcus','planet',917.00,'2004-02-17',0),(20,'Sedna','planet',995.00,'2003-11-14',0),(21,'Aetheria','planet',12345.67,'1995-03-15',0),(22,'Thalos','asteroid',214.53,'1982-10-11',0),(23,'Zephara','moon',349.29,'2005-01-26',0),(24,'Elyra','star',1392000.00,'1901-06-04',0),(25,'Draconis','comet',12.50,'2010-07-20',0),(26,'Hedra','planet',6578.45,'1990-05-02',1),(27,'Cryon','moon',1248.20,'1974-12-09',0),(28,'Voltar','planet',10123.50,'2000-02-02',0),(29,'Lumina','star',1523400.00,'1889-08-12',0),(30,'Nivara','asteroid',330.00,'1998-11-30',0),(31,'Xerion','comet',18.70,'2003-03-18',0),(32,'Polaris','star',1540000.00,'1843-07-15',0),(33,'Zenith','planet',8899.80,'1988-09-01',0),(34,'Eon','moon',229.45,'1999-12-21',0),(35,'Lunaris','moon',273.00,'2007-06-30',0),(36,'Ryloth','planet',13200.55,'1980-03-25',1),(37,'Auralis','comet',10.40,'2015-04-18',0),(38,'Caldras','asteroid',197.70,'1972-10-10',0),(39,'Boreas','moon',430.00,'2002-05-08',0),(40,'Orionis','star',1700000.00,'1777-11-11',0),(41,'Zantra','planet',7450.20,'1991-01-01',0),(42,'Herculis','star',1480000.00,'1865-02-16',0),(43,'Aegir','moon',580.90,'2011-08-08',0),(44,'Seraphis','planet',10222.60,'2004-04-04',0),(45,'Ymir','asteroid',148.00,'1960-10-10',0),(46,'Solara','star',1500000.00,'1500-05-05',0),(47,'Vega','star',1470000.00,'1850-03-03',0),(48,'Kryos','comet',21.00,'1993-07-23',0),(49,'Zorith','planet',11780.00,'1978-06-14',0),(50,'Nyx','moon',330.30,'2006-01-01',0),(51,'Helion','star',1550000.00,'1899-09-09',0),(52,'Kaelis','planet',9276.45,'2008-08-08',0),(53,'Targus','asteroid',320.10,'1996-03-30',0),(54,'Nerida','moon',411.12,'2001-11-01',0),(55,'Celestra','planet',11880.75,'1997-07-07',0),(56,'Zindra','comet',16.60,'2012-12-12',0),(57,'Varion','moon',478.88,'1987-10-20',0),(58,'Ilyra','asteroid',214.00,'1975-05-05',0),(59,'Brontes','planet',10230.99,'2009-09-09',0),(60,'Astera','comet',14.10,'2006-06-06',0),(61,'Eros','asteroid',260.00,'1966-06-06',0),(62,'Tyra','moon',340.23,'2000-04-17',0),(63,'Oberon','planet',12400.00,'1992-02-02',1),(64,'Nysa','asteroid',270.12,'1983-03-03',0),(65,'Vortan','moon',369.90,'2003-03-03',0),(66,'Jovion','planet',13900.00,'1985-08-08',0),(67,'Skotia','comet',11.90,'2013-07-07',0),(68,'Halion','star',1420000.00,'1822-02-22',0),(69,'Orbis','planet',9600.00,'1994-04-04',0),(70,'Drelia','moon',350.75,'2007-07-07',0),(71,'Aetheria','planet',12345.67,'1995-03-15',0),(72,'Thalos','asteroid',214.53,'1982-10-11',0),(73,'Zephara','moon',349.29,'2005-01-26',0),(74,'Elyra','star',1392000.00,'1901-06-04',0),(75,'Draconis','comet',12.50,'2010-07-20',0),(76,'Hedra','planet',6578.45,'1990-05-02',1),(77,'Cryon','moon',1248.20,'1974-12-09',0),(78,'Voltar','planet',10123.50,'2000-02-02',0),(79,'Lumina','star',1523400.00,'1889-08-12',0),(80,'Nivara','asteroid',330.00,'1998-11-30',0),(81,'Xerion','comet',18.70,'2003-03-18',0),(82,'Polaris','star',1540000.00,'1843-07-15',0),(83,'Zenith','planet',8899.80,'1988-09-01',0),(84,'Eon','moon',229.45,'1999-12-21',0),(85,'Lunaris','moon',273.00,'2007-06-30',0),(86,'Ryloth','planet',13200.55,'1980-03-25',1),(87,'Auralis','comet',10.40,'2015-04-18',0),(88,'Caldras','asteroid',197.70,'1972-10-10',0),(89,'Boreas','moon',430.00,'2002-05-08',0),(90,'Orionis','star',1700000.00,'1777-11-11',0),(91,'Zantra','planet',7450.20,'1991-01-01',0),(92,'Herculis','star',1480000.00,'1865-02-16',0),(93,'Aegir','moon',580.90,'2011-08-08',0),(94,'Seraphis','planet',10222.60,'2004-04-04',0),(95,'Ymir','asteroid',148.00,'1960-10-10',0),(96,'Solara','star',1500000.00,'1500-05-05',0),(97,'Vega','star',1470000.00,'1850-03-03',0),(98,'Kryos','comet',21.00,'1993-07-23',0),(99,'Zorith','planet',11780.00,'1978-06-14',0),(100,'Nyx','moon',330.30,'2006-01-01',0),(101,'Helion','star',1550000.00,'1899-09-09',0),(102,'Kaelis','planet',9276.45,'2008-08-08',0),(103,'Targus','asteroid',320.10,'1996-03-30',0),(104,'Nerida','moon',411.12,'2001-11-01',0),(105,'Celestra','planet',11880.75,'1997-07-07',0),(106,'Zindra','comet',16.60,'2012-12-12',0),(107,'Varion','moon',478.88,'1987-10-20',0),(108,'Ilyra','asteroid',214.00,'1975-05-05',0),(109,'Brontes','planet',10230.99,'2009-09-09',0),(110,'Astera','comet',14.10,'2006-06-06',0),(111,'Eros','asteroid',260.00,'1966-06-06',0),(112,'Tyra','moon',340.23,'2000-04-17',0),(113,'Oberon','planet',12400.00,'1992-02-02',1),(114,'Nysa','asteroid',270.12,'1983-03-03',0),(115,'Vortan','moon',369.90,'2003-03-03',0),(116,'Jovion','planet',13900.00,'1985-08-08',0),(117,'Skotia','comet',11.90,'2013-07-07',0),(118,'Halion','star',1420000.00,'1822-02-22',0),(119,'Orbis','planet',9600.00,'1994-04-04',0),(120,'Drelia','moon',350.75,'2007-07-07',0),(121,'Aetheria','planet',12345.67,'1995-03-15',0),(122,'Thalos','asteroid',214.53,'1982-10-11',0),(123,'Zephara','moon',349.29,'2005-01-26',0),(124,'Elyra','star',1392000.00,'1901-06-04',0),(125,'Draconis','comet',12.50,'2010-07-20',0),(126,'Hedra','planet',6578.45,'1990-05-02',1),(127,'Cryon','moon',1248.20,'1974-12-09',0),(128,'Voltar','planet',10123.50,'2000-02-02',0),(129,'Lumina','star',1523400.00,'1889-08-12',0),(130,'Nivara','asteroid',330.00,'1998-11-30',0),(131,'Xerion','comet',18.70,'2003-03-18',0),(132,'Polaris','star',1540000.00,'1843-07-15',0),(133,'Zenith','planet',8899.80,'1988-09-01',0),(134,'Eon','moon',229.45,'1999-12-21',0),(135,'Lunaris','moon',273.00,'2007-06-30',0),(136,'Ryloth','planet',13200.55,'1980-03-25',1),(137,'Auralis','comet',10.40,'2015-04-18',0),(138,'Caldras','asteroid',197.70,'1972-10-10',0),(139,'Boreas','moon',430.00,'2002-05-08',0),(140,'Orionis','star',1700000.00,'1777-11-11',0),(141,'Zantra','planet',7450.20,'1991-01-01',0),(142,'Herculis','star',1480000.00,'1865-02-16',0),(143,'Aegir','moon',580.90,'2011-08-08',0),(144,'Seraphis','planet',10222.60,'2004-04-04',0),(145,'Ymir','asteroid',148.00,'1960-10-10',0),(146,'Solara','star',1500000.00,'1500-05-05',0),(147,'Vega','star',1470000.00,'1850-03-03',0),(148,'Kryos','comet',21.00,'1993-07-23',0),(149,'Zorith','planet',11780.00,'1978-06-14',0),(150,'Nyx','moon',330.30,'2006-01-01',0),(151,'Helion','star',1550000.00,'1899-09-09',0),(152,'Kaelis','planet',9276.45,'2008-08-08',0),(153,'Targus','asteroid',320.10,'1996-03-30',0),(154,'Nerida','moon',411.12,'2001-11-01',0),(155,'Celestra','planet',11880.75,'1997-07-07',0),(156,'Zindra','comet',16.60,'2012-12-12',0),(157,'Varion','moon',478.88,'1987-10-20',0),(158,'Ilyra','asteroid',214.00,'1975-05-05',0),(159,'Brontes','planet',10230.99,'2009-09-09',0),(160,'Astera','comet',14.10,'2006-06-06',0),(161,'Eros','asteroid',260.00,'1966-06-06',0),(162,'Tyra','moon',340.23,'2000-04-17',0),(163,'Oberon','planet',12400.00,'1992-02-02',1),(164,'Nysa','asteroid',270.12,'1983-03-03',0),(165,'Vortan','moon',369.90,'2003-03-03',0),(166,'Jovion','planet',13900.00,'1985-08-08',0),(167,'Skotia','comet',11.90,'2013-07-07',0),(168,'Halion','star',1420000.00,'1822-02-22',0),(169,'Orbis','planet',9600.00,'1994-04-04',0),(170,'Drelia','moon',350.75,'2007-07-07',0),(171,'Aetheria','planet',12345.67,'1995-03-15',0),(172,'Thalos','asteroid',214.53,'1982-10-11',0),(173,'Zephara','moon',349.29,'2005-01-26',0),(174,'Elyra','star',1392000.00,'1901-06-04',0),(175,'Draconis','comet',12.50,'2010-07-20',0),(176,'Hedra','planet',6578.45,'1990-05-02',1),(177,'Cryon','moon',1248.20,'1974-12-09',0),(178,'Voltar','planet',10123.50,'2000-02-02',0),(179,'Lumina','star',1523400.00,'1889-08-12',0),(180,'Nivara','asteroid',330.00,'1998-11-30',0),(181,'Xerion','comet',18.70,'2003-03-18',0),(182,'Polaris','star',1540000.00,'1843-07-15',0),(183,'Zenith','planet',8899.80,'1988-09-01',0),(184,'Eon','moon',229.45,'1999-12-21',0),(185,'Lunaris','moon',273.00,'2007-06-30',0),(186,'Ryloth','planet',13200.55,'1980-03-25',1),(187,'Auralis','comet',10.40,'2015-04-18',0),(188,'Caldras','asteroid',197.70,'1972-10-10',0),(189,'Boreas','moon',430.00,'2002-05-08',0),(190,'Orionis','star',1700000.00,'1777-11-11',0),(191,'Zantra','planet',7450.20,'1991-01-01',0),(192,'Herculis','star',1480000.00,'1865-02-16',0),(193,'Aegir','moon',580.90,'2011-08-08',0),(194,'Seraphis','planet',10222.60,'2004-04-04',0),(195,'Ymir','asteroid',148.00,'1960-10-10',0),(196,'Solara','star',1500000.00,'1500-05-05',0),(197,'Vega','star',1470000.00,'1850-03-03',0),(198,'Kryos','comet',21.00,'1993-07-23',0),(199,'Zorith','planet',11780.00,'1978-06-14',0),(200,'Nyx','moon',330.30,'2006-01-01',0),(201,'Helion','star',1550000.00,'1899-09-09',0),(202,'Kaelis','planet',9276.45,'2008-08-08',0),(203,'Targus','asteroid',320.10,'1996-03-30',0),(204,'Nerida','moon',411.12,'2001-11-01',0),(205,'Celestra','planet',11880.75,'1997-07-07',0),(206,'Zindra','comet',16.60,'2012-12-12',0),(207,'Varion','moon',478.88,'1987-10-20',0),(208,'Ilyra','asteroid',214.00,'1975-05-05',0),(209,'Brontes','planet',10230.99,'2009-09-09',0),(210,'Astera','comet',14.10,'2006-06-06',0),(211,'Eros','asteroid',260.00,'1966-06-06',0),(212,'Tyra','moon',340.23,'2000-04-17',0),(213,'Oberon','planet',12400.00,'1992-02-02',1),(214,'Nysa','asteroid',270.12,'1983-03-03',0),(215,'Vortan','moon',369.90,'2003-03-03',0),(216,'Jovion','planet',13900.00,'1985-08-08',0),(217,'Skotia','comet',11.90,'2013-07-07',0),(218,'Halion','star',1420000.00,'1822-02-22',0),(219,'Orbis','planet',9600.00,'1994-04-04',0),(220,'Drelia','moon',350.75,'2007-07-07',0);
/*!40000 ALTER TABLE `celestial_bodies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `db1_table1`
--

DROP TABLE IF EXISTS `db1_table1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `db1_table1` (
  `message` varchar(250) NOT NULL,
  `ok` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `db1_table1`
--

LOCK TABLES `db1_table1` WRITE;
/*!40000 ALTER TABLE `db1_table1` DISABLE KEYS */;
/*!40000 ALTER TABLE `db1_table1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space_missions`
--

DROP TABLE IF EXISTS `space_missions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `space_missions` (
  `mission_id` int(11) NOT NULL AUTO_INCREMENT,
  `mission_name` varchar(100) NOT NULL,
  `launch_date` date NOT NULL,
  `organization` varchar(100) DEFAULT NULL,
  `budget_millions` decimal(10,2) DEFAULT NULL,
  `is_successful` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`mission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space_missions`
--

LOCK TABLES `space_missions` WRITE;
/*!40000 ALTER TABLE `space_missions` DISABLE KEYS */;
/*!40000 ALTER TABLE `space_missions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password_hash` text NOT NULL,
  `salt` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-28 19:50:07
