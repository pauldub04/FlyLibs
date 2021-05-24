-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 24, 2021 at 09:11 AM
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
(1, 'Александр', 'Пушкин', 'Сергеевич', NULL),
(2, 'Лев', 'Толстой', 'Николаевич', NULL),
(3, 'Иван', 'Тургенев', 'Сергеевич', NULL),
(4, 'Николай', 'Гоголь', 'Васильевич', NULL),
(5, 'Антон', 'Чехов', 'Павлович', NULL),
(6, 'Михаил', 'Лермонтов', 'Юрьевич', NULL),
(7, 'Анна', 'Ахматова', 'Андреевна', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int NOT NULL,
  `id_work` int NOT NULL,
  `id_library` int NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `id_work`, `id_library`, `image`, `description`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, 1, NULL, NULL),
(3, 3, 1, NULL, NULL),
(4, 4, 1, NULL, NULL),
(5, 5, 1, NULL, NULL),
(6, 6, 1, NULL, NULL),
(7, 3, 2, NULL, NULL),
(8, 6, 2, NULL, NULL),
(9, 7, 3, NULL, NULL),
(11, 8, 3, NULL, NULL),
(12, 9, 4, NULL, NULL),
(13, 10, 4, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `book_order`
--

CREATE TABLE `book_order` (
  `id` int NOT NULL,
  `id_owner` int NOT NULL,
  `id_user` int NOT NULL,
  `id_book` int NOT NULL,
  `status` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `book_order`
--

INSERT INTO `book_order` (`id`, `id_owner`, `id_user`, `id_book`, `status`) VALUES
(14, 1, 4, 3, 1),
(15, 1, 4, 4, 2),
(16, 4, 1, 13, 1);

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
(1, 'Басня', ''),
(2, 'Баллада', ''),
(3, 'Былина', ''),
(4, 'Видение', ''),
(5, 'Детектив', ''),
(6, 'Комедия', ''),
(7, 'Комедия нравов', ''),
(8, 'Лирическое стихотворение', ''),
(9, 'Мелодрама', ''),
(10, 'Миф', ''),
(11, 'Очерк', ''),
(12, 'Песня', ''),
(13, 'Научная фантастика', ''),
(14, 'Новелла', ''),
(15, 'Повесть', ''),
(16, 'Ода', ''),
(17, 'Поэма', ''),
(18, 'Послание', ''),
(19, 'Рассказ', ''),
(20, 'Сказка', ''),
(21, 'Роман', ''),
(22, 'Трагедия', ''),
(23, 'Фольклор', ''),
(24, 'Эпопея', ''),
(25, 'Элегия', ''),
(26, 'Эпиграмма', ''),
(27, 'Эпос', ''),
(28, 'Эссе', '');

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
(1, 1, 'Библиотека Иванова', NULL, NULL),
(2, 1, 'Вторая библиотека Иванова', NULL, NULL),
(3, 2, 'Библиотека Петрова', NULL, NULL),
(4, 4, 'Крутая библиотека', NULL, NULL);

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
(1, 'user1', 'user1@gmail.com', '$2a$10$BOE/xSMGNjpRNtmYe4mTC./nt1c9q/cqH20HrSEYQuCFCwsNqieMC', 'Иван', 'Иванов', 'user'),
(2, 'user2', 'user2@gmail.com', '$2a$10$gmtzAqX.EJR.HnlsAilxEOaBjkjj8yvT3zdiO9XVnEpvdDElJimuK', 'Петр', 'Петров', 'user'),
(3, 'user3', 'user3@gmail.com', '$2a$10$h/a9Xwdqz3V84lWpnIpFdu6GpfQkKEi1dXIRYCPW495jw4HFcDVi2', 'Иван', 'Петров', 'admin'),
(4, 'user5', 'user5@gmail.com', '$2a$10$tZ1qmbysjg90FPQ3.bPeu.y1LBjijGVrDj66J06.Fw45rm9fdKlQW', 'Кирилл', 'Иванов', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `work`
--

CREATE TABLE `work` (
  `id` int NOT NULL,
  `name` varchar(500) NOT NULL,
  `id_author` int NOT NULL,
  `id_genre` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `work`
--

INSERT INTO `work` (`id`, `name`, `id_author`, `id_genre`) VALUES
(1, 'Капитанская дочка', 1, 21),
(2, 'Медный всадник', 1, 17),
(3, 'Детство', 2, 15),
(4, 'Война и мир', 2, 21),
(5, 'Певцы', 3, 19),
(6, 'Тарас Бульба', 4, 15),
(7, 'Тоска', 5, 19),
(8, 'Герой нашего времени', 6, 21),
(9, 'Вишневый сад', 5, 6),
(10, 'Реквием', 7, 17);

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
-- Indexes for table `book_order`
--
ALTER TABLE `book_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `library`
--
ALTER TABLE `library`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `book_order`
--
ALTER TABLE `book_order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `library`
--
ALTER TABLE `library`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `work`
--
ALTER TABLE `work`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
