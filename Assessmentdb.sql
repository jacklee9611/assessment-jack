-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: assessment-jacklee
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productImage` varchar(255) NOT NULL,
  `productBrand` varchar(255) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productBarcode` bigint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-14436/BXMJ%20----SL-1000x1000.jpg','Lenovo','Legion 5 15ARH7',273645364756,'2023-09-24 11:21:02','2023-09-25 19:36:30'),(12,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-15722/AC-A315-24P-R6GK-----SL-900x900.jpg','Acer','ASPIRE 3 A315',827477736253,'2023-09-24 18:48:58','2023-09-24 20:05:16'),(13,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-16534/FA507X-ULP038W-SL-900x900.jpg','Asus','TUF A15 FA507X',447482624284,'2023-09-24 21:44:28','2023-09-24 23:58:15'),(14,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-16544/UX3404V-CM9087WS-SL-900x900.jpg','Asus','ZENBOOK 14X OLED',380779583062,'2023-09-24 21:45:55','2023-09-24 21:45:55'),(15,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-16789/HP-OMEN-16-XF0028AX-CVR-1000x1000.jpg','HP','OMEN 16 XF0027AX',810581060318,'2023-09-25 00:14:55','2023-09-25 00:14:55'),(16,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-13057/A416E-AEK1250WS---2-900x900.jpg','Asus','14 A416E-AEK',774924095399,'2023-09-25 00:18:37','2023-09-25 00:18:37'),(17,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-17018/B1400C-EAEEK2273R_CVR-1000x1000.jpg','Asus','EXPERTBOOK B1',414419621322,'2023-09-25 00:21:51','2023-09-25 00:21:51'),(18,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-14316/AS-B3000DQ1-AHT0021X----1-900x900.jpg','Asus','EXPERTBOOK B3',504710834302,'2023-09-25 00:23:12','2023-09-25 00:23:12'),(19,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-14228/AC-PH315-55-71WH----SL-1000x1000.jpg','Acer','PREDATOR HELIOS 300',956125367807,'2023-09-25 00:24:21','2023-09-25 00:24:21'),(20,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-15724/AC-SF314-43-R3R9-----SL-900x900.jpg','Acer','SWIFT 3 SF314',888067125650,'2023-09-25 00:24:58','2023-09-25 00:24:58'),(21,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-14815/SFA16-41-R4QB----SL-1000x1000.jpg','Acer','SWIFT EDGE SFA16',252138973247,'2023-09-25 00:25:47','2023-09-25 00:25:47'),(22,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-13886/SFX14-42G-R8Y5%20---SL-1000x1000.jpg','Acer','SWIFT X SFX14-42G',122056967775,'2023-09-25 00:26:50','2023-09-25 00:26:50'),(23,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-15669/DMS-HP-440-G3----SL-900x900.jpg','HP','PROBOOK 440 G3',211208917181,'2023-09-25 00:27:45','2023-09-25 00:27:45'),(24,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-16173/HP-14-EP0039TU----SL-900x900.jpg','HP','14-EP0039TU',890282361274,'2023-09-25 00:29:01','2023-09-25 00:29:01'),(25,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-17031/HP-OMEN-16-U0064TX-CVR-1000x1000.jpg','HP','OMEN 16-U0064TX',774106997142,'2023-09-25 00:29:54','2023-09-25 00:29:54'),(26,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-17030/HP-OMEN-16-WF0120TX-CVR-1000x1000.jpg','HP','OMEN 16-WF0120TX',411016453067,'2023-09-25 00:30:32','2023-09-25 00:30:32'),(27,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-13973/BXMJ%20----SL-1000x1000.jpg','Lenovo','LEGION 7 16ITHG6',342943295646,'2023-09-25 00:32:13','2023-09-25 00:32:13'),(28,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-13930/20VH0044MY----SL-1000x1000.jpg','Lenovo','THINKPAD L13 GEN 2',552506551544,'2023-09-25 00:33:02','2023-09-25 00:33:02'),(29,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-16759/LNV-G8-CU00%20-%20CVR-1000x1000.jpg','Lenovo','THINKPAD X1 CARBON',959900192447,'2023-09-25 00:34:17','2023-09-25 00:34:17'),(30,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-13517/T15G-0S00-----SL-1000x1000.jpg','Lenovo','THINKPAD T15G GEN 2',377794079830,'2023-09-25 00:34:49','2023-09-25 00:34:49'),(31,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-16741/GV302X-UMU002W-CVR-1000x1000.jpg','Asus','ROG FLOW X13',309394419929,'2023-09-25 00:36:18','2023-09-25 00:36:18'),(32,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-13359/G513I-MHN134W---SL-1000x1000.jpg','Asus','ROG STRIX G15',170353429743,'2023-09-25 00:37:18','2023-09-25 00:37:18'),(33,'https://www.ect.my/image/ectmy/image/cache/data/all_product_images/product-12248/Dell-Alienware--M15-R5-M15-581656G-3060-W10_2-900x900.jpg','Dell','ALIENWARE M15 R5',708808558332,'2023-09-25 18:11:47','2023-09-25 18:11:47');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-26  4:54:05
