CREATE DATABASE  IF NOT EXISTS `music_streaming_service` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `music_streaming_service`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: music_streaming_service
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `cover_img` varchar(255) DEFAULT NULL,
  `created_at` date NOT NULL,
  `upload_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `album_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,1,'Deluxe','https://www.edsheeran.com/sites/g/files/g2000006291/f/201703/Pack-Shot_0.jpg','2020-09-04','2020-09-04'),(2,2,'The Marshal Mathers LP2','https://images-na.ssl-images-amazon.com/images/I/91E0tsoLNrL._SL1500_.jpg','2013-08-05','2013-08-05');
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cover_img` varchar(255) DEFAULT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (1,'Ed Sheeran','https://www.grammy.com/sites/com/files/styles/image_landscape_hero/public/muzooka/Ed%2BSheeran/Ed%2520Sheeran_16_9_1594056949.jpg?itok=F7EpGZMg','2006-08-08'),(2,'Eminem','https://upload.wikimedia.org/wikipedia/commons/4/4a/Eminem_-_Concert_for_Valor_in_Washington%2C_D.C._Nov._11%2C_2014_%282%29_%28Cropped%29.jpg','2007-08-08');
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_playlists`
--

DROP TABLE IF EXISTS `my_playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `playlist_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `playlist_id` (`playlist_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `my_playlists_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`),
  CONSTRAINT `my_playlists_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_playlists`
--

LOCK TABLES `my_playlists` WRITE;
/*!40000 ALTER TABLE `my_playlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `my_playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cover_img` varchar(255) DEFAULT NULL,
  `created_at` date NOT NULL,
  `upload_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES (1,'Favourites','https://i.pinimg.com/474x/90/e3/41/90e34121229253d293dcd6e8e40b6f44.jpg','2020-09-19','2020-09-19'),(2,'Gym','https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e8cb5029890001.560961917016e.png','2020-09-19','2020-09-19');
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_songs`
--

DROP TABLE IF EXISTS `playlist_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `song_id` int NOT NULL,
  `playlist_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `song_id` (`song_id`),
  KEY `playlist_id` (`playlist_id`),
  CONSTRAINT `playlist_songs_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`),
  CONSTRAINT `playlist_songs_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_songs`
--

LOCK TABLES `playlist_songs` WRITE;
/*!40000 ALTER TABLE `playlist_songs` DISABLE KEYS */;
INSERT INTO `playlist_songs` VALUES (1,1,1),(2,3,1),(3,5,1),(4,7,1),(5,9,1),(6,11,1),(7,13,1),(8,15,1),(9,17,1),(10,19,1),(11,21,1),(12,23,1),(13,25,1),(14,27,1),(15,29,1),(16,2,2),(17,4,2),(18,6,2),(19,7,2),(20,10,2),(21,12,2),(22,14,2),(23,16,2),(24,18,2),(25,20,2),(26,22,2),(27,24,2),(28,26,2),(29,28,2),(30,30,2);
/*!40000 ALTER TABLE `playlist_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song` (
  `id` int NOT NULL AUTO_INCREMENT,
  `youtube_link` varchar(255) NOT NULL,
  `album_id` int NOT NULL,
  `artist_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `length` int NOT NULL,
  `track_number` int NOT NULL,
  `lyrics` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `upload_at` date NOT NULL,
  `likes` int NOT NULL,
  `play_count` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `song_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`),
  CONSTRAINT `song_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` VALUES (1,'OjGrcJ4lZCc',1,1,'Eraser',227,1,'lyrics','2020-09-04','2020-09-04',355488,57651819),(2,'K0ibBPhiaG0',1,1,'Castle On The Hill',288,2,'lyrics','2020-09-04','2020-09-04',2481828,422619362),(3,'Wv2rLZmbPMA',1,1,'Dive',238,3,'lyrics','2020-09-04','2020-09-04',833814,196676306),(4,'JGwWNGJdvx8',1,1,'Shape of You',263,4,'lyrics','2020-09-04','2020-09-04',24282787,4978082415),(5,'2Vv-BfVoq4g',1,1,'Perfect',279,5,'lyrics','2020-09-04','2020-09-04',13538704,2542976929),(6,'87gWaABqGYs',1,1,'Galway Girl',199,6,'lyrics','2020-09-04','2020-09-04',3326478,491903465),(7,'iWZmdoY1aTE',1,1,'Happier',215,7,'lyrics','2020-09-04','2020-09-04',2491765,335072736),(8,'EwzD8U4u76k',1,1,'New Man',189,8,'lyrics','2020-09-04','2020-09-04',300242,62909069),(9,'20pAJPNaAyw',1,1,'Hearts Don\'t Break Around Here',248,9,'lyrics','2020-09-04','2020-09-04',247922,59304757),(10,'6B9J3lEyffA',1,1,'What Do I Know?',237,10,'lyrics','2020-09-04','2020-09-04',481723,101077046),(11,'ZZMZiBCRX4c',1,1,'How Would You Feel?',280,11,'lyrics','2020-09-04','2020-09-04',350874,103316981),(12,'bIB8EWqCPrQ',1,1,'Supermarket Flowers',221,12,'lyrics','2020-09-04','2020-09-04',665556,128767680),(13,'OVO4LhrOFiY',1,1,'Barcelona',191,13,'lyrics','2020-09-04','2020-09-04',306550,57620445),(14,'7t3Re2VIbHE',1,1,'Bibia Be Ye Ye',167,14,'lyrics','2020-09-04','2020-09-04',891218,59408896),(15,'VFlZXlfda6Y',1,1,'Nancy Mulligan',179,15,'lyrics','2020-09-04','2020-09-04',473885,96972448),(16,'qXM0JdAwabU',1,1,'Save Myself',247,16,'lyrics','2020-09-04','2020-09-04',359995,60441677),(17,'NFtsBBXDrGs',2,2,'Bad Guy',434,1,'lyrics','2013-08-05','2013-08-05',43432,4576131),(18,'cZByUMZba-s',2,2,'Parking Lot (Skit)',55,2,'lyrics','2013-08-05','2013-08-05',2071,459066),(19,'xGoggPk6Jr4',2,2,'Rhyme Or Reason',301,3,'lyrics','2013-08-05','2013-08-05',12672,1002244),(20,'CFIqmoqfFb0',2,2,'So Much Better',261,4,'lyrics','2013-08-05','2013-08-05',11175,910378),(21,'NlmezywdxPI',2,2,'Survival',271,5,'lyrics','2013-08-05','2013-08-05',1378009,164851250),(22,'GBIi2vhPgEM',2,2,'Legacy',296,6,'lyrics','2013-08-05','2013-08-05',30168,2316790),(23,'gIBPB4kyQi8',2,2,'Asshole',289,7,'lyrics','2013-08-05','2013-08-05',9666,762359),(24,'ab9176Srb5Y',2,2,'Berzerk',260,8,'lyrics','2013-08-05','2013-08-05',1834704,249219304),(25,'XbGs_qK2PQA',2,2,'Rap God',369,9,'lyrics','2013-08-05','2013-08-05',13935905,1106071791),(26,'YW66sMK1Rf0',2,2,'Brainless',286,10,'lyrics','2013-08-05','2013-08-05',13703,1002989),(27,'S_qygsy7kuY',2,2,'Stronger Than I Was',336,11,'lyrics','2013-08-05','2013-08-05',19772,1509276),(28,'EHkozMIXZ8w',2,2,'The Monster',318,12,'lyrics','2013-08-05','2013-08-05',4380676,724478586),(29,'s5XL582xcJM',2,2,'So Far...',317,13,'lyrics','2013-08-05','2013-08-05',9740,618858),(30,'tIWUkeSjzH8',2,2,'Love Game',296,14,'lyrics','2013-08-05','2013-08-05',10343,600441),(31,'7bDLIV96LD4',2,2,'Headlights',250,15,'lyrics','2013-08-05','2013-08-05',1084579,123258589),(32,'P-SyH04QKGU',2,2,'Evil Twin (Skit)',455,16,'lyrics','2013-08-05','2013-08-05',5543,442790);
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'music_streaming_service'
--
/*!50003 DROP PROCEDURE IF EXISTS `find_album` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `find_album`(id_album INT)
BEGIN
SELECT album.id, album.artist_id, album.name, album.cover_img, album.created_at, album.upload_at, artist.name AS artist_name FROM album
JOIN song ON album.id= song.album_id
JOIN artist ON artist.id = album.artist_id
WHERE album_id = id_album
GROUP BY album.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `find_album_songs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `find_album_songs`(id_album INT)
BEGIN
SELECT song.id, youtube_link, album_id, song.artist_id, title, length, track_number, lyrics, song.created_at, song.upload_at, likes, play_count, artist.name AS artist_name, album.name AS album_name FROM album
    JOIN song ON album.id= song.album_id
    JOIN artist ON artist.id = song.artist_id
    WHERE album_id = id_album;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `find_artist_albums` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `find_artist_albums`(id_artist INT)
BEGIN
SELECT album.id, album.artist_id, album.name, album.cover_img, album.created_at, album.upload_at FROM artist
    JOIN album ON album.artist_id = artist.id
    WHERE artist.id= id_artist;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `find_artist_songs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `find_artist_songs`(id_artist INT)
BEGIN
SELECT song.id, youtube_link, album_id, song.artist_id, title, length, track_number, lyrics, song.created_at, song.upload_at, likes, play_count, artist.name AS artist_name, album.name AS album_name FROM artist
    JOIN song ON song.artist_id = artist.id
    JOIN album ON album.artist_id = artist.id
    WHERE artist.id = id_artist;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `find_song` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `find_song`(song_id VARCHAR(11))
BEGIN
IF(CHAR_LENGTH(song_id) = 11) THEN 
	SELECT song.id, youtube_link, album_id, artist_id, title, length, track_number, lyrics, song.created_at, upload_at, likes, play_count, artist.name AS artist_name 
	FROM song 
	JOIN artist ON song.artist_id = artist.id
	WHERE youtube_link = song_id;
ELSE
	SELECT song.id, youtube_link, album_id, artist_id, title, length, track_number, lyrics, song.created_at, upload_at, likes, play_count, artist.name AS artist_name 
	FROM song 
	JOIN artist ON song.artist_id = artist.id
	WHERE song.id = song_id;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_albums` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_albums`()
BEGIN
	SELECT album.id, artist_id, album.name, album.cover_img, album.created_at, upload_at, artist.name AS artist_name FROM album
    JOIN artist ON artist.id = album.artist_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_songs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_songs`()
BEGIN
	SELECT song.id, youtube_link, album_id, song.artist_id, title, length, track_number, lyrics, song.created_at, song.upload_at, likes, play_count, album.name AS album_name, artist.name AS artist_name FROM song
	JOIN album ON song.album_id = album.id
	JOIN artist ON artist.id = song.artist_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_playlist_songs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_playlist_songs`(id_playlist INT)
BEGIN
SELECT song.id, youtube_link, album_id, song.artist_id, title, length, track_number, lyrics, song.created_at, song.upload_at, likes, play_count, album.name AS album_name, artist.name AS artist_name 
    FROM playlist
    JOIN playlist_songs ON playlist_songs.playlist_id = playlist.id
    JOIN song ON song.id = playlist_songs.song_id
    JOIN album ON album.id = song.album_id
    JOIN artist ON artist.id = song.artist_id
    WHERE playlist.id = id_playlist;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_top_albums` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_top_albums`()
BEGIN
SELECT album.id, album.artist_id, album.name, album.cover_img, album.created_at, album.upload_at, ROUND(SUM(song.likes)/COUNT(song.id)) AS likes, artist.name AS artist_name 
    FROM album 
    JOIN song ON song.album_id = album.id 
    JOIN artist ON album.artist_id = artist.id 
    GROUP BY album_id 
    ORDER BY likes 
    DESC LIMIT 20;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_top_artists` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_top_artists`()
BEGIN
SELECT artist.id, artist.name, artist.cover_img, artist.created_at, ROUND(SUM(song.likes)/COUNT(song.id)) AS likes 
FROM artist JOIN song ON song.artist_id = artist.id 
GROUP BY artist_id 
ORDER BY likes 
DESC LIMIT 20;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_top_playlists` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_top_playlists`()
BEGIN
SELECT playlist.id, playlist.name, playlist.cover_img, playlist.created_at, playlist.upload_at, ROUND(SUM(song.likes)/COUNT(song.id)) AS likes 
    FROM playlist 
    JOIN playlist_songs ON playlist.id = playlist_songs.playlist_id 
    JOIN song ON playlist_songs.song_id = song.id 
    GROUP BY playlist_id 
    ORDER BY ROUND(SUM(song.likes)/COUNT(song.id))
    DESC LIMIT 20;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_top_songs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_top_songs`()
BEGIN
SELECT song.id, youtube_link, album_id, song.artist_id, title, length, track_number, lyrics, song.created_at, song.upload_at, likes, play_count, artist.name AS artist_name, album.cover_img AS album_img FROM song
    JOIN artist ON song.artist_id = artist.id
    JOIN album ON song.album_id = album.id
    ORDER BY likes DESC LIMIT 20;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-22  9:45:15
