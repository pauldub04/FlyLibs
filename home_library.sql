-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 21, 2021 at 08:26 PM
-- Server version: 8.0.23-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `home_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `patronymic` varchar(100) DEFAULT NULL,
  `bio` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `name`, `surname`, `patronymic`, `bio`) VALUES
(1, 'Лев', 'Толстой', 'Николаевич', 'Лев Толстой — один из самых известных писателей и философов в мире. Его взгляды и убеждения легли в основу целого религиозно-философского течения, которое называют толстовством. Литературное наследие писателя составило 90 томов художественных и публицистических произведений, дневниковых заметок и писем, а самого его не раз номинировали на Нобелевскую премию по литературе и Нобелевскую премию мира.'),
(2, 'Фёдор', 'Достоевский', 'Михайлович', 'Федор Достоевский с детства мечтал стать писателем. Первый же его роман «Бедные люди» высоко оценили Николай Некрасов и Виссарион Белинский, а четыре поздних произведения вошли в список «100 лучших книг всех времен».'),
(3, 'Александр', 'Островский', 'Николаевич', 'Алекса́ндр Никола́евич Острóвский (31 марта [12 апреля] 1823 — 2 [14] июня 1886) — русский драматург, творчество которого стало важнейшим этапом развития русского национального театра[5]. В комедиях и социально-психологических драмах, составивших фундамент национального репертуара, он вывел галерею ярких и узнаваемых российских типов — от корыстолюбивых, своевластных и жестоких купцов, чиновников и помещиков до многочисленных слуг, приживалок, богомольных странников и лицемерных карьеристов. ');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int NOT NULL,
  `name` varchar(500) NOT NULL,
  `id_author` int NOT NULL,
  `id_genre` int NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `name`, `id_author`, `id_genre`, `description`, `image`) VALUES
(1, 'Война и мир', 1, 1, '«Война́ и мир» (рус. дореф. «Война и миръ») — роман-эпопея Льва Николаевича Толстого, описывающий русское общество в эпоху войн против Наполеона в 1805—1812 годах. Эпилог романа доводит повествование до 1820 года.', ''),
(2, 'Преступление и наказание', 2, 2, NULL, NULL),
(3, 'Гроза', 3, 15, '«Гроза» — пьеса Александра Николаевича Островского в пяти действиях, написанная в 1859 году, в обстановке предреформенного общественного подъёма[1][2]. Изображаемые автором события развертываются летом в вымышленном городе Калинове на Волге. Между третьим и четвёртым действиями пьесы проходит 10 дней. ', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Groza_1860.jpg/269px-Groza_1860.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `name`, `description`) VALUES
(1, 'роман-эпопея', 'роман-эпопея'),
(2, 'Роман', 'Роман'),
(3, 'Видения', 'Видения'),
(4, 'Новелла', 'Новелла'),
(5, 'Ода', 'Ода'),
(6, 'Опус', 'Опус'),
(7, 'Очерк', 'Очерк'),
(8, 'Поэма', 'Поэма'),
(9, 'Повесть', 'Повесть'),
(10, 'Пьеса', 'Пьеса'),
(11, 'Рассказ', 'Рассказ'),
(12, 'Роман', 'Роман'),
(13, 'Эссе', 'Эссе'),
(14, 'Эпос', 'Эпос'),
(15, 'Драма', 'Драма');

-- --------------------------------------------------------

--
-- Table structure for table `library`
--

CREATE TABLE `library` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `library`
--

INSERT INTO `library` (`id`, `id_user`, `name`, `description`, `image`) VALUES
(1, 1, 'Библиотека семьи Ивановых', 'test', NULL),
(2, 3, 'Библиотека семьи Карповых', NULL, NULL),
(3, 3, 'Простая библиотека', '', NULL),
(4, 2, 'Простая библиотека 2', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `id_publication` int NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `is_start` tinyint(1) NOT NULL,
  `is_end` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `id_user`, `id_publication`, `date_start`, `date_end`, `is_start`, `is_end`) VALUES
(1, 2, 1, '2021-04-11', '2021-04-30', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `id` int NOT NULL,
  `id_library` int NOT NULL,
  `cupboard` varchar(100) DEFAULT NULL,
  `shelf` int DEFAULT NULL,
  `pc` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`id`, `id_library`, `cupboard`, `shelf`, `pc`) VALUES
(1, 1, '1', 1, NULL),
(2, 2, 'Основной шкаф', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `publication`
--

CREATE TABLE `publication` (
  `id` int NOT NULL,
  `id_book` int NOT NULL,
  `id_library` int NOT NULL,
  `id_publisher` int NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `year_publishing` int NOT NULL,
  `id_place` int NOT NULL,
  `type` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publication`
--

INSERT INTO `publication` (`id`, `id_book`, `id_library`, `id_publisher`, `image`, `description`, `year_publishing`, `id_place`, `type`) VALUES
(1, 1, 1, 1, NULL, NULL, 2020, 1, 1),
(2, 2, 2, 2, NULL, NULL, 2005, 2, 0),
(3, 3, 1, 1, NULL, NULL, 2015, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `publisher`
--

CREATE TABLE `publisher` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `adress` varchar(1000) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publisher`
--

INSERT INTO `publisher` (`id`, `name`, `adress`, `description`) VALUES
(1, 'Эксмо', 'Издательство «ЭКСМО»\r\n123308, г. Москва, ул. Зорге, д.1, стр.1.', 'Издательство «Эксмо» — универсальное издательство № 1 в России, является одним из лидеров книжного рынка Европы.'),
(2, 'АСТ', NULL, 'Издательская группа «АСТ» — одно из двух крупнейших издательств России. Основано в 1990 году как ТКО \"АСТ\". Является универсальным издательством: выпускает художественную литературу, нон-фикшн, популярные пособия.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `role` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `name`, `surname`, `role`) VALUES
(1, 'test', '', '$2a$10$mGMIfzBouAvclNJSVJBoDOj88l6J2w0qCT1pxoxKVd9eskymERI1K', 'test', 'test', 'user'),
(2, 'test2', '', '$2a$10$mGMIfzBouAvclNJSVJBoDOj88l6J2w0qCT1pxoxKVd9eskymERI1K', 'test2', 'test2', 'user'),
(3, 'ivankek', '', '$2a$10$mGMIfzBouAvclNJSVJBoDOj88l6J2w0qCT1pxoxKVd9eskymERI1K', 'Иван', 'Иванов', 'user'),
(4, 'User1', '', '$2a$10$mGMIfzBouAvclNJSVJBoDOj88l6J2w0qCT1pxoxKVd9eskymERI1K', 'User1', 'User1', 'user'),
(5, 'newtest', 'dofugn@dfghm.com', '$2a$10$FBTrlGTItSSOX78FMiOY7uJbF.jZ0ZFbeST2.DDb9o2JGFd3wn.3i', 'ivan', 'ivanov', 'user'),
(13, 'newtest2', 'dofugn2@dfghm.com', '$2a$10$r3sP/3vcmMY5eJrSWMJwlOlnKsPjM3huIEKevnprEJq7vtDRzl3CK', 'ivan', 'ivanov', 'user'),
(14, 'newtest3', 'dofugn3@dfghm.com', '$2a$10$42jHFrqMS.nSLdMEw4rDn.8qZrQ6RokF.V4grYriG9ZlIXesPXSty', 'ivan', 'ivanov', 'user'),
(15, 'newtest4', 'dofugn4@dfghm.com', '$2a$10$vq9sNuqhO9RSt5bj0dMVyeNTGjnvd1GIGJKyXPTzErtDUUZmsU4Ym', 'ivan', 'ivanov', 'admin'),
(16, 'test22', 'test22@fg.com', '$2a$10$Zth.DkRTcLXtQn0iwVgGEOVpsnK00Wvdeqiy3yr2I6pfBLjf8ANC6', 'fdsg', 'dfgdfg', 'user'),
(18, 'test223', 'test22@fg.com', '$2a$10$DFHkin5/PVBFCB81nhkPjO6B8WsRIjUtqUUs.G71T4CXUQWSCBQ2C', 'fdsg', 'dfgdfg', 'user'),
(20, 'dfghgfh', 'dfghgfh@fdg.com', '$2a$10$brrXLj56evIS8ZRLNvwWbu1Izd7A5VWs8Bw6UankCPYHxQDsFLGxi', 'dfffdg', 'dfgdfg', 'user'),
(21, 'dfghgfh2', 'dfghgfh@fdg.com', '$2a$10$48btyfMt1GwLnbkST1W36O4Ja18iooHTbLjpbuJlqgHLzNlUMVd1i', 'dfffdg', 'dfgdfg2', 'user'),
(22, 'ghjkghjk', 'ghp@gksd.om', '$2a$10$4Ndzif3g7Ms6BSXFy1bnuOOl9c4Q6cl1Qi1KVe5ujSRgTgiPXgw2C', 'dfhty', 'dfhty', 'user'),
(23, 'fghjfg', 'fghjfg@dfh.c', '$2a$10$o0cl/MG3yHnDCqkDuT.6xe9u4fbtuiAMu/9VAFBYalDkN2AIHmdx6', 'ivan', 'ivanon', 'user'),
(24, 'doifjg', 'fidojg@if.vo', '$2a$10$NZNGU373gkrDdJ.h0iLbWuUKAu9U7QlgwZQkddiqD1MGWvoNtMPAS', 'dfpgi', 'dfogij', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `library`
--
ALTER TABLE `library`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `publication`
--
ALTER TABLE `publication`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `library`
--
ALTER TABLE `library`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `publication`
--
ALTER TABLE `publication`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `publisher`
--
ALTER TABLE `publisher`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
