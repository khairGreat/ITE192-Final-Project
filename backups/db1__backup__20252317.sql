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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `celestial_bodies`
--

LOCK TABLES `celestial_bodies` WRITE;
/*!40000 ALTER TABLE `celestial_bodies` DISABLE KEYS */;
/*!40000 ALTER TABLE `celestial_bodies` ENABLE KEYS */;
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-24 19:06:51
