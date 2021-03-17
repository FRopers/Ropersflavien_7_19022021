-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 17 mars 2021 à 11:08
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_post` int NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lien_comment_user` (`id_user`) USING BTREE,
  KEY `lien_comment_post` (`id_post`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `id_user`, `id_post`, `comment`) VALUES
(67, 1, 147, 'Superbe\n'),
(68, 98, 147, 'BOF\n');

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `url_image` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lien_post_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `id_user`, `text`, `url_image`) VALUES
(147, 97, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut sodales velit, eu molestie ante. Praesent pellentesque eu erat sed malesuada. Mauris gravida neque vitae dictum consequat. Maecenas et nisl eget nibh luctus iaculis. Nullam volutpat nisi massa, sit amet gravida velit tristique at. Sed vel bibendum nisl, aliquet euismod quam. Nam ornare lectus in lacus tempor, eu lobortis erat volutpat. Nam id mi consectetur, dictum felis a, aliquam sapien. Proin mollis aliquet justo, sagittis luctus nunc gravida ac. Duis vel dapibus ipsum. Aliquam erat volutpat. ', 'http://localhost:3000/images/Les_plus_belles_îles_de_Bretagne1615918632563.png'),
(148, 74, 'Donec imperdiet vehicula consectetur. Vivamus ut elit nec massa faucibus suscipit ut ut metus. Fusce sed malesuada ante. In faucibus facilisis lacus sed dictum. Duis finibus velit ante, ac porttitor nulla porttitor eu. Sed vitae luctus orci, non consequat ligula. Quisque consectetur non diam non pharetra. Aliquam et turpis eget ante vestibulum ultricies in a libero. ', NULL),
(149, 98, 'Ut vel tincidunt est. Sed mauris risus, porttitor et purus a, pretium maximus ante. Pellentesque nec sapien dignissim, ultricies eros sit amet, scelerisque odio. Nulla id ultrices nisl.', 'http://localhost:3000/images/La_Hija_De_Tony_Stark_(SOY_UNA_VENGADORA)__-Pausada-1615919168523.gif');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pseudo` varchar(30) NOT NULL,
  `avatar` varchar(512) DEFAULT NULL,
  `privilege` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `pseudo` (`pseudo`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `pseudo`, `avatar`, `privilege`) VALUES
(1, 'flavien@test.fr', '$2b$10$/NbDvrghqhtjNNBrS4.tlu6NzBEqR5BNqvHCmS7fUXmOAqWF.O2Sm', 'Flavien', 'http://localhost:3000/images/admin1615661277124.jpeg', 'ADMIN'),
(74, 'josh29@test.fr', '$2b$10$6QGS8TnfL0KdLFlXDKuzJ.cFQawapuCSiWB5Kc4i//r8/IzzZrTgq', 'josh29', 'http://localhost:3000/images/josh_logo16152979716281615834453524.jpeg', 'user'),
(97, 'laure@test.fr', '$2b$10$MKA1uOqo23F7DJ.AzfF4h.of0NDOs2KSV/6AA7CFamRU/EpBEMH0W', 'Laure', 'http://localhost:3000/images/avatar_chat1615836031767.jpeg', 'user'),
(98, 'marc@test.fr', '$2b$10$ZBcKhovCjtj2CcO9r4Rw9.sLLfCwEgNEhQk66dnCGYm.r434QqYfC', 'Marc', 'http://localhost:3000/images/girafe1615838306499.jpeg', 'user'),
(108, 'julien@test.fr', '$2b$10$X2p3mYLJEJPTv0lje7NkNeeGHeL1ai.fHe4eSHWV.szAcng15.ApS', 'julien', 'http://localhost:3000/images/default-user-image.png', 'user'),
(109, 'sophie@test.fr', '$2b$10$OPDoqZVz8NaSai4BOMJQpu3.yPpng3wOCxK631NLLuxtjJHk7sw6i', 'sophie', 'http://localhost:3000/images/default-user-image.png', 'user');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `lien_comment_post` FOREIGN KEY (`id_post`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lien_comment_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `lien_post_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
